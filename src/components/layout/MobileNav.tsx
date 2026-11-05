import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export default function MobileNav({ open, onClose, whatsappUrl }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      className={`fixed inset-0 z-40 xl:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-cocoa-900/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-cream-50 px-6 pb-8 pt-28 shadow-lift transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{ transitionDelay: open ? `${index * 40}ms` : '0ms' }}
              className={`rounded-xl px-4 py-3 font-serif text-2xl text-cocoa-900 transition-all duration-300 hover:bg-cocoa-100 hover:text-terracotta-600 ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-auto w-full"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
