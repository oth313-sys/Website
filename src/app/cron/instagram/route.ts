import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { checkToken, refreshToken } from '@/lib/instagram-api'

export const dynamic = 'force-dynamic'

/**
 * Runs weekly (see vercel.json). Renews the Instagram access token for another
 * 60 days and refreshes the home page so it picks up new posts.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const payload = await getPayload({ config })
  const settings = (await payload.findGlobal({ slug: 'instagram' })) as {
    accessToken?: string | null
    tokenRenewedAt?: string | null
  }
  const token = settings?.accessToken?.trim()
  if (!token) return Response.json({ ok: true, skipped: 'No Instagram token saved.' })

  // Instagram only allows renewing a token that is at least a day old.
  const age = settings.tokenRenewedAt ? Date.now() - new Date(settings.tokenRenewedAt).getTime() : Infinity
  let result: Record<string, unknown>
  if (age < 24 * 60 * 60 * 1000) {
    result = { ok: true, skipped: 'Token renewed less than a day ago.' }
  } else {
    const renewed = await refreshToken(token)
    if (renewed.ok) {
      const check = await checkToken(renewed.token)
      await payload.updateGlobal({
        slug: 'instagram',
        data: {
          accessToken: renewed.token,
          tokenRenewedAt: new Date().toISOString(),
          status: check.ok ? `Connected to @${check.username}.` : `Token renewed, but checking it failed: ${check.error}`,
        },
        context: { skipRevalidate: true, skipCheck: true },
      })
      result = { ok: true, renewed: true }
    } else {
      await payload.updateGlobal({
        slug: 'instagram',
        data: { status: `Couldn't renew the access token automatically: ${renewed.error}. Please generate a new one.` },
        context: { skipRevalidate: true, skipCheck: true },
      })
      result = { ok: false, error: renewed.error }
    }
  }

  revalidatePath('/', 'layout')
  return Response.json(result)
}
