import type { GlobalConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'
import { button, eyebrow, heading, imageField, longText, text } from './fields'

export const HomePage: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  admin: {
    group: 'Website',
    description: 'Everything on the main athlete page, section by section.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          description: 'The large opening section at the top of the page.',
          fields: [
            imageField('background', 'Background photo'),
            imageField('signature', 'Calligraphy logo'),
            text('signatureAlt', 'Calligraphy logo description'),
            text('brandLine', 'Gold tagline'),
            eyebrow(),
            {
              type: 'row',
              fields: [text('firstName', 'First name'), text('lastName', 'Last name (outlined)')],
            },
            longText('intro', 'Introduction'),
            button('primaryButton', 'Main button'),
            button('secondaryButton', 'Second button'),
            text('sideText', 'Vertical side text'),
          ],
        },
        {
          name: 'highlights',
          label: 'Highlights & logos',
          fields: [
            {
              name: 'ribbon',
              label: 'Gold ribbon words',
              type: 'array',
              labels: { singular: 'Word', plural: 'Words' },
              fields: [text('word', 'Word')],
            },
            {
              name: 'stats',
              label: 'Number strip',
              type: 'array',
              labels: { singular: 'Number', plural: 'Numbers' },
              fields: [{ type: 'row', fields: [text('value', 'Big number'), text('label', 'Label')] }],
            },
            text('affiliationsTitle', 'Sporting bodies title'),
            {
              name: 'affiliations',
              label: 'Sporting bodies',
              type: 'array',
              labels: { singular: 'Sporting body', plural: 'Sporting bodies' },
              fields: [
                text('name', 'Name'),
                text('url', 'Website'),
                imageField('logo', 'Logo'),
                text('logoAlt', 'Logo description'),
              ],
            },
            longText('affiliationsNote', 'Small print under the logos'),
          ],
        },
        {
          name: 'about',
          label: 'About',
          fields: [
            imageField('photo', 'Photo'),
            text('caption', 'Photo caption'),
            eyebrow(),
            heading(),
            {
              name: 'paragraphs',
              label: 'Paragraphs',
              type: 'array',
              labels: { singular: 'Paragraph', plural: 'Paragraphs' },
              admin: { description: 'Wrap words in **double asterisks** to make them bold.' },
              fields: [{ name: 'text', label: 'Text', type: 'textarea', admin: { rows: 5 } }],
            },
            {
              name: 'details',
              label: 'Quick facts',
              type: 'array',
              labels: { singular: 'Fact', plural: 'Facts' },
              fields: [{ type: 'row', fields: [text('label', 'Label'), text('value', 'Value')] }],
            },
            {
              type: 'row',
              fields: [text('buttonLabel', 'Button text'), text('buttonLink', 'Button link')],
            },
          ],
        },
        {
          name: 'achievements',
          label: 'Achievements',
          fields: [
            eyebrow(),
            heading(),
            longText('intro', 'Introduction'),
            {
              name: 'cards',
              label: 'Achievement cards',
              type: 'array',
              labels: { singular: 'Achievement', plural: 'Achievements' },
              admin: { description: 'Drag to reorder. Add as many as you like.' },
              fields: [
                {
                  type: 'row',
                  fields: [text('year', 'Year (big number)'), text('tag', 'Gold label')],
                },
                text('title', 'Title'),
                text('description', 'Description'),
                {
                  name: 'featured',
                  label: 'Highlight this card (red background)',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          name: 'record',
          label: 'Complete record',
          fields: [
            eyebrow(),
            heading(),
            longText('intro', 'Introduction'),
            {
              name: 'groups',
              label: 'Result groups',
              type: 'array',
              labels: { singular: 'Group', plural: 'Groups' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    text('title', 'Group title'),
                    {
                      name: 'column',
                      label: 'Column',
                      type: 'select',
                      defaultValue: 'left',
                      options: [
                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },
                      ],
                    },
                  ],
                },
                {
                  name: 'results',
                  label: 'Results',
                  type: 'textarea',
                  admin: { rows: 6, description: 'One result per line.' },
                },
              ],
            },
            {
              name: 'documents',
              label: 'Document buttons',
              type: 'array',
              labels: { singular: 'Document', plural: 'Documents' },
              fields: [text('label', 'Button text'), imageField('document', 'Document', 'file')],
            },
            longText('note', 'Small print'),
          ],
        },
        {
          name: 'journey',
          label: 'Journey',
          fields: [
            eyebrow(),
            heading(),
            {
              name: 'events',
              label: 'Timeline',
              type: 'array',
              labels: { singular: 'Milestone', plural: 'Milestones' },
              fields: [
                { type: 'row', fields: [text('time', 'Year'), text('title', 'Title')] },
                longText('text', 'Text'),
              ],
            },
          ],
        },
        {
          name: 'quote',
          label: 'Quote',
          fields: [
            text('kicker', 'Top line'),
            text('label', 'Second line'),
            heading('quote', 'Quote'),
            text('attribution', 'Bottom line'),
          ],
        },
        {
          name: 'press',
          label: 'Media',
          fields: [
            eyebrow(),
            heading(),
            {
              name: 'items',
              label: 'Media links',
              type: 'array',
              labels: { singular: 'Article', plural: 'Articles' },
              fields: [
                text('source', 'Source and year'),
                text('title', 'Title'),
                text('url', 'Link to the article'),
              ],
            },
            longText('note', 'Small print'),
          ],
        },
        {
          name: 'sponsorBanner',
          label: 'Sponsor banner',
          fields: [
            eyebrow(),
            heading(),
            longText('text', 'Text'),
            {
              type: 'row',
              fields: [text('buttonLabel', 'Button text'), text('buttonLink', 'Button link')],
            },
          ],
        },
        {
          name: 'gallery',
          label: 'Gallery',
          fields: [
            eyebrow(),
            heading(),
            longText('intro', 'Introduction'),
            {
              name: 'photos',
              label: 'Photos',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Photos' },
              admin: { description: 'Drag to reorder.' },
              fields: [
                imageField('image', 'Photo'),
                text('alt', 'Photo description'),
                text('caption', 'Caption'),
              ],
            },
          ],
        },
        {
          name: 'featured',
          label: 'Featured moments',
          fields: [
            eyebrow(),
            heading(),
            longText('intro', 'Introduction'),
            {
              type: 'row',
              fields: [text('buttonLabel', 'Button text'), text('profileUrl', 'Instagram profile link')],
            },
            {
              name: 'cards',
              label: 'Moments',
              type: 'array',
              labels: { singular: 'Moment', plural: 'Moments' },
              fields: [
                imageField('image', 'Photo'),
                text('category', 'Small label'),
                text('title', 'Title'),
                text('text', 'Short text'),
                text(
                  'postUrl',
                  'Instagram post link (optional)',
                  'Paste a link like https://www.instagram.com/p/… to open that post. Leave empty to open the profile.',
                ),
              ],
            },
            longText('note', 'Small print'),
            {
              type: 'collapsible',
              label: 'Text shown when your Instagram feed is connected',
              admin: { initCollapsed: true },
              fields: [
                longText('liveIntro', 'Introduction (Instagram feed)'),
                longText('liveNote', 'Small print (Instagram feed)'),
              ],
            },
          ],
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: [
            eyebrow(),
            heading(),
            longText('text', 'Text'),
            {
              type: 'row',
              fields: [text('buttonLabel', 'Button text'), text('email', 'Email address')],
            },
            text('emailSubject', 'Email subject line'),
            {
              name: 'socials',
              label: 'Links',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [{ type: 'row', fields: [text('label', 'Text'), text('url', 'Link')] }],
            },
            longText('note', 'Small print'),
          ],
        },
        {
          name: 'seo',
          label: 'Search & sharing',
          fields: [
            text('metaTitle', 'Page title', 'Shown in the browser tab and on Google.'),
            longText('metaDescription', 'Page description', 'Shown on Google and when the link is shared.'),
          ],
        },
      ],
    },
  ],
}
