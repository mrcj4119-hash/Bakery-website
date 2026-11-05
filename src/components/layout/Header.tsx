import { useEffect, useState } from 'react';
import { ChefHat, Menu, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BUSINESS, NAV_LINKS, WHATSAPP_GREETING } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/format';
import MobileNav from '@/components/layout/MobileNav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = buildWhatsAppUrl(BUSINESS.whatsappNumber, WHATSAPP_GREETING);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'border-b border-cocoa-100 bg-cream-50/95 py-3 shadow-soft backdrop-blur-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-2.5" aria-label="Ambatana Kitchen home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cocoa-800 text-gold-300 transition-transform duration-500 group-hover:-rotate-12">
              <ChefHat className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-semibold leading-none text-cocoa-900 sm:text-2xl">
              Ambatana<span className="text-terracotta-600"> Kitchen</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-cocoa-700 transition-colors hover:bg-cocoa-100/70 hover:text-cocoa-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden px-4 py-2.5 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={openCart}
              aria-label={`View order, ${itemCount} items`}
              className="relative inline-flex items-center gap-2 rounded-full border border-cocoa-200 bg-white px-4 py-2.5 text-sm font-semibold text-cocoa-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-cocoa-400 hover:shadow-soft"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">View Order</span>
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-500 px-1 text-[11px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="rounded-full p-2.5 text-cocoa-800 transition-colors hover:bg-cocoa-100 xl:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} whatsappUrl={whatsappUrl} />
    </>
  );
}
