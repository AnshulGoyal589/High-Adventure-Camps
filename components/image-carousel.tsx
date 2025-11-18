'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
}

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images: CarouselImage[] = [
    { id: '1', src: '/placeholder.svg?height=600&width=800', alt: 'Mountain Trekking' },
    { id: '2', src: '/placeholder.svg?height=600&width=800', alt: 'Camping Experience' },
    { id: '3', src: '/placeholder.svg?height=600&width=800', alt: 'Rock Climbing' },
    { id: '4', src: '/placeholder.svg?height=600&width=800', alt: 'Paragliding' },
    { id: '5', src: '/placeholder.svg?height=600&width=800', alt: 'River Rafting' },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery of Adventures</h2>
          <p className="text-xl text-muted-foreground">Moments that inspire wanderlust</p>
        </div>

        <div className="relative group">
          {/* Main Carousel */}
          <div className="relative h-96 md:h-screen max-h-96 md:max-h-96 rounded-lg overflow-hidden bg-foreground">
            <img
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Caption */}
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold">{images[currentIndex].alt}</h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className={`h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-8' : 'bg-muted w-3 hover:bg-muted-foreground'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-8 overflow-x-auto pb-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className={`flex-shrink-0 h-20 w-24 rounded-lg overflow-hidden transition-all border-2 ${
                  idx === currentIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.src || "/placeholder.svg"} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
