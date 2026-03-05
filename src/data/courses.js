export const courses = [
  {
    id: 'ingliz-tili',
    slug: 'ingliz-tili',
    name: "Ingliz tili",
    shortDesc: "Umumiy kurslar, intensiv format va IELTS tayyorlov — har qadamda monitoring.",
    icon: "globe",
    accent: "orange",
    chips: ["Umumiy", "Intensiv", "IELTS"],
    price: "360 000 – 560 000",
    priceLabel: "so'm/oy",
    fullDesc: `Ingliz tili bo'yicha A School'da uchta asosiy format mavjud: umumiy kurs, intensiv va IELTS tayyorlov. Har bir format individual yondashuv bilan olib boriladi.`,
    details: [
      {
        title: "Umumiy kurs",
        desc: "Hafta 3 kun, 12 soat/oy. Grammatika, so'zlashuv, lug'at boyitish. Barcha bosqichlar uchun (A1–C1). Narx: 360 000 so'm/oy.",
        icon: "book"
      },
      {
        title: "Intensiv kurs",
        desc: "Tezlashtirilgan format. Qisqa vaqtda ko'proq material. Amaliy mashg'ulotlar ustuvor. Narx: 560 000 so'm/oy.",
        icon: "zap"
      },
      {
        title: "IELTS tayyorlov",
        desc: "Xalqaro sertifikat uchun chuqur tayyorlov. Reading, Writing, Listening, Speaking — to'liq coverage. Narx: 530 000 so'm/oy.",
        icon: "award"
      }
    ],
    features: ["Individual monitoring", "Mock testlar", "Xalqaro materiallar", "Native-style mashqlar"],
    teachers: "Tajribali, sertifikatlangan o'qituvchilar. Har biri o'z sohasida 3+ yil tajribaga ega.",
    schedule: "Hafta 3 kun — Du/Cho/Ju yoki Se/Pa/Sha. Vaqt: 09:00 dan 20:00 gacha oraliq.",
    color: "#F46B1E"
  },
  {
    id: 'rus-tili',
    slug: 'rus-tili',
    name: "Rus tili",
    shortDesc: "Kommunikativ yondashuv va amaliy mashg'ulotlar — kundalik hayot va ish uchun.",
    icon: "flag",
    accent: "orange",
    chips: ["Standart", "12 soat/oy"],
    price: "360 000",
    priceLabel: "so'm/oy",
    fullDesc: `Rus tili kursi kommunikativ metodologiya asosida qurilgan. So'zlashuvga, tinglab tushunishga va yozishga alohida e'tibor beriladi.`,
    details: [
      {
        title: "Standart kurs",
        desc: "Hafta 3 kun, 12 soat/oy. A1 dan B2 gacha bosqichma-bosqich. Kundalik hayot va ish muloqoti uchun.",
        icon: "book"
      }
    ],
    features: ["So'zlashuv mashqlari", "Audio va video materiallar", "Grammatika testi", "Progress monitoring"],
    teachers: "Rus tili filologi va amaliy tajribaga ega mutaxassislar.",
    schedule: "Hafta 3 kun. Ertalab yoki kechki guruhlar.",
    color: "#F46B1E"
  },
  {
    id: 'koreys-tili',
    slug: 'koreys-tili',
    name: "Koreys tili",
    shortDesc: "Oddiy kurs va TOPIK imtihoniga chuqur tayyorlov. K-madaniyat orqali o'rganish.",
    icon: "flag2",
    accent: "purple",
    chips: ["Standart", "TOPIK"],
    price: "360 000 – 400 000",
    priceLabel: "so'm/oy",
    fullDesc: `Koreys tili — dunyodagi eng tez rivojlanayotgan tillardan biri. A School'da standart va TOPIK tayyorlov kurslari mavjud.`,
    details: [
      {
        title: "Standart kurs",
        desc: "Hangul alifbosidan boshlab, so'zlashuv va yozish. K-drama va K-pop orqali qiziqarli o'rganish. Narx: 360 000 so'm/oy.",
        icon: "book"
      },
      {
        title: "TOPIK tayyorlov",
        desc: "Xalqaro TOPIK imtihoni uchun maxsus dastur. Koreyaga o'qish/ishlash uchun zarur sertifikat. Narx: 400 000 so'm/oy.",
        icon: "award"
      }
    ],
    features: ["Hangul alifbosi", "K-madaniyat integratsiya", "TOPIK mock testlar", "Native materiallar"],
    teachers: "Koreys tili bo'yicha ixtisoslashgan o'qituvchilar. TOPIK sertifikatiga ega.",
    schedule: "Hafta 3 kun. Turli vaqt oraliqlarida guruhlar.",
    color: "#7C3AED"
  },
  {
    id: 'it-dasturlash',
    slug: 'it-dasturlash',
    name: "IT / Dasturlash",
    shortDesc: "Boshlang'ich va o'rta daraja — real loyihalar, amaliy kodlash.",
    icon: "code",
    accent: "orange",
    chips: ["Boshlang'ich", "O'rta daraja"],
    price: "480 000",
    priceLabel: "so'm/oy",
    fullDesc: `IT kursi zamonaviy dasturlash texnologiyalarini o'rgatadi. Nazariya emas — real loyihalar orqali o'rganish metodologiyasi qo'llaniladi.`,
    details: [
      {
        title: "Boshlang'ich daraja",
        desc: "HTML, CSS, JavaScript asoslari. Komputerga kirish va algoritmik fikrlash. Birinchi loyihani yaratish.",
        icon: "code"
      },
      {
        title: "O'rta daraja",
        desc: "React, Node.js, ma'lumotlar bazasi. Amaliy loyihalar bilan ishlash. Portfolio yaratish.",
        icon: "layers"
      }
    ],
    features: ["Real loyihalar", "Portfolio yaratish", "Zamonaviy texnologiyalar", "Amaliy kodlash"],
    teachers: "Ishlaydigan dasturchilar va soha mutaxassislari. Sanoat tajribasi bor o'qituvchilar.",
    schedule: "Hafta 3–4 kun. Guruh hajmi kichik (8–12 kishi).",
    color: "#F46B1E"
  },
  {
    id: 'media',
    slug: 'media',
    name: "Media yo'nalishi",
    shortDesc: "Mobilografiya, kontent, video ishlov. Yaqinda: SMM, target, blogging — full paket.",
    icon: "video",
    accent: "purple",
    chips: ["Kontent", "Video", "SMM breve"],
    price: null,
    priceLabel: "Narx shakllanmoqda",
    fullDesc: `Media yo'nalishi — A School'ning eng istiqbolli kurslaridan biri. Zamonaviy kontent yaratish va digital marketing to'liq o'rgatiladi.`,
    details: [
      {
        title: "Mobilografiya va Kontent",
        desc: "Telefon kamera bilan professional suratga olish. Kontent strategiyasi va rejalashtirish.",
        icon: "camera"
      },
      {
        title: "Video ishlov (Editing)",
        desc: "Video montaj dasturlari. Reels, YouTube, TikTok uchun content yaratish.",
        icon: "video"
      },
      {
        title: "SMM & Target (Yaqinda)",
        desc: "Instagram, Telegram, YouTube — to'liq boshqaruv. Targetli reklama va analytics.",
        icon: "trending-up"
      },
      {
        title: "Blogging & Talaffuz (Yaqinda)",
        desc: "Vidushiy va blogger bo'lish kursi. Ovoz, talaffuz, ekran oldida o'zini tutish.",
        icon: "mic"
      }
    ],
    features: ["Amaliy uskunalar bilan ishlash", "Real kontent yaratish", "Portfolio", "Sohada amaliyot"],
    teachers: "Faol blogerlar, SMM mutaxassislari va professional videograflar.",
    schedule: "Jadval tez orada e'lon qilinadi.",
    color: "#7C3AED"
  },
  {
    id: 'kimyo-biologiya',
    slug: 'kimyo-biologiya',
    name: "Kimyo & Biologiya",
    shortDesc: "Abituriyentlar uchun chuqur tayyorlov. DTM imtihoniga yo'naltirilgan.",
    icon: "flask",
    accent: "orange",
    chips: ["Kimyo", "Biologiya", "DTM"],
    price: null,
    priceLabel: "Bog'laning",
    fullDesc: `Kimyo va Biologiya — DTM imtihoniga tayyorlanuvchi o'quvchilar uchun maxsus kurs. Fan asoslaridan amaliy masalalargacha to'liq dastur.`,
    details: [
      {
        title: "Kimyo",
        desc: "Organik va anorganik kimyo. DTM savollari formati bo'yicha tayyorlov. Laboratoriya mashqlari.",
        icon: "flask"
      },
      {
        title: "Biologiya",
        desc: "Tibbiyot va biologiya ixtisosliklari uchun chuqur tayyorlov. DTM testlarini yechish strategiyasi.",
        icon: "leaf"
      }
    ],
    features: ["DTM formatida testlar", "Individual monitoring", "Zaif tomonlarni aniqlash", "Mock imtihonlar"],
    teachers: "Fan doktorlari va DTM tajribasiga ega o'qituvchilar.",
    schedule: "Yilning istalgan vaqtida yozilish mumkin.",
    color: "#F46B1E"
  }
];
