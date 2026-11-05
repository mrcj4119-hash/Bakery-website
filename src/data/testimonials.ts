export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Wanjiru M.',
    role: 'Birthday cake, Kilimani',
    quote: 'The cake tasted as beautiful as it looked. Every guest asked where we ordered from. The delivery arrived right on time across town.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Brian O.',
    role: 'Office catering, Westlands',
    quote: 'We ordered pastry boxes for a team meeting. Croissants were flaky and fresh, and the team loved the healthy bakes too.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Amina K.',
    role: 'Gluten-free weekly order',
    quote: 'Finally a bakery that gets gluten-free right. The almond brownies are rich and satisfying, with no compromise on flavour.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'David N.',
    role: 'Sourdough subscriber, Karen',
    quote: 'The sourdough has a proper crust and a tangy, open crumb. Knowing my purchase supports community programs makes it even better.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Grace A.',
    role: 'Wedding tiered cake',
    quote: 'The team listened carefully to our vision and delivered a stunning wedding cake. Professional, warm and genuinely caring.',
    rating: 5,
  },
  {
    id: 't6',
    name: 'Peter S.',
    role: 'Pastry platter, Lavington',
    quote: 'Prompt responses on WhatsApp and a quick delivery for our family gathering. Fresh bakes every single time we order.',
    rating: 5,
  },
];
