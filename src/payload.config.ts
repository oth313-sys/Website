import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { HomePage } from './globals/HomePage'
import { SiteSettings } from './globals/SiteSettings'
import { SponsorshipPage } from './globals/SponsorshipPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Othman Boularas' },
  },
  collections: [Users, Media],
  globals: [HomePage, SponsorshipPage, SiteSettings],
  db: postgresAdapter({
    pool: { connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || '' },
    // Everything lives in its own "cms" schema, separate from anything else in the database.
    schemaName: 'cms',
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Upload straight from the browser, so large photos aren't limited by server upload size.
      clientUploads: true,
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  telemetry: false,
})
