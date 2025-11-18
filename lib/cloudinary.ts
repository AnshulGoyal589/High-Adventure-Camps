'use client';

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryUploadResponse {
  event?: string;
  info: {
    secure_url: string;
    public_id: string;
    [key: string]: any;
  };
}

export const uploadToCloudinary = (
  file: File,
  onSuccess: (url: string) => void,
  onError: (error: string) => void
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET || '');

  fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.secure_url) {
        onSuccess(data.secure_url);
      } else {
        onError('Upload failed');
      }
    })
    .catch(() => onError('Upload failed'));
};
