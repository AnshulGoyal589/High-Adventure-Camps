import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

// Metadata is defined and exported correctly in the Server Component
export const metadata: Metadata = {
  title: 'Contact Us | High Adventure Camps',
  description: 'Get in touch with High Adventure Camps. Contact us for inquiries about our adventure tours and packages.',
};

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground">We'd love to hear from you and help plan your adventure</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
                    <div className="flex flex-col space-y-3">
                      
                      <a 
                        href="tel:+919816054322" 
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                        <span className="font-medium">+91 98160 54322 (Direct Call)</span>
                      </a>
                      
                      <a 
                        href="https://wa.me/919736744322" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-medium">+91 97367 44322 (WhatsApp)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">manalicamp@activitymanali.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">High Adventure Camp Manali, Himachal Pradesh, India</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-lg overflow-hidden h-80 bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.6290105989106!2d77.15218367509351!3d32.10631091796065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048bd7f1b2478d%3A0xcf22d9510fa069c4!2sHigh%20Adventure%20Camp%20Manali!5e0!3m2!1sen!2sin!4v1763619338851!5m2!1sen!2sin"
                ></iframe>
              </div>
            </div>

            {/* Contact Form: Imported Client Component */}
            <ContactForm /> 
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}