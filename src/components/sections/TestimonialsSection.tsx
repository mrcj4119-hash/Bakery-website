import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Customer love</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Loved for taste, freshness and care</h2>
          <p className="mt-4 text-cocoa-600">
            From birthday cakes to daily sourdough, here is what customers across Nairobi say about us.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.id}
              className="flex flex-col rounded-3xl border border-cocoa-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-gold-500" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-terracotta-300" aria-hidden="true" />
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug text-cocoa-800">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-cocoa-100 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-100 text-sm font-bold text-terracotta-700">
                  {testimonial.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-cocoa-900">{testimonial.name}</span>
                  <span className="block text-xs text-cocoa-500">{testimonial.role}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
