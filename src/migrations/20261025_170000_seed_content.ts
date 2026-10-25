import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { homeDefaults, siteDefaults, sponsorshipDefaults } from '../content/defaults'

/**
 * Fills the CMS with the website's original content, so the admin panel starts
 * with everything already in place.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const context = { skipRevalidate: true }
  await payload.updateGlobal({ slug: 'site', data: siteDefaults as any, req, context })
  await payload.updateGlobal({ slug: 'home', data: homeDefaults as any, req, context })
  await payload.updateGlobal({ slug: 'sponsorship', data: sponsorshipDefaults as any, req, context })
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content is left in place when rolling back.
}
