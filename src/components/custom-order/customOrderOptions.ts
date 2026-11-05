import { Briefcase, Coffee, CakeSlice, Heart, Package, PartyPopper, UtensilsCrossed, type LucideIcon } from 'lucide-react';

export const OCCASIONS = [
  { id: 'Birthday', label: 'Birthday', icon: PartyPopper, blurb: 'Candles, character cakes and joyful surprises.' },
  { id: 'Wedding', label: 'Wedding', icon: Heart, blurb: 'Tiered cakes and dessert tables for your big day.' },
  { id: 'Corporate', label: 'Corporate', icon: Briefcase, blurb: 'Meetings, launches and team appreciation.' },
  { id: 'Daily Treat', label: 'Daily Treat', icon: Coffee, blurb: 'Fresh pastries and breads for everyday moments.' },
] as const satisfies readonly { id: string; label: string; icon: LucideIcon; blurb: string }[];

export const PRODUCT_TYPES = [
  { id: 'Cake', label: 'Custom Cake', icon: CakeSlice, blurb: 'Designed to your theme, colours and flavours.' },
  { id: 'Pastry Box', label: 'Pastry Box', icon: Package, blurb: 'A curated box of croissants, muffins and cookies.' },
  { id: 'Catering Platter', label: 'Catering Platter', icon: UtensilsCrossed, blurb: 'Sweet and savoury platters for gatherings.' },
] as const satisfies readonly { id: string; label: string; icon: LucideIcon; blurb: string }[];

export const DIETARY_OPTIONS = ['Vegan', 'Gluten-free', 'Less Sugar'] as const;

export const GUEST_MIN = 4;
export const GUEST_MAX = 300;

const PRICING: Record<(typeof PRODUCT_TYPES)[number]['id'], { perGuest: number; minimum: number }> = {
  Cake: { perGuest: 350, minimum: 3500 },
  'Pastry Box': { perGuest: 300, minimum: 2400 },
  'Catering Platter': { perGuest: 900, minimum: 6000 },
};

export function estimateOrder(productType: keyof typeof PRICING, guests: number): number {
  const rate = PRICING[productType];
  return Math.max(rate.minimum, rate.perGuest * guests);
}
