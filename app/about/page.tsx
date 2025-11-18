import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Users, Award, Zap, Heart, Mountain, Shield, Leaf, Target } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | High Adventure Camps',
  description: 'Learn about High Adventure Camps, our mission, values, and commitment to providing unforgettable adventure experiences in Manali.',
  openGraph: {
    title: 'About Us | High Adventure Camps',
    description: 'Learn about High Adventure Camps and our commitment to adventure.',
  },
};

export default function About() {
  const values = [
    {
      icon: Zap,
      title: 'Excellence',
      description: 'Delivering exceptional experiences through meticulous planning and expert execution.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Driven by love for mountains, adventure, and creating unforgettable memories.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building lasting relationships with our guests and supporting local communities.',
    },
    {
      icon: Award,
      title: 'Safety First',
      description: 'Comprehensive safety protocols and certified guides ensure peace of mind.',
    },
  ];

  const highlights = [
    {
      icon: Mountain,
      title: 'Diverse Terrain',
      description: 'Access to pristine mountains, valleys, and rivers across Manali region.',
    },
    {
      icon: Shield,
      title: 'Certified Guides',
      description: '50+ experienced guides with international certifications and local expertise.',
    },
    {
      icon: Users,
      title: 'Small Groups',
      description: 'Personalized experiences with small group sizes ensuring individual attention.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Committed to sustainable tourism and environmental conservation practices.',
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">About High Adventure Camps</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            We are a premier adventure tourism company based in Manali, dedicated to creating transformative experiences 
            that connect people with the majestic Himalayas. For over a decade, we've been crafting unforgettable moments 
            for thousands of adventurers from around the world.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="adventure-card">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide transformative adventure experiences that connect people with nature, challenge their limits, 
                and create lifelong memories. We believe every individual has an inner adventurer waiting to be discovered. 
                Our mission is to unlock that spirit through carefully curated, safe, and inspiring adventures in the heart 
                of the Himalayas.
              </p>
            </div>
            <div className="adventure-card">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted and innovative adventure tourism company in the Himalayas, recognized globally for 
                our unwavering commitment to safety, sustainability, and authentic experiences. We aspire to inspire a 
                lifelong love for mountains and foster a community of responsible adventurers who respect and preserve 
                the natural world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="adventure-card text-center hover:shadow-lg transition-shadow duration-300">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <div key={idx} className="flex gap-4 p-6 adventure-card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Track Record</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">12+</div>
              <p className="text-muted-foreground font-semibold">Years of Excellence</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">5000+</div>
              <p className="text-muted-foreground font-semibold">Happy Adventures</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">50+</div>
              <p className="text-muted-foreground font-semibold">Certified Guides</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">100%</div>
              <p className="text-muted-foreground font-semibold">Safety Record</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Team</h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team comprises passionate adventurers, mountain experts, safety specialists, and hospitality professionals 
              who are united by a common goal: delivering world-class adventure experiences. Each team member brings years 
              of expertise and an infectious enthusiasm for the mountains.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Mountain Guides', desc: '50+ certified guides with international training' },
              { name: 'Safety Team', desc: 'Dedicated professionals ensuring highest safety standards' },
              { name: 'Support Staff', desc: 'Hospitality experts committed to your comfort' },
            ].map((role, idx) => (
              <div key={idx} className="adventure-card text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{role.name}</h3>
                <p className="text-sm text-muted-foreground">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Commitment to You</h2>
          <ul className="space-y-4 text-lg text-muted-foreground">
            <li className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Uncompromising safety standards and equipment</span>
            </li>
            <li className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Personal attention and customized experiences</span>
            </li>
            <li className="flex items-center gap-3">
              <Target className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Authentic interactions with local culture and community</span>
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Environmental responsibility and sustainable practices</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
