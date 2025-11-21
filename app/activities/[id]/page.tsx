'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Activity } from '@/lib/types';
import { Clock, MapPin, Users, CheckCircle, Loader } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function ActivityDetail() {
  const { id } = useParams();
  const { isSignedIn } = useUser();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        if (!response.ok) throw new Error('Activity not found');
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
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

  if (!activity) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <p className="text-lg text-muted-foreground">Activity not found</p>
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
                src={activity.images?.[selectedImageIndex] || "/placeholder.svg"} 
                alt={activity.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {/* Thumbnail Gallery */}
              {activity.images && activity.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {activity.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded overflow-hidden border-2 transition ${
                        selectedImageIndex === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img || "/placeholder.svg"} alt={`${activity.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 h-fit space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
                <p className="text-muted-foreground">{activity.type}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="text-primary" size={20} />
                  <span className="font-semibold">{activity.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  <span className="font-semibold">{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-primary" size={20} />
                  <span className="font-semibold">Max {activity.maxParticipants} participants</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Price per person</p>
                <p className="text-3xl font-bold text-primary mb-4">₹{activity.price.toLocaleString()}</p>
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded text-sm font-medium capitalize mb-4">
                  {activity.difficulty} Level
                </span>
              </div>
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
                <h2 className="text-2xl font-bold mb-4">About This Activity</h2>
                <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
              </div>

              {/* What's Included */}
              {activity.includes && activity.includes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <ul className="space-y-3">
                    {activity.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Activity Details */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Activity Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-lg">{activity.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Maximum Participants</p>
                    <p className="font-semibold text-lg">{activity.maxParticipants} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Difficulty Level</p>
                    <p className="font-semibold text-lg capitalize">{activity.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-semibold text-lg">{activity.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-bold">Activity Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">{activity.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="font-semibold capitalize">{activity.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Group</span>
                    <span className="font-semibold">{activity.maxParticipants} people</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-semibold">Price per person</span>
                    <span className="font-bold text-primary">₹{activity.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Ready for an adventure?</p>
                <Link 
                  href={isSignedIn ? '/packages' : '/sign-in'}
                  className="w-full btn-primary text-center block"
                >
                  Book This Activity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
