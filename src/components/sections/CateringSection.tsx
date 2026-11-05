import { CheckCircle2 } from 'lucide-react';
import CustomOrderForm from '@/components/custom-order/CustomOrderForm';

const CATERING_IMAGE = 'https://images.pexels.com/photos/28976214/pexels-photo-28976214.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const SERVICES = [
  'Custom celebration and wedding cakes',
  'Pastry boxes for offices and events',
  'Sweet and savoury catering platters',
  'Dietary-friendly options on request',
];

export default function CateringSection() {
  return (
    <section id="catering" className="scroll-mt-24 bg-cream-200/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <p className="eyebrow">Catering & custom orders</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Let us craft the centrepiece of your day</h2>
            <p className="mt-5 text-lg leading-relaxed text-cocoa-600">
              Tell us about your occasion and we will prepare an indicative price. Our team confirms the final quote
              and delivery details within a working day.
            </p>

            <ul className="mt-8 space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-3 text-cocoa-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success-500" aria-hidden="true" />
                  {service}
                </li>
              ))}
            </ul>

            <img
              src={CATERING_IMAGE}
              alt="Elegant buffet spread with gourmet bites and pastries"
              loading="lazy"
              className="mt-10 hidden aspect-[16/10] w-full rounded-3xl object-cover shadow-soft lg:block"
            />
          </div>

          <div className="lg:col-span-7">
            <CustomOrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
