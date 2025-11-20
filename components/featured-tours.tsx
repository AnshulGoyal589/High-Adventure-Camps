'use client';

import { useEffect, useState } from 'react';
import { MapPin, Users, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Tour {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: {
    days: number;
    nights: number;
  };
  maxGroupSize: number;
  images?: string[];
}

export function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/api/tours?featured=true');
        if (response.ok) {
          const data = await response.json();
          setTours(data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-balance">Featured Tours & Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-balance">Featured Tours & Packages</h2>
        
        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Tours coming soon! Check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour._id} className="adventure-card overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    {tour.images ? (
                      <Image
                        src={tour.images[0]}
                        alt={tour.title}
                        width={400}
                        height={192}
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-balance">{tour.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{tour.description}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">{tour.duration.days}D/{tour.duration.nights}N</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">Max {tour.maxGroupSize}</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
                    </div>
                    <Link
                      href={`/packages/${tour._id}`}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
