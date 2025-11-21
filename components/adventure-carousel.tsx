'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Data for Adventure Activities ---
// IMPORTANT: Replace these placeholder image URLs with your actual high-quality photos.
const adventureActivities = [
  { name: 'Zipline', imageUrl: 'https://plus.unsplash.com/premium_photo-1664302954288-b3a858d59961?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8emlwJTIwbGluZXxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Burma Bridge', imageUrl: 'https://images.unsplash.com/photo-1682785060782-5c65cbdc3575?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnVybWElMjBCcmlkZ2UlMjBhZHZlbnR1cmUlMjBhY3Rpdml0eXxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Commando Net', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hFAQ5-YzYHFeMyIne5lQCRpHUGyo36O6cA&s' },
  { name: 'Rock Climbing', imageUrl: 'https://images.unsplash.com/photo-1549909347-56fea3347a96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9jayUyMGNsaW1iaW5nYWR2ZW50dXJlJTIwYWN0aXZpdHl8ZW58MHx8MHx8fDA%3D' },
  { name: 'Rappelling', imageUrl: 'https://plus.unsplash.com/premium_photo-1661964191329-fb1752fd721b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFwcGVsaW5nJTIwYWR2ZW50dXJlJTIwYWN0aXZpdHl8ZW58MHx8MHx8fDA%3D' },
  { name: 'Parallel Rope', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Trekking', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Tent Pitching', imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Team Building Games', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Mountaineering', imageUrl: 'https://images.unsplash.com/photo-1631009171055-44efe8c6a868?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW91bnRhaW5lZXJpbmdhZHZlbnR1cmUlMjBhY3Rpdml0eXxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Nature Walks', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop' },
  { name: 'Log Walk', imageUrl: 'https://www.discoveryvillage.in/_next/image?url=https%3A%2F%2Fdiscovery-village-media-migrate-1.s3.ap-south-1.amazonaws.com%2FActivity%2BImages%2FActivities%2F222*185%2FVertical%2BLog%2BClimbing%2B-%2BTile.png&w=750&q=75' },
  { name: 'Net Walk', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSypjdFmdUTeWe9Zr0vwsIlwLiviiM8GYB0GtnshnXM-H_rNnLrEqh3kxnzZyMsPfiniN8&usqp=CAU' },
  { name: 'Balancing Beam', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScAlQ14Lk-QH6jPb2ZpqDcErDhGoyUEaUbSJcTWI6EA1eWNbHes7Y8JlHH1gImRoEabhw&usqp=CAU' },
  { name: 'Bamboo Bridge', imageUrl: 'https://d26dp53kz39178.cloudfront.net/media/uploads/products/02_result-1661166756234.webp' },
];
 
const emblaOptions = {
  align: 'start',
  loop: true,
  containScroll: 'trimSnaps',
} as const;

export function AdventureCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Adventures
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Over 15 Thrilling Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From heart-pounding ziplines to team-building challenges, explore the range of certified activities awaiting you in the Himalayas.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {adventureActivities.map((activity, index) => (
                <div key={index} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                  <div className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={activity.imageUrl}
                      alt={activity.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white text-shadow">{activity.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition backdrop-blur-sm hidden md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition backdrop-blur-sm hidden md:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Optional: Add text-shadow utility to your globals.css for better text visibility
/*
@layer utilities {
  .text-shadow {
    text-shadow: 0 2px 8px rgb(0 0 0 / 70%);
  }
}
*/