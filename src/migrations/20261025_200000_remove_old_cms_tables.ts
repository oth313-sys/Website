import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Removes the unused tables left in the database's default "public" schema by an
 * earlier CMS attempt. The current CMS lives in the separate "cms" schema and is
 * not touched. Only the tables named below are removed; anything else is left alone.
 */
const OLD_TABLES = [
  'achievements',
  'news',
  'gallery',
  'sponsors',
  'pages',
  'users_sessions',
  'users',
  'payload_kv',
  'payload_locked_documents_rels',
  'payload_locked_documents',
  'payload_preferences_rels',
  'payload_preferences',
  'payload_migrations',
]

async function publicTables(db: MigrateUpArgs['db']): Promise<string[]> {
  const result: any = await db.execute(
    sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`,
  )
  return (result.rows ?? result).map((r: { table_name: string }) => r.table_name)
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const before = await publicTables(db)
  payload.logger.info(`[cleanup] public tables before: ${before.join(', ') || '(none)'}`)

  // Only act if this looks like the earlier CMS install.
  if (!before.includes('pages') || !before.includes('payload_migrations')) {
    payload.logger.info('[cleanup] earlier CMS tables not found, nothing to remove')
    return
  }

  for (const table of OLD_TABLES) {
    if (before.includes(table)) {
      await db.execute(sql.raw(`DROP TABLE IF EXISTS "public"."${table}" CASCADE`))
    }
  }

  const after = await publicTables(db)
  payload.logger.info(`[cleanup] public tables after: ${after.join(', ') || '(none)'}`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // The removed tables were unused; nothing to restore.
}
