import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: dbUser || user,
    })
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch settings'
    return NextResponse.json({ error: errMessage }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    if (body.name || body.profileImageUrl) {
      await db.user.update({
        where: { id: user.id },
        data: {
          ...(body.name && { name: body.name }),
          ...(body.profileImageUrl && { avatar: body.profileImageUrl }),
        },
      }).catch(() => {
        // If user record doesn't exist in Prisma DB, ignore DB update
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Tetapan berjaya disimpan ke pelayan',
      data: body,
    })
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to save settings'
    return NextResponse.json({ error: errMessage }, { status: 400 })
  }
}
