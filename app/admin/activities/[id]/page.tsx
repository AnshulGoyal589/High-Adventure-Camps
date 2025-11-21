'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Activity } from '@/lib/types';
import { apiGet, apiPut } from '@/lib/utils/api-client';
import { ImageUpload } from '@/components/image-upload';
import { ArrowLeft, Loader, X } from 'lucide-react';
import Link from 'next/link';

export default function EditActivity() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    fetchActivity();
  }, [id]);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const data = await apiGet<Activity>(`/api/activities/${id}`);
      setFormData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load activity');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof Activity] as any[]).map((item, i) => i === index ? value : item),
    }));
  };

  const handleAddArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...((prev[field as keyof Activity] as any[]) || []), ''],
    }));
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof Activity] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await apiPut(`/api/activities/${id}`, formData);
      router.push('/admin/activities');
    } catch (err: any) {
      setError(err.message || 'Failed to update activity');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/activities" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Back to Activities
        </Link>

        <h1 className="text-3xl font-bold mb-8">Edit Activity</h1>

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

          {/* Images */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Images</h2>
            <ImageUpload
              images={formData.images || []}
              onImagesChange={handleImagesChange}
              maxImages={10}
            />
          </div>

          {/* What's Included */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">What's Included</h2>
            <div className="space-y-3">
              {(formData.includes || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('includes', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('includes', index)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem('includes')}
                className="w-full px-4 py-2 border border-dashed border-primary/30 rounded text-primary hover:bg-primary/5 transition"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Saving...' : 'Save Changes'}
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
