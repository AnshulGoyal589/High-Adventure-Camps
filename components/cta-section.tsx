'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Browse our exciting packages and activities, or contact our team to plan a custom adventure experience tailored to your dreams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-100"
            >
              Explore Packages
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold transition-colors hover:bg-white hover:text-primary"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
