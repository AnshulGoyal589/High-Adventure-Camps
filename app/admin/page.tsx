'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard, Package, Activity, Mail, Menu, X, Wind, Icon } from 'lucide-react'; // Added Wind for logo
import Link from 'next/link';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname(); // Get current path

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Tours', icon: Package, href: '/admin/tours' },
    { label: 'Activities', icon: Activity, href: '/admin/activities' },
    { label: 'Leads', icon: Mail, href: '/admin/leads' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {/* --- MODIFICATION START --- */}
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
            // Check if the current path starts with the item's href for active state
            // Special case for dashboard to avoid matching all routes
            const isActive = item.href === '/admin' 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
              
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
                <item.icon size={20} />
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
      {/* --- MODIFICATION END --- */}


      {/* Main Content (No changes below this line) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg hidden md:block"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Welcome to Admin Panel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="adventure-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-muted-foreground">Total Tours</h3>
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">--</p>
                <Link href="/admin/tours" className="text-primary text-sm font-medium mt-2 hover:underline">
                  Manage Tours
                </Link>
              </div>

              <div className="adventure-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-muted-foreground">Activities</h3>
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">--</p>
                <Link href="/admin/activities" className="text-primary text-sm font-medium mt-2 hover:underline">
                  Manage Activities
                </Link>
              </div>

              <div className="adventure-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-muted-foreground">New Leads</h3>
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">--</p>
                <Link href="/admin/leads" className="text-primary text-sm font-medium mt-2 hover:underline">
                  View Leads
                </Link>
              </div>

              <div className="adventure-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-muted-foreground">Status</h3>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="font-bold">Operational</p>
                <p className="text-xs text-muted-foreground mt-2">All systems active</p>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Start Guide</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Go to the Tours section to add new adventure packages</li>
                <li>• Create activities with duration, price, and difficulty levels</li>
                <li>• View and manage customer leads from the Leads section</li>
              </ul>
            </div>
          </div>
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