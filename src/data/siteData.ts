// ================================================================
// LUXE BEAUTY SPA — Site Content & Configuration
// ================================================================

export const CONFIG = {
  whatsappNumber: '13055550100', // WhatsApp Business number (no + or spaces)
  phone:          '(305) 555-0100',
  email:          'hello@luxebeautyspa.com',
  address:        '1200 Brickell Avenue, Suite 1500',
  city:           'Miami, FL 33131',
  instagram:      'https://instagram.com/luxebeautyspa',
  facebook:       'https://facebook.com/luxebeautyspa',
  mapsEmbed:      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.5369386083344!2d-80.19180068496608!3d25.758465183637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69e1283c74f%3A0x41b06a40ea4cfe33!2sBrickell+Ave%2C+Miami%2C+FL!5e0!3m2!1sen!2sus!4v1234567890',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday',        time: '9:00 AM – 6:00 PM' },
    { day: 'Sunday',          time: '10:00 AM – 5:00 PM' },
  ],
};

/** Generates a WhatsApp booking URL for a given service */
export function buildWhatsAppLink(serviceName: string, price: number, duration: number): string {
  const text = encodeURIComponent(
    `Hello! I would like to book the ${serviceName} ($${price}, ${duration} minutes). Could you please help me schedule an appointment?`
  );
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

/** General WhatsApp inquiry link */
export function buildWhatsAppGeneral(note = ''): string {
  const text = encodeURIComponent(
    note || "Hello! I'd like to learn more about your services and book an appointment at Luxe Beauty Spa."
  );
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

// ── Services ─────────────────────────────────────────────────

export interface Service {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  featured?: boolean;
}

export const services: Service[] = [
  // ─ Facials ─
  {
    id: 'facial-signature',
    category: 'Facial',
    name: 'Luxe Signature Facial',
    tagline: 'Our most celebrated treatment',
    description: 'A 90-minute bespoke journey combining deep cleansing, 24K gold peptide infusion, and a relaxing sculpting massage. Skin emerges luminous, hydrated, and visibly transformed.',
    duration: 90, price: 195,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85',
    featured: true,
  },
  {
    id: 'facial-antiage',
    category: 'Facial',
    name: 'Advanced Anti-Aging Facial',
    tagline: 'Lift, firm and rejuvenate',
    description: 'Medical-grade retinol serums, collagen-boosting peptides, microcurrent stimulation, and LED therapy work in synergy to visibly lift and firm your complexion.',
    duration: 75, price: 225,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=85',
    featured: true,
  },
  {
    id: 'facial-hydra',
    category: 'Facial',
    name: 'HydraGlow Infusion',
    tagline: 'Plump, dewy, glass skin',
    description: 'Hyaluronic acid microinfusion paired with vitamin C brightening delivers moisture deep into every layer, leaving skin visibly plumper, brighter, and glowing.',
    duration: 60, price: 165,
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=85',
  },
  {
    id: 'facial-brightening',
    category: 'Facial',
    name: 'Vitamin C Brightening Facial',
    tagline: 'Fade spots, reveal radiance',
    description: 'High-potency vitamin C complex and niacinamide fade dark spots and hyperpigmentation while gentle exfoliation reveals a brilliant, even complexion.',
    duration: 60, price: 155,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=85',
  },
  // ─ Massage ─
  {
    id: 'massage-swedish',
    category: 'Massage',
    name: 'Swedish Relaxation Massage',
    tagline: 'Melt every tension away',
    description: 'Long, flowing effleurage strokes with warm aromatherapy oils — choose from lavender, eucalyptus or rose — guide your body into a state of complete, blissful calm.',
    duration: 60, price: 135,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=85',
    featured: true,
  },
  {
    id: 'massage-deep-tissue',
    category: 'Massage',
    name: 'Deep Tissue Restoration',
    tagline: 'Release deep chronic tension',
    description: 'Sustained deep pressure and slow friction techniques target adhesions in muscle tissue, providing lasting relief from neck, shoulder and lower back pain.',
    duration: 75, price: 165,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=85',
  },
  {
    id: 'massage-hot-stone',
    category: 'Massage',
    name: 'Volcanic Hot Stone Ritual',
    tagline: 'Ancient healing, modern luxury',
    description: 'Heated basalt stones placed along energy meridians and used as massage tools deliver penetrating warmth that melts tension at the deepest level. Pure transformation.',
    duration: 90, price: 195,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=85',
    featured: true,
  },
  {
    id: 'massage-prenatal',
    category: 'Massage',
    name: 'Prenatal Wellness Massage',
    tagline: 'Nurturing care for expecting mothers',
    description: 'Specially adapted for second and third trimester with supportive bolsters and pregnancy-safe aromatherapy oils. Eases back pain, swelling, and fatigue.',
    duration: 60, price: 145,
    image: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?w=800&q=85',
  },
  // ─ Body ─
  {
    id: 'body-gold',
    category: 'Body',
    name: '24K Gold Body Ritual',
    tagline: 'The ultimate skin luxury',
    description: 'Dry brushing, a champagne and brown sugar scrub, and our exclusive 24K gold-infused body butter create an unparalleled head-to-toe skin transformation.',
    duration: 120, price: 285,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=85',
    featured: true,
  },
  {
    id: 'body-scrub',
    category: 'Body',
    name: 'Mediterranean Salt & Rose Scrub',
    tagline: 'Renew and awaken your skin',
    description: 'Mineral-rich Dead Sea salts infused with pure Moroccan rose otto oil remove dead skin cells, boost circulation, and leave skin silky, smooth and delicately perfumed.',
    duration: 50, price: 115,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85',
  },
  {
    id: 'body-detox',
    category: 'Body',
    name: 'Detox Seaweed Body Wrap',
    tagline: 'Purify, remineralize, renew',
    description: 'Atlantic seaweed paste rich in minerals and amino acids is applied under thermal wraps to draw out toxins, reduce fluid retention and visibly tighten the skin.',
    duration: 75, price: 155,
    image: 'https://images.unsplash.com/photo-1601740734565-c9c6fad89fc5?w=800&q=85',
  },
  // ─ Beauty ─
  {
    id: 'beauty-lashes',
    category: 'Beauty',
    name: 'Volume Lash Extensions',
    tagline: 'Effortless, dramatic eyes',
    description: 'Ultra-fine Korean silk lashes individually applied to each natural lash for a fully customized look. Choose natural, glamour, or dramatic volume. Lasts 4–6 weeks.',
    duration: 90, price: 175,
    image: 'https://images.unsplash.com/photo-1583001930096-2b6e68a4a1b5?w=800&q=85',
  },
  {
    id: 'beauty-brows',
    category: 'Beauty',
    name: 'Precision Brow Architecture',
    tagline: 'Frame your face perfectly',
    description: 'Golden ratio mapping, precise shaping, tinting and lamination sculpt perfectly defined, full brows that complement your features and last up to 8 weeks.',
    duration: 45, price: 85,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85',
  },
  {
    id: 'beauty-mani',
    category: 'Beauty',
    name: 'Luxe Spa Manicure',
    tagline: 'Nails elevated to art',
    description: 'Aromatic soak, precise shaping, sugar scrub, collagen mask, warm paraffin treatment and a flawless gel polish from our curated collection of 200+ shades.',
    duration: 60, price: 75,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85',
  },
  {
    id: 'beauty-pedi',
    category: 'Beauty',
    name: 'Luxe Spa Pedicure',
    tagline: 'Pampered from ankle to toe',
    description: 'Mineral foot soak, professional callus removal, sea salt scrub, vitamin mask, a 15-minute lower leg massage and long-lasting gel polish. Complete indulgence.',
    duration: 75, price: 95,
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=85',
  },
];

export const SERVICE_CATEGORIES = ['All', 'Facial', 'Massage', 'Body', 'Beauty'] as const;

// ── Testimonials ──────────────────────────────────────────────

export const testimonials = [
  {
    id: 1,
    name: 'Alexandra Fontaine',
    initials: 'AF',
    rating: 5,
    text: "The 24K Gold Body Ritual was unlike anything I've ever experienced. My skin felt like silk for weeks. Isabella is a true artist — meticulous, knowledgeable and genuinely caring. This is now my monthly ritual without question.",
    service: '24K Gold Body Ritual',
    color: '#C9A96E',
  },
  {
    id: 2,
    name: 'Marcus & Rachel T.',
    initials: 'MR',
    rating: 5,
    text: "We booked couples hot stone massages for our anniversary and it was the most relaxing two hours of our lives. Sofia made us feel completely at ease. The spa is absolutely stunning — it feels like a European villa in the heart of Brickell.",
    service: 'Volcanic Hot Stone Ritual',
    color: '#A07840',
  },
  {
    id: 3,
    name: 'Camille Beaumont',
    initials: 'CB',
    rating: 5,
    text: "Maya's lash artistry is honestly unmatched in Miami. She took time to truly understand what I wanted and delivered something even more beautiful. I get compliments on my lashes every single day. Worth every penny.",
    service: 'Volume Lash Extensions',
    color: '#8B6B4A',
  },
  {
    id: 4,
    name: 'Jennifer Santos',
    initials: 'JS',
    rating: 5,
    text: "I had struggled with hyperpigmentation for years. After three sessions of the Anti-Aging Facial with Isabella, the transformation is remarkable — my dermatologist even noticed. This place is exceptional.",
    service: 'Advanced Anti-Aging Facial',
    color: '#C9A96E',
  },
  {
    id: 5,
    name: 'Victoria Harrington',
    initials: 'VH',
    rating: 5,
    text: "Luxe Beauty Spa has completely ruined other spas for me. The level of care in every single detail — the ambiance, the products, the expertise — sets a standard that nothing else comes close to. A true gem.",
    service: 'Detox Seaweed Body Wrap',
    color: '#A07840',
  },
  {
    id: 6,
    name: 'Diana Okafor',
    initials: 'DO',
    rating: 5,
    text: "The prenatal massage with Sofia during my third trimester was exactly what my body needed. She was so attentive and knowledgeable. Booking via WhatsApp was seamless — the whole experience was perfect.",
    service: 'Prenatal Wellness Massage',
    color: '#8B6B4A',
  },
];
