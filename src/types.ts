export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  concern: string[];
}

export interface Concern {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  imageScale?: number;
}

export const PRODUCTS: Product[] = [
  // Essence
  {
    id: '1',
    name: 'Glazing Milk',
    category: 'Essence',
    price: 31.99,
    image: '/products/glazing-milk.png',
    concern: ['dryness', 'sensitive']
  },
  {
    id: '5',
    name: 'Hydra-Boost Essence',
    category: 'Essence',
    price: 37.99,
    image: '/products/hydra-boost-essence.png',
    concern: ['dryness']
  },
  {
    id: '6',
    name: 'Brightening Niacinamide Essence',
    category: 'Essence',
    price: 41.99,
    image: '/products/brightening-niacinamide-essence.png',
    concern: ['dullness']
  },
  {
    id: '7',
    name: 'Fermented Rice Water Essence',
    category: 'Essence',
    price: 35.99,
    image: '/products/fermented-rice-water-essence.png',
    concern: ['dullness', 'aging']
  },
  {
    id: '8',
    name: 'Peptide Renewal Essence',
    category: 'Essence',
    price: 44.99,
    image: '/products/peptide-renewal-essence.png',
    concern: ['aging']
  },
  {
    id: '9',
    name: 'Centella Calming Essence',
    category: 'Essence',
    price: 38.99,
    image: '/products/centella-calming-essence.png',
    concern: ['sensitive']
  },
  {
    id: '10',
    name: 'Rose Hip Glow Essence',
    category: 'Essence',
    price: 33.99,
    image: '/products/rose-hip-glow-essence.png',
    concern: ['dullness', 'aging']
  },
  {
    id: '11',
    name: 'Snail Mucin Repair Essence',
    category: 'Essence',
    price: 40.99,
    image: '/products/snail-mucin-repair-essence.png',
    concern: ['sensitive', 'aging']
  },
  // Moisturizer
  {
    id: '2',
    name: 'Barrier Restore Cream',
    category: 'Moisturizer',
    price: 28.99,
    image: '/products/barrier-restore-cream.png',
    concern: ['dryness', 'sensitive', 'aging']
  },
  {
    id: '12',
    name: 'Ceramide Rich Moisturizer',
    category: 'Moisturizer',
    price: 43.99,
    image: '/products/ceramide-rich-moisturizer.png',
    concern: ['dryness', 'sensitive']
  },
  {
    id: '13',
    name: 'Lightweight Gel Moisturizer',
    category: 'Moisturizer',
    price: 37.99,
    image: '/products/lightweight-gel-moisturizer.png',
    concern: ['dullness']
  },
  {
    id: '14',
    name: 'Overnight Recovery Cream',
    category: 'Moisturizer',
    price: 51.99,
    image: '/products/overnight-recovery-cream.png',
    concern: ['aging', 'dryness']
  },
  {
    id: '15',
    name: 'Vitamin C Brightening Cream',
    category: 'Moisturizer',
    price: 47.99,
    image: '/products/vitamin-c-brightening-cream.png',
    concern: ['dullness']
  },
  {
    id: '16',
    name: 'Retinol Renewal Moisturizer',
    category: 'Moisturizer',
    price: 55.99,
    image: '/products/retinol-renewal-moisturizer.png',
    concern: ['aging']
  },
  {
    id: '17',
    name: 'Hydra-Plump Moisturizer',
    category: 'Moisturizer',
    price: 41.99,
    image: '/products/hydra-plump-moisturizer.png',
    concern: ['dryness']
  },
  {
    id: '18',
    name: 'Skin Tint Moisture Veil',
    category: 'Moisturizer',
    price: 45.99,
    image: '/products/skin-tint-moisture-veil.png',
    concern: ['dullness', 'sensitive']
  },
  // Lip Care
  {
    id: '3',
    name: 'Peptide Lip Treatment',
    category: 'Lip Care',
    price: 15.99,
    image: '/products/peptide-lip-treatment.png',
    concern: ['dry-lips', 'dryness']
  },
  {
    id: '19',
    name: 'Overnight Lip Mask',
    category: 'Lip Care',
    price: 17.99,
    image: '/products/overnight-lip-mask.png',
    concern: ['dry-lips', 'dryness']
  },
  {
    id: '20',
    name: 'Tinted Lip Balm',
    category: 'Lip Care',
    price: 13.99,
    image: '/products/tinted-lip-balm.png',
    concern: ['dry-lips', 'dryness']
  },
  {
    id: '21',
    name: 'Plumping Lip Serum',
    category: 'Lip Care',
    price: 21.99,
    image: '/products/plumping-lip-serum.png',
    concern: ['dry-lips', 'aging']
  },
  {
    id: '22',
    name: 'Exfoliating Lip Scrub',
    category: 'Lip Care',
    price: 14.99,
    image: '/products/exfoliating-lip-scrub.png',
    concern: ['dry-lips', 'dullness']
  },
  {
    id: '23',
    name: 'Nourishing Lip Oil',
    category: 'Lip Care',
    price: 19.99,
    image: '/products/nourishing-lip-oil.png',
    concern: ['dry-lips', 'dryness']
  },
  {
    id: '24',
    name: 'SPF Lip Shield',
    category: 'Lip Care',
    price: 15.99,
    image: '/products/spf-lip-shield.png',
    concern: ['dry-lips', 'sensitive']
  },
  {
    id: '25',
    name: 'Collagen Lip Butter',
    category: 'Lip Care',
    price: 18.99,
    image: '/products/collagen-lip-butter.png',
    concern: ['dry-lips', 'aging', 'dryness']
  },
  // Cleanser
  {
    id: '4',
    name: 'Pineapple Enzyme Cleanser',
    category: 'Cleanser',
    price: 23.99,
    image: '/products/pineapple-enzyme-cleanser.png',
    concern: ['dullness']
  },
  {
    id: '26',
    name: 'Gentle Foam Cleanser',
    category: 'Cleanser',
    price: 21.99,
    image: '/products/gentle-foam-cleanser.png',
    concern: ['sensitive']
  },
  {
    id: '27',
    name: 'Micellar Cleansing Water',
    category: 'Cleanser',
    price: 27.99,
    image: '/products/micellar-cleansing-water.png',
    concern: ['sensitive', 'dryness']
  },
  {
    id: '28',
    name: 'Oil-to-Milk Cleanser',
    category: 'Cleanser',
    price: 31.99,
    image: '/products/oil-to-milk-cleanser.png',
    concern: ['dryness']
  },
  {
    id: '29',
    name: 'Exfoliating AHA Cleanser',
    category: 'Cleanser',
    price: 25.99,
    image: '/products/exfoliating-aha-cleanser.png',
    concern: ['dullness', 'aging']
  },
  {
    id: '30',
    name: 'Hydrating Cream Cleanser',
    category: 'Cleanser',
    price: 23.99,
    image: '/products/hydrating-cream-cleanser.png',
    concern: ['dryness', 'sensitive']
  },
  {
    id: '31',
    name: 'Purifying Clay Cleanser',
    category: 'Cleanser',
    price: 27.99,
    image: '/products/purifying-clay-cleanser.png',
    concern: ['dullness']
  },
  {
    id: '32',
    name: 'Balancing Gel Cleanser',
    category: 'Cleanser',
    price: 24.99,
    image: '/products/balancing-gel-cleanser.png',
    concern: ['sensitive', 'dullness']
  },
  // Eye Care
  {
    id: '33',
    name: 'Collagen Eye Gel',
    category: 'Eye Care',
    price: 37.99,
    image: '/products/collagen-eye-gel.png',
    concern: ['eye-care']
  },
  {
    id: '34',
    name: 'Caffeine Eye Serum',
    category: 'Eye Care',
    price: 41.99,
    image: '/products/caffeine-eye-serum.png',
    concern: ['eye-care']
  },
  {
    id: '35',
    name: 'Brightening Eye Cream',
    category: 'Eye Care',
    price: 45.99,
    image: '/products/brightening-eye-cream.png',
    concern: ['eye-care', 'dullness']
  },
  {
    id: '36',
    name: 'Depuffing Eye Patches',
    category: 'Eye Care',
    price: 27.99,
    image: '/products/depuffing-eye-patches.png',
    concern: ['eye-care']
  },
  {
    id: '37',
    name: 'Retinol Eye Treatment',
    category: 'Eye Care',
    price: 53.99,
    image: '/products/retinol-eye-treatment.png',
    concern: ['eye-care', 'aging']
  },
  {
    id: '38',
    name: 'Hydrating Eye Mask',
    category: 'Eye Care',
    price: 23.99,
    image: '/products/hydrating-eye-mask.png',
    concern: ['eye-care', 'dryness']
  },
  {
    id: '39',
    name: 'Dark Circle Corrector',
    category: 'Eye Care',
    price: 47.99,
    image: '/products/dark-circle-corrector.png',
    concern: ['eye-care']
  },
  {
    id: '40',
    name: 'Lifting Eye Contour',
    category: 'Eye Care',
    price: 51.99,
    image: '/products/lifting-eye-contour.png',
    concern: ['eye-care', 'aging']
  },
  // Acne
  {
    id: '41',
    name: 'Zero Pore Clearing Serum',
    category: 'Serum',
    price: 43.99,
    image: '/products/clarity-bha-serum.png',
    concern: ['acne', 'dullness']
  }
];

export const CONCERNS: Concern[] = [
  {
    id: 'sensitive',
    title: 'Sensitive',
    description: 'Redness & irritation',
    image: '/concerns/sensitive.png',
    imagePosition: 'center 75%'
  },
  {
    id: 'eye-care',
    title: 'Eye Care',
    description: 'Dark circles & puffiness',
    image: '/concerns/eye-care.png',
    imagePosition: 'center 20%'
  },
  {
    id: 'dullness',
    title: 'Dull Skin',
    description: 'Lack of radiance',
    image: '/concerns/dull-skin.png',
    imagePosition: 'center 20%'
  },
  {
    id: 'aging',
    title: 'Fine Lines',
    description: 'Aging & elasticity',
    image: '/concerns/fine-lines.png',
    imagePosition: 'center 20%'
  },
  {
    id: 'dryness',
    title: 'Dryness',
    description: 'Dehydration & flakiness',
    image: '/concerns/dryness.png',
    imagePosition: 'center bottom',
    imageScale: 1.5
  },
  {
    id: 'dry-lips',
    title: 'Dry / Cracked Lips',
    description: 'Hydration & lip repair',
    image: '/concerns/dry-lips.png',
    imagePosition: 'center 20%'
  }
];
