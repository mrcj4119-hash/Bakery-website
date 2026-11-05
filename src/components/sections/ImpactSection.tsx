import { HandHeart, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/format';

const IMPACT_IMAGE = 'https://images.pexels.com/photos/7287693/pexels-photo-7287693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const COMMITMENTS = [
  'Profits from every order support community initiatives',
  'Empower Hope Leadership Center is a community program we proudly support',
  'Choosing Ambatana means choosing a bakery that gives back',
];

export default function ImpactSection() {
  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS.whatsappNumber,
    'Hello Ambatana Kitchen, I would like to learn more about your community impact.',
  );

  return (
    <section id="impact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-cocoa-800 text-cream-50 shadow-lift">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
          />
          <div className="relative grid items-center gap-12 p-8 sm:p-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-gold-300">Our impact</p>
              <h2 className="mt-4 text-4xl text-cream-50 sm:text-5xl">
                Every purchase supports the people around us
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cream-200">
                We believe a bakery can be a force for good. Ambatana Kitchen channels its profits into community
                initiatives, including the Empower Hope Leadership Center.
              </p>

              <ul className="mt-8 space-y-4">
                {COMMITMENTS.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3 text-cream-100">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/25 text-gold-300">
                      <HandHeart className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>{commitment}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Ask us about our impact
              </a>
            </div>

            <div className="relative">
              <img
                src={IMPACT_IMAGE}
                alt="Baker shaping dough in a warm, community-focused kitchen"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
              />
              <div className="absolute -bottom-6 left-6 rounded-2xl bg-cream-50 px-6 py-4 text-cocoa-900 shadow-lift">
                <p className="font-serif text-3xl font-semibold text-terracotta-600">100%</p>
                <p className="text-sm font-medium">of profits support community programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
