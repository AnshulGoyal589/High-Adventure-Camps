// components/floating-action-buttons.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, MessageSquare, Instagram, FileText } from 'lucide-react';
import Link from 'next/link';
import { useContactPopupStore } from '@/lib/store';

// Replace with your actual details
const WHATSAPP_NUMBER = '919736744322';
const PHONE_NUMBER = '+919816054322';
const INSTAGRAM_URL = 'https://www.instagram.com/highadventurecamps?igsh=MWR0cHJtM2EyOGtqcw==';

export function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const { openPopup } = useContactPopupStore();

  const handleGetQuoteClick = () => {
    setIsOpen(false);
    openPopup();
  };

  const actionButtons = [
    { icon: FileText, label: 'Get Quote', onClick: handleGetQuoteClick, isButton: true },
    { icon: MessageSquare, label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}`, isButton: false },
    { icon: Phone, label: 'Call Now', href: `tel:${PHONE_NUMBER}`, isButton: false },
    { icon: Instagram, label: 'Instagram', href: INSTAGRAM_URL, isButton: false },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center gap-3">
        {/* Action buttons that appear when menu is open */}
        <div 
          className={`flex flex-col items-center gap-3 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {actionButtons.map((action, index) => (
            <div key={index} className="group relative flex items-center">
              <span className="absolute right-full mr-4 px-3 py-1.5 bg-foreground text-background text-sm font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {action.label}
              </span>
              {action.isButton ? (
                 <button onClick={action.onClick} className="bg-primary text-primary-foreground h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all transform hover:scale-110">
                   <action.icon size={24} />
                 </button>
              ) : (
                <Link href={action.href || '#'} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all transform hover:scale-110">
                  <action.icon size={24} />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Main toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all transform hover:scale-110 focus:outline-none"
          aria-label="Open contact menu"
        >
          <div className="transition-transform duration-300 ease-in-out" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </div>
        </button>
      </div>
    </div>
  );
}