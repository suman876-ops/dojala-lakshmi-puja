# সার্বজনীন শ্রী শ্রী লক্ষ্মীপূজা — Dojala Lakshmi Puja

**দোজলা — ঝাড়গ্রাম, পশ্চিমবঙ্গ**

লাইভ সাইট: **https://suman876-ops.github.io/dojala-lakshmi-puja/**

---

## ফাইল কাঠামো

```
index.html                 মূল পাতা
data.json                  অ্যাডমিনের সংরক্ষিত কনটেন্ট (প্রথমে খালি {})
assets/
  css/style.css            পুরো ডিজাইন (থ্রিডি, অ্যানিমেশন, রেসপন্সিভ)
  js/data.js               ডিফল্ট কনটেন্ট (ছবি, ঘোষণা, গান)
  js/app.js                গ্যালারি, গান, লাইভ ঘড়ি, অ্যাডমিন — সব লজিক
  img/p1..p15.webp         ১৫টি পূজার ছবি
  audio/song.mp3           পূজার গান — শঙ্খ বাজিয়ে মাকে
  favicon.svg              আইকন
  floral.svg               সাদা অংশের ফুলের ওয়াটারমার্ক
robots.txt, sitemap.xml    Google-এর জন্য
```

---

## অ্যাডমিন প্যানেল

ডান-উপরের ছোট **তালা আইকনে** ক্লিক করুন। **শুধু পাসওয়ার্ড** দিয়ে লগইন। পাসওয়ার্ডটি কোনো ফাইলে লেখা নেই — এটি Supabase ড্যাশবোর্ডে সেট করা আছে।
(Supabase Auth দিয়ে যাচাই হয়। পাসওয়ার্ড বদলাতে: Supabase ড্যাশবোর্ড → Authentication → Users।)

ছবি আপলোড এখন ৩টি ধাপে — ১) ছবিটি কোথায় যাবে বাছুন, ২) ক্যাপশন (ঐচ্ছিক),
৩) ছবি বেছে নিন, তারপর **“ছবি আপলোড করুন”** চাপলেই আপলোড শুরু হয়।

- **ছবি** — গ্যালারি ও বছরভিত্তিক গ্যালারিতে ছবি যোগ/মুছে ফেলা
- **ঘোষণা** — নোটিশ যোগ/মুছে ফেলা
- **শুভেচ্ছা** — দর্শকদের বার্তা ও ছবি দেখা/মুছে ফেলা
- **সেটিংস** — পূজার তারিখ, পাসওয়ার্ড

### সবাই যাতে পরিবর্তন দেখে

✅ সাইটটি Supabase-এর সাথে যুক্ত, তাই অ্যাডমিনের করা যেকোনো পরিবর্তন (ছবি, ঘোষণা,
শুভেচ্ছা) সাথে সাথে সবার কাছে দেখা যায় — আলাদা করে কিছু আপলোড করতে হয় না।

> (পুরোনো লোকাল মোডে থাকলে `data.json` আপলোড করার দরকার ছিল — এখন আর নেই।)

---

## Supabase ব্যাকএন্ড (ছবি আপলোড সবার জন্য)

> ✅ **এই সাইটটি ইতিমধ্যেই একটি Supabase প্রজেক্টের সাথে যুক্ত করা হয়েছে**
> (প্রজেক্ট: `dojala-lakshmi-puja`, region Mumbai)। ডেটাবেসে ১৫টি ছবি বসানো আছে,
> অ্যাডমিন লগইনও তৈরি। নিচের ধাপগুলো কেবল নতুন প্রজেক্টে করতে হয়।

সাইটটি এখন **Supabase**-এর সাথে যুক্ত করার ব্যবস্থাসহ তৈরি। এটা চালু করলে
অ্যাডমিনের আপলোড করা ছবি, ঘোষণা, শুভেচ্ছা বার্তা ও দর্শকের ছবি সবার কাছে
দেখা যাবে — আর শুধু নিজের ব্রাউজারে আটকে থাকবে না।

### ধাপ ১ — Supabase প্রজেক্ট ও API key
1. supabase.com-এ ফ্রি অ্যাকাউন্ট খুলে নতুন একটি প্রজেক্ট তৈরি করুন।
2. **Project Settings → API** থেকে **Project URL** ও **anon public key** কপি করুন।
3. `assets/supabase-config.js` ফাইলে বসান:

```js
window.SUPABASE_CONFIG = {
  url: "https://xxxxxxx.supabase.co",
  anonKey: "eyJhbGciOi....",   // anon public key (সবার দেখার জন্য নিরাপদ)
  bucket: "photos"
};
```

খালি রাখলে সাইট আগের মতোই লোকাল মোডে চলবে — কিছুই ভাঙবে না।

### ধাপ ২ — Storage bucket
Supabase → **Storage → New bucket** → নাম `photos`, **Public bucket** টিক দিয়ে তৈরি করুন।

### ধাপ ৩ — টেবিল ও নিয়ম (SQL Editor-এ চালান)

