import type { CollectionConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image or file', plural: 'Images & files' },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Website',
    description: 'Photos, logos and documents used on the website.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    {
      name: 'alt',
      label: 'Description',
      type: 'text',
      admin: { description: 'A few words describing the image, for screen readers and Google.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
