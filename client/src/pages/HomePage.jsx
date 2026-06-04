import HeroCarousel from '../components/home/HeroCarousel';
import CategoryShowcase from '../components/home/CategoryShowcase';
import BestSellers from '../components/home/BestSellers';
import PromoBanner from '../components/home/PromoBanner';
import FeaturedCollections from '../components/home/FeaturedCollections';
import ShopByConcern from '../components/home/ShopByConcern';
import NewArrivals from '../components/home/NewArrivals';
import BrandBenefits from '../components/home/BrandBenefits';
import BeautyBlog from '../components/home/BeautyBlog';
import InstagramGallery from '../components/home/InstagramGallery';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroCarousel />
        <CategoryShowcase />
        <BestSellers />
        <PromoBanner />
        <FeaturedCollections />
        <ShopByConcern />
        <NewArrivals />
        <BeautyBlog />
        <InstagramGallery />
        <BrandBenefits />
      </main>
    </div>
  );
}

export default HomePage;