
export type BookingStatus = 'available' | 'booked' | 'conflict';

export interface Booking {
  id: string;
  portId: string;
  startTime: string;
  endTime: string;
  company: string;
  cargoType: string;
  vehicleType: string;
  vehicleNumber?: string;
  status: BookingStatus;
  contactName: string;
  contactPhone: string;
  notes?: string;
}

export interface Port {
  id: string;
  name: string;
  description?: string;
}

export interface TimeSlot {
  time: string;
  bookings: Booking[];
}
