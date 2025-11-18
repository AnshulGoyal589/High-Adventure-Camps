'use client';

import { CheckCircle, Shield, Users, Zap } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Safety First',
    description: 'Industry-certified guides and equipment with comprehensive safety protocols for every adventure.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Expert Team',
    description: 'Experienced guides with deep knowledge of Manali terrain and passion for outdoor adventures.',
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Diverse Activities',
    description: 'From trekking to paragliding, camping to rock climbing - something for every adventure level.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: 'Best Value',
    description: 'Competitive pricing without compromising on quality, safety, or customer experience.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Choose High Adventure Camps?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience adventure with confidence, safety, and unmatched expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