```sql
-- Storage bucket (Dashboard থেকে বানালে এটা লাগবে না)
insert into storage.buckets (id, name, public) values ('photos','photos', true) on conflict (id) do nothing;

-- টেবিল
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  url text not null, caption text default '', tag text default '', tag_type text default 'live',
  category text default 'puja', year int, sort bigint default 0, created_at timestamptz default now()
);
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(), text text not null, date text default '', created_at timestamptz default now()
);
create table if not exists public.greetings (
  id uuid primary key default gen_random_uuid(), name text, msg text, created_at timestamptz default now()
);
create table if not exists public.visitor_photos (
  id uuid primary key default gen_random_uuid(), name text, url text, created_at timestamptz default now()
);

-- Row Level Security
alter table public.photos enable row level security;
alter table public.announcements enable row level security;
alter table public.greetings enable row level security;
alter table public.visitor_photos enable row level security;

create policy "read_photos"  on public.photos for select using (true);
create policy "write_photos" on public.photos for all to authenticated using (true) with check (true);

create policy "read_ann"  on public.announcements for select using (true);
create policy "write_ann" on public.announcements for all to authenticated using (true) with check (true);

create policy "read_greet" on public.greetings for select using (true);
create policy "ins_greet"  on public.greetings for insert to anon with check (true);
create policy "del_greet"  on public.greetings for delete to authenticated using (true);

create policy "read_visitor" on public.visitor_photos for select using (true);
create policy "ins_visitor"  on public.visitor_photos for insert to anon with check (true);
create policy "del_visitor"  on public.visitor_photos for delete to authenticated using (true);

-- Storage নিয়ম
create policy "read_photos_bucket" on storage.objects for select using (bucket_id = 'photos');
create policy "auth_upload_bucket" on storage.objects for insert to authenticated with check (bucket_id = 'photos');
create policy "anon_upload_bucket" on storage.objects for insert to anon with check (bucket_id = 'photos');
```

### ধাপ ৪ — অ্যাডমিন ইউজার
**Authentication → Users → Add user** → একটি ইমেইল ও পাসওয়ার্ড দিন। অ্যাডমিন লগইনে শুধু পাসওয়ার্ড দিলেই হয় (ইমেইলটি `assets/js/app.js`-এর `ADMIN_EMAIL`-এ বসানো আছে)।

### ধাপ ৫ — চালু করুন
`assets/supabase-config.js`-এ URL ও key বসিয়ে সাইট হোস্টিংয়ে আপলোড করুন। এরপর অ্যাডমিন প্যানেল থেকে ছবি দিলে, ঘোষণা দিলে, বা কেউ শুভেচ্ছা/ছবি পাঠালে — সব Supabase-এ যাবে ও সবার কাছে দেখা যাবে।

---

## গুগলে সার্চ করানোর জন্য

1. Search Console (search.google.com/search-console) এ সাইটটি যোগ করুন।
2. `sitemap.xml` জমা দিন।
3. সাইটে ইতিমধ্যেই টাইটেল, description, Open Graph, structured data আছে।

---

## নিরাপত্তা (Security)

এই সাইটে নেওয়া নিরাপত্তা ব্যবস্থা:

- **অ্যাডমিন লগইন** Supabase Auth দিয়ে যাচাই হয়; পাসওয়ার্ড কোডে রাখা নেই।
- **Row Level Security** সব টেবিলে চালু। পড়া সবার জন্য, কিন্তু **লেখা/মোছা শুধু
  অ্যাডমিন অ্যাকাউন্টের** (auth.uid() দিয়ে বাঁধা) — কেউ নতুন অ্যাকাউন্ট খুললেও
  ছবি/ঘোষণা বদলাতে পারবে না।
- **দর্শকের আপলোড** আলাদা `visitor` bucket-এ — শুধু ছবি (JPG/PNG/WEBP) ও ৫ MB
  সীমা। অ্যাডমিনের `photos` bucket-এ বাইরে থেকে কেউ লিখতে পারে না।
- **দৈর্ঘ্য সীমা** — ঘোষণা ৫০০, শুভেচ্ছা ৬০০, নাম ৮০, ক্যাপশন ১৪০ অক্ষর।
- **XSS সুরক্ষা** — দর্শকের লেখা/নাম সব `esc()` দিয়ে নিরাপদে দেখানো হয়।
- **Content-Security-Policy** যোগ করা — অননুমোদিত স্ক্রিপ্ট/সোর্স ব্লক।
- সব ট্রাফিক **HTTPS**-এ।

### ড্যাশবোর্ডে করে নিন (আমি MCP দিয়ে করতে পারি না)
1. **Authentication → Passwords → Leaked password protection চালু করুন।**
2. অ্যাডমিন পাসওয়ার্ড আরও শক্ত করে নিন (১২+ অক্ষর, অক্ষর + সংখ্যা + চিহ্ন)।

> নতুন ইউজার **সাইন-আপ ডেটাবেস লেভেলে বন্ধ** করা আছে (`auth.users`-এ ট্রিগার) —
> অ্যাডমিন ইমেইল ছাড়া কেউ নতুন অ্যাকাউন্ট বানাতে পারবে না।

---

## কৃতজ্ঞতা

- ফেসবুক — লক্ষ্মীপূজা পেজ (Subhankar Patra) · Dojala পেজ (Joydweep Das)
- **Designed & Deployed by Suman Mahata** — https://suman876-ops.github.io/suman-portfolio/
