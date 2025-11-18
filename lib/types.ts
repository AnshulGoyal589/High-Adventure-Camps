export type UserRole = 'admin' | 'customer';

export interface Tour {
  _id?: string;
  title: string;
  description: string;
  type: string;
  location: string;
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  groupSize: {
    min: number;
    max: number;
  };
  difficulty: string;
  itinerary: string[];
  highlights: string[];
  includeItems: string[];
  excludeItems: string[];
  seasonalAvailability: number[];
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  _id?: string;
  title: string;
  description: string;
  type: string;
  duration: number;
  price: number;
  location: string;
  difficulty: string;
  ageRestriction?: number;
  maxParticipants: number;
  includes: string[];
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  _id?: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  location: string;
  highlights: string[];
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
  createdAt: Date;
}

export interface Booking {
  _id?: string;
  userId: string;
  tourId: string;
  tourTitle: string;
  tourPrice: number;
  numberOfPeople: number;
  totalPrice: number;
  startDate: string;
  specialRequests: string;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentDetails?: {
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
  };
  createdAt: Date;
  updatedAt: Date;
}
