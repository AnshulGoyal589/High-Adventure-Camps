'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <h3 className="font-bold text-lg">High Adventure Camps</h3>
            </div>
            <p className="text-sm opacity-90">
              Experience thrilling adventures in the heart of Manali.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link href="/packages" className="hover:text-accent transition">Packages</Link></li>
              <li><Link href="/activities" className="hover:text-accent transition">Activities</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91-XXXXXXXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@highventurecamps.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Manali, Himachal Pradesh, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-accent rounded hover:bg-accent/90 transition">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="#" className="p-2 bg-accent rounded hover:bg-accent/90 transition">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="#" className="p-2 bg-accent rounded hover:bg-accent/90 transition">
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent/30 pt-8">
          <div className="text-center text-sm opacity-75">
            <p>&copy; 2025 High Adventure Camps. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
