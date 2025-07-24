import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const slides = [
  {
    id: 1,
    image: heroBanner1,
    title: "Premium Collection",
    subtitle: "Discover the finest selection of products",
    description: "Explore our curated collection of premium items designed for the modern lifestyle.",
    ctaText: "Shop Now",
    ctaLink: "/products"
  },
  {
    id: 2,
    image: heroBanner2,
    title: "Fashion Forward",
    subtitle: "Style meets sophistication",
    description: "Elevate your wardrobe with our latest fashion trends and timeless classics.",
    ctaText: "Explore Fashion",
    ctaLink: "/products?category=fashion"
  },
  {
    id: 3,
    image: heroBanner3,
    title: "Tech Excellence",
    subtitle: "Innovation at your fingertips",
    description: "Discover cutting-edge technology and gadgets that enhance your daily life.",
    ctaText: "View Tech",
    ctaLink: "/products?category=electronics"
  }
];

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative min-w-0 flex-shrink-0 flex-grow-0 basis-full">
              <div className="relative h-[600px] md:h-[700px]">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 hero-gradient" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl animate-fade-in">
                      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl md:text-2xl text-accent font-medium mb-6">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      <Button 
                        size="lg"
                        className="btn-accent text-lg px-8 py-4 h-auto"
                        onClick={() => window.location.href = slide.ctaLink}
                      >
                        {slide.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-colors"
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;