import { ChefHat, Leaf, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    body: 'We source quality flour, real butter and seasonal fruit, and bake in small batches so every loaf and pastry is fresh.',
  },
  {
    icon: Users,
    title: 'Community Impact',
    body: 'Profits from every order are reinvested in community programs, so your treat also uplifts someone close to home.',
  },
  {
    icon: ChefHat,
    title: 'Expert Craftsmanship',
    body: 'Our bakers train for years in laminated doughs, sugar artistry and slow fermentation, and it shows in every bite.',
  },
];

const ABOUT_IMAGE = 'https://images.pexels.com/photos/6280041/pexels-photo-6280041.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={ABOUT_IMAGE}
                alt="Hands kneading dough dusted with flour on a bakery table"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-cocoa-800 px-6 py-5 text-cream-50 shadow-lift sm:block">
              <p className="font-serif text-3xl font-semibold text-gold-300">Baking a Difference</p>
              <p className="mt-1 text-sm text-cream-200">Every loaf gives back</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">About us</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Baking a Difference</h2>
            <p className="mt-6 text-lg leading-relaxed text-cocoa-600">
              Ambatana Kitchen was built on a simple belief: good bread and beautiful cakes should nourish the people
              who eat them, and the community around them. We bake in Nairobi with honest ingredients, and we
              reinvest what we earn into community initiatives.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group rounded-2xl border border-cocoa-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-300 hover:shadow-soft"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta-100 text-terracotta-600 transition-colors duration-300 group-hover:bg-terracotta-500 group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cocoa-600">{pillar.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
