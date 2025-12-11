'use client';

import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export function AboutSection() {
  const specificHighlights = [
    'Pioneers of Camping in Manali (Operating Since 2000)',
    'Hosted over 5 Lakh+ Happy Guests',
    'Trusted Experts for 500+ School & College Groups',
    '10+ Safe & Certified Adventure Activities',
    'Luxury Tents, Cottages, and Himachal-style Rooms Available',
    'Professional, Certified Instructors & 24/7 Safety Team',
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              25+ Years of Trust
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              The Pioneers of Adventure Camping in Manali (Since 2000)
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              High Adventure Camps Manali is one of the oldest and most trusted camping operators in the region. 
              We proudly introduced the camping concept 25 years ago, and since then we have hosted over 
              <span className="font-bold text-primary"> 5,00,000 guests</span>, connecting them with the majestic Himalayas.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We specialize in fully managed adventure group stays and educational programs. Our expertise is trusted 
              by over 500 institutions, including top schools like DPS Ghaziabad, St. George Mussoorie, and we are official partners for Haryana Tourism since 2012.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {specificHighlights.map((highlight, idx) => (
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
            <Image
              src="https://res.cloudinary.com/drr75ydni/image/upload/v1765465557/2_ltc1jz.jpg"
              alt="High Adventure Camps Manali Group Camping Setup"
              width={600}
              height={400}
              className="relative w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}