'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

// IMPORTANT: Replace these with your actual 20+ image URLs and alt text.
const images: GalleryImage[] = [
    { id: '1', src: '/images/parallel_rope.jpeg', alt: 'A vibrant camping site at dusk' },
    { id: '2', src: '/images/zipline.jpeg', alt: 'Person ziplining across a valley' },
    { id: '3', src: '/images/burma_bridge.jpeg', alt: 'Crossing a Burma Bridge high above the ground' },
    { id: '4', src: '/images/commando_net.jpeg', alt: 'Navigating a bamboo bridge' },
    { id: '5', src: '/images/log_walk.jpeg', alt: 'Climbing a commando net challenge' },
    { id: '6', src: '/images/balancing_beam.jpeg', alt: 'Rock climbing a steep cliff face' },
    { id: '7', src: '/images/rapelling.jpeg', alt: 'Rappelling down a waterfall' },
    { id: '8', src: '/images/log_walk.jpeg', alt: 'Group trekking through a lush mountain trail' },
    { id: '9', src: '/images/parallel_rope.jpeg', alt: 'Cozy tent pitched under the stars' },
    { id: '10', src: '/images/team_building.jpeg', alt: 'Team building games in an open field' },
    { id: '11', src: '/images/aerial_view.jpeg', alt: 'Mountaineers reaching a snowy summit' },
    { id: '12', src: '/images/burma_bridge.jpeg', alt: 'Peaceful nature walk through a dense forest' },
    // { id: '13', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765474212/DSC04153_nfkl0e.jpg', alt: 'Aerial view of the adventure camp' },
    // { id: '14', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466990/c5ae99ce-1636-4810-9b76-674971016b5e_bpenkt.jpg', alt: 'Balancing on a wooden beam' },
    // { id: '15', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466994/commando_net_ocdpdy.jpg', alt: 'Crossing a rustic bamboo bridge over a stream' },
    // { id: '16', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466992/4347fcff-6732-446b-ba04-033341c0c146_lgu1n8.jpg', alt: 'Navigating a challenging net walk' },
    // { id: '17', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765466994/zipline_ccv4uz.jpg', alt: 'Carefully walking across a log bridge' },
    // { id: '18', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765474388/2_m8ujiy.jpg', alt: 'Adventurer on a high-ropes course' },
    // { id: '19', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765474447/1_htn5kz.jpg', alt: 'Excitement on the zipline' },
    // { id: '20', src: 'https://res.cloudinary.com/drr75ydni/image/upload/v1765474492/DSC08893_bcvb8m.jpg', alt: 'Conquering the commando net' },
];

export function ProfessionalImageGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
  };

  const goToPrevious = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + images.length) % images.length);
  };

  // Effect for keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedImageIndex]);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Gallery
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Moments of Adventure</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore a collection of unforgettable experiences captured at our camps. Each photo tells a story of excitement, nature, and discovery.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative block w-full aspect-square overflow-hidden rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-sm">
          {/* Main Image Display */}
          <div className="relative w-[95vw] h-[90vh] flex items-center justify-center">
            <Image
              key={images[selectedImageIndex].id} // Force re-render on change for animation
              src={images[selectedImageIndex].src}
              alt={images[selectedImageIndex].alt}
              fill
              className="object-contain animate-in fade-in zoom-in-95 duration-300"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition"
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>
          
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          
          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Title */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 p-2 px-4 bg-black/50 text-white text-center rounded-lg text-sm md:text-base">
            {images[selectedImageIndex].alt}
          </div>
        </div>
      )}
    </section>
  );
}