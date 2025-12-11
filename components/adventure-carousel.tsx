'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// --- Data for Adventure Activities ---
// IMPORTANT: Replace these placeholder image URLs with your actual high-quality photos.
const adventureActivities = [
  { name: 'Zipline', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466994/zipline_ccv4uz.jpg' },
  { name: 'Burma Bridge', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466990/c5ae99ce-1636-4810-9b76-674971016b5e_bpenkt.jpg' },
  { name: 'Commando Net', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466994/commando_net_ocdpdy.jpg' },
  { name: 'Rock Climbing', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765468052/Rock_climbing_1_ikxgzy.jpg' },
  { name: 'Rappelling', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466992/4347fcff-6732-446b-ba04-033341c0c146_lgu1n8.jpg' },
  { name: 'Parallel Rope', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466997/parallel_rope_kv4s3b.jpg' },
  { name: 'Trekking', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765471836/Intrepid-Travel-Chile-Patagonia-trekking-002_tz0i1a.jpg' },
  { name: 'Tent Pitching', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765471778/7G8A0916_evhdau.jpg' },
  { name: 'Mountaineering', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765471811/custom-mountaineering-Alpine-Garden-960x960_nuehtj.jpg' },
  { name: 'Log Walk', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466996/log_walk_rvnskl.jpg' },
  { name: 'Balancing Beam', imageUrl: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466994/balancing_beam_pl12fw.jpg' },
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
                    <Image
                      src={activity.imageUrl}
                      alt={activity.name}
                      width={400}
                      height={500}
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