'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { Tour } from '@/lib/types';
import { MapPin, Users, Calendar, Loader, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Packages() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

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

  const filteredTours = filter
    ? tours.filter(tour => tour.type.toLowerCase().includes(filter.toLowerCase()))
    : tours;

  const adventureTypes = Array.from(new Set(tours.map(t => t.type)));

  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Content */}
      <section className="pb-20 pt-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-12">
            <h3 className="font-semibold mb-4 text-foreground">Filter by Type:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('')}
                className={`px-4 py-2 rounded-lg transition ${
                  !filter ? 'bg-primary text-white' : 'bg-muted hover:bg-border'
                }`}
              >
                All Packages
              </button>
              {adventureTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === type ? 'bg-primary text-white' : 'bg-muted hover:bg-border'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tours Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <Link key={tour._id} href={`/packages/${tour._id}`}>
                  <div className="adventure-card cursor-pointer">
                    {tour.images?.[0] && (
                      <img 
                        src={tour.images[0] || "/placeholder.svg"} 
                        alt={tour.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin size={16} />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar size={16} />
                        <span>{tour.duration.days}D/{tour.duration.nights}N</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Users size={16} />
                        <span>{tour.groupSize.min}-{tour.groupSize.max} persons</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
                      <span className="flex gap-2 justify-center items-center px-3 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                      Details <ArrowRight/>
                    </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No packages found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
