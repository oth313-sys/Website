import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "cms"."instagram" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"status" varchar,
  	"access_token" varchar,
  	"post_count" numeric DEFAULT 6,
  	"token_renewed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "cms"."home" ADD COLUMN "featured_live_intro" varchar;
  ALTER TABLE "cms"."home" ADD COLUMN "featured_live_note" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cms"."instagram" CASCADE;
  ALTER TABLE "cms"."home" DROP COLUMN "featured_live_intro";
  ALTER TABLE "cms"."home" DROP COLUMN "featured_live_note";`)
}
