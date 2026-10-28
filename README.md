# Dojala Lakshmi Puja

A community site for the Dojala Lakshmi Puja — photo gallery, announcements, visitor greetings and a small admin panel, backed by Supabase.

**Live:** https://suman876-ops.github.io/dojala-lakshmi-puja/

## Overview

The site serves two audiences. Visitors browse the gallery, read announcements, leave a greeting and upload a photo from the festival. An admin signs in to manage photos, notices, greetings and the puja countdown.

Content lives in Supabase, so changes appear for everyone immediately — no file uploads or redeploys.

## Structure

```
index.html                  the whole front end
assets/supabase-config.js   project URL, anon key and bucket names
assets/js/supabase.js       data access — photos, announcements, greetings, visitors
assets/js/app.js            UI and admin logic
assets/js/data.js           default content
data.json                   offline fallback content
```

## Backend

Supabase for Postgres, Storage and Auth. Row Level Security is enabled on every table: reads are public, while all writes to `photos`, `announcements` and `site_stats` are restricted to the admin user. `greetings` and `visitor_photos` accept anonymous inserts so visitors can contribute.

Two storage buckets: `photos` for admin uploads and `visitor` for visitor submissions.

## Admin

Click the lock icon at the top right and sign in with the admin password. Authentication runs through Supabase Auth, and the account is managed in the Supabase dashboard under **Authentication → Users**. No credentials are stored in this repository.

## Run locally

Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

With Supabase configured the site reads live data; with the config blank it falls back to `data.json` and browser storage.

## Author

Suman Mahata

## License

MIT
