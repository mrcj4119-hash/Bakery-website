import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react';
import { useCart, type CartLine } from '@/context/CartContext';
import { BUSINESS } from '@/lib/constants';
import { formatKES, buildWhatsAppUrl } from '@/lib/format';
import { submitInquiry } from '@/lib/inquiries';
import { buildCartOrderMessage } from '@/lib/orderMessage';

interface CartCheckoutProps {
  lines: CartLine[];
  subtotal: number;
  onBack: () => void;
}

interface FormState {
  customerName: string;
  phone: string;
  email: string;
  fulfillment: 'pickup' | 'delivery';
  requestedDate: string;
  notes: string;
}

const INITIAL_FORM: FormState = {
  customerName: '',
  phone: '',
  email: '',
  fulfillment: 'pickup',
  requestedDate: '',
  notes: '',
};

const PHONE_PATTERN = /^\+?[0-9\s-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): string | null {
  if (!form.customerName.trim()) return 'Please enter your name.';
  if (!PHONE_PATTERN.test(form.phone.trim())) return 'Please enter a valid phone number.';
  if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) return 'Please enter a valid email address.';
  if (form.requestedDate && form.requestedDate < new Date().toISOString().slice(0, 10)) {
    return 'Please choose today or a future date.';
  }
  return null;
}

export default function CartCheckout({ lines, subtotal, onBack }: CartCheckoutProps) {
  const { clearCart } = useCart();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildMessage = () =>
    buildCartOrderMessage({
      lines,
      subtotal,
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      fulfillment: form.fulfillment,
      requestedDate: form.requestedDate,
      notes: form.notes.trim(),
    });

  const handleWhatsApp = () => {
    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    window.open(buildWhatsAppUrl(BUSINESS.whatsappNumber, buildMessage()), '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStatus('submitting');
    try {
      await submitInquiry({
        customer_name: form.customerName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        occasion: 'Other',
        product_type: 'Menu Order',
        guest_count: null,
        requested_date: form.requestedDate || null,
        fulfillment: form.fulfillment,
        dietary: [],
        items: lines.map(({ id, title, price, qty }) => ({ id, title, price, qty })),
        notes: form.notes.trim() || null,
      });
      setStatus('success');
      clearCart();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center animate-fade-up">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="text-3xl">Order received</h3>
        <p className="max-w-xs text-sm text-cocoa-600">
          Thank you, {form.customerName.trim()}. Our team will confirm your order on {form.phone.trim()} shortly.
        </p>
        <button type="button" onClick={onBack} className="btn-secondary mt-2">
          Back to menu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-cocoa-600 transition-colors hover:text-cocoa-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to order
        </button>

        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-cocoa-600">Full name</span>
            <input
              className="field"
              value={form.customerName}
              onChange={(e) => updateField('customerName', e.target.value)}
              maxLength={120}
              autoComplete="name"
              placeholder="Jane Wambui"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-cocoa-600">Phone</span>
              <input
                className="field"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                autoComplete="tel"
                placeholder="+254 7XX XXX XXX"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-cocoa-600">Email (optional)</span>
              <input
                className="field"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <fieldset className="space-y-1.5">
            <legend className="text-xs font-semibold uppercase tracking-wide text-cocoa-600">Fulfilment</legend>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-cream-200 p-1">
              {(['pickup', 'delivery'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={form.fulfillment === option}
                  onClick={() => updateField('fulfillment', option)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-all duration-200 ${
                    form.fulfillment === option
                      ? 'bg-white text-cocoa-900 shadow-soft'
                      : 'text-cocoa-600 hover:text-cocoa-900'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-cocoa-600">Date needed (optional)</span>
            <input
              className="field"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={form.requestedDate}
              onChange={(e) => updateField('requestedDate', e.target.value)}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-cocoa-600">Notes (optional)</span>
            <textarea
              className="field min-h-[88px] resize-y"
              value={form.notes}
              maxLength={2000}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Allergies, delivery address, or anything else we should know"
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="flex items-start gap-2 rounded-xl bg-error-100 px-4 py-3 text-sm text-error-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="flex items-start gap-2 rounded-xl bg-error-100 px-4 py-3 text-sm text-error-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            We could not save your order right now. Please try again or send it on WhatsApp.
          </p>
        )}
      </div>

      <div className="space-y-3 border-t border-cocoa-100 bg-white px-6 py-5">
        <div className="flex items-center justify-between text-sm text-cocoa-600">
          <span>Total</span>
          <span className="font-semibold text-cocoa-900">{formatKES(subtotal)}</span>
        </div>
        <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
          {status === 'submitting' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {status === 'submitting' ? 'Placing order...' : 'Place order'}
        </button>
        <button type="button" onClick={handleWhatsApp} className="btn-whatsapp w-full">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send order on WhatsApp
        </button>
      </div>
    </form>
  );
}
