// src/interfaces/provider-meta.interface.ts
export interface TimeSlot {
  start: string; // "09:00"
  end: string;   // "09:30"
  durationMinutes?: number; // optional helper
  capacity?: number; // how many bookings allowed in slot
}

export interface DayAvailability {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  slots: TimeSlot[];
  active?: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  currency?: string; // "PKR", "USD"
}

export interface DocumentMeta {
  id?: string; // file id or filename
  type?: string; // "license", "nid", etc.
  url?: string;
  uploadedAt?: string;
}

export interface ProviderMeta {
  shortBio?: string;
  businessName?: string;
  servicesOffered?: string[];          // ["AC Repair", "General Plumbing"]
  languages?: string[];                // ["en", "ur"]
  yearsOfExperience?: number;
  priceRange?: PriceRange;
  availability?: DayAvailability[];    // weekly availability
  documents?: DocumentMeta[];          // uploaded docs
  rating?: number;                     // average rating
  tags?: string[];                     // free tags
  settings?: Record<string, any>;      // misc settings
  // any future fields allowed (but validated through DTO on input)
  [key: string]: any;
}
