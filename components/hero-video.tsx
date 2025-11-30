'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function HeroVideo() {
  const posterImageUrl = 'https://ik.imagekit.io/tskgtjqxr/WhatsApp%20Image%202025-11-20%20at%203.21.48%20PM.jpeg';
  // const videoUrl = "https://ik.imagekit.io/tskgtjqxr/Manali%20Camp%20(3).mp4";

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video & Cinematic Overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundImage: `url(${posterImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* A more effective overlay for contrast and a premium feel */}
        <div className="absolute inset-0 z-10"></div>
        
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={posterImageUrl}
          key={"hero-video.mp4"}
        >
          <source src={"hero-video.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Centered Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        {/* Animated container for a smooth entrance */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-balance text-shadow-lg">
            Manali’s Most Trusted Adventure Camps
          </h1>
          
          <div className="flex justify-center">
            <Link href="/packages" className="text-white no-underline">
              <button className="btn-primary px-10 py-4 text-lg font-bold transform transition-transform duration-300 hover:scale-105">
                Explore Packages
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* "Scroll Down" Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/90 animate-in fade-in duration-1000 delay-500">
        <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
        <ChevronDown className="w-6 h-6 animate-bounce mt-1" />
      </div>
    </section>
  );
}
