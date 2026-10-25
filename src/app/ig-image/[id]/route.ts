import { getPostImageUrl } from '@/lib/instagram'

/**
 * Sends the browser to the current image for an Instagram post.
 * Instagram's own image links expire after a while, so the site links here instead.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const url = await getPostImageUrl(id)
  if (!url) {
    return new Response(null, {
      status: 307,
      headers: { Location: '/assets/athlete-1000371282.webp', 'Cache-Control': 'public, s-maxage=300' },
    })
  }
  return new Response(null, {
    status: 307,
    headers: { Location: url, 'Cache-Control': 'public, max-age=0, s-maxage=3000, stale-while-revalidate=600' },
  })
}
