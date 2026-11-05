import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import Hero from '@/components/sections/Hero';
import MenuSection from '@/components/menu/MenuSection';
import AboutSection from '@/components/sections/AboutSection';
import CateringSection from '@/components/sections/CateringSection';
import ImpactSection from '@/components/sections/ImpactSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen overflow-x-hidden bg-cream-100">
        <Header />
        <main>
          <Hero />
          <MenuSection />
          <AboutSection />
          <CateringSection />
          <ImpactSection />
          <TestimonialsSection />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
