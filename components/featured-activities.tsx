'use client';

import { useEffect, useState } from 'react';
import { Zap, Users, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Activity {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  price: number;
  duration: string;
  maxParticipants: number;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-orange-100 text-orange-800',
  Expert: 'bg-red-100 text-red-800',
};

export function FeaturedActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities?featured=true');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-balance">Thrilling Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-background rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-balance">Thrilling Activities</h2>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Activities coming soon! Stay tuned.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity._id} className="adventure-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
                {/* Header with Icon */}
                <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColors[activity.difficulty as keyof typeof difficultyColors]}`}>
                      {activity.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-balance">{activity.title}</h3>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">{activity.description}</p>

                  {/* Quick Stats */}
                  <div className="space-y-3 py-4 border-y border-border">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">Up to {activity.maxParticipants} people</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold text-primary">₹{activity.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="p-6 border-t border-border">
                  <Link
                    href={`/activities/${activity._id}`}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center font-semibold text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/activities"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Explore All Activities
          </Link>
        </div>
      </div>
    </section>
  );
}
