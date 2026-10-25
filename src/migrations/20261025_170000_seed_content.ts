import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Originally loaded the website's content into the CMS. Content is now loaded
 * on first start instead (see src/lib/seed.ts), after every database change has
 * been applied, so this step no longer does anything.
 */
export async function up(_args: MigrateUpArgs): Promise<void> {}

export async function down(_args: MigrateDownArgs): Promise<void> {}
