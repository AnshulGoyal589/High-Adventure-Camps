'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tour } from '@/lib/types';
import { apiPost } from '@/lib/utils/api-client';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/image-upload';

export default function CreateTour() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    description: '',
    type: '',
    location: '',
    duration: { days: 1, nights: 1 },
    price: 0,
    groupSize: { min: 1, max: 20 },
    difficulty: 'moderate',
    itinerary: [],
    highlights: [],
    includeItems: [],
    excludeItems: [],
    seasonalAvailability: [],
    images: [],
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev as any)[parent] || {}),
          [child]: type === 'number' ? parseInt(value) : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof Tour] as any[]).map((item, i) => i === index ? value : item),
    }));
  };

  const handleAddArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...((prev[field as keyof Tour] as any[]) || []), ''],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await apiPost('/api/tours', formData);
      router.push('/admin/tours');
    } catch (err: any) {
      setError(err.message || 'Failed to create tour');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/tours" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Back to Tours
        </Link>

        <h1 className="text-3xl font-bold mb-8">Create New Tour</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Tour Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Rohanth Pass Trek"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Type</option>
                  <option value="Trekking">Trekking</option>
                  <option value="Mountaineering">Mountaineering</option>
                  <option value="Camping">Camping</option>
                  <option value="Paragliding">Paragliding</option>
                  <option value="Rafting">Rafting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Manali"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Difficulty *</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="difficult">Difficult</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Describe the tour..."
              />
            </div>
          </div>

          {/* Duration & Pricing */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Duration & Pricing</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Days *</label>
                <input
                  type="number"
                  name="duration.days"
                  value={formData.duration?.days}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nights *</label>
                <input
                  type="number"
                  name="duration.nights"
                  value={formData.duration?.nights}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Featured?</label>
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Mark as featured</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Min Group Size</label>
                <input
                  type="number"
                  name="groupSize.min"
                  value={formData.groupSize?.min}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Max Group Size</label>
                <input
                  type="number"
                  name="groupSize.max"
                  value={formData.groupSize?.max}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Tour Images</h2>
            <ImageUpload
              images={formData.images || []}
              onImagesChange={(images: Tour['images']) => setFormData(prev => ({ ...prev, images }))}
              maxImages={10}
            />
          </div>

          {/* Highlights */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Highlights</h2>
            <div className="space-y-3">
              {(formData.highlights || []).map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Stunning mountain views"
                  />
                  <button
                    type="button"
                    onClick={() => (setFormData(prev => ({
                      ...prev,
                      highlights: (prev.highlights || []).filter((_, i) => i !== index),
                    })))}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem('highlights')}
                className="w-full px-4 py-2 border border-dashed border-primary/30 rounded text-primary hover:bg-primary/5 transition"
              >
                + Add Highlight
              </button>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-3">
              {(formData.itinerary || []).map((day, index) => (
                <div key={index} className="flex gap-2">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded font-semibold min-w-fit">Day {index + 1}</span>
                  <input
                    type="text"
                    value={day}
                    onChange={(e) => handleArrayChange('itinerary', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe day activities"
                  />
                  <button
                    type="button"
                    onClick={() => (setFormData(prev => ({
                      ...prev,
                      itinerary: (prev.itinerary || []).filter((_, i) => i !== index),
                    })))}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem('itinerary')}
                className="w-full px-4 py-2 border border-dashed border-primary/30 rounded text-primary hover:bg-primary/5 transition"
              >
                + Add Day
              </button>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">What's Included & Excluded</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Inclusions</h3>
                <div className="space-y-2">
                  {(formData.includeItems || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('includeItems', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => (setFormData(prev => ({
                          ...prev,
                          includeItems: (prev.includeItems || []).filter((_, i) => i !== index),
                        })))}
                        className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('includeItems')}
                    className="w-full px-4 py-2 border border-dashed border-primary/30 rounded text-primary hover:bg-primary/5 transition text-sm"
                  >
                    + Add Inclusion
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Exclusions</h3>
                <div className="space-y-2">
                  {(formData.excludeItems || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('excludeItems', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => (setFormData(prev => ({
                          ...prev,
                          excludeItems: (prev.excludeItems || []).filter((_, i) => i !== index),
                        })))}
                        className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('excludeItems')}
                    className="w-full px-4 py-2 border border-dashed border-primary/30 rounded text-primary hover:bg-primary/5 transition text-sm"
                  >
                    + Add Exclusion
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Creating...' : 'Create Tour'}
            </button>
            <Link href="/admin/tours" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
