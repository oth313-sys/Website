import type { Field } from 'payload'

/** Single-line text. */
export const text = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'text',
  admin: description ? { description } : undefined,
})

/** Multi-line text. */
export const longText = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'textarea',
  admin: { rows: 3, ...(description ? { description } : {}) },
})

/** Big section headings: each new line becomes a line break on the site. */
export const heading = (name = 'heading', label = 'Heading'): Field => ({
  name,
  label,
  type: 'textarea',
  admin: { rows: 2, description: 'Press Enter to break the heading onto a new line.' },
})

export const eyebrow = (): Field => text('eyebrow', 'Small label above the heading')

/**
 * An image (or document). Upload a new file to replace it; until then the
 * built-in file from the original site is used.
 */
export const imageField = (name: string, label: string, kind: 'image' | 'file' = 'image'): Field => ({
  name,
  label,
  type: 'group',
  admin: {
    description:
      kind === 'image'
        ? 'Upload or choose an image to replace the current one.'
        : 'Upload or choose a file (PDF or image) to replace the current one.',
  },
  fields: [
    {
      name: 'file',
      label: kind === 'image' ? 'New image' : 'New file',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'path',
      label: 'Current built-in file',
      type: 'text',
      admin: {
        description: 'Used when nothing is chosen above. You can normally leave this as it is.',
      },
    },
  ],
})

export const button = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { type: 'row', fields: [text('label', 'Button text'), text('link', 'Link', 'A web address, or #section on this page.')] },
  ],
})
