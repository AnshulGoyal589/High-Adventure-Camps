'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { apiPost } from '@/lib/utils/api-client';
import { useContactPopupStore } from '@/lib/store';

export function ContactPopup() {
  const { isPopupOpen, openPopup, closePopup } = useContactPopupStore();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interests: [] as string[],
  });

  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      return;
    }

    const timer = setTimeout(() => {
      openPopup();
    }, 60000);

    return () => clearTimeout(timer);
  }, [pathname, openPopup]);

  const handleClose = () => {
    closePopup();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await apiPost('/api/leads', formData);
      setIsSubmitted(true);
      
      setTimeout(() => {
        handleClose();
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', message: '', interests: [] });
        }, 300); 
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between py-4 px-6 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-bold">Excited to Adventure?</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded-lg transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4">
              We've received your inquiry. Our team will get back to you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
               <div>
                <label className="block text-sm font-semibold mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Interested In:</label>
                <div className="space-y-2">
                  {['Trekking', 'Camping', 'Paragliding', 'Other'].map((interest) => (
                    <label key={interest} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                  placeholder="Tell us about your adventure dreams..."
                  rows={3}
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex-shrink-0">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Start Your Adventure'}
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                We'll contact you shortly with adventure recommendations
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}