'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Lead } from '@/lib/types';
import { Mail, Phone, Loader, LayoutDashboard, Package, Activity, Menu, X, Wind } from 'lucide-react';
import { apiGet } from '@/lib/utils/api-client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Tours', icon: Package, href: '/admin/tours' },
    { label: 'Activities', icon: Activity, href: '/admin/activities' },
    { label: 'Leads', icon: Mail, href: '/admin/leads' },
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await apiGet<Lead[]>('/api/leads');
      // Sort leads by most recent first
      const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setLeads(sortedData);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed md:static z-50 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-gray-300 flex flex-col border-r border-gray-700 h-screen`}>
        {/* Header/Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Wind className="text-primary-foreground" />
            </div>
            {sidebarOpen && <h1 className="font-bold text-lg text-white tracking-wider">High Adventure</h1>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg md:hidden ml-auto"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-lg transition-colors duration-200 group ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-inner'
                    : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className={`flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
          <h1 className="text-2xl font-bold">Customer Leads</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg hidden md:block"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">All Inquiries</h2>
            <p className="text-muted-foreground">Contact information from interested customers</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : leads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {leads.map((lead) => (
                <div key={lead._id} className="bg-card border rounded-lg p-5 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{lead.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail size={16} />
                          <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone size={16} />
                          <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">
                            {lead.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-xs text-muted-foreground">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {lead.interests && lead.interests.length > 0 && (
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                      {lead.interests.map((interest) => (
                        <span key={interest} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}

                  {lead.message && (
                    <div className="mt-auto pt-4">
                      <div className="mt-3 p-3 bg-muted/50 rounded text-sm">
                        <p className="text-muted-foreground italic">"{lead.message}"</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No leads yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}