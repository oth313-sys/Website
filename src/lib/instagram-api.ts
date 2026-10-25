/** Instagram API calls that don't need the CMS (safe to use inside CMS settings). */

const GRAPH = 'https://graph.instagram.com'

/** Checks a token and returns the account's username. */
export async function checkToken(token: string): Promise<{ ok: boolean; username?: string; error?: string }> {
  try {
    const res = await fetch(`${GRAPH}/me?fields=user_id,username&access_token=${encodeURIComponent(token)}`, {
      cache: 'no-store',
    })
    const json = (await res.json()) as { username?: string; error?: { message?: string } }
    if (!res.ok || !json.username) return { ok: false, error: json.error?.message || `HTTP ${res.status}` }
    return { ok: true, username: json.username }
  } catch (error) {
    return { ok: false, error: (error as Error).message }
  }
}

/** Extends a long-lived token by another 60 days. */
export async function refreshToken(token: string): Promise<{ ok: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(
      `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`,
      { cache: 'no-store' },
    )
    const json = (await res.json()) as { access_token?: string; error?: { message?: string } }
    if (!res.ok || !json.access_token) return { ok: false, error: json.error?.message || `HTTP ${res.status}` }
    return { ok: true, token: json.access_token }
  } catch (error) {
    return { ok: false, error: (error as Error).message }
  }
}
