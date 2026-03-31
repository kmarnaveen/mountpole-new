export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  image?: string;
  gallery?: string[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  category: string;
  productCount: number;
  featured: boolean;
}

export const brands: Brand[] = [
  {
    id: "1",
    slug: "apple",
    name: "Apple",
    description: "Premium smartphones, tablets, and wearables",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-1536x864.png",
    category: "Consumer Electronics",
    productCount: 18,
    featured: true,
  },
  {
    id: "2",
    slug: "samsung",
    name: "Samsung",
    description: "Mobile devices, tablets, and consumer electronics",
    logo: "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/300_186_4.png?$568_N_PNG$",
    category: "Consumer Electronics",
    productCount: 24,
    featured: true,
  },
  {
    id: "3",
    slug: "google",
    name: "Google",
    description: "Pixel phones and Android devices",
    logo: "https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/resized/800x480/1520cb97ebc97cda5694fabad478e857789d84d0.png",
    category: "Consumer Electronics",
    productCount: 13,
    featured: true,
  },
  {
    id: "4",
    slug: "xiaomi",
    name: "Xiaomi",
    description: "Innovative smartphones and smart devices",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/960px-Xiaomi_logo_%282021-%29.svg.png",
    category: "Consumer Electronics",
    productCount: 13,
    featured: true,
  },
  {
    id: "5",
    slug: "realme",
    name: "Realme",
    description: "Performance and value-driven smartphones",
    logo: "https://i.pinimg.com/736x/71/71/0f/71710f762b6af383a73f9760fda3a3ae.jpg",
    category: "Consumer Electronics",
    productCount: 10,
    featured: false,
  },
  {
    id: "6",
    slug: "motorola",
    name: "Motorola",
    description: "Affordable smartphones and budget devices",
    logo: "https://1000logos.net/wp-content/uploads/2017/04/Motorola-Logo-1536x864.png",
    category: "Consumer Electronics",
    productCount: 9,
    featured: false,
  },
  {
    id: "7",
    slug: "jbl",
    name: "JBL",
    description: "Premium audio equipment and accessories",
    logo: "https://logos-world.net/wp-content/uploads/2020/12/JBL-Logo-700x394.png",
    category: "Audio",
    productCount: 7,
    featured: false,
  },
  {
    id: "8",
    slug: "huawei",
    name: "Huawei",
    description: "Advanced mobile and computing devices",
    logo: "https://1000logos.net/wp-content/uploads/2018/08/Huawei-Logo.png",
    category: "Consumer Electronics",
    productCount: 9,
    featured: false,
  },
  {
    id: "9",
    slug: "honor",
    name: "Honor",
    description: "Stylish and performance-focused smartphones",
    logo: "https://static.vecteezy.com/system/resources/previews/020/927/024/non_2x/honor-brand-logo-phone-symbol-name-black-design-china-mobile-illustration-free-vector.jpg",
    category: "Consumer Electronics",
    productCount: 9,
    featured: false,
  },
];

