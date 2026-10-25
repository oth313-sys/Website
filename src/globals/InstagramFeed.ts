import type { GlobalConfig } from 'payload'
import { checkToken } from '../lib/instagram-api'
import { revalidateSite } from '../lib/revalidate'

const loggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

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
        const token = String(data.accessToken ?? originalDoc?.accessToken ?? '').trim()
        if (!token) {
          data.status = 'Not connected. Paste an access token to show your latest posts.'
          return data
        }
        const previous = String(originalDoc?.accessToken ?? '').trim()
        if (token !== previous || !String(originalDoc?.status ?? '').startsWith('Connected')) {
          const check = await checkToken(token)
          data.status = check.ok
            ? `Connected to @${check.username}.`
            : `This access token didn't work: ${check.error}`
          if (check.ok) data.tokenRenewedAt = new Date().toISOString()
        }
        if (data.accessToken !== undefined) data.accessToken = token
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
      name: 'accessToken',
      label: 'Instagram access token',
      type: 'textarea',
      admin: {
        rows: 3,
        description:
          'From your Meta developer app: Instagram → API setup with Instagram business login → Generate token. It renews itself automatically every week.',
      },
    },
    {
      name: 'postCount',
      label: 'Number of posts to show',
      type: 'number',
      defaultValue: 6,
      min: 3,
      max: 12,
      admin: { description: 'Shown three per row. 6 matches the original design.' },
    },
    {
      name: 'tokenRenewedAt',
      label: 'Access token last renewed',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
