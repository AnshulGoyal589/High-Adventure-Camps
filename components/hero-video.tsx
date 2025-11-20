'use client';

import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';

export function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // IMPORTANT: Replace this with the actual URL of the poster image you create.
  const posterImageUrl = 'https://ik.imagekit.io/tskgtjqxr/WhatsApp%20Image%202025-11-20%20at%203.21.48%20PM.jpeg';

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-foreground overflow-hidden">
      {/* Background Video/Image Container */}
      <div 
        className="absolute inset-0"
        // BEST PRACTICE: Add a CSS background image as a final fallback.
        style={{ backgroundImage: `url(${posterImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          // THE CRITICAL FIX: Add the poster attribute here.
          poster={posterImageUrl}
          key="hero-background-video"
        >
          <source src="https://ik.imagekit.io/tskgtjqxr/Manali%20Camp%20(3).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content - No changes needed here */}
      <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
        {/* ... your h1, p, and buttons are fine ... */}
        <h1 className="text-5xl md:text-6xl font-bold text-accent mb-6 text-balance">
          Experience Mountain Magic
        </h1>
        <p className="text-xl text-white mb-8 text-balance">
          Discover extraordinary adventures in the heart of Himachal Pradesh
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">Explore Packages</button>
          <button 
            onClick={() => setIsPlaying(true)}
            className="btn-secondary flex items-center justify-center gap-2 text-foreground"
          >
            <Play size={20} />
            Watch Our Story
          </button>
        </div>
      </div>

      {/* Video Modal - Your logic here is correct, you can uncomment it */}
      {/* {isClient && isPlaying && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-accent"
              aria-label="Close video"
            >
              <X size={32} />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID?autoplay=1"
                title="High Adventure Camps"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
}