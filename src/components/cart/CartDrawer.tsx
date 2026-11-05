import { useEffect, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatKES } from '@/lib/format';
import CartCheckout from '@/components/cart/CartCheckout';

type CartView = 'items' | 'checkout';

export default function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, itemCount, setQty, removeItem } = useCart();
  const [view, setView] = useState<CartView>('items');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) setView('items');
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-cocoa-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-lift transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-cocoa-100 px-6 py-5">
          <div>
            <p className="eyebrow">Your order</p>
            <h2 className="text-2xl">{view === 'checkout' ? 'Checkout details' : `Basket (${itemCount})`}</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close order panel"
            className="rounded-full p-2 text-cocoa-600 transition-colors hover:bg-cocoa-100 hover:text-cocoa-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {view === 'checkout' ? (
          <CartCheckout lines={lines} subtotal={subtotal} onBack={() => setView('items')} />
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200 text-cocoa-500">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="text-2xl">Your basket is empty</h3>
            <p className="max-w-xs text-sm text-cocoa-600">
              Add breads, bakes or treats from the menu and they will appear here.
            </p>
            <a href="#menu" onClick={closeCart} className="btn-primary mt-2">
              Browse the menu
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-6">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-center gap-4 rounded-2xl border border-cocoa-100 bg-white p-4 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-cocoa-900">{line.title}</p>
                    <p className="text-sm text-cocoa-600">{formatKES(line.price * line.qty)}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-cocoa-200 bg-cream-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      aria-label={`Decrease ${line.title}`}
                      className="rounded-full p-1.5 text-cocoa-700 transition-colors hover:bg-cocoa-100"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      aria-label={`Increase ${line.title}`}
                      className="rounded-full p-1.5 text-cocoa-700 transition-colors hover:bg-cocoa-100"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.id)}
                    aria-label={`Remove ${line.title}`}
                    className="rounded-full p-2 text-cocoa-400 transition-colors hover:bg-error-100 hover:text-error-500"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-cocoa-100 bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-cocoa-600">Subtotal</span>
                <span className="text-xl font-semibold text-cocoa-900">{formatKES(subtotal)}</span>
              </div>
              <button type="button" onClick={() => setView('checkout')} className="btn-primary w-full">
                Continue to checkout
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
