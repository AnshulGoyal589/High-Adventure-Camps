'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Tour } from '@/lib/types';
import { Plus, Edit, Trash2, Loader, LayoutDashboard, Package, Activity, Mail, Menu, X, Wind } from 'lucide-react';
import Link from 'next/link';
import { apiGet, apiDelete } from '@/lib/utils/api-client';
import { UserButton } from '@clerk/nextjs';

export default function ToursAdmin() {
  const [tours, setTours] = useState<Tour[]>([]);
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
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const data = await apiGet<Tour[]>('/api/tours');
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      try {
        await apiDelete(`/api/tours/${id}`);
        setTours(tours.filter(t => t._id !== id));
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
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
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}`}>
        {/* Top Bar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
          <h1 className="text-2xl font-bold">Tours Management</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg hidden md:block"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">All Tours</h2>
              <p className="text-muted-foreground">Manage your adventure packages</p>
            </div>
            <Link href="/admin/tours/create" className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Add Tour
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : tours.length > 0 ? (
            <div className="overflow-x-auto bg-card border rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Location</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Difficulty</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour._id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{tour.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{tour.location}</td>
                      <td className="px-4 py-3 text-muted-foreground">{tour.duration.days}D/{tour.duration.nights}N</td>
                      <td className="px-4 py-3 font-semibold text-primary">₹{tour.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {tour.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <Link
                          href={`/admin/tours/${tour._id}`}
                          className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded transition"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(tour._id!)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4">No tours created yet</p>
              <Link href="/admin/tours/create" className="btn-primary">
                Create Your First Tour
              </Link>
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