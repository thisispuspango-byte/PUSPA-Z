import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { AuthError, requireAuth } from '@/lib/auth'

// GET /api/v1/cases — List cases with pagination, search, and filters
export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')))
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const type = searchParams.get('type') || ''
    const priority = searchParams.get('priority') || ''

    const where: Prisma.CaseWhereInput = {}

    if (search) {
      where.OR = [
        { caseNumber: { contains: search } },
        { description: { contains: search } },
        { member: { name: { contains: search } } },
      ]
    }

    if (status) {
      where.status = status
    }

    if (type) {
      where.type = type
    }

    if (priority) {
      where.priority = priority
    }

    const [cases, total] = await Promise.all([
      db.case.findMany({
        where,
        include: {
          member: {
            select: {
              id: true,
              name: true,
              icNumber: true,
            },
          },
          notes: {
            include: {
              author: {
                select: { id: true, name: true },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.case.count({ where }),
    ])

    // Mask IC numbers for PDPA compliance
    const maskedCases = cases.map((c) => ({
      ...c,
      member: {
        ...c.member,
        icNumber: c.member.icNumber ? '****' + c.member.icNumber.slice(-4) : null,
      },
    }))

    return NextResponse.json({
      data: maskedCases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch cases'
    if (errMessage.includes('Sesi tidak sah') || errMessage.includes('Akses ditolak')) {
      const status = errMessage.includes('Akses ditolak') ? 403 : 401
      return NextResponse.json({ error: errMessage }, { status })
    }
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    )
  }
}
