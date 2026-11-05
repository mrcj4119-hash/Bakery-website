import { Check } from 'lucide-react';
import {
  DIETARY_OPTIONS,
  GUEST_MAX,
  GUEST_MIN,
  OCCASIONS,
  PRODUCT_TYPES,
  estimateOrder,
} from '@/components/custom-order/customOrderOptions';
import { formatKES } from '@/lib/format';

export interface CustomOrderData {
  occasion: string;
  productType: string;
  guests: number;
  requestedDate: string;
  fulfillment: 'pickup' | 'delivery';
  dietary: string[];
  customerName: string;
  phone: string;
  email: string;
  notes: string;
}

interface StepProps {
  data: CustomOrderData;
  onChange: (patch: Partial<CustomOrderData>) => void;
}

const LABEL = 'text-xs font-semibold uppercase tracking-wide text-cocoa-600';

export function OccasionStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset className="space-y-3">
        <legend className={`${LABEL} mb-3`}>What is the occasion?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {OCCASIONS.map((option) => {
            const Icon = option.icon;
            const selected = data.occasion === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ occasion: option.id })}
                className={`group flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  selected
                    ? 'border-terracotta-500 bg-terracotta-100/60 shadow-soft'
                    : 'border-cocoa-100 bg-white hover:border-cocoa-300 hover:shadow-sm'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    selected ? 'bg-terracotta-500 text-white' : 'bg-cream-200 text-cocoa-700 group-hover:bg-cream-300'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-cocoa-900">{option.label}</span>
                  <span className="mt-0.5 block text-sm text-cocoa-600">{option.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className={`${LABEL} mb-3`}>What would you like us to make?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PRODUCT_TYPES.map((option) => {
            const Icon = option.icon;
            const selected = data.productType === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ productType: option.id })}
                className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  selected
                    ? 'border-terracotta-500 bg-terracotta-100/60 shadow-soft'
                    : 'border-cocoa-100 bg-white hover:border-cocoa-300 hover:shadow-sm'
                }`}
              >
                <Icon className={`h-6 w-6 ${selected ? 'text-terracotta-600' : 'text-cocoa-500'}`} aria-hidden="true" />
                <span className="font-semibold text-cocoa-900">{option.label}</span>
                <span className="text-sm text-cocoa-600">{option.blurb}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export function DetailsStep({ data, onChange }: StepProps) {
  const estimate = data.productType
    ? estimateOrder(data.productType as (typeof PRODUCT_TYPES)[number]['id'], data.guests)
    : null;
  const progress = ((data.guests - GUEST_MIN) / (GUEST_MAX - GUEST_MIN)) * 100;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-cocoa-100 bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className={LABEL}>Guests / servings</p>
            <p className="mt-1 font-serif text-4xl font-semibold text-cocoa-900 tabular-nums">{data.guests}</p>
          </div>
          <div className="text-right">
            <p className={LABEL}>Indicative price</p>
            <p className="mt-1 text-xl font-semibold text-terracotta-600">
              {estimate !== null ? `from ${formatKES(estimate)}` : 'Choose a product'}
            </p>
          </div>
        </div>
        <input
          type="range"
          min={GUEST_MIN}
          max={GUEST_MAX}
          step={2}
          value={data.guests}
          aria-label="Number of guests or servings"
          onChange={(e) => onChange({ guests: Number(e.target.value) })}
          className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-300 accent-terracotta-500"
          style={{ backgroundImage: `linear-gradient(to right, #c26a3f ${progress}%, #ebdcc2 ${progress}%)` }}
        />
        <p className="mt-3 text-xs text-cocoa-500">
          Estimates are indicative. Our team confirms the final quote after reviewing your request.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className={LABEL}>Date needed</span>
          <input
            type="date"
            className="field"
            min={new Date().toISOString().slice(0, 10)}
            value={data.requestedDate}
            onChange={(e) => onChange({ requestedDate: e.target.value })}
          />
        </label>

        <fieldset className="space-y-2">
          <legend className={`${LABEL} mb-2`}>Pickup or delivery</legend>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-cream-200 p-1">
            {(['pickup', 'delivery'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={data.fulfillment === option}
                onClick={() => onChange({ fulfillment: option })}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${
                  data.fulfillment === option ? 'bg-white text-cocoa-900 shadow-soft' : 'text-cocoa-600 hover:text-cocoa-900'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset className="space-y-3">
        <legend className={`${LABEL} mb-3`}>Special dietary requests</legend>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => {
            const selected = data.dietary.includes(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  onChange({
                    dietary: selected ? data.dietary.filter((d) => d !== option) : [...data.dietary, option],
                  })
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  selected
                    ? 'border-success-500 bg-success-100 text-success-500'
                    : 'border-cocoa-200 bg-white text-cocoa-700 hover:border-cocoa-400'
                }`}
              >
                {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export function ContactStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 sm:col-span-2">
          <span className={LABEL}>Full name</span>
          <input
            className="field"
            maxLength={120}
            autoComplete="name"
            placeholder="Jane Wambui"
            value={data.customerName}
            onChange={(e) => onChange({ customerName: e.target.value })}
          />
        </label>
        <label className="block space-y-2">
          <span className={LABEL}>Phone (WhatsApp preferred)</span>
          <input
            className="field"
            type="tel"
            autoComplete="tel"
            placeholder="+254 7XX XXX XXX"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </label>
        <label className="block space-y-2">
          <span className={LABEL}>Email (optional)</span>
          <input
            className="field"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </label>
      </div>
      <label className="block space-y-2">
        <span className={LABEL}>Design ideas or notes (optional)</span>
        <textarea
          className="field min-h-[120px] resize-y"
          maxLength={2000}
          placeholder="Flavours, colours, theme, delivery address, allergies..."
          value={data.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </label>
    </div>
  );
}
