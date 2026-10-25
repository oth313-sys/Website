import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { homeDefaults, siteDefaults, sponsorshipDefaults } from '@/content/defaults'

type Slug = 'home' | 'sponsorship' | 'site'

/**
 * Reads one CMS section. If the CMS hasn't been filled in yet, or the database
 * can't be reached, the original website content is shown instead so the site
 * never goes blank.
 */
async function loadGlobal<T>(slug: Slug, fallback: T): Promise<T> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug, depth: 1 })
    if (data && (data as { updatedAt?: string }).updatedAt) return data as unknown as T
  } catch (error) {
    console.error(`[cms] Could not load "${slug}", showing built-in content instead.`, error)
  }
  return fallback
}

export const getHome = cache(() => loadGlobal('home', homeDefaults))
export const getSponsorship = cache(() => loadGlobal('sponsorship', sponsorshipDefaults))
export const getSite = cache(() => loadGlobal('site', siteDefaults))

export type HomeContent = typeof homeDefaults
export type SponsorshipContent = typeof sponsorshipDefaults
export type SiteContent = typeof siteDefaults
