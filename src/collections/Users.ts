import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin user', plural: 'Admin users' },
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
    description: 'People who can log in and edit the website.',
  },
  auth: true,
  fields: [{ name: 'name', label: 'Name', type: 'text' }],
}
