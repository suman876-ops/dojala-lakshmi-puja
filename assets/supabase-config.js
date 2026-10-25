/* ==========================================================================
   supabase-config.js  ·  Supabase সংযোগের সেটিংস
   --------------------------------------------------------------------------
   ✅ এই সাইটটি একটি Supabase প্রজেক্টের সাথে যুক্ত।
      Project: dojala-lakshmi-puja  (region: Mumbai / ap-south-1)

   url     = Project URL
   anonKey = anon public key  (এটি সবার দেখার জন্য নিরাপদ key — RLS দিয়ে সুরক্ষিত)

   খালি করলে সাইট লোকাল মোডে চলবে।
   ========================================================================== */
window.SUPABASE_CONFIG = {
  url: "https://ukwcmptmhpvysfnkdqhv.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrd2NtcHRtaHB2eXNmbmtkcWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MDQ0NzAsImV4cCI6MjEwODQ4MDQ3MH0.BMI2m4tQv2qaA_adbt3h0cfjx-J15Aw4H3gPrZNPKIs",
  bucket: "photos",         // অ্যাডমিনের ছবি (শুধু অ্যাডমিন আপলোড করতে পারে)
  visitorBucket: "visitor"  // দর্শকের ছবি (সবার জন্য, তবে সীমাবদ্ধ)
};
