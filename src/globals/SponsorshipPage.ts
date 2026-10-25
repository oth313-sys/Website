import type { GlobalConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'
import { eyebrow, heading, imageField, longText, text } from './fields'

export const SponsorshipPage: GlobalConfig = {
  slug: 'sponsorship',
  label: 'Sponsorship page',
  admin: {
    group: 'Website',
    description: 'The sponsorship and partnership page.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Top of page',
          fields: [
            imageField('background', 'Background photo'),
            eyebrow(),
            heading(),
            longText('text', 'Introduction'),
            text('buttonLabel', 'Button text'),
            {
              name: 'logos',
              label: 'Logos',
              type: 'array',
              labels: { singular: 'Logo', plural: 'Logos' },
              fields: [imageField('image', 'Logo'), text('alt', 'Logo description')],
            },
            longText('logosNote', 'Small print next to the logos'),
          ],
        },
        {
          name: 'top',
          label: 'Header & ribbon',
          fields: [
            text('backLabel', 'Back link text'),
            {
              type: 'row',
              fields: [text('ribbonLeft', 'Ribbon text (left)'), text('ribbonRight', 'Ribbon text (right)')],
            },
          ],
        },
        {
          name: 'numbers',
          label: 'Numbers',
          fields: [
            {
              name: 'items',
              label: 'Number boxes',
              type: 'array',
              labels: { singular: 'Number', plural: 'Numbers' },
              fields: [{ type: 'row', fields: [text('value', 'Big number'), text('label', 'Label')] }],
            },
          ],
        },
        {
          name: 'partnership',
          label: 'Packages',
          fields: [
            eyebrow(),
            heading(),
            longText('text', 'Introduction'),
            {
              name: 'tiers',
              label: 'Packages',
              type: 'array',
              labels: { singular: 'Package', plural: 'Packages' },
              fields: [
                { type: 'row', fields: [text('eyebrow', 'Small label'), text('title', 'Package name')] },
                {
                  name: 'points',
                  label: 'Bullet points',
                  type: 'textarea',
                  admin: { rows: 4, description: 'One bullet point per line.' },
                },
                {
                  name: 'featured',
                  label: 'Highlight this package',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            longText('footnote', 'Small print'),
          ],
        },
        {
          name: 'collaborate',
          label: 'Ways to collaborate',
          fields: [eyebrow(), heading(), longText('text', 'Text')],
        },
        {
          name: 'inquiry',
          label: 'Enquiry form',
          fields: [
            eyebrow(),
            heading(),
            longText('text', 'Introduction'),
            text('recipientEmail', 'Send enquiries to (email)'),
            {
              name: 'interests',
              label: '“Partnership interest” choices',
              type: 'array',
              labels: { singular: 'Choice', plural: 'Choices' },
              fields: [text('label', 'Choice')],
            },
            text('messagePlaceholder', 'Message box hint text'),
            text('buttonLabel', 'Button text'),
          ],
        },
        {
          label: 'Footer & search',
          fields: [
            longText('footerText', 'Footer text'),
            {
              name: 'seo',
              label: 'Search & sharing',
              type: 'group',
              fields: [
                text('metaTitle', 'Page title', 'Shown in the browser tab and on Google.'),
                longText('metaDescription', 'Page description', 'Shown on Google and when the link is shared.'),
              ],
            },
          ],
        },
      ],
    },
  ],
}
