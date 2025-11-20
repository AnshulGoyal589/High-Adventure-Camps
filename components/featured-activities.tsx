'use client';

import { useEffect, useState } from 'react';
import { Zap, Users, Clock, ArrowRight } from 'lucide-react'; // Swapped TrendingUp for ArrowRight
import Link from 'next/link';
import Image from 'next/image';

// Interface remains the same
interface Activity {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  price: number;
  duration: string;
  maxParticipants: number;
  images?: string[];
}

// We'll use these colors for a visual badge
// const difficultyConfig = {
//   Easy: {
//     className: 'bg-green-100 text-green-800 border-green-200',
//     icon: <Zap className="w-3 h-3" />,
//   },
//   Moderate: {
//     className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     icon: <Zap className="w-3 h-3" />,
//   },
//   Hard: {
//     className: 'bg-orange-100 text-orange-800 border-orange-200',
//     icon: <Zap className="w-3 h-3" />,
//   },
//   Expert: {
//     className: 'bg-red-100 text-red-800 border-red-200',
//     icon: <Zap className="w-3 h-3" />,
//   },
// };

export function FeaturedActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities?featured=true');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.slice(0, 6)); // Limit to 6 featured activities
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // The loading skeleton is already good, no changes needed here.
  if (loading) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Thrilling Activities</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover adventures curated for every skill level.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-background border rounded-xl p-4 space-y-4">
                <div className="aspect-video bg-muted rounded-lg animate-pulse" />
                <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-8 w-1/3 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Thrilling Activities</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover adventures curated for every skill level.
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">New activities coming soon! Stay tuned.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => {
              // const difficulty = difficultyConfig[activity.difficulty];
              return (
                <Link
                  key={activity._id}
                  href={`/activities/${activity._id}`}
                  className="group block bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative">
                    {/* The image is now the hero */}
                    <Image
                      src={activity.images?.[0] || '/default-activity.png'}
                      alt={activity.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Difficulty Badge overlaid on the image */}
                
                  </div>

                  {/* Content area with better spacing and hierarchy */}
                  <div className="p-5 flex flex-col">
                    <h3 className="text-xl font-bold text-card-foreground truncate">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 h-10 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    {/* Cleaner stats display */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 border-t pt-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>Max {activity.maxParticipants}</span>
                      </div>
                    </div>
                    
                    {/* Price and CTA combined */}
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{activity.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">/person</span>
                      </div>
                      <div className="bg-primary/10 text-primary p-2 rounded-full transform group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* The "View All" button remains an effective CTA */}
        <div className="text-center mt-16">
          <Link
            href="/activities"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow hover:shadow-md"
          >
            Explore All Activities
          </Link>
        </div>
      </div>
    </section>
  );
}