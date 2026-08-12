import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';

const institutionSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['RUMAH_KEBAJIKAN', 'MAAHAD_TAHFIZ', 'KAWASAN_AGIHAN']),
  address: z.string().optional(),
  contact: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const where: any = {};
    if (type) where.type = type;
    if (activeOnly) where.isActive = true;

    const institutions = await db.institution.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, data: institutions });
  } catch (error: any) {
    console.error('[INSTITUTIONS_GET_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengambil data institusi' },
      { status: error.message?.includes('Sesi') ? 401 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const validated = institutionSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Input tidak sah', details: validated.error.format() },
        { status: 400 }
      );
    }

    const institution = await db.institution.create({
      data: validated.data,
    });

    return NextResponse.json({ success: true, data: institution }, { status: 201 });
  } catch (error: any) {
    console.error('[INSTITUTIONS_POST_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mencipta institusi' },
      { status: error.message?.includes('Sesi') ? 401 : 500 }
    );
  }
}
