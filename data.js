/* ─── Shared artist data ──────────────────────────────
   Loaded by index.html (via script.js).
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
    description: "Deconstructing urban chaos into geometric minimalism.",
    link: "https://zigguratss.com/artist/priyanka-bardhan",
    image: IMG[0],
    works: [
      { 
        title: "Metropolis Grid", 
        image: IMG[0], 
        desc: "In the digital age, Bardhan deconstructs the overwhelming chaos of the metropolis into a series of minimalist, geometric truths." 
      },
      { 
        title: "Urban Pulse", 
        desc: "Her abstract digital works analyze the 'grid' of modern life, using bold color palettes to represent the pulse of the city." 
      },
      { 
        title: "Mathematical Beauty", 
        desc: "Her aesthetic is one of precision and high-contrast, stripping away noise to reveal the mathematical beauty hidden beneath." 
      }
    ],
  },
  {
    artist: "Madhushree Pawar",
    location: "Ahmedabad, India",
    title: "The River Bank",
    year: "2025",
    medium: "Watercolor",
    description: "Immersive botanical studies of organic symmetry.",
    link: "https://zigguratss.com/artist/madhushree-pawar",
    image: IMG[1],
    works: [
      { 
        title: "Echoes of Flora", 
        image: IMG[1], 
        desc: "Pawar’s botanical studies are an immersive experience into the fragile symmetry and organic complexity of the natural world." 
      },
      { 
        title: "Botanical Wonder", 
        desc: "Her work celebrates the delicate life-cycles of plants, captured with a sensitivity that reminds us of the balance of our ecosystem." 
      },
      { 
        title: "Nature as Protagonist", 
        desc: "Through her lens, nature is not a backdrop but a protagonist, depicted with a deep sense of botanical wonder." 
      }
    ],
  },
  {
    artist: "Vivek Kisan Vadkar",
    location: "Karjat, India",
    title: "Legacy in Motion",
    year: "2025",
    medium: "Oil on Canvas",
    description: "Exploring the architectural soul and silent narratives of heritage.",
    link: "https://zigguratss.com/artist/vivek-kisan-vadkar",
    image: IMG[2],
    works: [
      { 
        title: "Silent Narratives", 
        image: IMG[2], 
        desc: "Vadkar’s work is a profound exploration of the architectural soul, transforming stone and heritage into a living, breathing canvas." 
      },
      { 
        title: "Heritage Light", 
        desc: "By manipulating light and shadow, he captures the 'silent narratives' of history, inviting the viewer into a world where time slows down." 
      },
      { 
        title: "Lost Eras", 
        desc: "His paintings do not merely depict a location; they tell a story of lost eras and the enduring beauty of ancient structures." 
      }
    ],
  },
  {
    artist: "Panchu Gharami",
    location: "Kolkata, India",
    title: "Sadhu 2",
    year: "2025",
    medium: "Acrylic on Canvas",
    description: "Vibrant tributes to cultural identity and rural rhythms.",
    link: "https://zigguratss.com/artist/panchu-gharami",
    image: IMG[3],
    works: [
      { 
        title: "Community Rhythms", 
        image: IMG[3], 
        desc: "Gharami’s narrative paintings are a vibrant tribute to cultural identity, focusing on the rhythmic simplicity of rural life." 
      },
      { 
        title: "Rural Monument", 
        desc: "He elevates everyday scenes into monumental celebrations of community and tradition with a bold use of color." 
      },
      { 
        title: "Folk Symmetry", 
        desc: "With a keen eye for folk-inspired symmetry, he creates a visual language that is both deeply local and universally resonant." 
      }
    ],
  },
  {
    artist: "Sangita Agarwal",
    location: "Rajasthan, India",
    title: "Buddha",
    year: "2025",
    medium: "Acrylic",
    description: "Meditations on divine devotion and spiritual iconography.",
    link: "https://zigguratss.com/artist/sangita-agarwal",
    image: IMG[4],
    works: [
      { 
        title: "Divine Devotion", 
        image: IMG[4], 
        desc: "Agarwal’s artistry occupies the sacred space between the mortal and the divine, blending portraiture with spiritual iconography." 
      },
      { 
        title: "Inner Stillness", 
        desc: "She creates hyper-realistic forms that seem to radiate an inner stillness, acting as a meditation on faith and enlightenment." 
      },
      { 
        title: "The Transcendental Soul", 
        desc: "Her work uses the human body as a vessel to explore themes of the transcendental nature of the soul and divine connection." 
      }
    ],
  },
  {
    artist: "Sanjana Patel",
    location: "Mumbai, India",
    title: "Kathaputli",
    year: "2025",
    medium: "Acrylic on Canvas",
    description: "Tactile journeys through traditional motifs and abstract layers.",
    link: "https://zigguratss.com/artist/sanjana-patel",
    image: IMG[5],
    works: [
      { 
        title: "Tactile Journey", 
        image: IMG[5], 
        desc: "Patel is a master of texture, utilizing a mix of techniques to bridge the gap between traditional motifs and abstract expressionism." 
      },
      { 
        title: "Visceral Study", 
        desc: "Her process is a visceral study of human feeling, where layers of material are built up to reveal a complex inner landscape." 
      },
      { 
        title: "Order within Chaos", 
        desc: "Each piece challenges the observer to find order within the chaos of color, serving as a tactile journey through emotion." 
      }
    ],
  },
  {
    artist: "Richard Anbudurai",
    location: "Chennai, India",
    title: "Held in Time",
    year: "2026",
    medium: "Canvas / Mixed Media",
    description: "Exploring the intersection of painting and memory.",
    link: "https://zigguratss.com/artist/richard-anbudurai",
    image: IMG[6],
    works: [
      { 
        title: "Colour Narratives", 
        image: IMG[6], 
        desc: "Anbudurai transforms fragile materials and memory into textured colour narratives, exploring the intersection of painting and sculpture." 
      },
      { 
        title: "Memory Fragment", 
        desc: "His work is a meditation on the permanence of memory, using fragments and traces to create a deeply personal visual language." 
      },
      { 
        title: "Passage of Time", 
        desc: "His pieces invite the viewer to reflect on the passage of time and the remnants of the past through textured, layered canvas." 
      }
    ],
  },
];
