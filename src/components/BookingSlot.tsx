
import React from 'react';
import { Booking } from '@/utils/types';
import StatusBadge from './StatusBadge';
import { Truck, AlertCircle, Package, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingSlotProps {
  booking: Booking;
  onClick: (booking: Booking) => void;
  isSmall?: boolean;
}

const BookingSlot: React.FC<BookingSlotProps> = ({ booking, onClick, isSmall = false }) => {
  const handleClick = () => {
    onClick(booking);
  };

  // Determine background and border colors based on status
  const slotClasses = {
    'booked': 'bg-booked border-booked-border',
    'conflict': 'bg-conflict border-conflict-border',
    'available': 'bg-available border-available-border',
  };

  // Calculate height based on duration (each 30 mins = 3rem height)
  const startMinutes = parseInt(booking.startTime.split(':')[0]) * 60 + parseInt(booking.startTime.split(':')[1]);
  const endMinutes = parseInt(booking.endTime.split(':')[0]) * 60 + parseInt(booking.endTime.split(':')[1]);
  const durationMinutes = endMinutes - startMinutes;
  const slotHeight = (durationMinutes / 30) * 3;

  return (
    <div 
      className={cn(
        'p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md relative overflow-hidden group',
        slotClasses[booking.status],
        isSmall ? 'text-xs' : 'text-sm'
      )}
      style={{ height: `${slotHeight}rem` }}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium truncate mr-1 max-w-[70%]">{booking.company}</div>
        <StatusBadge status={booking.status} showText={!isSmall} />
      </div>
      
      {!isSmall && (
        <>
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <Truck className="h-3 w-3 mr-1" />
            <span className="truncate">{booking.vehicleType}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <Package className="h-3 w-3 mr-1" />
            <span className="truncate">{booking.cargoType}</span>
          </div>
        </>
      )}
      
      <div className="text-xs font-medium">
        {booking.startTime} - {booking.endTime}
      </div>
      
      {booking.status === 'conflict' && (
        <div className="absolute top-1 right-1">
          <AlertCircle className="h-4 w-4 text-red-600 animate-pulse" />
        </div>
      )}
      
      {/* Edit indicator that appears on hover */}
      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit className="h-3.5 w-3.5 text-gray-500" />
      </div>
    </div>
  );
};

export default BookingSlot;
