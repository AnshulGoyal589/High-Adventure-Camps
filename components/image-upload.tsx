'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed. You have ${images.length} images.`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        if (data.secure_url) {
          onImagesChange([...images, data.secure_url]);
        }
      }
    } catch (err) {
      setError('Failed to upload images. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Images ({images.length}/{maxImages})
        </label>
        
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={uploading || images.length >= maxImages}
          className="w-full px-4 py-8 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary transition disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader size={24} className="animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={24} className="text-primary" />
              <span className="text-sm font-medium">Click to upload images</span>
              <span className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB each</span>
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                width={400}
                height={240}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
