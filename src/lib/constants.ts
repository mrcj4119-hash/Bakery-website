export const BUSINESS = {
  name: 'Ambatana Kitchen',
  location: 'Nairobi, Kenya',
  phoneDisplay: '+254 700 000 000',
  whatsappNumber: '254700000000',
  email: 'hello@ambatanakitchen.co.ke',
  website: 'https://ambatanacommercialkitchen.co.ke/',
  hours: [
    { day: 'Monday - Friday', time: '7:00 AM - 7:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 6:00 PM' },
    { day: 'Sunday', time: 'Closed (catering by arrangement)' },
  ],
  social: [
    { label: 'Instagram', handle: '@ambatanakitchen', href: 'https://instagram.com/' },
    { label: 'Facebook', handle: 'Ambatana Kitchen', href: 'https://facebook.com/' },
    { label: 'TikTok', handle: '@ambatanakitchen', href: 'https://tiktok.com/' },
  ],
} as const;

export const WHATSAPP_GREETING = 'Hello Ambatana Kitchen, I would like to place an order.';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
  { label: 'Catering & Custom Orders', href: '#catering' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
] as const;
