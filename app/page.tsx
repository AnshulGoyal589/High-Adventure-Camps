import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroVideo } from '@/components/hero-video';
import { AboutSection } from '@/components/about-section';
import { ImageCarousel } from '@/components/image-carousel';
import { TestimonialsSection } from '@/components/testimonials-section';
import { StatsSection } from '@/components/stats-section';
import { WhyChooseUs } from '@/components/why-choose-us';
import { CTASection } from '@/components/cta-section';
import { FeaturedTours } from '@/components/featured-tours';
import { FeaturedActivities } from '@/components/featured-activities';
import type { Metadata } from 'next';
import { FAQSection } from '@/components/faq-section';

export const metadata: Metadata = {
  title: 'High Adventure Camps | Home',
  description: 'Experience thrilling adventure tours and packages in Manali with High Adventure Camps.',
  openGraph: {
    title: 'High Adventure Camps | Home',
    description: 'Experience thrilling adventure tours and packages in Manali.',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroVideo />
      <AboutSection />
      <ImageCarousel />
      <FeaturedTours />
      <FeaturedActivities />
      <StatsSection />
      <WhyChooseUs />
      <FAQSection/>
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
