// components/floating-action-buttons.tsx
'use client';

import { MessageSquare, Phone, Instagram, FileText } from 'lucide-react';
import Link from 'next/link';
import { useContactPopupStore } from '@/lib/store';

// Replace with your actual details
const WHATSAPP_NUMBER = '919736744322';
const PHONE_NUMBER = '+919816054322';
const INSTAGRAM_URL = 'https://www.instagram.com/highadventurecamps?igsh=MWR0cHJtM2EyOGtqcw==';

export function FloatingActionButtons() {
  const { openPopup } = useContactPopupStore();

  // This handler now only opens the popup, as there's no menu to close.
  const handleGetQuoteClick = () => {
    openPopup();
  };

  const actionButtons = [
    { icon: FileText, label: 'Get Quote', onClick: handleGetQuoteClick, isButton: true },
    { icon: MessageSquare, label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}`, isButton: false },
    { icon: Phone, label: 'Call Now', href: `tel:${PHONE_NUMBER}`, isButton: false },
    { icon: Instagram, label: 'Instagram', href: INSTAGRAM_URL, isButton: false },
  ];

  return (
    // Main container to position the stack of buttons
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {actionButtons.map((action, index) => (
        <div key={index} className="group relative flex items-center">
          {/* Tooltip that appears on hover */}
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-foreground text-background text-sm font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {action.label}
          </span>
          
          {/* Render a button for internal actions (like opening a popup) */}
          {action.isButton ? (
             <button 
                onClick={action.onClick} 
                className="bg-primary text-primary-foreground h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all transform hover:scale-110"
                aria-label={action.label}
              >
               <action.icon size={24} />
             </button>
          ) : (
            // Render a link for external navigation
            <Link 
              href={action.href || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-primary text-primary-foreground h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all transform hover:scale-110"
              aria-label={action.label}
            >
              <action.icon size={24} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}