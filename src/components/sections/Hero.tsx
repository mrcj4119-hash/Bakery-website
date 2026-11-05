import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/format';

const HERO_IMAGES = {
  main: 'https://images.pexels.com/photos/7405059/pexels-photo-7405059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cake: 'https://images.pexels.com/photos/32191353/pexels-photo-32191353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bread: 'https://images.pexels.com/photos/35993723/pexels-photo-35993723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const STATS = [
  { value: 'Baked daily', label: 'Fresh from our kitchen' },
  { value: '4 ranges', label: 'Cakes, breads, healthy & pastries' },
  { value: '100%', label: 'Profits support community' },
];

export default function Hero() {
  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS.whatsappNumber,
    'Hello Ambatana Kitchen, I would like to order from your bakery.',
  );

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold-100/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-terracotta-100/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="eyebrow animate-fade-up">Artisan bakery | Nairobi</p>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl animate-fade-up [animation-delay:120ms]">
            Freshly Baked Artistry,
            <span className="mt-2 block italic text-terracotta-600">Crafted with Purpose.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-cocoa-600 sm:text-lg animate-fade-up [animation-delay:240ms]">
            Explore our signature healthy bakes, artisan breads, custom cakes and daily pastries, made fresh in
            Nairobi. Every order helps fund community programs like the Empower Hope Leadership Center.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-up [animation-delay:360ms]">
            <a href="#menu" className="btn-primary">
              Explore Bakery Menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Order Direct on WhatsApp
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-cocoa-200/70 pt-8 animate-fade-up [animation-delay:480ms]">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-xl font-semibold text-cocoa-900 sm:text-2xl">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-cocoa-600 sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-5 grid-rows-2 gap-4 sm:gap-5">
            <figure className="group relative col-span-5 row-span-1 overflow-hidden rounded-3xl shadow-lift animate-fade-up [animation-delay:200ms] sm:col-span-3">
              <img
                src={HERO_IMAGES.main}
                alt="A glass display case of freshly baked pastries and breads"
                className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
            <figure className="group relative col-span-5 overflow-hidden rounded-3xl shadow-soft animate-fade-up [animation-delay:320ms] sm:col-span-2">
              <img
                src={HERO_IMAGES.cake}
                alt="A celebration cake with colourful icing"
                className="h-full min-h-[180px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
            <figure className="group relative col-span-5 overflow-hidden rounded-3xl shadow-soft animate-fade-up [animation-delay:440ms] sm:col-span-5">
              <img
                src={HERO_IMAGES.bread}
                alt="Artisan loaves arranged on rustic wooden shelves"
                className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-56"
              />
            </figure>
          </div>

          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift animate-fade-up [animation-delay:600ms] sm:left-8">
            <div className="flex gap-0.5 text-gold-500" aria-label="Rated five stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="text-sm font-semibold text-cocoa-900">Loved across Nairobi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
