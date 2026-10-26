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
    p8:  { src: "assets/img/p8.webp",  caption: "মণ্ডপ সাজে মা লক্ষ্মী",   tag: "পুরনো স্মৃতি", tagType: "live" },
    p9:  { src: "assets/img/p9.webp",  caption: "রাতের ভোগ বিতরণ",          tag: "পুরনো স্মৃতি", tagType: "live" },
    p10: { src: "assets/img/p10.webp", caption: "মণ্ডপে ছোট্ট ভক্তেরা",      tag: "পুরনো স্মৃতি", tagType: "live" },
    p11: { src: "assets/img/p11.webp", caption: "গ্রামের মানুষের ভিড়",        tag: "পুরনো স্মৃতি", tagType: "live" },
    p12: { src: "assets/img/p12.webp", caption: "ভোগের রান্নার আয়োজন",     tag: "পুরনো স্মৃতি", tagType: "live" },
    p13: { src: "assets/img/p13.webp", caption: "আলোয় ছোট্ট মুখগুলো",       tag: "পুরনো স্মৃতি", tagType: "live" },
    p14: { src: "assets/img/p14.webp", caption: "মণ্ডপে রান্নার তৎপরতা",    tag: "পুরনো স্মৃতি", tagType: "live" },
    p15: { src: "assets/img/p15.webp", caption: "পূর্ণিমার রাতে মা লক্ষ্মী", tag: "পুরনো স্মৃতি", tagType: "live" },
    p16: { src: "assets/img/p16.webp", caption: "", tag: "পুরনো স্মৃতি", tagType: "live" },
    p17: { src: "assets/img/p17.webp", caption: "মায়ের পাশে ভক্ত", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p18: { src: "assets/img/p18.webp", caption: "উৎসবে গ্রামের মানুষ", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p19: { src: "assets/img/p19.webp", caption: "মঞ্চে গ্রামের ছেলেরা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p20: { src: "assets/img/p20.webp", caption: "ভোগ বিতরণ", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p21: { src: "assets/img/p21.webp", caption: "মণ্ডপে ছোট্ট ভক্তেরা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p22: { src: "assets/img/p22.webp", caption: "মায়ের মুখশ্রী", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p23: { src: "assets/img/p23.webp", caption: "সাংস্কৃতিক সন্ধ্যা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p24: { src: "assets/img/p24.webp", caption: "মণ্ডপ ও মঞ্চ", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p25: { src: "assets/img/p25.webp", caption: "মণ্ডপে পূজা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p26: { src: "assets/img/p26.webp", caption: "আরাধনার মুহূর্ত", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p27: { src: "assets/img/p27.webp", caption: "শোভাযাত্রায় মা লক্ষ্মী", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p28: { src: "assets/img/p28.webp", caption: "প্রতিমা নিয়ে শোভাযাত্রা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p29: { src: "assets/img/p29.webp", caption: "মা লক্ষ্মীর প্রতিমা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p30: { src: "assets/img/p30.webp", caption: "নাচে-গানে উৎসব", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p31: { src: "assets/img/p31.webp", caption: "ভক্তের প্রণাম", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p32: { src: "assets/img/p32.webp", caption: "উৎসবে তরুণেরা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p33: { src: "assets/img/p33.webp", caption: "গ্রামের ছেলেদের আড্ডা", tag: "পুরনো স্মৃতি", tagType: "arch" },
    p34: { src: "assets/img/p34.webp", caption: "মায়ের পাশে ভক্ত", tag: "এই বছর", tagType: "live" },
    p35: { src: "assets/img/p35.webp", caption: "নদী থেকে ঘট আনা", tag: "এই বছর", tagType: "live" },
    p36: { src: "assets/img/p36.webp", caption: "ঘট নিয়ে গ্রামের ছেলেরা", tag: "এই বছর", tagType: "live" },
    p37: { src: "assets/img/p37.webp", caption: "রাতে ভোগ বিতরণ", tag: "এই বছর", tagType: "live" },
    p38: { src: "assets/img/p38.webp", caption: "ঘট নিয়ে নদীতে", tag: "এই বছর", tagType: "live" },
    p39: { src: "assets/img/p39.webp", caption: "মণ্ডপে প্রণাম", tag: "এই বছর", tagType: "live" },
    p40: { src: "assets/img/p40.webp", caption: "সকলে মিলে ভোগ", tag: "এই বছর", tagType: "live" },
    p41: { src: "assets/img/p41.webp", caption: "মণ্ডপে সেবাদার", tag: "এই বছর", tagType: "live" },
    p42: { src: "assets/img/p42.webp", caption: "বটতলায় ঘট নিয়ে", tag: "এই বছর", tagType: "live" },
    p43: { src: "assets/img/p43.webp", caption: "ঘট নিয়ে শোভাযাত্রা", tag: "এই বছর", tagType: "live" },
    p44: { src: "assets/img/p44.webp", caption: "অর্ঘ্য সাজানো", tag: "এই বছর", tagType: "live" },
    p45: { src: "assets/img/p45.webp", caption: "মণ্ডপে দুই ভক্ত", tag: "এই বছর", tagType: "live" },
    p46: { src: "assets/img/p46.webp", caption: "রাতে সারি সারি ভোগ", tag: "এই বছর", tagType: "live" },
    p47: { src: "assets/img/p47.webp", caption: "মণ্ডপে এক ভক্তা", tag: "এই বছর", tagType: "live" },
    p48: { src: "assets/img/p48.webp", caption: "ঘট হাতে দুই ভাই", tag: "এই বছর", tagType: "live" },
    p49: { src: "assets/img/p49.webp", caption: "মণ্ডপে বসে আরাধনা", tag: "এই বছর", tagType: "live" },
    p50: { src: "assets/img/p50.webp", caption: "ঘট নিয়ে বন পথে", tag: "এই বছর", tagType: "live" },
    p51: { src: "assets/img/p51.webp", caption: "মায়ের সামনে ভক্ত", tag: "এই বছর", tagType: "live" },
    p52: { src: "assets/img/p52.webp", caption: "ভোগের পাতে", tag: "এই বছর", tagType: "live" },
    p53: { src: "assets/img/p53.webp", caption: "ভোগ পরিবেশন", tag: "এই বছর", tagType: "live" },
    p54: { src: "assets/img/p54.webp", caption: "মণ্ডপে মা লক্ষ্মী", tag: "এই বছর", tagType: "live" }
  },

  gallery: {
    puja:      ["p34", "p35", "p36", "p37", "p38", "p39", "p40", "p41", "p42", "p43", "p44", "p45", "p46", "p47", "p48", "p49", "p50", "p51", "p52", "p53", "p54", "p1", "p2", "p3", "p4", "p5", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19", "p20", "p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "p29", "p30", "p31", "p32", "p33"],
    committee: ["p6", "p7"]
  },

  years: {
    "2026": ["p34", "p35", "p36", "p37", "p38", "p39", "p40", "p41", "p42", "p43", "p44", "p45", "p46", "p47", "p48", "p49", "p50", "p51", "p52", "p53", "p54"],
    "2025": ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19", "p20", "p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "p29", "p30", "p31", "p32", "p33"],
    "2024": [], "2023": [], "2022": [], "2021": [], "2020": []
  },

  greetings: [],

  visitorPhotos: [],

  song: {
    title: "শঙ্খ বাজিয়ে মাকে",
    artist: "সন্ধ্যা মুখোপাধ্যায়",
    src: "assets/audio/puja-song.mp3"
  },

  facebook: {
    puja: { name: "লক্ষ্মীপূজা — অফিসিয়াল পেজ", by: "পরিচালনায়: Subhankar Patra", url: "https://www.facebook.com/share/1Dez2XbSWe/" },
    dojala: { name: "Dojala — অফিসিয়াল পেজ", by: "পরিচালনায়: Joydweep Das", url: "https://www.facebook.com/share/1DTpnr5XSQ/" }
  }
};
