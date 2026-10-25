import { getPayload } from 'payload'
import config from '@payload-config'

const GRAPH = 'https://graph.instagram.com'

export type InstagramPost = {
  id: string
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | string
  permalink: string
  timestamp: string
}

type InstagramSettings = {
  enabled?: boolean | null
  accessToken?: string | null
  postCount?: number | null
}

export async function getInstagramSettings(): Promise<InstagramSettings | null> {
  try {
    const payload = await getPayload({ config })
    return (await payload.findGlobal({ slug: 'instagram' })) as InstagramSettings
  } catch (error) {
    console.error('[instagram] Could not read settings', error)
    return null
  }
}

/** The account's latest posts, or null if the feed isn't connected or can't be reached. */
export async function getLatestPosts(): Promise<InstagramPost[] | null> {
  const settings = await getInstagramSettings()
  const token = settings?.accessToken?.trim()
  if (!settings?.enabled || !token) return null
  const count = Math.min(Math.max(Number(settings.postCount) || 6, 1), 12)
  try {
    const url = `${GRAPH}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${count + 6}&access_token=${encodeURIComponent(token)}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) {
      console.error('[instagram] Media request failed', res.status, await res.text())
      return null
    }
    const json = (await res.json()) as { data?: any[] }
    const posts = (json.data || [])
      .filter((m) => m?.id && m?.permalink && (m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url))
      .slice(0, count)
      .map((m) => ({
        id: String(m.id),
        caption: m.caption || '',
        mediaType: m.media_type,
        permalink: m.permalink,
        timestamp: m.timestamp,
      }))
    return posts.length ? posts : null
  } catch (error) {
    console.error('[instagram] Could not load posts', error)
    return null
  }
}

/** A fresh image address for one post (Instagram's image links expire, so we look them up when needed). */
export async function getPostImageUrl(id: string): Promise<string | null> {
  const settings = await getInstagramSettings()
  const token = settings?.accessToken?.trim()
  if (!token || !/^\d+$/.test(id)) return null
  try {
    const res = await fetch(
      `${GRAPH}/${id}?fields=media_type,media_url,thumbnail_url&access_token=${encodeURIComponent(token)}`,
      { next: { revalidate: 3000 } },
    )
    if (!res.ok) return null
    const m = (await res.json()) as { media_type?: string; media_url?: string; thumbnail_url?: string }
    return (m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url) || null
  } catch {
    return null
  }
}

/** Card text from a post: first line of the caption, without trailing hashtags. */
export function postTitle(caption: string): string {
  const first = (caption || '').split(/\r?\n/).map((l) => l.trim()).find(Boolean) || ''
  const clean = first.replace(/(\s*#[^\s#]+)+\s*$/u, '').trim()
  if (!clean) return 'Instagram post'
  return clean.length > 70 ? `${clean.slice(0, 67).trimEnd()}…` : clean
}

export function postLabel(mediaType: string): string {
  if (mediaType === 'VIDEO') return 'Instagram reel'
  if (mediaType === 'CAROUSEL_ALBUM') return 'Instagram album'
  return 'Instagram post'
}

export function postDate(timestamp: string): string {
  const d = new Date(timestamp)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Qatar' })
}
