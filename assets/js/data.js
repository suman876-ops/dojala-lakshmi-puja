/* ==========================================================================
   data.js — ডিফল্ট কনটেন্ট (ডিফল্ট content)
   অ্যাডমিন প্যানেল থেকে করা পরিবর্তন data.json-এ সংরক্ষিত হয়।
   ========================================================================== */
window.SITE_DEFAULT = {
  version: 4,
  adminPassword: "",
  countdownTarget: "",

  announcements: [],

  photos: {
    p1:  { src: "assets/img/p1.webp",  caption: "মণ্ডপে মা লক্ষ্মী",        tag: "পুরনো স্মৃতি", tagType: "arch" },
    p2:  { src: "assets/img/p2.webp",  caption: "রাতের আরাধনা ও প্রতিমা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p3:  { src: "assets/img/p3.webp",  caption: "শোভাযাত্রায় মা লক্ষ্মী", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p4:  { src: "assets/img/p4.webp",  caption: "পুরোহিতের পূজা",          tag: "পুরনো স্মৃতি", tagType: "arch" },
    p5:  { src: "assets/img/p5.webp",  caption: "ভক্তের প্রণাম",            tag: "পুরনো স্মৃতি", tagType: "arch" },
    p6:  { src: "assets/img/p6.webp",  caption: "কমিটির সদস্যবৃন্দ",        tag: "পুরনো স্মৃতি", tagType: "arch" },
    p7:  { src: "assets/img/p7.webp",  caption: "পূজার আগে কমিটি",          tag: "পুরনো স্মৃতি", tagType: "arch" },
    p8:  { src: "assets/img/p8.webp",  caption: "মণ্ডপ সাজে মা লক্ষ্মী",   tag: "এই বছর", tagType: "live" },
    p9:  { src: "assets/img/p9.webp",  caption: "রাতের ভোগ বিতরণ",          tag: "এই বছর", tagType: "live" },
    p10: { src: "assets/img/p10.webp", caption: "মণ্ডপে ছোট্ট ভক্তেরা",      tag: "এই বছর", tagType: "live" },
    p11: { src: "assets/img/p11.webp", caption: "গ্রামের মানুষের ভিড়",        tag: "এই বছর", tagType: "live" },
    p12: { src: "assets/img/p12.webp", caption: "ভোগের রান্নার আয়োজন",     tag: "এই বছর", tagType: "live" },
    p13: { src: "assets/img/p13.webp", caption: "আলোয় ছোট্ট মুখগুলো",       tag: "এই বছর", tagType: "live" },
    p14: { src: "assets/img/p14.webp", caption: "মণ্ডপে রান্নার তৎপরতা",    tag: "এই বছর", tagType: "live" },
    p15: { src: "assets/img/p15.webp", caption: "পূর্ণিমার রাতে মা লক্ষ্মী", tag: "এই বছর", tagType: "live" },
    p16: { src: "assets/img/p16.webp", caption: "", tag: "এই বছর", tagType: "live" }
  },

  gallery: {
    puja:      ["p1", "p2", "p3", "p4", "p5", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16"],
    committee: ["p6", "p7"]
  },

  years: {
    "2025": ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16"],
    "2024": [], "2023": [], "2022": [], "2021": [], "2020": []
  },

  greetings: [],

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
