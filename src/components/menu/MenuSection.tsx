import { useState } from 'react';
import MenuCard from '@/components/menu/MenuCard';
import { MENU_CATEGORIES, MENU_ITEMS, type MenuCategoryId } from '@/data/menu';

export default function MenuSection() {
  const [activeId, setActiveId] = useState<MenuCategoryId>(MENU_CATEGORIES[0].id);
  const activeCategory = MENU_CATEGORIES.find((category) => category.id === activeId) ?? MENU_CATEGORIES[0];
  const items = MENU_ITEMS.filter((item) => item.category === activeCategory.id);

  return (
    <section id="menu" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The bakery menu</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Something warm for every occasion</h2>
          <p className="mt-4 text-cocoa-600">{activeCategory.blurb}</p>
        </div>

        <div
          role="tablist"
          aria-label="Menu categories"
          className="mx-auto mt-10 flex gap-2 overflow-x-auto rounded-full border border-cocoa-100 bg-white p-1.5 shadow-sm sm:flex-wrap sm:justify-center sm:overflow-visible"
        >
          {MENU_CATEGORIES.map((category) => {
            const selected = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls="menu-panel"
                onClick={() => setActiveId(category.id)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  selected
                    ? 'bg-cocoa-800 text-cream-50 shadow-soft'
                    : 'text-cocoa-600 hover:bg-cocoa-100 hover:text-cocoa-900'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
          key={activeCategory.id}
          className="mt-12 grid gap-6 animate-fade-up sm:grid-cols-2 xl:grid-cols-4"
        >
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
