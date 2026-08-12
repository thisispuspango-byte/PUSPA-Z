import fbData from '@/data/fb_posts.json'

export interface FBPost {
  id: string
  title: string
  date: string
  category: string
  content: string
  image_path: string
  tags: string[]
  like_count: number
  share_count: number
}

export interface FBMetadata {
  page_name: string
  handle: string
  facebook_url: string
  sokong_url: string
  verified_phone: string
  verified_email: string
  verified_address: string
  bank_details: {
    primary_bank: string
    primary_account: string
    secondary_bank: string
    secondary_account: string
    account_name: string
    reference: string
  }
}

export function getFBFeedMetadata(): FBMetadata {
  return fbData.metadata as FBMetadata
}

export function getFBPosts(): FBPost[] {
  return fbData.posts as FBPost[]
}

export function getFBPostById(id: string): FBPost | undefined {
  return (fbData.posts as FBPost[]).find((p) => p.id === id)
}
