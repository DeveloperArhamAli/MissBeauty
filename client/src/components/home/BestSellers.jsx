import { useRef } from 'react';
import { bestSellers } from '../../data/homepage';
import ProductCard from '../ui/ProductCard';
import SectionTitle from '../ui/SectionTitle';

const BestSellers = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Best Sellers" 
          subtitle="Customer favorites loved by beauty enthusiasts"
        />

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {bestSellers.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[300px] lg:w-[calc(25%-18px)]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
