export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateTourData = (data: any) => {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  }

  if (!data.duration || data.duration.days < 1) {
    errors.duration = 'Duration must be at least 1 day';
  }

  if (!data.price || data.price < 0) {
    errors.price = 'Price must be a positive number';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
