
import { Booking, Port } from './types';

// Generate all time slots from 5:00 AM to 10:00 PM in 30 minute increments
export const generateTimeSlots = () => {
  const times: string[] = [];
  for (let hour = 5; hour <= 22; hour++) {
    const hourFormatted = hour.toString().padStart(2, '0');
    times.push(`${hourFormatted}:00`);
    times.push(`${hourFormatted}:30`);
  }
  return times;
};

export const TIME_SLOTS = generateTimeSlots();

export const PORTS: Port[] = [
  { id: 'port-1', name: 'Bay A', description: 'North Wing - Heavy Loads' },
  { id: 'port-2', name: 'Bay B', description: 'North Wing - Standard Cargo' },
  { id: 'port-3', name: 'Bay C', description: 'East Wing - Refrigerated' },
  { id: 'port-4', name: 'Bay D', description: 'South Wing - Standard Cargo' },
  { id: 'port-5', name: 'Bay E', description: 'West Wing - Hazardous Materials' },
];

export const BOOKINGS: Booking[] = [
  // Port 1 bookings
  {
    id: 'booking-1',
    portId: 'port-1',
    startTime: '06:00',
    endTime: '07:30',
    company: 'Global Logistics',
    cargoType: 'Heavy Machinery',
    vehicleType: 'Semi Truck',
    vehicleNumber: 'GL-5463',
    status: 'booked',
    contactName: 'John Miller',
    contactPhone: '(555) 123-4567',
  },
  {
    id: 'booking-2',
    portId: 'port-1',
    startTime: '09:30',
    endTime: '10:30',
    company: 'Swift Deliveries',
    cargoType: 'Construction Equipment',
    vehicleType: 'Flatbed Truck',
    vehicleNumber: 'SD-7890',
    status: 'booked',
    contactName: 'Sarah Johnson',
    contactPhone: '(555) 234-5678',
  },
  {
    id: 'booking-3',
    portId: 'port-1',
    startTime: '13:00',
    endTime: '14:30',
    company: 'BuildCorp Inc.',
    cargoType: 'Steel Beams',
    vehicleType: 'Semi Truck',
    vehicleNumber: 'BC-1234',
    status: 'booked',
    contactName: 'Robert Chen',
    contactPhone: '(555) 345-6789',
  },
  {
    id: 'booking-4',
    portId: 'port-1',
    startTime: '18:00',
    endTime: '19:30',
    company: 'Sunset Freight',
    cargoType: 'Industrial Machinery',
    vehicleType: 'Semi Truck',
    vehicleNumber: 'SF-4567',
    status: 'booked',
    contactName: 'Maria Garcia',
    contactPhone: '(555) 456-7890',
  },

  // Port 2 bookings
  {
    id: 'booking-5',
    portId: 'port-2',
    startTime: '05:30',
    endTime: '06:30',
    company: 'Morning Express',
    cargoType: 'General Goods',
    vehicleType: 'Box Truck',
    vehicleNumber: 'ME-8901',
    status: 'booked',
    contactName: 'David Wilson',
    contactPhone: '(555) 567-8901',
  },
  {
    id: 'booking-6',
    portId: 'port-2',
    startTime: '08:30',
    endTime: '09:30',
    company: 'City Distributors',
    cargoType: 'Retail Products',
    vehicleType: 'Box Truck',
    vehicleNumber: 'CD-2345',
    status: 'booked',
    contactName: 'Lisa Brown',
    contactPhone: '(555) 678-9012',
  },
  {
    id: 'booking-7',
    portId: 'port-2',
    startTime: '11:00',
    endTime: '13:00',
    company: 'Retail Solutions',
    cargoType: 'Store Fixtures',
    vehicleType: 'Box Truck',
    vehicleNumber: 'RS-6789',
    status: 'booked',
    contactName: 'Michael Davis',
    contactPhone: '(555) 789-0123',
    notes: 'Delivery for downtown mall renovation',
  },
  {
    id: 'booking-8',
    portId: 'port-2',
    startTime: '15:30',
    endTime: '16:30',
    company: 'Quick Ship',
    cargoType: 'Mixed Freight',
    vehicleType: 'Box Truck',
    vehicleNumber: 'QS-0123',
    status: 'booked',
    contactName: 'Jennifer Taylor',
    contactPhone: '(555) 890-1234',
  },
  {
    id: 'booking-9',
    portId: 'port-2',
    startTime: '19:00',
    endTime: '20:00',
    company: 'Evening Logistics',
    cargoType: 'General Goods',
    vehicleType: 'Box Truck',
    vehicleNumber: 'EL-4567',
    status: 'booked',
    contactName: 'Thomas Martin',
    contactPhone: '(555) 901-2345',
  },

  // Port 3 bookings - Conflict demonstration
  {
    id: 'booking-10',
    portId: 'port-3',
    startTime: '07:00',
    endTime: '08:30',
    company: 'Fresh Foods Inc.',
    cargoType: 'Produce',
    vehicleType: 'Refrigerated Truck',
    vehicleNumber: 'FF-8901',
    status: 'booked',
    contactName: 'Laura Williams',
    contactPhone: '(555) 012-3456',
    notes: 'Time-sensitive delivery',
  },
  {
    id: 'booking-11', // First conflicting booking
    portId: 'port-3',
    startTime: '10:00',
    endTime: '11:30',
    company: 'Frozen Goods Co.',
    cargoType: 'Frozen Products',
    vehicleType: 'Refrigerated Truck',
    vehicleNumber: 'FG-2345',
    status: 'conflict',
    contactName: 'Daniel Brown',
    contactPhone: '(555) 123-4567',
  },
  {
    id: 'booking-12', // Second conflicting booking
    portId: 'port-3',
    startTime: '10:00',
    endTime: '11:00',
    company: 'Cool Transit',
    cargoType: 'Dairy Products',
    vehicleType: 'Refrigerated Truck',
    vehicleNumber: 'CT-6789',
    status: 'conflict',
    contactName: 'Emily Johnson',
    contactPhone: '(555) 234-5678',
  },
  {
    id: 'booking-13',
    portId: 'port-3',
    startTime: '14:00',
    endTime: '15:30',
    company: 'Seafood Express',
    cargoType: 'Fresh Seafood',
    vehicleType: 'Refrigerated Truck',
    vehicleNumber: 'SE-0123',
    status: 'booked',
    contactName: 'Christopher Lee',
    contactPhone: '(555) 345-6789',
  },
  {
    id: 'booking-14',
    portId: 'port-3',
    startTime: '18:30',
    endTime: '20:00',
    company: 'Night Chill',
    cargoType: 'Ice Cream',
    vehicleType: 'Refrigerated Truck',
    vehicleNumber: 'NC-4567',
    status: 'booked',
    contactName: 'Amanda Wilson',
    contactPhone: '(555) 456-7890',
  },

  // Port 4 bookings
  {
    id: 'booking-15',
    portId: 'port-4',
    startTime: '06:30',
    endTime: '08:00',
    company: 'Standard Freight',
    cargoType: 'Mixed Cargo',
    vehicleType: 'Semi Truck',
    vehicleNumber: 'SF-8901',
    status: 'booked',
    contactName: 'Jason Miller',
    contactPhone: '(555) 567-8901',
  },
  {
    id: 'booking-16',
    portId: 'port-4',
    startTime: '09:00',
    endTime: '10:30',
    company: 'Metro Delivery',
    cargoType: 'Office Supplies',
    vehicleType: 'Box Truck',
    vehicleNumber: 'MD-2345',
    status: 'booked',
    contactName: 'Rebecca Davis',
    contactPhone: '(555) 678-9012',
  },
  {
    id: 'booking-17',
    portId: 'port-4',
    startTime: '13:30',
    endTime: '15:00',
    company: 'Office Solutions',
    cargoType: 'Furniture',
    vehicleType: 'Box Truck',
    vehicleNumber: 'OS-6789',
    status: 'booked',
    contactName: 'Kevin Thompson',
    contactPhone: '(555) 789-0123',
  },
  {
    id: 'booking-18',
    portId: 'port-4',
    startTime: '17:30',
    endTime: '19:00',
    company: 'Sunset Movers',
    cargoType: 'Residential Items',
    vehicleType: 'Moving Truck',
    vehicleNumber: 'SM-0123',
    status: 'booked',
    contactName: 'Michelle Garcia',
    contactPhone: '(555) 890-1234',
  },

  // Port 5 bookings
  {
    id: 'booking-19',
    portId: 'port-5',
    startTime: '07:30',
    endTime: '09:00',
    company: 'Hazmat Transport',
    cargoType: 'Industrial Chemicals',
    vehicleType: 'Tanker Truck',
    vehicleNumber: 'HT-4567',
    status: 'booked',
    contactName: 'Steven Clark',
    contactPhone: '(555) 901-2345',
    notes: 'Class 3 Flammable Liquids',
  },
  {
    id: 'booking-20',
    portId: 'port-5',
    startTime: '11:30',
    endTime: '13:00',
    company: 'Safety First Inc.',
    cargoType: 'Medical Waste',
    vehicleType: 'Specialized Vehicle',
    vehicleNumber: 'SF-8901',
    status: 'booked',
    contactName: 'Melissa Young',
    contactPhone: '(555) 012-3456',
  },
  {
    id: 'booking-21',
    portId: 'port-5',
    startTime: '15:30',
    endTime: '17:00',
    company: 'Chemical Supply Co.',
    cargoType: 'Laboratory Chemicals',
    vehicleType: 'Specialized Vehicle',
    vehicleNumber: 'CS-2345',
    status: 'booked',
    contactName: 'Jonathan Baker',
    contactPhone: '(555) 123-4567',
    notes: 'Handle with care',
  },
  {
    id: 'booking-22',
    portId: 'port-5',
    startTime: '20:00',
    endTime: '21:30',
    company: 'Night Hazard',
    cargoType: 'Industrial Solvents',
    vehicleType: 'Tanker Truck',
    vehicleNumber: 'NH-6789',
    status: 'booked',
    contactName: 'Rachel Green',
    contactPhone: '(555) 234-5678',
  },
];

// Function to get bookings for a specific port
export const getBookingsForPort = (portId: string): Booking[] => {
  return BOOKINGS.filter(booking => booking.portId === portId);
};

// Function to determine if a time slot has a booking
export const hasBookingAtTime = (portId: string, time: string): Booking[] => {
  return BOOKINGS.filter(booking => 
    booking.portId === portId && 
    time >= booking.startTime && 
    time < booking.endTime
  );
};

// Function to determine if a booking has a conflict
export const detectConflicts = () => {
  // This would normally update booking statuses based on conflicts
  // For demonstration, we already marked conflicts in our sample data
  return BOOKINGS;
};
