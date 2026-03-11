/* ─── Shared artist data ──────────────────────────────
   Loaded by both index.html (via script.js) and
   artist.html (via artist-page.js).
──────────────────────────────────────────────────── */

/* Image pool */
const IMG = [
  "https://zigguratss.com/assets/upload/artist/zigguratss_6ca65eccfa604a95f3bff20f64e5fbd8.jpg", // 0 Priyanka
  "https://zigguratss.com/assets/upload/artist/zigguratss_7cb4901b38fa7a380ae9dbafc8eb2b42.jpg", // 1 Madhushree
  "https://zigguratss.com/assets/upload/artist/zigguratss_fbcb02ffe4f2ed72538c4e24054f74e3.png", // 2 Vivek
  "https://zigguratss.com/assets/upload/artist/zigguratss_bc6b2b722eb5f6f13e40a325fa017aac.jpg", // 3 Panchu
  "https://zigguratss.com/assets/upload/artist/zigguratss_83c3b422adf2f31766d3f171c6af966f.jpg", // 4 Sangita
  "https://zigguratss.com/assets/upload/artist-871.jpg",   // 5 Sanjana
  "https://zigguratss.com/assets/upload/artist-866.jpeg",  // 6 Richard
];

const projects = [
  {
    artist: "Priyanka Bardhan",
    location: "Delhi, India",
    title: "Eternal Grace",
    year: "2025",
    medium: "Acrylic and Oil",
    description:
      "Delhi-based contemporary painter blending Indian traditional themes with abstract expression to create distinct, symbolic compositions that transcend the ordinary.",
    image: IMG[0],
    works: [
      { title: "Eternal Grace",  image: IMG[0] },
      { title: "Sacred Forms",   image: IMG[1] },
      { title: "Mystic Layers",  image: IMG[3] },
      { title: "Golden Hour",    image: IMG[4] },
      { title: "Inner Light",    image: IMG[5] },
      { title: "Bloom",          image: IMG[6] },
    ],
  },
  {
    artist: "Madhushree Pawar",
    location: "Ahmedabad, India",
    title: "The River Bank",
    year: "2025",
    medium: "Watercolor",
    description:
      "A self-taught artist from Ahmedabad whose work is rooted in nature, spirituality, and a watercolor-led sense of calm. Her paintings evoke meditation and stillness.",
    image: IMG[1],
    works: [
      { title: "The River Bank", image: IMG[1] },
      { title: "Morning Mist",   image: IMG[2] },
      { title: "Still Waters",   image: IMG[4] },
      { title: "Monsoon",        image: IMG[5] },
      { title: "Silence",        image: IMG[6] },
      { title: "Tide",           image: IMG[0] },
    ],
  },
  {
    artist: "Vivek Kisan Vadkar",
    location: "Karjat, India",
    title: "Legacy in Motion",
    year: "2025",
    medium: "Oil on Canvas",
    description:
      "Karjat-based fine artist with 18 years of practice, known for emotionally charged figurative work and a strong exhibition history across India and abroad.",
    image: IMG[2],
    works: [
      { title: "Legacy in Motion", image: IMG[2] },
      { title: "Strength",         image: IMG[3] },
      { title: "Devotion",         image: IMG[4] },
      { title: "The Elders",       image: IMG[5] },
      { title: "Shadow Play",      image: IMG[6] },
      { title: "Portrait III",     image: IMG[0] },
    ],
  },
  {
    artist: "Panchu Gharami",
    location: "Kolkata, India",
    title: "Sadhu 2",
    year: "2025",
    medium: "Acrylic on Canvas",
    description:
      "Kolkata artist inspired by rural Bengal, spirituality, and textured semi-realistic painting with dramatic light-and-shadow treatment that captures the soul of the countryside.",
    image: IMG[3],
    works: [
      { title: "Sadhu 2",        image: IMG[3] },
      { title: "The Wanderer",   image: IMG[4] },
      { title: "Dust & Light",   image: IMG[5] },
      { title: "Contemplation",  image: IMG[6] },
      { title: "Village Path",   image: IMG[0] },
      { title: "Dhol",           image: IMG[1] },
    ],
  },
  {
    artist: "Sangita Agarwal",
    location: "Rajasthan, India",
    title: "Buddha",
    year: "2025",
    medium: "Acrylic",
    description:
      "Self-taught painter creating mythic and spiritual narratives through bold palettes, decorative detail, and stylized contemporary forms rooted in Indian iconography.",
    image: IMG[4],
    works: [
      { title: "Buddha",       image: IMG[4] },
      { title: "Radha",        image: IMG[5] },
      { title: "Cosmic Dance", image: IMG[6] },
      { title: "Lotus",        image: IMG[0] },
      { title: "Temple Wall",  image: IMG[1] },
      { title: "Festival",     image: IMG[2] },
    ],
  },
  {
    artist: "Sanjana Patel",
    location: "Mumbai, India",
    title: "Kathaputli",
    year: "2025",
    medium: "Acrylic on Canvas",
    description:
      "Mumbai-based self-taught artist drawing from travel, culture, mythology, and tradition with a fresh, bold painting language that celebrates India's folk heritage.",
    image: IMG[5],
    works: [
      { title: "Kathaputli",   image: IMG[5] },
      { title: "The Banjaran", image: IMG[6] },
      { title: "Nomad",        image: IMG[0] },
      { title: "Folk Song",    image: IMG[1] },
      { title: "Bazaar",       image: IMG[2] },
      { title: "Harvest",      image: IMG[3] },
    ],
  },
  {
    artist: "Richard Anbudurai",
    location: "Chennai, India",
    title: "Held in Time",
    year: "2026",
    medium: "Canvas / Mixed Media",
    description:
      "Chennai artist transforming fragile materials and memory into textured colour narratives spanning painting, sculpture, and murals with deeply personal visual language.",
    image: IMG[6],
    works: [
      { title: "Held in Time", image: IMG[6] },
      { title: "Remnants",     image: IMG[5] },
      { title: "Archive",      image: IMG[4] },
      { title: "Trace",        image: IMG[3] },
      { title: "Fragment",     image: IMG[2] },
      { title: "Memory Box",   image: IMG[1] },
    ],
  },
];
