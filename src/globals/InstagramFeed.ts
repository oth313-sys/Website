import type { GlobalConfig } from 'payload'
import { checkBeholdFeed, checkToken } from '../lib/instagram-api'
import { revalidateSite } from '../lib/revalidate'

const loggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)
const clean = (v: unknown) => String(v ?? '').trim()

export const InstagramFeed: GlobalConfig = {
  slug: 'instagram',
  label: 'Instagram feed',
  admin: {
    group: 'Website',
    description:
      'Shows your latest Instagram posts in the “Featured moments” section of the home page. Until it is connected, the six photos set under Home page → Featured moments are shown instead.',
  },
  // Only logged-in admins can see these settings (the key is private).
  access: { read: loggedIn, update: loggedIn },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, context }) => {
        // The weekly renewal job sets these fields itself.
        if (context?.skipCheck) return data

        const feedUrl = clean(data.feedUrl ?? originalDoc?.feedUrl)
        const token = clean(data.accessToken ?? originalDoc?.accessToken)
        if (data.feedUrl !== undefined) data.feedUrl = feedUrl
        if (data.accessToken !== undefined) data.accessToken = token

        const changed =
          feedUrl !== clean(originalDoc?.feedUrl) ||
          token !== clean(originalDoc?.accessToken) ||
          !clean(originalDoc?.status).startsWith('Connected')
        if (!changed) return data

        if (feedUrl) {
          const check = await checkBeholdFeed(feedUrl)
          data.status = check.ok
            ? `Connected through Behold${check.username ? ` to @${check.username}` : ''} (${check.posts} posts in the feed).`
            : `This Behold link didn't work: ${check.error}.`
          return data
        }
        if (token) {
          const check = await checkToken(token)
          data.status = check.ok
            ? `Connected to @${check.username}.`
            : `This access token didn't work: ${check.error}`
          if (check.ok) data.tokenRenewedAt = new Date().toISOString()
          return data
        }
        data.status = 'Not connected. Paste a Behold feed link (or an access token) to show your latest posts.'
        return data
      },
    ],
    afterChange: [revalidateSite],
  },
  fields: [
    {
      name: 'enabled',
      label: 'Show my latest Instagram posts',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'feedUrl',
      label: 'Behold feed link (easiest)',
      type: 'text',
      admin: {
        placeholder: 'https://feeds.behold.so/…',
        description:
          'On behold.so: connect your Instagram, create a JSON feed, and paste its link here. No developer setup needed.',
      },
    },
    {
      type: 'collapsible',
      label: 'Advanced: connect with a Meta access token instead',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'accessToken',
          label: 'Instagram access token',
          type: 'textarea',
          admin: {
            rows: 3,
            description:
              'Only needed if you are not using Behold. From developers.facebook.com: your app → Instagram → API setup with Instagram business login → Generate token. It renews itself every week.',
          },
        },
        {
          name: 'tokenRenewedAt',
          label: 'Access token last renewed',
          type: 'date',
          admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
        },
      ],
    },
    {
      name: 'postCount',
      label: 'Number of posts to show',
      type: 'number',
      defaultValue: 6,
      min: 3,
      max: 12,
      admin: { description: 'Shown three per row. 6 matches the original design (and is the most Behold’s free plan provides).' },
    },
  ],
}
