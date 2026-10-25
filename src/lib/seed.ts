import type { Payload } from 'payload'
import { homeDefaults, siteDefaults, sponsorshipDefaults } from '../content/defaults'

/**
 * Fills the CMS with the original website content the first time it starts
 * with an empty database. Runs after all database migrations, so it always
 * matches the current fields. Does nothing once the content exists.
 */
export async function seedIfEmpty(payload: Payload): Promise<void> {
  try {
    const site = (await payload.findGlobal({ slug: 'site', depth: 0 })) as { updatedAt?: string }
    if (site?.updatedAt) return
    const context = { skipRevalidate: true }
    await payload.updateGlobal({ slug: 'site', data: siteDefaults as any, context })
    await payload.updateGlobal({ slug: 'home', data: homeDefaults as any, context })
    await payload.updateGlobal({ slug: 'sponsorship', data: sponsorshipDefaults as any, context })
    payload.logger.info('[seed] Loaded the original website content into the CMS.')
  } catch (error) {
    payload.logger.warn(`[seed] Skipped loading the original content: ${(error as Error).message}`)
  }
}
