'use client';

interface Stat {
  label: string;
  value: string;
  icon: string;
}

const stats: Stat[] = [
  { label: 'Years of Pioneering', value: '25+', icon: '⏱️' },
  { label: 'Happy Guests Hosted', value: '5 Lakh+', icon: '🎯' },
  { label: 'School & College Groups', value: '500+', icon: '🏫' },
  { label: 'Adventure Activities', value: '10+', icon: '🏔️' },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary-foreground">
          Our Track Record Speaks Volumes
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 text-primary">{stat.value}</div>
              <p className="text-primary-foreground/90 font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}