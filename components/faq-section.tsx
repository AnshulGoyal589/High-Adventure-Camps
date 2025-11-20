'use client';

import { HelpCircle, ChevronDown, Anchor } from 'lucide-react';

// Data based on the provided content brief
const faqData = [
  {
    q: 'What is the best time for camping in Manali?',
    a: 'March to July and October to December are considered the ideal periods for enjoying camping and adventure activities in the Manali region.',
  },
  {
    q: 'Are adventure activities safe?',
    a: 'Yes, absolutely. Safety is our paramount concern. All adventure activities are professionally supervised by certified instructors and conducted using mandatory, high-quality safety equipment.',
  },
  {
    q: 'Do you offer school & college group packages?',
    a: 'Yes, we specialize in educational adventure camps, team-building activities, and outdoor learning programs, having managed over 500 groups across India.',
  },
  {
    q: 'Do you provide meals?',
    a: 'Yes, all our camping packages include hygienic and delicious meals, catering to both vegetarian and non-vegetarian preferences.',
  },
  {
    q: 'Do you offer transport?',
    a: 'We can arrange reliable and comfortable transportation (local transfers, pick-up/drop-off services) upon request as an additional service for groups.',
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-3">
            FAQs
          </div>
          <h2 className="text-4xl font-bold">
            Common Questions
          </h2>
          <p className="text-lg text-muted-foreground mt-3">
            Everything you need to know about booking your adventure with us.
          </p>
        </div>

        {/* FAQ Grid/List */}
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <details 
              key={index} 
              className="group border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <summary className="flex justify-between items-center p-5 cursor-pointer list-none">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg font-semibold text-gray-800">
                    {item.q}
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-primary transform transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}