import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE SCHEMA IF NOT EXISTS "cms";
   CREATE TYPE "cms"."enum_home_record_groups_column" AS ENUM('left', 'right');
  CREATE TABLE "cms"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "cms"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "cms"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "cms"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "cms"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "cms"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."home_highlights_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word" varchar
  );
  
  CREATE TABLE "cms"."home_highlights_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "cms"."home_highlights_affiliations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"url" varchar,
  	"logo_file_id" integer,
  	"logo_path" varchar,
  	"logo_alt" varchar
  );
  
  CREATE TABLE "cms"."home_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "cms"."home_about_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "cms"."home_achievements_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."home_record_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"column" "cms"."enum_home_record_groups_column" DEFAULT 'left',
  	"results" varchar
  );
  
  CREATE TABLE "cms"."home_record_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"document_file_id" integer,
  	"document_path" varchar
  );
  
  CREATE TABLE "cms"."home_journey_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "cms"."home_press_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" varchar,
  	"title" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "cms"."home_gallery_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_file_id" integer,
  	"image_path" varchar,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "cms"."home_featured_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_file_id" integer,
  	"image_path" varchar,
  	"category" varchar,
  	"title" varchar,
  	"text" varchar,
  	"post_url" varchar
  );
  
  CREATE TABLE "cms"."home_contact_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "cms"."home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_file_id" integer,
  	"hero_background_path" varchar,
  	"hero_signature_file_id" integer,
  	"hero_signature_path" varchar,
  	"hero_signature_alt" varchar,
  	"hero_brand_line" varchar,
  	"hero_eyebrow" varchar,
  	"hero_first_name" varchar,
  	"hero_last_name" varchar,
  	"hero_intro" varchar,
  	"hero_primary_button_label" varchar,
  	"hero_primary_button_link" varchar,
  	"hero_secondary_button_label" varchar,
  	"hero_secondary_button_link" varchar,
  	"hero_side_text" varchar,
  	"highlights_affiliations_title" varchar,
  	"highlights_affiliations_note" varchar,
  	"about_photo_file_id" integer,
  	"about_photo_path" varchar,
  	"about_caption" varchar,
  	"about_eyebrow" varchar,
  	"about_heading" varchar,
  	"about_button_label" varchar,
  	"about_button_link" varchar,
  	"achievements_eyebrow" varchar,
  	"achievements_heading" varchar,
  	"achievements_intro" varchar,
  	"record_eyebrow" varchar,
  	"record_heading" varchar,
  	"record_intro" varchar,
  	"record_note" varchar,
  	"journey_eyebrow" varchar,
  	"journey_heading" varchar,
  	"quote_kicker" varchar,
  	"quote_label" varchar,
  	"quote_quote" varchar,
  	"quote_attribution" varchar,
  	"press_eyebrow" varchar,
  	"press_heading" varchar,
  	"press_note" varchar,
  	"sponsor_banner_eyebrow" varchar,
  	"sponsor_banner_heading" varchar,
  	"sponsor_banner_text" varchar,
  	"sponsor_banner_button_label" varchar,
  	"sponsor_banner_button_link" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_heading" varchar,
  	"gallery_intro" varchar,
  	"featured_eyebrow" varchar,
  	"featured_heading" varchar,
  	"featured_intro" varchar,
  	"featured_button_label" varchar,
  	"featured_profile_url" varchar,
  	"featured_note" varchar,
  	"contact_eyebrow" varchar,
  	"contact_heading" varchar,
  	"contact_text" varchar,
  	"contact_button_label" varchar,
  	"contact_email" varchar,
  	"contact_email_subject" varchar,
  	"contact_note" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."sponsorship_hero_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_file_id" integer,
  	"image_path" varchar,
  	"alt" varchar
  );
  
  CREATE TABLE "cms"."sponsorship_numbers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "cms"."sponsorship_partnership_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"points" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."sponsorship_inquiry_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "cms"."sponsorship" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_file_id" integer,
  	"hero_background_path" varchar,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_text" varchar,
  	"hero_button_label" varchar,
  	"hero_logos_note" varchar,
  	"top_back_label" varchar,
  	"top_ribbon_left" varchar,
  	"top_ribbon_right" varchar,
  	"partnership_eyebrow" varchar,
  	"partnership_heading" varchar,
  	"partnership_text" varchar,
  	"partnership_footnote" varchar,
  	"collaborate_eyebrow" varchar,
  	"collaborate_heading" varchar,
  	"collaborate_text" varchar,
  	"inquiry_eyebrow" varchar,
  	"inquiry_heading" varchar,
  	"inquiry_text" varchar,
  	"inquiry_recipient_email" varchar,
  	"inquiry_message_placeholder" varchar,
  	"inquiry_button_label" varchar,
  	"footer_text" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."site_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_logo_file_id" integer,
  	"header_logo_path" varchar,
  	"header_logo_alt" varchar,
  	"copyright_name" varchar,
  	"footer_tagline" varchar,
  	"brand_credit_text" varchar,
  	"brand_credit_link_label" varchar,
  	"brand_credit_document_file_id" integer,
  	"brand_credit_document_path" varchar,
  	"brand_credit_suffix" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "cms"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "cms"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_highlights_ribbon" ADD CONSTRAINT "home_highlights_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_highlights_stats" ADD CONSTRAINT "home_highlights_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_highlights_affiliations" ADD CONSTRAINT "home_highlights_affiliations_logo_file_id_media_id_fk" FOREIGN KEY ("logo_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_highlights_affiliations" ADD CONSTRAINT "home_highlights_affiliations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_about_paragraphs" ADD CONSTRAINT "home_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_about_details" ADD CONSTRAINT "home_about_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_achievements_cards" ADD CONSTRAINT "home_achievements_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_record_groups" ADD CONSTRAINT "home_record_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_record_documents" ADD CONSTRAINT "home_record_documents_document_file_id_media_id_fk" FOREIGN KEY ("document_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_record_documents" ADD CONSTRAINT "home_record_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_journey_events" ADD CONSTRAINT "home_journey_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_press_items" ADD CONSTRAINT "home_press_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_gallery_photos" ADD CONSTRAINT "home_gallery_photos_image_file_id_media_id_fk" FOREIGN KEY ("image_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_gallery_photos" ADD CONSTRAINT "home_gallery_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_featured_cards" ADD CONSTRAINT "home_featured_cards_image_file_id_media_id_fk" FOREIGN KEY ("image_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_featured_cards" ADD CONSTRAINT "home_featured_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_contact_socials" ADD CONSTRAINT "home_contact_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home" ADD CONSTRAINT "home_hero_background_file_id_media_id_fk" FOREIGN KEY ("hero_background_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home" ADD CONSTRAINT "home_hero_signature_file_id_media_id_fk" FOREIGN KEY ("hero_signature_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home" ADD CONSTRAINT "home_about_photo_file_id_media_id_fk" FOREIGN KEY ("about_photo_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."sponsorship_hero_logos" ADD CONSTRAINT "sponsorship_hero_logos_image_file_id_media_id_fk" FOREIGN KEY ("image_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."sponsorship_hero_logos" ADD CONSTRAINT "sponsorship_hero_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."sponsorship"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."sponsorship_numbers_items" ADD CONSTRAINT "sponsorship_numbers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."sponsorship"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."sponsorship_partnership_tiers" ADD CONSTRAINT "sponsorship_partnership_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."sponsorship"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."sponsorship_inquiry_interests" ADD CONSTRAINT "sponsorship_inquiry_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."sponsorship"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."sponsorship" ADD CONSTRAINT "sponsorship_hero_background_file_id_media_id_fk" FOREIGN KEY ("hero_background_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."site_nav" ADD CONSTRAINT "site_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site" ADD CONSTRAINT "site_header_logo_file_id_media_id_fk" FOREIGN KEY ("header_logo_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."site" ADD CONSTRAINT "site_brand_credit_document_file_id_media_id_fk" FOREIGN KEY ("brand_credit_document_file_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "cms"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "cms"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "cms"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "cms"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "cms"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "cms"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "cms"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "cms"."media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "cms"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "cms"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "cms"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "cms"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "cms"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "cms"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "cms"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "cms"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "cms"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "cms"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "cms"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "cms"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "cms"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "cms"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "cms"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "cms"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_highlights_ribbon_order_idx" ON "cms"."home_highlights_ribbon" USING btree ("_order");
  CREATE INDEX "home_highlights_ribbon_parent_id_idx" ON "cms"."home_highlights_ribbon" USING btree ("_parent_id");
  CREATE INDEX "home_highlights_stats_order_idx" ON "cms"."home_highlights_stats" USING btree ("_order");
  CREATE INDEX "home_highlights_stats_parent_id_idx" ON "cms"."home_highlights_stats" USING btree ("_parent_id");
  CREATE INDEX "home_highlights_affiliations_order_idx" ON "cms"."home_highlights_affiliations" USING btree ("_order");
  CREATE INDEX "home_highlights_affiliations_parent_id_idx" ON "cms"."home_highlights_affiliations" USING btree ("_parent_id");
  CREATE INDEX "home_highlights_affiliations_logo_logo_file_idx" ON "cms"."home_highlights_affiliations" USING btree ("logo_file_id");
  CREATE INDEX "home_about_paragraphs_order_idx" ON "cms"."home_about_paragraphs" USING btree ("_order");
  CREATE INDEX "home_about_paragraphs_parent_id_idx" ON "cms"."home_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "home_about_details_order_idx" ON "cms"."home_about_details" USING btree ("_order");
  CREATE INDEX "home_about_details_parent_id_idx" ON "cms"."home_about_details" USING btree ("_parent_id");
  CREATE INDEX "home_achievements_cards_order_idx" ON "cms"."home_achievements_cards" USING btree ("_order");
  CREATE INDEX "home_achievements_cards_parent_id_idx" ON "cms"."home_achievements_cards" USING btree ("_parent_id");
  CREATE INDEX "home_record_groups_order_idx" ON "cms"."home_record_groups" USING btree ("_order");
  CREATE INDEX "home_record_groups_parent_id_idx" ON "cms"."home_record_groups" USING btree ("_parent_id");
  CREATE INDEX "home_record_documents_order_idx" ON "cms"."home_record_documents" USING btree ("_order");
  CREATE INDEX "home_record_documents_parent_id_idx" ON "cms"."home_record_documents" USING btree ("_parent_id");
  CREATE INDEX "home_record_documents_document_document_file_idx" ON "cms"."home_record_documents" USING btree ("document_file_id");
  CREATE INDEX "home_journey_events_order_idx" ON "cms"."home_journey_events" USING btree ("_order");
  CREATE INDEX "home_journey_events_parent_id_idx" ON "cms"."home_journey_events" USING btree ("_parent_id");
  CREATE INDEX "home_press_items_order_idx" ON "cms"."home_press_items" USING btree ("_order");
  CREATE INDEX "home_press_items_parent_id_idx" ON "cms"."home_press_items" USING btree ("_parent_id");
  CREATE INDEX "home_gallery_photos_order_idx" ON "cms"."home_gallery_photos" USING btree ("_order");
  CREATE INDEX "home_gallery_photos_parent_id_idx" ON "cms"."home_gallery_photos" USING btree ("_parent_id");
  CREATE INDEX "home_gallery_photos_image_image_file_idx" ON "cms"."home_gallery_photos" USING btree ("image_file_id");
  CREATE INDEX "home_featured_cards_order_idx" ON "cms"."home_featured_cards" USING btree ("_order");
  CREATE INDEX "home_featured_cards_parent_id_idx" ON "cms"."home_featured_cards" USING btree ("_parent_id");
  CREATE INDEX "home_featured_cards_image_image_file_idx" ON "cms"."home_featured_cards" USING btree ("image_file_id");
  CREATE INDEX "home_contact_socials_order_idx" ON "cms"."home_contact_socials" USING btree ("_order");
  CREATE INDEX "home_contact_socials_parent_id_idx" ON "cms"."home_contact_socials" USING btree ("_parent_id");
  CREATE INDEX "home_hero_background_hero_background_file_idx" ON "cms"."home" USING btree ("hero_background_file_id");
  CREATE INDEX "home_hero_signature_hero_signature_file_idx" ON "cms"."home" USING btree ("hero_signature_file_id");
  CREATE INDEX "home_about_photo_about_photo_file_idx" ON "cms"."home" USING btree ("about_photo_file_id");
  CREATE INDEX "sponsorship_hero_logos_order_idx" ON "cms"."sponsorship_hero_logos" USING btree ("_order");
  CREATE INDEX "sponsorship_hero_logos_parent_id_idx" ON "cms"."sponsorship_hero_logos" USING btree ("_parent_id");
  CREATE INDEX "sponsorship_hero_logos_image_image_file_idx" ON "cms"."sponsorship_hero_logos" USING btree ("image_file_id");
  CREATE INDEX "sponsorship_numbers_items_order_idx" ON "cms"."sponsorship_numbers_items" USING btree ("_order");
  CREATE INDEX "sponsorship_numbers_items_parent_id_idx" ON "cms"."sponsorship_numbers_items" USING btree ("_parent_id");
  CREATE INDEX "sponsorship_partnership_tiers_order_idx" ON "cms"."sponsorship_partnership_tiers" USING btree ("_order");
  CREATE INDEX "sponsorship_partnership_tiers_parent_id_idx" ON "cms"."sponsorship_partnership_tiers" USING btree ("_parent_id");
  CREATE INDEX "sponsorship_inquiry_interests_order_idx" ON "cms"."sponsorship_inquiry_interests" USING btree ("_order");
  CREATE INDEX "sponsorship_inquiry_interests_parent_id_idx" ON "cms"."sponsorship_inquiry_interests" USING btree ("_parent_id");
  CREATE INDEX "sponsorship_hero_background_hero_background_file_idx" ON "cms"."sponsorship" USING btree ("hero_background_file_id");
  CREATE INDEX "site_nav_order_idx" ON "cms"."site_nav" USING btree ("_order");
  CREATE INDEX "site_nav_parent_id_idx" ON "cms"."site_nav" USING btree ("_parent_id");
  CREATE INDEX "site_header_logo_header_logo_file_idx" ON "cms"."site" USING btree ("header_logo_file_id");
  CREATE INDEX "site_brand_credit_document_brand_credit_document_file_idx" ON "cms"."site" USING btree ("brand_credit_document_file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cms"."users_sessions" CASCADE;
  DROP TABLE "cms"."users" CASCADE;
  DROP TABLE "cms"."media" CASCADE;
  DROP TABLE "cms"."payload_kv" CASCADE;
  DROP TABLE "cms"."payload_locked_documents" CASCADE;
  DROP TABLE "cms"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "cms"."payload_preferences" CASCADE;
  DROP TABLE "cms"."payload_preferences_rels" CASCADE;
  DROP TABLE "cms"."payload_migrations" CASCADE;
  DROP TABLE "cms"."home_highlights_ribbon" CASCADE;
  DROP TABLE "cms"."home_highlights_stats" CASCADE;
  DROP TABLE "cms"."home_highlights_affiliations" CASCADE;
  DROP TABLE "cms"."home_about_paragraphs" CASCADE;
  DROP TABLE "cms"."home_about_details" CASCADE;
  DROP TABLE "cms"."home_achievements_cards" CASCADE;
  DROP TABLE "cms"."home_record_groups" CASCADE;
  DROP TABLE "cms"."home_record_documents" CASCADE;
  DROP TABLE "cms"."home_journey_events" CASCADE;
  DROP TABLE "cms"."home_press_items" CASCADE;
  DROP TABLE "cms"."home_gallery_photos" CASCADE;
  DROP TABLE "cms"."home_featured_cards" CASCADE;
  DROP TABLE "cms"."home_contact_socials" CASCADE;
  DROP TABLE "cms"."home" CASCADE;
  DROP TABLE "cms"."sponsorship_hero_logos" CASCADE;
  DROP TABLE "cms"."sponsorship_numbers_items" CASCADE;
  DROP TABLE "cms"."sponsorship_partnership_tiers" CASCADE;
  DROP TABLE "cms"."sponsorship_inquiry_interests" CASCADE;
  DROP TABLE "cms"."sponsorship" CASCADE;
  DROP TABLE "cms"."site_nav" CASCADE;
  DROP TABLE "cms"."site" CASCADE;
  DROP TYPE "cms"."enum_home_record_groups_column";`)
}
