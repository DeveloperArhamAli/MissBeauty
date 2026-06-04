import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { heroSlides } from '../../data/homepage';

const HeroCarousel = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-[50vh] md:h-[65vh] lg:h-[85vh]"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              
              <div className="absolute inset-0 container-custom flex items-center">
                <div className="max-w-lg text-white">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4"
                  >
                    {slide.subtitle}
                  </motion.p>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-sourgumyy font-bold mb-4 leading-tight"
                  >
                    {slide.title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/80 text-base md:text-lg mb-8 max-w-md"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4"
                  >
                    {slide.buttons.map((button, index) => (
                      <a
                        key={index}
                        href={button.link}
                        className={`px-8 py-3 uppercase text-sm tracking-wider font-medium transition-all duration-300 ${
                          button.type === 'primary'
                            ? 'bg-gold text-white hover:bg-gold-dark'
                            : 'border-2 border-white text-white hover:bg-white hover:text-charcoal'
                        }`}
                      >
                        {button.text}
                      </a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;
