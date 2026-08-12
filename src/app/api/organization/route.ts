import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';

const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  category: z.enum(['ADMINISTRATION', 'OPERATIONS', 'HONORARY']),
  position: z.string().min(1),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const where: any = {};
    if (category) where.category = category;
    if (activeOnly) where.isActive = true;

    const members = await db.organizationMember.findMany({
      where,
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json({ success: true, data: members });
  } catch (error: any) {
    console.error('[ORGANIZATION_GET_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengambil data organisasi' },
      { status: error.message?.includes('Sesi') ? 401 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const validated = memberSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Input tidak sah', details: validated.error.format() },
        { status: 400 }
      );
    }

    const member = await db.organizationMember.create({
      data: validated.data,
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error: any) {
    console.error('[ORGANIZATION_POST_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mencipta ahli organisasi' },
      { status: error.message?.includes('Sesi') ? 401 : 500 }
    );
  }
}
