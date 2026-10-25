import type { GlobalConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'
import { imageField, longText, text } from './fields'

export const SiteSettings: GlobalConfig = {
  slug: 'site',
  label: 'Header & footer',
  admin: {
    group: 'Website',
    description: 'The logo, menu and footer shared by every page.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    imageField('headerLogo', 'Header logo'),
    text('headerLogoAlt', 'Header logo description'),
    {
      name: 'nav',
      label: 'Menu',
      type: 'array',
      labels: { singular: 'Menu link', plural: 'Menu links' },
      admin: { description: 'Links in the top menu of the home page. Use #section to jump to a section.' },
      fields: [
        { type: 'row', fields: [text('label', 'Text'), text('link', 'Link')] },
        { name: 'highlight', label: 'Show as a red button', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      type: 'row',
      fields: [
        text('copyrightName', 'Copyright name', 'Shown as “© year Name. All rights reserved.”'),
        text('footerTagline', 'Footer tagline'),
      ],
    },
    {
      name: 'brandCredit',
      label: 'Brand credit line',
      type: 'group',
      fields: [
        text('text', 'Text before the link'),
        text('linkLabel', 'Link text'),
        imageField('document', 'Brand guidelines document', 'file'),
        longText('suffix', 'Text after the link'),
      ],
    },
  ],
}
