export type MenuCategoryId = 'cakes' | 'breads' | 'healthy' | 'pastries';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  blurb: string;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  title: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'cakes',
    label: 'Signature Cakes',
    blurb: 'Birthdays, weddings and custom celebrations, designed around your story.',
  },
  {
    id: 'breads',
    label: 'Artisan Breads',
    blurb: 'Slow-fermented sourdough, wholegrain loaves and crisp baguettes.',
  },
  {
    id: 'healthy',
    label: 'Healthy Bakes',
    blurb: 'Gluten-free, sugar-free and wholesome bakes that taste like a treat.',
  },
  {
    id: 'pastries',
    label: 'Pastries & Treats',
    blurb: 'Laminated croissants, muffins and cookies baked fresh every morning.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'celebration-cake',
    category: 'cakes',
    title: 'Classic Celebration Cake',
    description: 'Vanilla or dark chocolate sponge, silky buttercream and a hand-finished top. Serves 10 to 12.',
    price: 3500,
    image: 'https://images.pexels.com/photos/32191353/pexels-photo-32191353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'wedding-tier',
    category: 'cakes',
    title: 'Wedding Tiered Cake',
    description: 'Two to three tiers with fresh florals, sculpted details and a tasting consultation. Priced from.',
    price: 12000,
    image: 'https://images.pexels.com/photos/20546572/pexels-photo-20546572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'character-cake',
    category: 'cakes',
    title: 'Custom Character Cake',
    description: 'Your favourite theme, colours or character brought to life in sugar and cream.',
    price: 4800,
    image: 'https://images.pexels.com/photos/32191357/pexels-photo-32191357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'cheesecake',
    category: 'cakes',
    title: 'Strawberry Cheesecake',
    description: 'Baked New York-style cheesecake, a buttery biscuit base and fresh berries.',
    price: 2800,
    image: 'https://images.pexels.com/photos/38858020/pexels-photo-38858020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'country-sourdough',
    category: 'breads',
    title: 'Country Sourdough Loaf',
    description: 'Seventy-two hour cold proof, open crumb and a deeply caramelised crust.',
    price: 450,
    image: 'https://images.pexels.com/photos/35993723/pexels-photo-35993723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'wholegrain-loaf',
    category: 'breads',
    title: 'Wholegrain Sandwich Loaf',
    description: 'Stone-ground wholewheat with sunflower and flax seeds. Ideal for daily sandwiches.',
    price: 380,
    image: 'https://images.pexels.com/photos/221442/pexels-photo-221442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'baguette',
    category: 'breads',
    title: 'Classic French Baguette',
    description: 'Crackling crust and airy interior, shaped by hand and baked to order.',
    price: 250,
    image: 'https://images.pexels.com/photos/36445213/pexels-photo-36445213.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'multigrain-batard',
    category: 'breads',
    title: 'Seeded Multigrain Batard',
    description: 'A rustic oval loaf packed with oats, rye and toasted seeds.',
    price: 520,
    image: 'https://images.pexels.com/photos/7966402/pexels-photo-7966402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'banana-oat-muffins',
    category: 'healthy',
    title: 'Banana Oat Muffins (Box of 4)',
    description: 'Naturally sweetened with ripe banana and dates, with a hint of cinnamon.',
    price: 900,
    image: 'https://images.pexels.com/photos/4692169/pexels-photo-4692169.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Sugar-free', 'Vegan'],
  },
  {
    id: 'almond-brownie',
    category: 'healthy',
    title: 'Gluten-Free Almond Brownie',
    description: 'Dense, fudgy and made with almond flour and dark cacao. Zero refined sugar.',
    price: 350,
    image: 'https://images.pexels.com/photos/6783155/pexels-photo-6783155.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Gluten-free', 'Sugar-free'],
  },
  {
    id: 'energy-bites',
    category: 'healthy',
    title: 'Date & Nut Energy Bites (6)',
    description: 'Almonds, cashews and dates rolled with coconut. A wholesome grab-and-go snack.',
    price: 600,
    image: 'https://images.pexels.com/photos/32214637/pexels-photo-32214637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Gluten-free', 'Vegan'],
  },
  {
    id: 'seed-granola-bars',
    category: 'healthy',
    title: 'Seed & Honey Granola Bars (4)',
    description: 'Oats, pumpkin seeds and a light drizzle of honey. Less sugar, more crunch.',
    price: 480,
    image: 'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Less sugar', 'Gluten-free'],
  },
  {
    id: 'butter-croissant',
    category: 'pastries',
    title: 'Butter Croissant',
    description: 'Twenty-four layers of laminated dough and rich French butter.',
    price: 220,
    image: 'https://images.pexels.com/photos/2245293/pexels-photo-2245293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'almond-croissant',
    category: 'pastries',
    title: 'Almond Croissant',
    description: 'Filled with frangipane and topped with toasted flaked almonds.',
    price: 320,
    image: 'https://images.pexels.com/photos/12660003/pexels-photo-12660003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'blueberry-muffin',
    category: 'pastries',
    title: 'Blueberry Muffin',
    description: 'Golden top, tender crumb and bursting wild blueberries.',
    price: 280,
    image: 'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
  {
    id: 'choc-chip-cookies',
    category: 'pastries',
    title: 'Chocolate Chip Cookies (4)',
    description: 'Crisp edges, chewy centres and generous pools of dark chocolate.',
    price: 400,
    image: 'https://images.pexels.com/photos/31228825/pexels-photo-31228825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: [],
  },
];
