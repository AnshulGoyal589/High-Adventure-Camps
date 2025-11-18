'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { Tour } from '@/lib/types';
import { Calendar, MapPin, Users, TrendingUp, Loader } from 'lucide-react';
import Link from 'next/link';

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/api/tours');
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Adventure Packages</h1>
          <p className="text-lg text-white/80">Explore our curated collection of unforgettable experiences in Manali</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Link key={tour._id} href={`/tours/${tour._id}`}>
                  <div className="h-full adventure-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {tour.images?.[0] && (
                      <div className="relative">
                        <img 
                          src={tour.images[0] || "/placeholder.svg"} 
                          alt={tour.title}
                          className="w-full h-56 object-cover rounded-lg mb-4"
                        />
                        {tour.featured && (
                          <div className="absolute top-2 right-2 px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar size={16} />
                        <span>{tour.duration.days}D/{tour.duration.nights}N</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin size={16} />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Users size={16} />
                        <span>{tour.groupSize.min}-{tour.groupSize.max} people</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded text-sm font-medium capitalize">
                        {tour.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No tours available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
