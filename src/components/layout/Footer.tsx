import { ChefHat, Clock, Facebook, Instagram, MapPin, MessageCircle, Phone, Mail, Music2 } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/format';

const SOCIAL_ICONS = {
  Instagram,
  Facebook,
  TikTok: Music2,
} as const;

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl(BUSINESS.whatsappNumber, 'Hello Ambatana Kitchen, I have a question.');

  return (
    <footer className="bg-cocoa-900 text-cream-200">
      <section id="contact" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-cocoa-900">
              <ChefHat className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-2xl font-semibold text-cream-50">Ambatana Kitchen</span>
          </a>
          <p className="mt-5 text-sm leading-relaxed text-cocoa-200">
            Freshly baked artistry, crafted with purpose. Artisan breads, healthy bakes and custom celebrations from
            Nairobi.
          </p>
          <p className="mt-6 inline-flex rounded-full bg-gold-500/15 px-4 py-2 text-xs font-semibold text-gold-300">
            100% of profits support community programs
          </p>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">Quick links</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-cocoa-100 transition-colors hover:text-gold-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">Visit & hours</h3>
          <ul className="mt-5 space-y-4 text-sm text-cocoa-100">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
              {BUSINESS.location}
            </li>
            {BUSINESS.hours.map((slot) => (
              <li key={slot.day} className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                <span>
                  <span className="block font-medium text-cream-50">{slot.day}</span>
                  <span className="text-cocoa-200">{slot.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-cocoa-100">
            <li>
              <a href={`tel:${BUSINESS.phoneDisplay.replace(/\s/g, '')}`} className="flex items-center gap-3 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 transition-colors hover:text-gold-300">
                <Mail className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-600"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </li>
          </ul>

          <div className="mt-8 flex gap-3">
            {BUSINESS.social.map((item) => {
              const Icon = SOCIAL_ICONS[item.label as keyof typeof SOCIAL_ICONS];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label}: ${item.handle}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-600 text-cocoa-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-cocoa-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cocoa-300 sm:flex-row sm:px-8">
          <p>&copy; Ambatana Kitchen. All Rights Reserved.</p>
          <p>100% of profits support community programs.</p>
        </div>
      </div>
    </footer>
  );
}
