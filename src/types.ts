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
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Glazing Milk',
    category: 'Essence',
    price: 32,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
    concern: ['Dryness & dehydration', 'Sensitive skin']
  },
  {
    id: '2',
    name: 'Barrier Restore Cream',
    category: 'Moisturizer',
    price: 29,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    concern: ['Dryness & dehydration', 'Sensitive skin', 'Fine lines & aging']
  },
  {
    id: '3',
    name: 'Peptide Lip Treatment',
    category: 'Lip Care',
    price: 16,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    concern: ['Dryness & dehydration']
  },
  {
    id: '4',
    name: 'Pineapple Enzyme Cleanser',
    category: 'Cleanser',
    price: 24,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    concern: ['Congestion / clogged pores', 'Dull skin']
  }
];

export const CONCERNS: Concern[] = [
  {
    id: 'congestion',
    title: 'Congestion',
    description: 'Clogged pores & texture',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'dryness',
    title: 'Dryness',
    description: 'Dehydration & flakiness',
    image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'eye-care',
    title: 'Eye Care',
    description: 'Dark circles & puffiness',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'dullness',
    title: 'Dull Skin',
    description: 'Lack of radiance',
    image: 'https://images.unsplash.com/photo-1570172619380-2aa203c9e46b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'aging',
    title: 'Fine Lines',
    description: 'Aging & elasticity',
    image: 'https://images.unsplash.com/photo-1594125355930-3b96e56b9333?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'sensitive',
    title: 'Sensitive',
    description: 'Redness & irritation',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=400'
  }
];
