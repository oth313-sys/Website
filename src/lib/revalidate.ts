import { revalidatePath } from 'next/cache'

/**
 * After anything is saved in the CMS, refresh the public pages so the change
 * shows up straight away.
 */
export const revalidateSite = ({ doc, req }: { doc?: unknown; req?: { context?: Record<string, unknown> } }) => {
  if (!req?.context?.skipRevalidate) {
    try {
      revalidatePath('/', 'layout')
    } catch {
      // Not running inside Next.js (e.g. during a database migration) — nothing to refresh.
    }
  }
  return doc
}
