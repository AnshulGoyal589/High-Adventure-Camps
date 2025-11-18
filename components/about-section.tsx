'use client';

import { CheckCircle } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    'Expert guides with 15+ years experience',
    'Safety certified and insured activities',
    'Small group sizes for personalized experience',
    'Sustainable and eco-friendly practices',
    ' 24/7 customer support',
    'Custom itineraries available',
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Your Gateway to Himalayan Adventures
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              High Adventure Camps has been crafting unforgettable experiences in Manali for over a decade. 
              We specialize in curated adventure tours, thrilling activities, and immersive experiences 
              that connect you with the raw beauty of the Himalayas.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're seeking adrenaline-pumping trekking expeditions, serene camping experiences, 
              or cultural immersion, our expert team ensures every moment is safe, memorable, and authentic.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg transform rotate-3"></div>
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Adventure Group in Manali"
              className="relative w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
