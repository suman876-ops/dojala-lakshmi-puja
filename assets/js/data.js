/* ==========================================================================
   data.js — ডিফল্ট কনটেন্ট (ডিফল্ট content)
   অ্যাডমিন প্যানেল থেকে করা পরিবর্তন data.json-এ সংরক্ষিত হয়।
   ========================================================================== */
window.SITE_DEFAULT = {
  version: 1,
  adminPassword: "dojala2026",
  countdownTarget: "2027-10-14T18:00:00+05:30",

  announcements: [
    { text: "কোজাগরী পূর্ণিমায় সন্ধ্যা ৬টা থেকে মণ্ডপে মা লক্ষ্মীর আরাধনা শুরু। সবাইকে আসার অনুরোধ।", date: "আজ" },
    { text: "প্রতিমা গড়ার কাজ শুরু হয়েছে — কমিটির সদস্যরা সময় দিলে ভালো হয়।", date: "এই সপ্তাহে" },
    { text: "নতুন ছবি যুক্ত হয়েছে গ্যালারিতে — সবাই দেখে নিন। Click by: Joydweep Das", date: "সাম্প্রতিক" }
  ],

  photos: {
    p1: { src: "assets/img/p1.webp", caption: "মণ্ডপে মা লক্ষ্মী",        credit: "Click by — Joydweep Das" },
    p2: { src: "assets/img/p2.webp", caption: "রাতের আরাধনা ও প্রতিমা",   credit: "Click by — Joydweep Das" },
    p3: { src: "assets/img/p3.webp", caption: "শোভাযাত্রায় মা লক্ষ্মী",   credit: "Click by — Joydweep Das" },
    p4: { src: "assets/img/p4.webp", caption: "পুরোহিতের পূজা",          credit: "Click by — Joydweep Das" },
    p5: { src: "assets/img/p5.webp", caption: "ভক্তের প্রণাম",            credit: "Click by — Joydweep Das" },
    p6: { src: "assets/img/p6.webp", caption: "কমিটির সদস্যবৃন্দ",        credit: "Click by — Joydweep Das" },
    p7: { src: "assets/img/p7.webp", caption: "পূজার আগে কমিটি",          credit: "Click by — Joydweep Das" }
  },

  gallery: {
    puja:      ["p1", "p2", "p3", "p4", "p5"],
    committee: ["p6", "p7"]
  },

  years: {
    "2025": ["p1", "p2", "p3", "p4", "p5", "p6", "p7"],
    "2024": [], "2023": [], "2022": [], "2021": [], "2020": []
  },

  greetings: [
    { name: "দোজলা লক্ষ্মীপূজা কমিটি", msg: "মা লক্ষ্মী সবার ঘরে সুখ, শান্তি ও সমৃদ্ধি আনুন। সবাইকে শুভেচ্ছা।", date: "আজ" },
    { name: "শুভানুধ্যায়ী", msg: "কোজাগরী পূর্ণিমার আন্তরিক শুভেচ্ছা ও মা লক্ষ্মীর আশীর্বাদ কামনা করি।", date: "আজ" }
  ],

  visitorPhotos: [],

  song: {
    title: "শঙ্খ বাজিয়ে মাকে",
    artist: "সন্ধ্যা মুখোপাধ্যায়",
    src: "assets/audio/song.mp3"
  },

  facebook: {
    puja: { name: "লক্ষ্মীপূজা — অফিসিয়াল পেজ", by: "পরিচালনায়: Subhankar Patra", url: "https://www.facebook.com/share/1Dez2XbSWe/" },
    dojala: { name: "Dojala — অফিসিয়াল পেজ", by: "পরিচালনায়: Joydweep Das", url: "https://www.facebook.com/share/1DTpnr5XSQ/" }
  }
};
