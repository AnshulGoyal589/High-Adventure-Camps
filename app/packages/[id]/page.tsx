'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { Tour } from '@/lib/types';
import { MapPin, Users, Calendar, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PackageDetail({ params }: { params: { id: string } }) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`/api/tours/${params.id}`);
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
  }, [params.id]);

  // const handleBookNow = () => {
  //   if (!userId) {
  //     router.push('/sign-in');
  //     return;
  //   }
  //   router.push(`/packages/${params.id}/booking`);
  // };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!tour) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Package Not Found</h2>
            <p className="text-muted-foreground mb-4">The package you're looking for doesn't exist.</p>
            <Link href="/packages" className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Back to Packages
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-12 bg-background flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery */}
          <div className="mb-8">
            {tour.images && tour.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Image
                  src={tour.images[0] || "/placeholder.svg"}
                  alt={tour.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  {tour.images.slice(1, 5).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img || "/placeholder.svg"}
                      alt={`${tour.title} ${idx + 2}`}
                      width={400}
                      height={220}
                      className="w-full h-44 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <p className="text-lg">{tour.duration.days}D/{tour.duration.nights}N</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-lg">{tour.location}</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Group Size</span>
                  </div>
                  <p className="text-lg">{tour.groupSize.min}-{tour.groupSize.max}</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">★</span>
                    <span className="font-semibold">Difficulty</span>
                  </div>
                  <p className="text-lg">{tour.difficulty}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Package</h2>
                <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day, idx) => (
                    <div key={idx} className="bg-secondary/5 p-4 rounded-lg border border-border">
                      <h3 className="font-bold text-primary mb-2">Day {idx + 1}</h3>
                      <p className="text-foreground">{day}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Inclusions</h3>
                  <ul className="space-y-2">
                    {tour.includeItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Exclusions</h3>
                  <ul className="space-y-2">
                    {tour.excludeItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-secondary">✕</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/10 border border-border rounded-lg p-6 sticky top-24">
                <div className="mb-6">
                  <p className="text-muted-foreground text-sm mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-primary mb-1">₹{tour.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                {isSignedIn ? (
                  <Link
                    href={`/packages/${params.id}/booking`}
                    className="w-full btn-primary text-center block"
                  >
                    Book This Activity
                  </Link>
                ) : (
                  <button
                    onClick={() => openSignIn({ afterSignInUrl: window.location.href })}
                    className="w-full btn-primary text-center"
                  >
                    Sign in to Book
                  </button>
                )}

                {!userId && (
                  <p className="text-xs text-muted-foreground text-center">
                    Sign in is required to proceed with booking
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Trip Details</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>Duration: {tour.duration.days} Days {tour.duration.nights} Nights</li>
                      <li>Location: {tour.location}</li>
                      <li>Group Size: {tour.groupSize.min}-{tour.groupSize.max} people</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
