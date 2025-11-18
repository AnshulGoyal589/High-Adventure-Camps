'use client';

import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
  activity: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Raj Kumar',
    location: 'Delhi',
    content: 'An absolutely thrilling experience! The guides were professional and the trek to Beas Kund was unforgettable. Highly recommend High Adventure Camps!',
    rating: 5,
    activity: 'Trekking',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Mumbai',
    content: 'My paragliding experience was phenomenal. Safety and fun were perfectly balanced. The entire team was amazing and supportive throughout.',
    rating: 5,
    activity: 'Paragliding',
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Bangalore',
    content: 'Camping under the stars in Manali was magical. Great food, comfortable camping setup, and wonderful people. Worth every penny!',
    rating: 5,
    activity: 'Camping',
  },
  {
    id: 4,
    name: 'Sophia Chen',
    location: 'Singapore',
    content: 'Best adventure holiday ever! The guides were knowledgeable, safety was prioritized, and the views were breathtaking. Coming back next year!',
    rating: 5,
    activity: 'Multi-Activity',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Adventurers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied travelers who've experienced unforgettable adventures with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="adventure-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {testimonial.activity}
                </span>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