export const products: Record<string, Product[]> = {
  apple: [
    // iPhone 17 Series
    {
      id: "a10",
      name: "iPhone 17",
      sku: "IPHONE-17",
      category: "Smartphones",
      description: "Next generation standard iPhone",
      image: "/products/iphone_17__ck7zzemcw37m_large.jpg",
      gallery: ["/products/all_models_iphone17__bomc17qk8mfm_large_2x.jpg"],
    },
    {
      id: "a11",
      name: "iPhone Air",
      sku: "IPHONE-AIR",
      category: "Smartphones",
      description: "Mid-range Air variant with balanced features",
      image: "/products/iphone_air__f0t56fef3oey_large.jpg",
      gallery: ["/products/all_models_iphone_air__b58ob4ip75ci_large_2x.jpg"],
    },
    {
      id: "a12",
      name: "iPhone 17 Pro",
      sku: "IPHONE-17PR",
      category: "Smartphones",
      description: "Advanced professional smartphone",
      image: "/products/iphone_17pro__0s6piftg70ym_large.jpg",
      gallery: [
        "/products/iphone-17-pro.jpg",
        "/products/all_models_iphone17_pro__otoj1g5spwqm_large_2x.jpg",
      ],
    },
    {
      id: "a13",
      name: "iPhone 17 Pro Max",
      sku: "IPHONE-17PM",
      category: "Smartphones",
      description: "Premium flagship with pro features",
      image: "/products/all_models_iphone17_pro_max__esosdxc1yawm_large_2x.jpg",
    },
    // iPhone 16 Series
    {
      id: "a5",
      name: "iPhone 16e",
      sku: "IPHONE-16E",
      category: "Smartphones",
      description:
        "Essential performance and features in a budget-friendly design.",
      image: "/products/iphone_16e__dar81seif0cy_large.jpg",
      gallery: ["/products/all_models_iphone16e__cnrqtx98sxyu_large_2x.jpg"],
    },
    {
      id: "a6",
      name: "iPhone 16",
      sku: "IPHONE-16",
      category: "Smartphones",
      description:
        "Built for Apple Intelligence. Featuring Camera Control and the new A18 chip.",
      image: "/products/iphone_16__drr03yfz644m_large.jpg",
      gallery: ["/products/all_models_iphone16__d7lpqlr2l2ye_large_2x.jpg"],
    },
    {
      id: "a7",
      name: "iPhone 16 Plus",
      sku: "IPHONE-16PL",
      category: "Smartphones",
      description:
        "A huge leap in battery life. Powered by the A18 chip with Apple Intelligence.",
      image: "/products/iphone-16-plus-ultramarine-witb-202409.jpeg",
      gallery: [
        "/products/iphone-16-plus-ultramarine-select-202409_AV2.jpeg",
        "/products/all_models_iphone16_plus__ceii3ayvme4i_large_2x.jpg",
      ],
    },
    {
      id: "a8",
      name: "iPhone 16 Pro",
      sku: "IPHONE-16PR",
      category: "Smartphones",
      description:
        "The ultimate iPhone. Titanium design, Camera Control, 4K 120 fps Dolby Vision, and A18 Pro chip.",
      image: "/products/iphone-16-finish-select-202409-6-1inch_AV2.jpeg",
      gallery: ["/products/all_models_iphone16_pro__mahac1ts6luu_large_2x.jpg"],
    },
    {
      id: "a9",
      name: "iPhone 16 Pro Max",
      sku: "IPHONE-16PM",
      category: "Smartphones",
      description:
        "The largest display ever on an iPhone. Powered by the A18 Pro chip for unrivaled performance.",
      image: "/products/iphone-16-finish-select-202409-6-7inch_AV1.jpeg",
      gallery: [
        "/products/iphone-16-finish-select-202409-6-7inch_AV2.jpeg",
        "/products/iphone-16-finish-select-202409-6-7inch_GEO_IN.jpeg",
        "/products/all_models_iphone16_pro_max__e95w81pfqzu6_large_2x.jpg",
      ],
    },
    // iPhone 15 Series
    {
      id: "a1",
      name: "iPhone 15",
      sku: "IPHONE-15",
      category: "Smartphones",
      description:
        "Color-infused glass back, contoured edge, Dynamic Island, 48MP Main camera, and A16 Bionic.",
      image: "/products/iPhone_15_Blue_PDP_Image_Position-1__en-IN.webp",
      gallery: [
        "/products/iPhone_15_Blue_PDP_Image_Position-2__en-IN.webp",
        "/products/iPhone_15_Blue_PDP_Image_Position-6__en-IN.webp",
        "/products/iPhone_15_Blue_PDP_Image_Position-7__en-IN.webp",
        "/products/compare_iphone15_blue__dl7ohaa9ozcm_large_2x.jpg",
        "/products/compare_iphone15_black__dz3o67l1wsq6_large_2x.jpg",
        "/products/compare_iphone15_green__bzsk5d9xjs6a_large_2x.jpg",
        "/products/compare_iphone15_pink__bjba2hexj69y_large_2x.jpg",
        "/products/compare_iphone15_yellow__deddyoxh2q2q_large_2x.jpg",
      ],
    },
    {
      id: "a2",
      name: "iPhone 15 Plus",
      sku: "IPHONE-15P",
      category: "Smartphones",
      description:
        "Super-sized Super Retina XDR display, all-day battery life, and durable design.",
      image:
        "/products/iPhone_15_Plus_Blue_PDP_Image_Position-1_alt__en-IN_eea8fc1e-cae8-4f26-93ff-0dd709e035a2.webp",
      gallery: [
        "/products/iPhone_15_Plus_Blue_PDP_Image_Position-2__en-IN_605b99d4-b6f4-4dae-b8a7-4c86dc23ae63.webp",
        "/products/iPhone_15_Plus_Blue_PDP_Image_Position-4__en-IN_afb0c33a-bf4c-405c-ac68-7ae07ef2ff22.webp",
        "/products/iPhone_15_Plus_Blue_PDP_Image_Position-6__en-IN_4552c5fb-f66d-4ec8-8476-27bf87a48247.webp",
        "/products/all_models_iphone15_plus__c8ixm1hya8sy_large_2x.jpg",
      ],
    },
    {
      id: "a3",
      name: "iPhone 15 Pro",
      sku: "IPHONE-15PR",
      category: "Smartphones",
      description:
        "forged in titanium, featuring the groundbreaking A17 Pro chip and a customizable Action button.",
      image: "/products/all_models_iphone15_pro__cnn0862twgnm_large_2x.jpg",
      gallery: [
        "/products/iPhone_15_Blue_PDP_Image_Position-2__en-IN.webp",
        "/products/compare_iphone15_pro_black_titanium__bltsmbmhia5e_large_2x.jpg",
        "/products/compare_iphone15_pro_blue_titanium__dpb44aaknxm6_large_2x.jpg",
        "/products/compare_iphone15_pro_natural_titanium__bcb24zhx6p42_large_2x.jpg",
        "/products/compare_iphone15_pro_white_titanium__cziovz7g406e_large_2x.jpg",
      ],
    },
    {
      id: "a4",
      name: "iPhone 15 Pro Max",
      sku: "IPHONE-15PM",
      category: "Smartphones",
      description:
        "The ultimate iPhone with a strong titanium design, 5x Telephoto camera, and A17 Pro performance.",
      image: "/products/all_models_iphone15_pro_max__do10rmjxu5oy_large_2x.jpg",
      gallery: [
        "/products/iPhone_15_Blue_PDP_Image_Position-6__en-IN.webp",
        "/products/compare_iphone15_pro_max_black_titanium__dhi515xyf9si_large_2x.jpg",
        "/products/compare_iphone15_pro_max_blue_titanium__ep7dees72ro2_large_2x.jpg",
        "/products/compare_iphone15_pro_max_natural_titanium__b74upjuuyu4i_large_2x.jpg",
        "/products/compare_iphone15_pro_max_white_titanium__11n0f7qvekya_large_2x.jpg",
      ],
    },
    // Accessories
    {
      id: "a14",
      name: "AirPods Pro 3",
      sku: "AIRPODS-PRO3",
      category: "Accessories",
      description:
        "The next evolution of sound. Active Noise Cancellation and personalized spatial audio.",
      image:
        "https://vsprod.vijaysales.com/media/catalog/product/2/4/245237.jpg?optimize=medium&fit=bounds&height=500&width=500",
    },
    {
      id: "a15",
      name: "AirPods Pro 2",
      sku: "AIRPODS-PRO",
      category: "Accessories",
      description:
        "Rich, immersive sound. Active Noise Cancellation and Adaptive Transparency.",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/xif0q/headphone/e/a/f/-original-imagtc44nk4b3hfg.jpeg?q=90",
    },
    {
      id: "a21",
      name: "Apple Watch Series 9",
      sku: "APWATCH-S9",
      category: "Wearables",
      description:
        "Smarter. Brighter. Mightier. Featuring the new S9 SiP and Double Tap gesture.",
      image: "/products/watch__fxtwpvwdf3mi_large.jpg",
    },
    {
      id: "a16",
      name: "Apple Watch Sport Band",
      sku: "BAND-SPORT",
      category: "Accessories",
      description:
        "Soft, breathable, and lightweight. The perfect companion for your Apple Watch.",
      image: "/products/watch-card-40-accessories-202509.jpeg",
    },
    {
      id: "a17",
      name: "MagSafe Charging Case (USB-C)",
      sku: "MAGSAFE-CASE",
      category: "Accessories",
      description:
        "Designed for AirPods Pro (2nd generation). Charges with USB-C, Apple Watch charger, or MagSafe.",
      image: "/products/MGD74.jpeg",
      gallery: [
        "/products/MGD74_AV1.jpeg",
        "/products/MGD74_AV2.jpeg",
        "/products/MGPG4.jpeg",
        "/products/iphone-cases-magsafe-202509.png",
      ],
    },
    {
      id: "a26",
      name: "AirPods Max",
      sku: "AIRPODS-MAX",
      category: "Audio",
      description:
        "Computational audio. Adaptive EQ. Active Noise Cancellation. Transparency mode. Spatial audio.",
      image: "/products/airpods_max_stardust__l9lr6719rmaa_large.png",
      gallery: [
        "/products/airpods_max_black__x3byrd2venmu_large.png",
        "/products/airpods_max_blue__fsfaleh1smuu_large.png",
        "/products/airpods_max_orange__gln3ifz5o9ei_large.png",
        "/products/airpods_max_purple__d9y3g3n7cnyq_large.png",
        "/products/airpods_max_tunnel__emtt9kn0vq82_small.jpg",
      ],
    },
    {
      id: "a27",
      name: "Apple Watch Ultra 2",
      sku: "APWATCH-ULTRA2",
      category: "Wearables",
      description:
        "The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.",
      image: "/products/watch-card-40-ultra3-202509_GEO_IN.jpeg",
      gallery: [
        "/products/watch-ultra-digitalmat-gallery-1-202509.png",
        "/products/watch-ultra-digitalmat-gallery-2-202509.png",
        "/products/watch-ultra-digitalmat-gallery-5-202509.png",
        "/products/watch-ultra-digitalmat-gallery-6-202509_GEO_IN.png",
      ],
    },
    {
      id: "a28",
      name: "Apple Watch Series 10",
      sku: "APWATCH-S10",
      category: "Wearables",
      description:
        "Our smartest, most powerful watch yet. With a new S10 SiP and advanced health features.",
      image: "/products/watch-card-40-s11-202509_GEO_IN.jpeg",
      gallery: [
        "/products/watch-s11-digitalmat-gallery-1-202509_GEO_IN.png",
        "/products/watch-s11-digitalmat-gallery-2-202509_GEO_IN.png",
        "/products/watch-s11-digitalmat-gallery-3-202509.png",
        "/products/watch-s11-digitalmat-gallery-4-202509.png",
        "/products/watch-s11-digitalmat-gallery-5-202509.png",
        "/products/watch-s11-digitalmat-gallery-6-202509_GEO_IN.png",
        "/products/watch-s11-digitalmat-gallery-7-202509.png",
      ],
    },
    {
      id: "a29",
      name: "Apple Watch SE",
      sku: "APWATCH-SE",
      category: "Wearables",
      description:
        "Heavy on features. Light on price. Essential features to keep you connected and active.",
      image: "/products/watch-card-40-se3-202509.jpeg",
      gallery: [
        "/products/watch-se-digitalmat-gallery-1-202509_GEO_IN.png",
        "/products/watch-se-digitalmat-gallery-2-202509_GEO_IN.png",
        "/products/watch-se-digitalmat-gallery-3-202509.png",
        "/products/watch-se-digitalmat-gallery-4-202509.png",
        "/products/watch-se-digitalmat-gallery-5-202509_GEO_IN.png",
        "/products/watch-se-digitalmat-gallery-6-202509.png",
        "/products/watch-se-digitalmat-gallery-7-202509_GEO_IN.png",
      ],
    },
    {
      id: "a30",
      name: "AirTag",
      sku: "AIRTAG",
      category: "Accessories",
      description:
        "Lose your knack for losing things. Track your keys, wallet, luggage, backpack, and more.",
      image: "/products/airtag_accessories__gcg7wtcpr2y6_large.jpg",
    },
    {
      id: "a31",
      name: "Studio Display",
      sku: "STUDIO-DISPLAY",
      category: "Displays",
      description:
        "A 27-inch 5K Retina display. 12MP Ultra Wide camera with Center Stage. Six speakers.",
      image: "/products/studio-display-digitalmat-gallery-8-202203.png",
    },
    {
      id: "a18",
      name: "iPad Pro (M4)",
      sku: "IPAD-PRO-M4",
      category: "Tablets",
      description:
        "The thinnest Apple product ever. Crushing performance with the M4 chip and Ultra Retina XDR.",
      image: "/products/ipad-card-40-pro-202405.jpeg",
      gallery: [
        "/products/ipadpro13-digitalmat-gallery-1-202404.png",
        "/products/ipadpro13-digitalmat-gallery-2-202404.png",
        "/products/ipadpro13-digitalmat-gallery-3-202404.png",
        "/products/ipadpro11-digitalmat-gallery-1-202404.jpeg",
        "/products/ipadpro11-digitalmat-gallery-2-202404_GEO_EMEA_LANG_EN.png",
        "/products/ipadpro11-digitalmat-gallery-3-202404.png",
        "/products/ipadpro11-digitalmat-gallery-4-202404.png",
        "/products/ipadpro13-digitalmat-gallery-4-202404.png",
      ],
    },
    {
      id: "a19",
      name: "iPad Pro (M5, 2025)",
      sku: "IPAD-PRO-M5",
      category: "Tablets",
      description: "Latest iPad Pro with M5 processor",
      image: "/products/ipad-card-40-ipad-202410.jpeg",
      gallery: [
        "/products/ipad-digitalmat-gallery-1-202210_GEO_IN.png",
        "/products/ipad-digitalmat-gallery-2-202310.png",
        "/products/ipad-digitalmat-gallery-3-202210.png",
        "/products/ipad-digitalmat-gallery-4-202210.png",
        "/products/ipad-digitalmat-gallery-5-202210.png",
      ],
    },
    {
      id: "a20",
      name: "HomePod (2nd gen)",
      sku: "HOMEPOD-2GEN",
      category: "Audio",
      description: "Premium smart speaker with premium sound",
      image: "/products/hero_homepod__f002zouobzyy_large.jpg",
      gallery: [
        "/products/homepod__f07iekemvy62_large.jpg",
        "/products/homepod_twins__gi5qodweaqie_large.jpg",
        "/products/ar_white__bplgl5ea779e_large.jpg",
        "/products/ar_midnight__e150wjtv62mq_large.jpg",
      ],
    },
    {
      id: "a22",
      name: "MacBook Air 13-inch",
      sku: "MBA-13-M3",
      category: "Laptops",
      description:
        "Lean. Mean. M3 machine. Supercharged by M3, it's an ultraportable laptop that sails through work and play.",
      image:
        "/products/macbook-air-13-digitalmat-gallery-2-202503_GEO_EMEA_LANG_EN.png",
      gallery: [
        "/products/macbook-air-13-digitalmat-gallery-1-202503.png",
        "/products/macbook-air-13-digitalmat-gallery-3-202503.png",
        "/products/macbook-air-13-digitalmat-gallery-4-202503.png",
        "/products/macbook-air-13-digitalmat-gallery-5-202503.png",
        "/products/macbook-air-13-digitalmat-gallery-6-202503.png",
        "/products/macbook-air-13-digitalmat-gallery-7-202503.png",
      ],
    },
    {
      id: "a23",
      name: "MacBook Air 15-inch",
      sku: "MBA-15-M3",
      category: "Laptops",
      description:
        "Impossibly thin. Incredibly fast. Now available in a 15-inch model to make room for more of what you love.",
      image:
        "/products/macbook-air-15-digitalmat-gallery-2-202503_GEO_EMEA_LANG_EN.jpeg",
      gallery: [
        "/products/macbook-air-15-digitalmat-gallery-1-202503.png",
        "/products/macbook-air-15-digitalmat-gallery-3-202503.png",
        "/products/macbook-air-15-digitalmat-gallery-4-202503.png",
        "/products/macbook-air-15-digitalmat-gallery-5-202503.png",
        "/products/macbook-air-15-digitalmat-gallery-6-202503.png",
        "/products/macbook-air-15-digitalmat-gallery-7-202503_GEO_IN.png",
      ],
    },
    {
      id: "a24",
      name: "MacBook Pro 14-inch",
      sku: "MBP-14-M3",
      category: "Laptops",
      description:
        "Mind-blowing. Head-turning. The most advanced chips ever built for a personal computer.",
      image: "/products/mbp-14-digitalmat-gallery-2-202410.png",
      gallery: [
        "/products/mbp-14-digitalmat-gallery-1-202410.png",
        "/products/mbp-14-digitalmat-gallery-3-202410.png",
        "/products/mbp-14-digitalmat-gallery-4-202410.png",
        "/products/mbp-14-digitalmat-gallery-5-202410.png",
        "/products/mbp-14-digitalmat-gallery-6-202410.png",
        "/products/mbp-14-digitalmat-gallery-7-202410.png",
      ],
    },
    {
      id: "a25",
      name: "MacBook Pro 16-inch",
      sku: "MBP-16-M3",
      category: "Laptops",
      description:
        "Extreme performance. Up to 22 hours of battery life. The world's best laptop display.",
      image: "/products/mbp-16-digitalmat-gallery-2-202410.png",
      gallery: [
        "/products/mbp-16-digitalmat-gallery-1-202410.jpeg",
        "/products/mbp-16-digitalmat-gallery-3-202410.png",
        "/products/mbp-16-digitalmat-gallery-4-202410.png",
        "/products/mbp-16-digitalmat-gallery-5-202410.png",
        "/products/mbp-16-digitalmat-gallery-6-202410.png",
      ],
    },
  ],
  samsung: [
    // Galaxy S23 Series
    // Galaxy S25 Series
    {
      id: "s9",
      name: "Galaxy S25",
      sku: "GALAXY-S25",
      category: "Smartphones",
      description:
        "The next era of Galaxy AI. Stunning design with next-level performance.",
      image:
        "/products/Samsung/in-galaxy-s25-s931-sm-s931blbcins-thumb-544656208.png",
      gallery: [
        "/products/Samsung/in-galaxy-s25-s931-sm-s931blbcins-thumb-544656207.png",
        "/products/Samsung/in-galaxy-s25-s931-sm-s931blbcins-thumb-544656209.png",
        "/products/Samsung/in-galaxy-s25-s931-sm-s931blbcins-thumb-544656210.png",
        "/products/Samsung/in-galaxy-s25-s931-sm-s931blbcins-thumb-544656211.png",
        "/products/Samsung/in-galaxy-s25-s931-sm-s931blbcins-thumb-544656215.png",
        "/products/Samsung/in-galaxy-s25-s931-534143-sm-s931bzkcins-thumb-544675153.png",
        "/products/Samsung/in-galaxy-s25-s931-534143-sm-s931bzkcins-thumb-544675154.png",
        "/products/Samsung/in-galaxy-s25-s931-534143-sm-s931bzkcins-thumb-544675155.png",
        "/products/Samsung/in-galaxy-s25-s931-534143-sm-s931bzkcins-thumb-544675156.png",
        "/products/Samsung/in-galaxy-s25-s931-534143-sm-s931bzkcins-thumb-544675157.png",
        "/products/Samsung/in-galaxy-s25-s931-534143-sm-s931bzkcins-thumb-544675163.png",
      ],
    },
    {
      id: "s10",
      name: "Galaxy S25+",
      sku: "GALAXY-S25P",
      category: "Smartphones",
      description:
        "More screen, more battery, more AI power. The ultimate daily driver.",
      image:
        "/products/Samsung/in-galaxy-s25-s937-sm-s937bzsbins-thumb-546082677.png",
      gallery: [
        "/products/Samsung/in-galaxy-s25-s937-sm-s937bzsbins-thumb-546082673.png",
        "/products/Samsung/in-galaxy-s25-s937-sm-s937bzsbins-thumb-546082674.png",
        "/products/Samsung/in-galaxy-s25-s937-sm-s937bzsbins-thumb-546082675.png",
        "/products/Samsung/in-galaxy-s25-s937-sm-s937bzsbins-thumb-546082676.png",
        "/products/Samsung/in-galaxy-s25-s937-sm-s937bzsbins-thumb-546082683.png",
        "/products/Samsung/in-galaxy-s25-s936-534090-sm-s936bzkbins-thumb-544669328.png",
        "/products/Samsung/in-galaxy-s25-s936-534090-sm-s936bzkbins-thumb-544669329.png",
        "/products/Samsung/in-galaxy-s25-s936-534090-sm-s936bzkbins-thumb-544669330.png",
        "/products/Samsung/in-galaxy-s25-s936-534090-sm-s936bzkbins-thumb-544669331.png",
        "/products/Samsung/in-galaxy-s25-s936-534090-sm-s936bzkbins-thumb-544669332.png",
        "/products/Samsung/in-galaxy-s25-s936-534090-sm-s936bzkbins-thumb-544669338.png",
        "/products/Samsung/in-galaxy-s25-s936-sm-s936bdbbins-thumb-544669160.png",
        "/products/Samsung/in-galaxy-s25-s936-sm-s936bdbbins-thumb-544669161.png",
        "/products/Samsung/in-galaxy-s25-s936-sm-s936bdbbins-thumb-544669162.png",
        "/products/Samsung/in-galaxy-s25-s936-sm-s936bdbbins-thumb-544669163.png",
        "/products/Samsung/in-galaxy-s25-s936-sm-s936bdbbins-thumb-544669164.png",
        "/products/Samsung/in-galaxy-s25-s936-sm-s936bdbbins-thumb-544669170.png",
      ],
    },
    {
      id: "s11",
      name: "Galaxy S25 Ultra",
      sku: "GALAXY-S25U",
      category: "Smartphones",
      description:
        "Titanium tough. The most powerful Galaxy with built-in S Pen and advanced AI.",
      image:
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702943.png",
      gallery: [
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702929.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702930.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702944.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702945.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702948.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bakbins-thumb-544702670.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bakbins-thumb-544702671.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bakbins-thumb-544702672.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bakbins-thumb-544702673.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bakbins-thumb-544702674.png",
        "/products/Samsung/in-galaxy-s25-s938-sm-s938bakbins-thumb-544702689.png",
      ],
    },
    {
      id: "s12",
      name: "Galaxy S25 FE",
      sku: "GALAXY-S25FE",
      category: "Smartphones",
      description: "Flagship features at a fan-friendly price.",
      image:
        "/products/Samsung/in-galaxy-s25-fe-sm-s731-sm-s731bdbcins-thumb-548902975.png",
      gallery: [
        "/products/Samsung/in-galaxy-s25-fe-sm-s731-sm-s731bdbcins-thumb-548902979.png",
        "/products/Samsung/in-galaxy-s25-fe-sm-s731-sm-s731bdbcins-thumb-548902980.png",
        "/products/Samsung/in-galaxy-s25-fe-sm-s731-sm-s731bdbcins-thumb-548902981.png",
        "/products/Samsung/in-galaxy-s25-fe-sm-s731-sm-s731bdbcins-thumb-548902982.png",
        "/products/Samsung/in-galaxy-s25-fe-sm-s731-sm-s731bdbcins-thumb-548902985.png",
      ],
    },
    {
      id: "s18",
      name: "Galaxy Z Fold 7",
      sku: "GALAXY-ZFOLD7",
      category: "Smartphones",
      description:
        "Unfold a cinema, a workspace, and a gaming console. The ultimate multitasking device.",
      image:
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966bdbdins-thumb-547542953.png",
      gallery: [
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966bdbdins-thumb-547542954.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966bdbdins-thumb-547542955.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966bdbdins-thumb-547542956.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966bdbdins-thumb-547542957.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966bdbdins-thumb-547542963.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966blgdins-thumb-547543091.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966blgdins-thumb-547543092.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966blgdins-thumb-547543093.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966blgdins-thumb-547543094.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966blgdins-thumb-547543095.png",
        "/products/Samsung/in-galaxy-z-fold7-f966-sm-f966blgdins-thumb-547543101.png",
      ],
    },
    {
      id: "s19",
      name: "Galaxy Z Flip 7",
      sku: "GALAXY-ZFLIP7",
      category: "Smartphones",
      description:
        "The pocket-perfect phone that stands on its own. Now with a larger cover screen.",
      image:
        "/products/Samsung/in-galaxy-zflip7-f766-sm-f766bdbains-thumb-547545262.png",
      gallery: [
        "/products/Samsung/in-galaxy-zflip7-f766-sm-f766bdbains-thumb-547545258.png",
        "/products/Samsung/in-galaxy-zflip7-f766-sm-f766bdbains-thumb-547545259.png",
        "/products/Samsung/in-galaxy-zflip7-f766-sm-f766bdbains-thumb-547545261.png",
        "/products/Samsung/in-galaxy-zflip7-f766-sm-f766bdbains-thumb-547545269.png",
        "/products/Samsung/in-galaxy-zflip7-f766-554230-sm-f766blgains-thumb-547545752.png",
        "/products/Samsung/in-galaxy-zflip7-f766-554230-sm-f766blgains-thumb-547545753.png",
        "/products/Samsung/in-galaxy-zflip7-f766-554230-sm-f766blgains-thumb-547545754.png",
        "/products/Samsung/in-galaxy-zflip7-f766-554230-sm-f766blgains-thumb-547545755.png",
        "/products/Samsung/in-galaxy-zflip7-f766-554230-sm-f766blgains-thumb-547545756.png",
        "/products/Samsung/in-galaxy-zflip7-f766-554230-sm-f766blgains-thumb-547545763.png",
      ],
    },
    {
      id: "s20",
      name: "Galaxy Z Fold 6",
      sku: "GALAXY-ZFOLD6",
      category: "Smartphones",
      description:
        "Slimmer, lighter, and more durable. The AI-powered foldable for productivity.",
      image:
        "/products/Samsung/in-galaxy-z-fold6-f956-sm-f956bakdins-thumb-542846827.png",
      gallery: [
        "/products/Samsung/in-galaxy-z-fold6-f956-514252-sm-f956bzsdins-thumb-542845602.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-514252-sm-f956bzsdins-thumb-542845603.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-514252-sm-f956bzsdins-thumb-542845604.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-514252-sm-f956bzsdins-thumb-542845605.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-514252-sm-f956bzsdins-thumb-542845606.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-514252-sm-f956bzsdins-thumb-542845607.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-sm-f956bakdins-thumb-542846824.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-sm-f956bakdins-thumb-542846825.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-sm-f956bakdins-thumb-542846826.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-sm-f956bakdins-thumb-542846828.png",
        "/products/Samsung/in-galaxy-z-fold6-f956-sm-f956bakdins-thumb-542846899.png",
      ],
    },
    {
      id: "s21",
      name: "Galaxy Z Flip 6",
      sku: "GALAXY-ZFLIP6",
      category: "Smartphones",
      description:
        "Your self-expression tool. Compact design with a versatile Flex Window.",
      image:
        "/products/Samsung/in-galaxy-zflip6-f741-sm-f741bakains-thumb-542849230.png",
      gallery: [
        "/products/Samsung/in-galaxy-zflip6-f741-sm-f741bakains-thumb-542628550.png",
        "/products/Samsung/in-galaxy-zflip6-f741-sm-f741bakains-thumb-542849229.png",
        "/products/Samsung/in-galaxy-zflip6-f741-sm-f741bakains-thumb-542849235.png",
        "/products/Samsung/in-galaxy-zflip6-f741-sm-f741bakains-thumb-542849236.png",
        "/products/Samsung/in-galaxy-zflip6-f741-sm-f741bakains-thumb-542849237.png",
      ],
    },
    // Galaxy S24 Series
    {
      id: "s5",
      name: "Galaxy S24",
      sku: "GALAXY-S24",
      category: "Smartphones",
      description:
        "Galaxy AI is here. Epic search, live translate, and generative photo editing.",
      image:
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573294.png",
      gallery: [
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573293.png",
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573295.png",
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573296.png",
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573311.png",
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573292.png",
      ],
    },
    {
      id: "s6",
      name: "Galaxy S24+",
      sku: "GALAXY-S24P",
      category: "Smartphones",
      description: "Bigger screen, bigger battery. Powered by Galaxy AI.",
      image:
        "/products/Samsung/in-galaxy-s24-492654-sm-s921bzycins-thumb-539572833.png",
      gallery: [
        "/products/Samsung/in-galaxy-s24-492654-sm-s921bzycins-thumb-539572830.png",
        "/products/Samsung/in-galaxy-s24-492654-sm-s921bzycins-thumb-539572831.png",
        "/products/Samsung/in-galaxy-s24-492654-sm-s921bzycins-thumb-539572832.png",
        "/products/Samsung/in-galaxy-s24-492654-sm-s921bzycins-thumb-539572834.png",
        "/products/Samsung/in-galaxy-s24-492654-sm-s921bzycins-thumb-539572840.png",
        "/products/Samsung/in-galaxy-s24-561746-sm-s921ezyiins-thumb-548652576.png",
        "/products/Samsung/in-galaxy-s24-561746-sm-s921ezyiins-thumb-548652577.png",
        "/products/Samsung/in-galaxy-s24-561746-sm-s921ezyiins-thumb-548652578.png",
        "/products/Samsung/in-galaxy-s24-561746-sm-s921ezyiins-thumb-548652579.png",
        "/products/Samsung/in-galaxy-s24-561746-sm-s921ezyiins-thumb-548652580.png",
        "/products/Samsung/in-galaxy-s24-561746-sm-s921ezyiins-thumb-548652586.png",
      ],
    },
    {
      id: "s7",
      name: "Galaxy S24 Ultra",
      sku: "GALAXY-S24U",
      category: "Smartphones",
      description:
        "The ultimate Galaxy. Titanium frame, 200MP camera, and S Pen.",
      image:
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573296.png",
      gallery: [
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573292.png",
        "/products/Samsung/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573293.png",
        "/products/Samsung/in-galaxy-s24-s928-492660-sm-s928blbwins-thumb-539573648.png",
        "/products/Samsung/in-galaxy-s24-s928-492660-sm-s928blbwins-thumb-539573649.png",
        "/products/Samsung/in-galaxy-s24-s928-492660-sm-s928blbwins-thumb-539573650.png",
        "/products/Samsung/in-galaxy-s24-s928-492660-sm-s928blbwins-thumb-539573651.png",
        "/products/Samsung/in-galaxy-s24-s928-492660-sm-s928blbwins-thumb-539573653.png",
        "/products/Samsung/in-galaxy-s24-s928-492660-sm-s928blbwins-thumb-539573667.png",
      ],
    },
    {
      id: "s8",
      name: "Galaxy S24 FE",
      sku: "GALAXY-S24FE",
      category: "Smartphones",
      description:
        "Galaxy AI for everyone. Premium features at an accessible price.",
      image:
        "/products/Samsung/in-galaxy-s24-fe-s721-sm-s721blbbins-thumb-543757298.png",
      gallery: [
        "/products/Samsung/in-galaxy-s24-fe-s721-sm-s721blbbins-thumb-543757296.png",
        "/products/Samsung/in-galaxy-s24-fe-s721-sm-s721blbbins-thumb-543757297.png",
        "/products/Samsung/in-galaxy-s24-fe-s721-sm-s721blbbins-thumb-543757299.png",
        "/products/Samsung/in-galaxy-s24-fe-s721-sm-s721blbbins-thumb-543757302.png",
        "/products/Samsung/in-galaxy-s24-fe-s721-sm-s721blbbins-thumb-543757306.png",
      ],
    },
    // Galaxy S23 Series
    {
      id: "s1",
      name: "Galaxy S23",
      sku: "GALAXY-S23",
      category: "Smartphones",
      description:
        "Share the epic. Nightography camera and Snapdragon 8 Gen 2 for Galaxy.",
      image:
        "/products/Samsung/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265908.png",
      gallery: [
        "/products/Samsung/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265904.png",
        "/products/Samsung/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265905.png",
        "/products/Samsung/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265906.png",
        "/products/Samsung/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265907.png",
        "/products/Samsung/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265914.png",
      ],
    },
    {
      id: "s3",
      name: "Galaxy S23 Ultra",
      sku: "GALAXY-S23U",
      category: "Smartphones",
      description: "Note-worthy performance. 200MP camera and embedded S Pen.",
      image:
        "/products/Samsung/in-galaxy-s23-s918-446812-sm-s918blgcins-thumb-534868358.png",
      gallery: [
        "/products/Samsung/in-galaxy-s23-s918-446812-sm-s918blgcins-thumb-534868354.png",
        "/products/Samsung/in-galaxy-s23-s918-446812-sm-s918blgcins-thumb-534868355.png",
        "/products/Samsung/in-galaxy-s23-s918-446812-sm-s918blgcins-thumb-534868356.png",
        "/products/Samsung/in-galaxy-s23-s918-446812-sm-s918blgcins-thumb-534868357.png",
        "/products/Samsung/in-galaxy-s23-s918-446812-sm-s918blgcins-thumb-534868373.png",
        "/products/Samsung/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863382.png",
        "/products/Samsung/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863383.png",
        "/products/Samsung/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863384.png",
        "/products/Samsung/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863385.png",
        "/products/Samsung/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863398.png",
        "/products/Samsung/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863401.png",
      ],
    },
    {
      id: "s4",
      name: "Galaxy S23 FE",
      sku: "GALAXY-S23FE",
      category: "Smartphones",
      description:
        "Your entry to the epic. Iconic design and pro-grade camera.",
      image:
        "/products/Samsung/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-thumb-538355945.png",
      gallery: [
        "/products/Samsung/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-thumb-538355935.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-thumb-538355936.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-thumb-538355937.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-thumb-538355938.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-479553-sm-s711blgbins-thumb-538355939.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-sm-s711bzbbins-thumb-538353633.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-sm-s711bzbbins-thumb-538353634.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-sm-s711bzbbins-thumb-538353635.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-sm-s711bzbbins-thumb-538353636.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-sm-s711bzbbins-thumb-538353637.png",
        "/products/Samsung/in-galaxy-s23-fe-s711-sm-s711bzbbins-thumb-538353643.png",
      ],
    },
    // Tablets
    {
      id: "s24",
      name: "Galaxy Tab S11 Ultra",
      sku: "TAB-S11-ULTRA",
      category: "Tablets",
      description:
        "The ultimate Android tablet. Massive 14.6-inch Dynamic AMOLED 2X display.",
      image:
        "/products/Samsung/Samsung/in-galaxy-tab-s11-ultra-sm-x930-563231-sm-x936bzaainu-thumb-549642605.png",
      gallery: [
        "/products/Samsung/Samsung/in-galaxy-tab-s-sm-x936bzaainu-galaxy-tab-s---ultra--g-----gb-memory--gray-thumb-549198364.jpeg",
        "/products/Samsung/Samsung/in-galaxy-tab-s-sm-x936bzaainu-galaxy-tab-s---ultra--g-----gb-memory--gray-thumb-549198366.jpeg",
        "/products/Samsung/Samsung/in-galaxy-tab-s-sm-x936bzaainu-galaxy-tab-s---ultra--g-----gb-memory--gray-thumb-549198368.jpeg",
        "/products/Samsung/Samsung/in-galaxy-tab-s-sm-x936bzaainu-galaxy-tab-s---ultra--g-----gb-memory--gray-thumb-549198370.jpeg",
      ],
    },
    {
      id: "s22",
      name: "Galaxy Tab S11",
      sku: "TAB-S11",
      category: "Tablets",
      description:
        "Powerful performance in a portable 11-inch design. S Pen included.",
      image:
        "/products/Samsung/Samsung/in-galaxy-tab-s11-sm-x730-562857-sm-x736bzaainu-thumb-549676742.jpeg",
      gallery: [
        "/products/Samsung/Samsung/in-galaxy-tab-s11-sm-x730-562857-sm-x736bzaainu-thumb-549674220.jpeg",
        "/products/Samsung/Samsung/in-galaxy-tab-s11-sm-x730-562857-sm-x736bzaainu-thumb-549676653.jpeg",
        "/products/Samsung/Samsung/in-galaxy-tab-s11-sm-x730-562857-sm-x736bzaainu-thumb-549676757.jpeg",
        "/products/Samsung/Samsung/in-galaxy-tab-s-sm-x736bzaainu-galaxy-tab-s----g-----gb-memory--gray-thumb-549198204.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s-sm-x736bzaainu-galaxy-tab-s----g-----gb-memory--gray-thumb-549198214.png",
      ],
    },
    {
      id: "s23",
      name: "Galaxy Tab S10 Lite",
      sku: "TAB-S10-LITE",
      category: "Tablets",
      description:
        "Lightweight, premium functionality, and aggressive pricing.",
      image:
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564579-sm-x400nzaeinu-thumb-549050148.png",
      gallery: [
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564578-sm-x400nzaainu-thumb-549050045.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564578-sm-x400nzaainu-thumb-549050046.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564578-sm-x400nzaainu-thumb-549050047.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564579-sm-x400nzaeinu-thumb-549050140.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564579-sm-x400nzaeinu-thumb-549050141.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564579-sm-x400nzaeinu-thumb-549050142.png",
        "/products/Samsung/Samsung/in-galaxy-tab-s10-lite-sm-x406-564579-sm-x400nzaeinu-thumb-549050144.png",
      ],
    },
    // Accessories
    {
      id: "s14",
      name: "Galaxy Buds3 Pro",
      sku: "BUDS3-PRO",
      category: "Accessories",
      description:
        "Hi-Fi sound. Adaptive Noise Control. Optimized for Galaxy AI.",
      image:
        "/products/Samsung/in-galaxy-buds3-pro-r630-sm-r630nzaainu-thumb-545478031.jpeg",
      gallery: [
        "/products/Samsung/in-galaxy-buds3-pro-r630-sm-r630nzaainu-thumb-545478052.png",
        "/products/Samsung/in-galaxy-buds3-pro-r630-sm-r630nzaainu-thumb-542134806.png",
        "/products/Samsung/in-galaxy-buds3-pro-r630-sm-r630nzaainu-thumb-542134811.png",
      ],
    },
    {
      id: "s15",
      name: "Galaxy Buds FE",
      sku: "BUDS-FE",
      category: "Accessories",
      description: "Compact design. Powerful ANC. Deep bass.",
      image:
        "/products/Samsung/in-galaxy-buds-fe-480225-sm-r400nzaains-thumb-538531507.png",
      gallery: [
        "/products/Samsung/in-galaxy-buds-fe-480225-sm-r400nzaains-thumb-538531508.png",
        "/products/Samsung/in-galaxy-buds-fe-480225-sm-r400nzaains-thumb-538531509.png",
        "/products/Samsung/in-galaxy-buds-fe-480225-sm-r400nzaains-thumb-538531510.png",
        "/products/Samsung/in-galaxy-buds-fe-480225-sm-r400nzaains-thumb-538531511.png",
        "/products/Samsung/in-galaxy-buds-fe-480225-sm-r400nzaains-thumb-538531516.png",
      ],
    },
    {
      id: "s16",
      name: "Galaxy Buds3 FE",
      sku: "BUDS3-FE",
      category: "Accessories",
      description: "Fan edition Galaxy Buds3 variant",
      image:
        "/products/Samsung/in-galaxy-buds3-fe-sm-r420nzaainu-thumb-548868399.png",
      gallery: [
        "/products/Samsung/in-galaxy-buds3-fe-sm-r420nzaainu-thumb-548868393.png",
        "/products/Samsung/in-galaxy-buds3-fe-sm-r420nzaainu-thumb-548868394.png",
        "/products/Samsung/in-galaxy-buds3-fe-sm-r420nzaainu-thumb-548868395.png",
        "/products/Samsung/in-galaxy-buds3-fe-sm-r420nzaainu-thumb-548868398.png",
        "/products/Samsung/in-galaxy-buds3-fe-sm-r420nzaainu-thumb-548868402.png",
      ],
    },
    {
      id: "s17",
      name: "Galaxy Watch Ultra",
      sku: "WATCH-ULTRA",
      category: "Wearables",
      description: "Premium rugged smartwatch",
      image:
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-titanium-startframe-pc.jpg",
      gallery: [
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-battery-startframe-pc.jpg",
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-battery-endframe-pc.jpg",
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-10atm-startframe-pc.jpg",
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-10atm-endframe-pc.jpg",
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-galaxy-ai-startframe-pc.jpg",
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-galaxy-ai-endframe-pc.jpg",
        "/products/Samsung/galaxy-watch-ultra-2025-catch-the-highlights-titanium-endframe-pc.jpg",
      ],
    },
    {
      id: "s25",
      name: "HW-Q950T Soundbar",
      sku: "HW-Q950T",
      category: "Audio",
      description: "Premium Samsung soundbar with subwoofer",
      image:
        "https://images.samsung.com/is/image/samsung/au-soundbar-hw-q950t-hw-q950t-xy-frontblack-263810282?$Q90_1920_1280_F_PNG$",
    },
  ],
  google: [
    // Pixel 10 Series
    {
      id: "g1",
      name: "Pixel 10",
      sku: "PIXEL-10",
      category: "Smartphones",
      description:
        "Next-gen AI assistant built-in. Powered by Google Tensor G5.",
      image: "/products/Google/pixel-10.jpg",
    },
    {
      id: "g2",
      name: "Pixel 10 Pro",
      sku: "PIXEL-10P",
      category: "Smartphones",
      description:
        "The pro-level Pixel with advanced Gemini capabilities and zoom.",
      image: "/products/Samsung/10-pro.png",
    },
    {
      id: "g3",
      name: "Pixel 10 Pro XL",
      sku: "PIXEL-10PXL",
      category: "Smartphones",
      description:
        "Ultimate screen real estate meets the most powerful Google silicon.",
      image: "/products/Samsung/10-pro-xl.png",
    },
    {
      id: "g4",
      name: "Pixel 10 Pro Fold",
      sku: "PIXEL-10PF",
      category: "Smartphones",
      description:
        "Unfolding the future of AI. Innovative design with expansive display.",
      image: "/products/Samsung/10-pro-fold.png",
    },
    // Pixel 9 Series
    {
      id: "g5",
      name: "Pixel 9a",
      sku: "PIXEL-9A",
      category: "Smartphones",
      description:
        "The essential Pixel. Amazing camera and helpful AI at a great price.",
      image: "/products/Samsung/9a.png",
    },
    {
      id: "g6",
      name: "Pixel 9",
      sku: "PIXEL-9",
      category: "Smartphones",
      description:
        "Built for Gemini. Featuring the Tensor G4 chip and an advanced camera system.",
      image: "/products/Samsung/9.png",
    },
    {
      id: "g7",
      name: "Pixel 9 Pro",
      sku: "PIXEL-9P",
      category: "Smartphones",
      description:
        "The best of Google AI. Super Actua display and pro-level triple camera.",
      image: "/products/Samsung/9-pro.png",
    },
    {
      id: "g8",
      name: "Pixel 9 Pro XL",
      sku: "PIXEL-9PXL",
      category: "Smartphones",
      description:
        "All pro features in a larger size. Longest lasting battery in a Pixel.",
      image: "/products/Samsung/9-pro.png",
    },
    {
      id: "g14",
      name: "Pixel 9 Pro Fold",
      sku: "PIXEL-9PF",
      category: "Smartphones",
      description:
        "Gemini in your pocket. The thinnest foldable with an immersively large 8-inch screen.",
      image: "/products/Samsung/10-pro-fold.png",
    },
    // Accessories
    {
      id: "g9",
      name: "Pixel Buds A-Series",
      sku: "PIXEL-BUDS-A",
      category: "Accessories",
      description: "Rich sound for less. Adaptive Sound and clear calls.",
      image: "/products/Google/pixel-buds-2a.jpg",
    },
    {
      id: "g10",
      name: "Pixel Buds Pro 2",
      sku: "PIXEL-BUDS-PRO2",
      category: "Accessories",
      description:
        "Designed for the most comfortable fit. First Tensor A1 chip for audio.",
      image: "/products/Google/pixel-buds-pro-2.jpg",
    },
    {
      id: "g13",
      name: "Pixel Watch 3 Band",
      sku: "PIXEL-WATCH-BAND",
      category: "Accessories",
      description: "Replacement active band for Pixel Watch.",
      image: "/products/Google/pixel-watch-3-bands.jpg",
    },
    {
      id: "g11",
      name: "Pixel Buds Charging Case",
      sku: "PIXEL-CASE",
      category: "Accessories",
      description: "Wireless charging case for Pixel Buds.",
      image: "/products/Google/pixel-buds-case.jpg",
    },
    {
      id: "g12",
      name: "Pixel Tablet",
      sku: "PIXEL-TABLET",
      category: "Tablets",
      description: "Google Pixel Tablet from 2023",
      image: "/products/Google/pixel-tablet.jpg",
    },
  ],
  xiaomi: [
    // Xiaomi 15 Series
    {
      id: "x1",
      name: "Xiaomi 15",
      sku: "XIAOMI-15",
      category: "Smartphones",
      description: "Latest generation standard flagship",
      image: "/products/Xiaomi/xiaomi-15.jpg",
    },
    {
      id: "x2",
      name: "Xiaomi 15 Pro",
      sku: "XIAOMI-15PRO",
      category: "Smartphones",
      description: "Professional variant with enhanced features",
      image:
        "https://i03.appmifile.com/112_item_in/27/01/2026/4bf726fcdff0279a45b20c0f25ba558b.png?thumb=1&f=webp&q=85",
    },
    {
      id: "x3",
      name: "Xiaomi 15 Ultra",
      sku: "XIAOMI-15U",
      category: "Smartphones",
      description: "Premium flagship with top-tier specifications",
      image: "/products/Xiaomi/xiaomi-15-ultra.jpg",
    },
    {
      id: "x4",
      name: "Xiaomi 15S Pro",
      sku: "XIAOMI-15SP",
      category: "Smartphones",
      description: "Special edition with premium enhancements",
      image:
        "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-15/pc/031d30f2cfab177f07a181e0cd03fcf4.png?f=webp",
    },
    // Xiaomi 17 Series
    {
      id: "x5",
      name: "Xiaomi 17 Ultra",
      sku: "XIAOMI-17U",
      category: "Smartphones",
      description: "Next generation ultra flagship device",
      image:
        "https://i03.appmifile.com/174_item_in/18/03/2026/9cd3d90465192956e713ff15e1a5eb0c.png?thumb=1&f=webp&q=85",
    },
    // Previous models
    {
      id: "x6",
      name: "Xiaomi 14 Ultra",
      sku: "XIAOMI-14U",
      category: "Smartphones",
      description: "Premium smartphone with exceptional camera",
      image: "/products/Xiaomi/xiaomi-14-ultra.jpg",
    },
    {
      id: "x7",
      name: "Xiaomi 14",
      sku: "XIAOMI-14",
      category: "Smartphones",
      description: "Flagship killer with great performance",
      image: "/products/Xiaomi/xiaomi-14.jpg",
    },
    {
      id: "x8",
      name: "Xiaomi Pad 6 Pro",
      sku: "XIAOMI-PAD6P",
      category: "Tablets",
      description: "High-performance tablet",
      image:
        "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-pad-6s-pro-124/pc/e22707982190cc2587fde3afa3d54567.jpg?f=webp",
    },
    {
      id: "x9",
      name: "Xiaomi Watch 4",
      sku: "XIAOMI-WATCH4",
      category: "Wearables",
      description: "Affordable smartwatch with health tracking",
      image:
        "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-watch-4/PC/more-to-first.jpeg?f=webp",
    },
    {
      id: "x10",
      name: "Xiaomi Buds 4",
      sku: "XIAOMI-BUDS4",
      category: "Accessories",
      description: "Budget-friendly wireless earbuds",
      image: "/products/Xiaomi/xiaomi-buds-5.jpg",
    },
    {
      id: "x11",
      name: "Redmi Buds",
      sku: "REDMI-BUDS",
      category: "Accessories",
      description: "Affordable Redmi wireless earbuds",
      image:
        "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-buds-6/pc/4c711db68df7b113a2f3532b3bf7f2db.png?f=webp",
    },
    {
      id: "x12",
      name: "Redmi Watch 5",
      sku: "REDMI-WATCH5",
      category: "Wearables",
      description: "Affordable smartwatch with health tracking",
      image: "/products/Xiaomi/redmi-watch-5.jpg",
    },
    {
      id: "x13",
      name: "Earbud Charging Case",
      sku: "XIAOMI-CASE",
      category: "Accessories",
      description: "Replacement charging case for earbuds",
      image:
        "https://m.media-amazon.com/images/I/61m-X0VrV-L._AC_UF1000,1000_QL80_.jpg",
    },
  ],
  realme: [
    // Realme GT 7 & 8 Series
    {
      id: "r1",
      name: "Realme GT 7 Pro",
      sku: "REALME-GT7P",
      category: "Smartphones",
      description: "High-performance flagship smartphone",
      image: "/products/Realme/realme-gt-7-pro.webp",
    },
    {
      id: "r2",
      name: "Realme GT 8 Pro",
      sku: "REALME-GT8P",
      category: "Smartphones",
      description: "Latest generation performance flagship",
      image: "/products/Realme/realme-gt-8-pro.webp",
    },
    {
      id: "r3",
      name: "Realme GT 8 Pro Dream Edition",
      sku: "REALME-GT8PDE",
      category: "Smartphones",
      description: "Premium dream edition variant",
      image: "/products/Realme/realme-gt-8-pro.webp",
    },
    // Previous models
    {
      id: "r4",
      name: "Realme GT 5",
      sku: "REALME-GT5",
      category: "Smartphones",
      description: "Performance-focused smartphone",
      image:
        "https://static.c.realme.com/GLOBAL/thread/466734040624088045.jpg.webp",
    },
    {
      id: "r5",
      name: "Realme 12 Pro",
      sku: "REALME-12P",
      category: "Smartphones",
      description: "Mid-range smartphone with good features",
      image: "/products/Realme/realme-12-pro.jpg",
    },
    {
      id: "r6",
      name: "Realme Buds Air",
      sku: "REALME-BUDS-AIR",
      category: "Accessories",
      description: "Realme Buds Air wireless earbuds",
      image: "/products/Realme/realme-buds-air-6.jpg",
    },
    {
      id: "r7",
      name: "Realme T200 Hi-Res ANC Earbuds",
      sku: "REALME-T200",
      category: "Accessories",
      description: "Hi-Res audio ANC earbuds with premium sound",
      image: "https://m.media-amazon.com/images/I/61Zpw29IwPL._SL1500_.jpg",
    },
    {
      id: "r11",
      name: "Realme Watch 3",
      sku: "REALME-WATCH3",
      category: "Wearables",
      description: "Budget smartwatch",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/l5bd5zk0/smartwatch/c/y/o/1-8-rmw2108-android-ios-realme-yes-original-imaggyjhvgrhryta.jpeg?q=90",
    },
    {
      id: "r8",
      name: "Realme Buds Wireless",
      sku: "REALME-BUDS-WIRE",
      category: "Accessories",
      description: "Wired earbuds with great sound",
      image:
        "https://static.realme.net/v2/realme-buds-wireless/images/pc/buds-green-9f2dc50ebc.png",
    },
    {
      id: "r9",
      name: "Realme Pad 3",
      sku: "REALME-PAD3",
      category: "Tablets",
      description: "Latest Realme Pad 3 tablet from 2026",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/xif0q/tablet/f/w/z/-original-imahjqj43jvsczmq.jpeg?q=90",
    },
    {
      id: "r10",
      name: "Realme Pad",
      sku: "REALME-PAD",
      category: "Tablets",
      description: "Standard Realme Pad tablet",
      image:
        "https://static.realme.net/v2/realme-pad/images/point/3-1-a4854eef2b.jpg",
    },
  ],
  motorola: [
    // Motorola Edge 50 Series
    {
      id: "m1",
      name: "Motorola Edge 50 Ultra",
      sku: "EDGE-50U",
      category: "Smartphones",
      description: "Premium ultra flagship with foldable variant",
      image:
        "https://motorolain.vtexassets.com/arquivos/ids/161039-1200-auto?width=1200&height=auto&aspect=true",
    },
    {
      id: "m2",
      name: "Motorola Edge 50 Pro",
      sku: "EDGE-50P",
      category: "Smartphones",
      description: "Mid-range smartphone with great camera",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ0SvsWz7azTsoKB7omountpolehx0R44Xnf5qbuoa2sC9pd2A9z-ceuin1iMQ92rw-Lo4KZLizFivG6nH7oh0zW-3r7FbOPieq-D9",
    },
    {
      id: "m3",
      name: "Motorola Edge 50",
      sku: "EDGE-50",
      category: "Smartphones",
      description: "Budget-friendly smartphone",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/xif0q/mobile/o/x/w/edge-50-pb2w0001in-motorola-original-imah3anbhkbjgqtk.jpeg?q=90",
    },
    // Razr Foldables
    {
      id: "m4",
      name: "Motorola Razr Ultra",
      sku: "RAZR-ULTRA",
      category: "Smartphones",
      description: "Premium foldable with cutting-edge design",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/xif0q/mobile/q/d/x/razr-50-ultra-xt2451-3-motorola-original-imah9ek9bhyjhsd4.jpeg?q=90",
    },
    // Previous models
    {
      id: "m5",
      name: "Motorola Tab M10",
      sku: "TAB-M10",
      category: "Tablets",
      description: "Affordable tablet option",
    },
    {
      id: "m6",
      name: "Motorola Moto G 84",
      sku: "MOTO-G84",
      category: "Smartphones",
      description: "Entry-level smartphone",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/xif0q/mobile/7/2/y/g84-5g-paym0017in-motorola-original-imagsyd2hzd63rr7.jpeg?q=90",
    },
    {
      id: "m7",
      name: "Moto Buds",
      sku: "MOTO-BUDS",
      category: "Accessories",
      description: "Wireless earbuds for Motorola devices",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR59AkTMxLVIcBgvhBSQpkUSJTOR5GFkpcvhXexMUjbgml1YOiBEI_v1QcHjPGZK0Ta306dyOrcDXcAshH67ay18ehqLMFL2w",
    },
    {
      id: "m8",
      name: "Moto Watch Band",
      sku: "MOTO-WATCH-BAND",
      category: "Accessories",
      description: "Replacement band for Moto Watch",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQNO9IxRc1IEqSW89BIggPnbfZoXiI3mbxE3URpFEbWpdO8Ph0-xNB0N0D1zKoTx90c8bMurH2lCSv6qTTvPOiW4tPWO-UH7Q",
    },
    {
      id: "m9",
      name: "Moto Earbud Charging Case",
      sku: "MOTO-CASE",
      category: "Accessories",
      description: "Replacement charging case for earbuds",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTcePakERxGgzfZbTNfzoZCqb4nX86CQJe5DeC25s0qmTYcjObI7KJ6OG0ZO4M5fqxc6DSN5R-cvMT5blGOAMYq6NQBes7vpntl7wheruhOMsfzYRrvDPgMwg",
    },
  ],
  jbl: [
    {
      id: "j1",
      name: "JBL Tour Pro 2",
      sku: "JBL-TOUR-P2",
      category: "Accessories",
      description: "Premium wireless earbuds with noise cancellation",
      image:
        "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwda9e4a1b/1.JBL_Tour_Pro_2_ProductImage_Hero_Black.png?sw=535&sh=535",
    },
    {
      id: "j2",
      name: "JBL Flip 6",
      sku: "JBL-FLIP6",
      category: "Audio",
      description: "Portable waterproof speaker",
      image:
        "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwdd53473b/JBL_FLIP6_SQUAD_HERO_31828_x1.png?sw=535&sh=535",
    },
    {
      id: "j3",
      name: "JBL PartyBox 710",
      sku: "JBL-PARTY710",
      category: "Audio",
      description: "Powerful party speaker system",
      image:
        "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw58d8f63b/1_JBL_PARTYBOX_710_HERO_0031_x8.png?sw=535&sh=535",
    },
    {
      id: "j4",
      name: "JBL Live Pro 2",
      sku: "JBL-LIVE-P2",
      category: "Accessories",
      description: "Professional wireless earbuds",
      image:
        "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwff89d0c0/1.JBL_LIVE_PRO_2_Product%20Image_Hero_Black.png?sw=535&sh=535",
    },
    {
      id: "j5",
      name: "JBL Tune Earbuds",
      sku: "JBL-TUNE-BUDS",
      category: "Accessories",
      description: "Mid-range JBL wireless earbuds",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRXcXwdyeC2moeqGD05X1zKXi3KHBYkBn1d2WhvKtuPzhNwoXR0xM3QC_F7WFz-9QY7Kv_lWTL3dTsydg5R655tDgF0OdJfGcL0_AJVWqVOKgGPCqP-8cbbYw",
    },
    {
      id: "j6",
      name: "JBL Earbud Charging Case",
      sku: "JBL-CHG-CASE",
      category: "Accessories",
      description: "Replacement charging case for earbuds",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRXcXwdyeC2moeqGD05X1zKXi3KHBYkBn1d2WhvKtuPzhNwoXR0xM3QC_F7WFz-9QY7Kv_lWTL3dTsydg5R655tDgF0OdJfGcL0_AJVWqVOKgGPCqP-8cbbYw",
    },
  ],
  huawei: [
    // Huawei Pura 70 Series
    {
      id: "h1",
      name: "Huawei Pura 70 Pro",
      sku: "PURA-70P",
      category: "Smartphones",
      description: "Latest flagship with advanced AI capabilities",
      image: "/products/Huawei/huawei-pura70-pro.png",
    },
    {
      id: "h2",
      name: "Huawei Pura 70 Ultra",
      sku: "PURA-70U",
      category: "Smartphones",
      description: "Premium ultra variant with top features",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTSpW1-p6mjFcOQG9v_cQUn-Seb5UtMi7qLFEuCJWbiUooTAhtEsGqgwdKJAJbxvIKLml809MPsGkLqcH1ef9OwKKf20_9FA",
    },
    // Previous models
    {
      id: "h3",
      name: "Huawei Mate 60 Pro",
      sku: "HUAWEI-M60P",
      category: "Smartphones",
      description: "Flagship smartphone with advanced features",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQcCYpxMaIcjNtxD65mountpoledmiVtud2KkTr8SThJu4Ht7ox3mpFiq-x3qcKYylHQ6-F7Z9OSHP-w7dW-l9HDuDfK-70InOGISb",
    },
    {
      id: "h4",
      name: "Huawei P60",
      sku: "HUAWEI-P60",
      category: "Smartphones",
      description: "Premium smartphone with excellent camera",
      image:
        "https://consumer.huawei.com/dam/content/dam/huawei-cbg-site/common/mkt/pdp/phones/p60-art/img/huawei-p60-art-2-waterproof-2x.webp",
    },
    {
      id: "h5",
      name: "Huawei MatePad Pro",
      sku: "HUAWEI-PAD-PRO",
      category: "Tablets",
      description: "High-end tablet for professionals",
      image:
        "https://consumer.huawei.com/dam/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-pro-12-2-2025/images/hero/huawei-matepad-pro-12-2-inch-kv-2x.webp",
    },
    {
      id: "h6",
      name: "Huawei Watch 4 Pro",
      sku: "HUAWEI-WATCH4P",
      category: "Wearables",
      description: "Premium smartwatch with extensive health features",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR4DdQ5QHm_VDN32BzUY9sNVU583dhhU8N6449IHoIHlRRVcr63",
    },
    {
      id: "h7",
      name: "Huawei FreeBuds 5",
      sku: "HUAWEI-FREEBUDS5",
      category: "Accessories",
      description: "Premium wireless earbuds with noise cancellation",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQEUWER4rWHI-_wnY2vJYffkuO5BaEe1dy54CEKh8771T4YWxh37lDsou6SXDG1FUNqv4bFyC0uWxM9Bm1g--ID6Ws04MMZsg",
    },
    {
      id: "h9",
      name: "Huawei Watch Band",
      sku: "HUAWEI-BAND",
      category: "Accessories",
      description: "Replacement band for Huawei Watch",
      image: "https://m.media-amazon.com/images/I/51NHx1IJatL.jpg",
    },
    {
      id: "h10",
      name: "Huawei FreeBuds Charging Case",
      sku: "HUAWEI-CASE",
      category: "Accessories",
      description: "Replacement charging case for earbuds",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQEUWER4rWHI-_wnY2vJYffkuO5BaEe1dy54CEKh8771T4YWxh37lDsou6SXDG1FUNqv4bFyC0uWxM9Bm1g--ID6Ws04MMZsg",
    },
  ],
  honor: [
    // Honor Magic 7 & 8 Series
    {
      id: "ho1",
      name: "Honor Magic 7 Pro",
      sku: "MAGIC-7P",
      category: "Smartphones",
      description: "Professional flagship with advanced features",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTq-XCYDEDFfX97DkEIfWe-DyV3g2-MIuvsGt_SdZSvpYkVm35OpFapdUbSwXb7Xz7nznSXBG6jLpN2OgQJCWW4LhJ52BfQow",
    },
    {
      id: "ho2",
      name: "Honor Magic 8 Pro",
      sku: "MAGIC-8P",
      category: "Smartphones",
      description: "Latest generation magic flagship",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSSsni2WHAuoszp9LIdcITqrzfVJ69q6roaWyutbMmC6nmNfnxvFfuAh4RyXORHg4kE9tdoSUr4L9UNxwlZT927RI2zA5cg",
    },
    {
      id: "ho3",
      name: "Honor Magic 8 RSR",
      sku: "MAGIC-8RSR",
      category: "Smartphones",
      description: "Special edition with unique design",
      image:
        "https://www-file.honor.com/content/dam/honor/common/products/honor-magic8-pro/imgs/section-cmf/img4new@2x.avif",
    },
    // Previous models
    {
      id: "ho4",
      name: "Honor 90",
      sku: "HONOR-90",
      category: "Smartphones",
      description: "Stylish smartphone with excellent performance",
      image:
        "https://rukminim2.flixcart.com/image/2880/2880/xif0q/mobile/u/t/f/90-emerald-green-12gb-512gb-rea-nx9-honor-original-imagtsdduza9rb5h.jpeg?q=90",
    },
    {
      id: "ho5",
      name: "Honor 90 Pro",
      sku: "HONOR-90P",
      category: "Smartphones",
      description: "Premium variant with enhanced features",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRa92TnjZI4bor-__0GYrs6ZZ1WhP58ueQdMLmIxbKFiApllrkImEiYn359rYmVhIMlVhThzuIN8hEbIZ1TGVP3Sr7FSJgi",
    },
    {
      id: "ho6",
      name: "Honor Pad X9",
      sku: "HONOR-PADX9",
      category: "Tablets",
      description: "Mid-range tablet for entertainment",
      image: "https://m.media-amazon.com/images/I/61cG9RGN9xL._SL1500_.jpg",
    },
    {
      id: "ho7",
      name: "Honor Watch 5",
      sku: "HONOR-WATCH5",
      category: "Wearables",
      description: "Affordable smartwatch with health tracking",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGNfVumRs3gtvKjm7oDz2SK4vs23sxumB1X0OkIeR9tgs-8t0-WFVkogZ_UnpskoeHVlkmWwxl52STXkMZ5cT_myKwe_8m",
    },
    {
      id: "ho8",
      name: "Honor Magic Earbuds",
      sku: "HONOR-MAGIC-BUDS",
      category: "Accessories",
      description: "Premium wireless earbuds with magic features",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQq4nmA0gq4thHduVuDosKz9mMqBSYqTl52F3CoVLHrQm8Yo0pDSShSNOXx0pt3sr3NZdoBw6FHGMMIr2ZTSlKhDiqmiuzPVg",
    },
    {
      id: "ho10",
      name: "Honor Watch Band",
      sku: "HONOR-BAND",
      category: "Accessories",
      description: "Replacement band for Honor Watch",
      image:
        "https://m.media-amazon.com/images/I/31Q7+7acxBL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "ho11",
      name: "Honor Earbud Charging Case",
      sku: "HONOR-CASE",
      category: "Accessories",
      description: "Replacement charging case for earbuds",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSId-3LIXc_1coR7-x9-DUkgqaJV1MHIwhwZRW9AIAGd4XAiET5oBhaYPlmtn7cqN8Tg8MS0mSHhEnV_POWEjbol1Dp0pva",
    },
  ],
};

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandProducts(slug: string): Product[] {
  return products[slug] || [];
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  Object.values(products).forEach((brandProducts) => {
    brandProducts.forEach((p) => {
      categories.add(p.category);
    });
  });

  const priority = ["Smartphones", "Audio", "Tablets", "Accessories"];
  const all = Array.from(categories);
  const pinned = priority.filter((c) => all.includes(c));
  const rest = all.filter((c) => !priority.includes(c)).sort();
  return [...pinned, ...rest];
}

export function getProductsByCategory(
  category: string,
): Array<Product & { brand: string }> {
  const result: Array<Product & { brand: string }> = [];
  Object.entries(products).forEach(([brand, brandProducts]) => {
    brandProducts.forEach((p) => {
      if (p.category === category) {
        result.push({ ...p, brand });
      }
    });
  });
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProduct(
  brand: string,
  productId: string,
): (Product & { brand: string }) | undefined {
  const brandProducts = products[brand];
  if (!brandProducts) return undefined;
  const product = brandProducts.find((p) => p.id === productId);
  return product ? { ...product, brand } : undefined;
}
