# Othman Boularas — athlete website + CMS

The public site (`/` and `/sponsorship`) is built from a Payload CMS, so every
section can be edited at **`/admin`** without touching code.

## Editing the website

1. Go to `https://<your-site>/admin` and log in.
2. Under **Website** you'll find:
   - **Home page**: hero, highlights & logos, about, achievements, complete record,
     journey, quote, media, sponsor banner, gallery, featured moments, contact, search & sharing
   - **Sponsorship page**: top of page, header & ribbon, numbers, packages,
     ways to collaborate, enquiry form, footer & search
   - **Header & footer**: logo, menu links, footer text, brand credit
   - **Images & files**: upload photos, logos and PDFs
3. Click **Save**. The live site updates within a few seconds.

Tips:
- In headings, press Enter to break onto a new line.
- In About paragraphs, wrap words in `**double asterisks**` to make them bold.
- To change a photo, pick or upload a new one in the **New image** box. The
  original built-in photo is used until you do.
- Lists (achievements, gallery photos, timeline…) can be reordered by dragging.

## How it's built

- **Next.js 16** + **Payload CMS 3**, hosted on **Vercel**
- **Postgres** (Neon, via Vercel) for content, stored in its own `cms` schema
- **Vercel Blob** for uploaded images and files
- Original photos/logos/PDFs live in `public/assets/`
- Page styles are copied unchanged from the original HTML site (`src/content/styles.ts`)
- The original text is in `src/content/defaults.ts`. It was loaded into the CMS by the
  `seed_content` migration and is also a fallback if the database can't be reached.

### Environment variables (set in Vercel)

| Name | What it is |
| --- | --- |
| `POSTGRES_URL` | Database connection (set by the Neon integration) |
| `PAYLOAD_SECRET` | Random secret used to sign logins |
| `BLOB_READ_WRITE_TOKEN` | Image storage (set by the Vercel Blob store) |

### Deploying

Every push to `main` deploys automatically. The build runs `payload migrate`
first, so database changes are applied before the site is built.

### Changing the CMS fields (developers)

```bash
npm install
cp .env.example .env   # fill in values
npm run dev            # site on :3000, admin on :3000/admin
# after editing src/globals or src/collections:
npm run migrate:create -- my_change_name
npm run generate:importmap
```

Commit the new file in `src/migrations/`.
