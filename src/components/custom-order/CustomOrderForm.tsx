import { useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react';
import { ContactStep, DetailsStep, OccasionStep, type CustomOrderData } from '@/components/custom-order/CustomOrderSteps';
import { estimateOrder, GUEST_MIN, PRODUCT_TYPES } from '@/components/custom-order/customOrderOptions';
import { BUSINESS } from '@/lib/constants';
import { buildWhatsAppUrl, formatKES } from '@/lib/format';
import { submitInquiry } from '@/lib/inquiries';

const STEPS = ['Occasion', 'Details', 'Contact'] as const;
const PHONE_PATTERN = /^\+?[0-9\s-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_DATA: CustomOrderData = {
  occasion: '',
  productType: '',
  guests: 20,
  requestedDate: '',
  fulfillment: 'pickup',
  dietary: [],
  customerName: '',
  phone: '',
  email: '',
  notes: '',
};

function validateStep(step: number, data: CustomOrderData): string | null {
  if (step === 0 && (!data.occasion || !data.productType)) {
    return 'Please choose an occasion and a product type to continue.';
  }
  if (step === 1) {
    if (!data.requestedDate) return 'Please choose the date you need your order.';
    if (data.requestedDate < new Date().toISOString().slice(0, 10)) return 'Please choose today or a future date.';
  }
  if (step === 2) {
    if (!data.customerName.trim()) return 'Please enter your name.';
    if (!PHONE_PATTERN.test(data.phone.trim())) return 'Please enter a valid phone number.';
    if (data.email.trim() && !EMAIL_PATTERN.test(data.email.trim())) return 'Please enter a valid email address.';
  }
  return null;
}

function buildInquiryMessage(data: CustomOrderData): string {
  const product = PRODUCT_TYPES.find((p) => p.id === data.productType)?.label ?? data.productType;
  const estimate = estimateOrder(data.productType as (typeof PRODUCT_TYPES)[number]['id'], data.guests);
  return [
    'Hello Ambatana Kitchen, I would like to request a custom order:',
    `Occasion: ${data.occasion}`,
    `Product: ${product}`,
    `Guests / servings: ${data.guests}`,
    `Indicative price: from ${formatKES(estimate)}`,
    `Date needed: ${data.requestedDate} (${data.fulfillment})`,
    data.dietary.length ? `Dietary: ${data.dietary.join(', ')}` : null,
    `Name: ${data.customerName.trim()}`,
    `Phone: ${data.phone.trim()}`,
    data.notes.trim() ? `Notes: ${data.notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export default function CustomOrderForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CustomOrderData>(INITIAL_DATA);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const patch = (changes: Partial<CustomOrderData>) => {
    setData((prev) => ({ ...prev, ...changes }));
    setError(null);
  };

  const goNext = () => {
    const validationError = validateStep(step, data);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStep((current) => Math.max(current - 1, 0));
  };

  const reset = () => {
    setData(INITIAL_DATA);
    setStep(0);
    setError(null);
    setStatus('idle');
  };

  const handleSubmit = async () => {
    const validationError = validateStep(2, data);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStatus('submitting');
    try {
      await submitInquiry({
        customer_name: data.customerName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim() || null,
        occasion: data.occasion,
        product_type: data.productType,
        guest_count: data.guests,
        requested_date: data.requestedDate,
        fulfillment: data.fulfillment,
        dietary: data.dietary,
        items: [],
        notes: data.notes.trim() || null,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleWhatsApp = () => {
    const validationError = validateStep(2, data);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    window.open(buildWhatsAppUrl(BUSINESS.whatsappNumber, buildInquiryMessage(data)), '_blank', 'noopener,noreferrer');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-cocoa-100 bg-white px-8 py-14 text-center shadow-soft animate-fade-up">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-4xl">Your request is in</h3>
        <p className="mt-3 max-w-md text-cocoa-600">
          Thank you, {data.customerName.trim()}. Our team will review your {data.occasion.toLowerCase()} order and
          reach out on {data.phone.trim()} with a final quote.
        </p>
        <button type="button" onClick={reset} className="btn-secondary mt-8">
          Start another request
        </button>
      </div>
    );
  }

  const isLast = step === STEPS.length - 1;
  const estimate = data.productType
    ? estimateOrder(data.productType as (typeof PRODUCT_TYPES)[number]['id'], data.guests)
    : null;
  const progressPercent = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="rounded-3xl border border-cocoa-100 bg-white shadow-soft">
      <div className="border-b border-cocoa-100 px-6 pb-6 pt-6 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <ol className="flex flex-1 items-center gap-2 sm:gap-3" aria-label="Form progress">
            {STEPS.map((label, index) => {
              const done = index < step;
              const active = index === step;
              return (
                <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                      done || active ? 'bg-cocoa-800 text-cream-50' : 'bg-cream-300 text-cocoa-600'
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={`truncate text-sm font-medium ${active ? 'text-cocoa-900' : 'text-cocoa-500'}`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-cream-300">
          <div
            className="h-full rounded-full bg-terracotta-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <div key={step} className="animate-fade-up">
          {step === 0 && <OccasionStep data={data} onChange={patch} />}
          {step === 1 && <DetailsStep data={data} onChange={patch} />}
          {step === 2 && <ContactStep data={data} onChange={patch} />}
        </div>

        {step === 2 && (
          <dl className="mt-8 grid gap-3 rounded-2xl bg-cream-100 p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-cocoa-500">Order</dt>
              <dd className="font-semibold text-cocoa-900">
                {data.occasion} | {PRODUCT_TYPES.find((p) => p.id === data.productType)?.label}
              </dd>
            </div>
            <div>
              <dt className="text-cocoa-500">Indicative price</dt>
              <dd className="font-semibold text-terracotta-600">
                {estimate !== null ? `from ${formatKES(estimate)}` : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-cocoa-500">Guests / servings</dt>
              <dd className="font-semibold text-cocoa-900">{data.guests || GUEST_MIN}</dd>
            </div>
            <div>
              <dt className="text-cocoa-500">Date and handover</dt>
              <dd className="font-semibold capitalize text-cocoa-900">
                {data.requestedDate || '-'} | {data.fulfillment}
              </dd>
            </div>
          </dl>
        )}

        {error && (
          <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-error-100 px-4 py-3 text-sm text-error-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-error-100 px-4 py-3 text-sm text-error-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            We could not send your request right now. Please try again or send it on WhatsApp.
          </p>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-cocoa-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={goBack} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          ) : (
            <span />
          )}

          {!isLast ? (
            <button type="button" onClick={goNext} className="btn-primary">
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handleWhatsApp} className="btn-whatsapp">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Send on WhatsApp
              </button>
              <button type="button" onClick={handleSubmit} disabled={status === 'submitting'} className="btn-primary">
                {status === 'submitting' ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {status === 'submitting' ? 'Sending...' : 'Submit request'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
