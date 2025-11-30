'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { Activity } from '@/lib/types';
import { Clock, Users, Loader } from 'lucide-react';

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Adventure Activities</h1>
          <p className="text-lg text-muted-foreground">Thrilling experiences for every skill level</p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="pb-20 pt-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div key={activity._id} className="adventure-card">
                  {activity.images?.[0] && (
                    <img 
                      src={activity.images[0] || "/placeholder.svg"} 
                      alt={activity.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{activity.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock size={16} />
                      <span>{activity.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Users size={16} />
                      <span>Max {activity.maxParticipants} participants</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-primary">₹{activity.price.toLocaleString()}</span>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                      {activity.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No activities available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
