'use client';

interface Stat {
  label: string;
  value: string;
  icon: string;
}

const stats: Stat[] = [
  { label: 'Happy Adventurers', value: '5000+', icon: '🎯' },
  { label: 'Years Experience', value: '12+', icon: '⏱️' },
  { label: 'Adventure Activities', value: '25+', icon: '🏔️' },
  { label: 'Expert Guides', value: '50+', icon: '👥' },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
