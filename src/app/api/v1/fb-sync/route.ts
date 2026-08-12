import { NextResponse } from 'next/server'
import { getFBFeedMetadata, getFBPosts } from '@/lib/fb-sync'

export async function GET() {
  try {
    const metadata = getFBFeedMetadata()
    const posts = getFBPosts()

    return NextResponse.json({
      success: true,
      data: {
        metadata,
        posts,
        total: posts.length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data feed Facebook' },
      { status: 500 }
    )
  }
}
