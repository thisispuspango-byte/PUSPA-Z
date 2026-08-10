import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireRole } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Auth check: any logged-in user can view donations
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const method = searchParams.get('method') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { donorName: { contains: search } },
        { receiptNumber: { contains: search } },
        { notes: { contains: search } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (method) {
      where.method = method
    }

    const [donations, total] = await Promise.all([
      db.donation.findMany({
        where,
        include: {
          donor: {
            select: { id: true, name: true, type: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.donation.count({ where }),
    ])

    // Compute stats via aggregation (avoids full table scan)
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

    const [totalAmountAgg, categoryAgg, receiptCount, shariahCount, totalCount, monthAgg] = await Promise.all([
      db.donation.aggregate({ _sum: { amount: true } }),
      db.donation.groupBy({ by: ['category'], _sum: { amount: true } }),
      db.donation.count({ where: { receiptIssued: true } }),
      db.donation.count({ where: { shariahCompliant: true } }),
      db.donation.count(),
      db.donation.aggregate({
        _sum: { amount: true },
        where: { createdAt: { gte: monthStart, lte: monthEnd } },
      }),
    ])

    const categoryTotals: Record<string, number> = {}
    categoryAgg.forEach((r) => {
      categoryTotals[r.category] = r._sum.amount || 0
    })

    const shariahRate = totalCount > 0 ? Math.round((shariahCount / totalCount) * 100) : 100

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalThisMonth: monthAgg._sum.amount || 0,
        categoryTotals,
        receiptCount,
        shariahRate,
        totalDonations: totalCount,
        totalAmount: totalAmountAgg._sum.amount || 0,
      },
    })
  } catch (error) {
    console.error('Donations GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth check: staff and above can create donations
    await requireAuth()
    await requireRole('staff')
    const body = await request.json()
    const { donorId, donorName, category, amount, method, date, notes, shariahCompliant } = body

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 })
    }

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    const validCategories = ['zakat', 'sadaqah', 'waqf', 'infaq', 'general']
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    if (method) {
      const validMethods = ['cash', 'bank_transfer', 'online', 'cheque']
      if (!validMethods.includes(method)) {
        return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
      }
    }

    // Generate receipt number
    const count = await db.donation.count()
    const receiptNumber = `REC-${String(count + 1).padStart(5, '0')}`

    const donation = await db.donation.create({
      data: {
        donorId: donorId || null,
        donorName: donorName || null,
        category,
        amount: parseFloat(amount),
        method: method || null,
        receiptNumber,
        receiptIssued: false,
        shariahCompliant: shariahCompliant !== false,
        date: date || new Date().toISOString().split('T')[0],
        notes: notes || null,
      },
      include: {
        donor: {
          select: { id: true, name: true, email: true, type: true },
        },
      },
    })

    return NextResponse.json({ donation }, { status: 201 })
  } catch (error) {
    console.error('Donations POST error:', error)
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 })
  }
}
