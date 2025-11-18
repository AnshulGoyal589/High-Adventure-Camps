'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tour } from '@/lib/types';
import { Calendar, MapPin, Users, CheckCircle, XCircle, Loader, Heart } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function TourDetail() {
  const { id } = useParams();
  const { isSignedIn } = useUser();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`/api/tours/${id}`);
        if (!response.ok) throw new Error('Tour not found');
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!tour) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <p className="text-lg text-muted-foreground">Tour not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Gallery */}
      <section className="py-8 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="md:col-span-2">
              <img 
                src={tour.images?.[selectedImageIndex] || "/placeholder.svg"} 
                alt={tour.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {/* Thumbnail Gallery */}
              {tour.images && tour.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {tour.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded overflow-hidden border-2 transition ${
                        selectedImageIndex === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img || "/placeholder.svg"} alt={`${tour.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 h-fit space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
                <p className="text-muted-foreground">{tour.type}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary" size={20} />
                  <span className="font-semibold">{tour.duration.days}D / {tour.duration.nights}N</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  <span className="font-semibold">{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-primary" size={20} />
                  <span className="font-semibold">{tour.groupSize.min}-{tour.groupSize.max} people</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                <p className="text-3xl font-bold text-primary mb-4">₹{tour.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mb-4">per person</p>
              </div>

              <Link 
                href={isSignedIn ? `/packages/${tour._id}/booking` : '/sign-in'}
                className="w-full btn-primary text-center block"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
                <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
              </div>

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
                  <ul className="space-y-2">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Itinerary */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Day-by-Day Itinerary</h2>
                  <div className="space-y-4">
                    {tour.itinerary.map((day, idx) => (
                      <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                        <h3 className="font-bold text-primary mb-1">Day {idx + 1}</h3>
                        <p className="text-foreground">{day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions */}
              <div className="grid md:grid-cols-2 gap-6">
                {tour.includeItems && tour.includeItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="text-primary" size={20} />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {tour.includeItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground">
                          <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.excludeItems && tour.excludeItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <XCircle className="text-red-500" size={20} />
                      What's Excluded
                    </h3>
                    <ul className="space-y-2">
                      {tour.excludeItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground">
                          <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary rounded-lg p-4">
                <p className="text-sm font-semibold text-primary mb-2">Difficulty Level</p>
                <p className="text-lg font-bold capitalize">{tour.difficulty}</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-4">Quick Facts</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold">{tour.duration.days} Days, {tour.duration.nights} Nights</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Group Size</p>
                    <p className="font-semibold">{tour.groupSize.min} - {tour.groupSize.max} People</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-semibold">{tour.location}</p>
                  </div>
                </div>
              </div>

              <Link 
                href={isSignedIn ? `/packages/${tour._id}/booking` : '/sign-in'}
                className="w-full btn-primary text-center block"
              >
                Book This Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
