import { Check, MessageCircle, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BUSINESS } from '@/lib/constants';
import { formatKES, buildWhatsAppUrl } from '@/lib/format';
import type { MenuItem } from '@/data/menu';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem, getQty } = useCart();
  const qty = getQty(item.id);
  const inquireUrl = buildWhatsAppUrl(
    BUSINESS.whatsappNumber,
    `Hello Ambatana Kitchen, I would like to enquire about ${item.title} (${formatKES(item.price)}).`,
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-cocoa-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.tags.length > 0 && (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-success-500 shadow-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl leading-tight">{item.title}</h3>
          <p className="shrink-0 pt-1 text-sm font-semibold text-terracotta-600">{formatKES(item.price)}</p>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa-600">{item.description}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => addItem({ id: item.id, title: item.title, price: item.price })}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
              qty > 0
                ? 'bg-success-500 text-white hover:bg-success-500/90'
                : 'bg-cocoa-800 text-cream-50 hover:bg-cocoa-700'
            }`}
          >
            {qty > 0 ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            {qty > 0 ? `In order (${qty})` : 'Add to Order'}
          </button>
          <a
            href={inquireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-cocoa-200 px-4 py-2.5 text-sm font-semibold text-cocoa-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-whatsapp-600 hover:text-whatsapp-700 active:translate-y-0"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Quick Inquire
          </a>
        </div>
      </div>
    </article>
  );
}
