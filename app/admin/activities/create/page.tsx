'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity } from '@/lib/types';
import { apiPost } from '@/lib/utils/api-client';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/image-upload';

export default function CreateActivity() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({
    title: '',
    description: '',
    type: '',
    duration: 2,
    price: 0,
    location: '',
    difficulty: 'moderate',
    maxParticipants: 10,
    includes: [],
    images: [],
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await apiPost('/api/activities', formData);
      router.push('/admin/activities');
    } catch (err: any) {
      setError(err.message || 'Failed to create activity');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/activities" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Back to Activities
        </Link>

        <h1 className="text-3xl font-bold mb-8">Create New Activity</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Activity Information</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Activity Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Rock Climbing"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="Rock Climbing">Rock Climbing</option>
                  <option value="Paragliding">Paragliding</option>
                  <option value="Skiing">Skiing</option>
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
                placeholder="Describe the activity..."
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Duration (minutes) *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min={1}
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

              <div>
                <label className="block text-sm font-semibold mb-2">Max Participants *</label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">Mark as featured</span>
                </label>
              </div>
            </div>
          </div>

          {/* Activity Images section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Images</h2>
            <ImageUpload
              images={formData.images || []}
              onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
              maxImages={10}
            />
          </div>

          {/* What's Included section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">What's Included</h2>
            <div className="space-y-3">
              {(formData.includes || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newIncludes = [...(formData.includes || [])];
                      newIncludes[index] = e.target.value;
                      setFormData(prev => ({ ...prev, includes: newIncludes }));
                    }}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Equipment, Instruction, Insurance"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      includes: (prev.includes || []).filter((_, i) => i !== index),
                    }))}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  includes: [...(prev.includes || []), ''],
                }))}
                className="w-full px-4 py-2 border border-dashed border-primary/30 rounded text-primary hover:bg-primary/5 transition"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Creating...' : 'Create Activity'}
            </button>
            <Link href="/admin/activities" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
