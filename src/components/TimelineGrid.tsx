
import React, { useState } from 'react';
import { PORTS, TIME_SLOTS, hasBookingAtTime, BOOKINGS } from '@/utils/data';
import { Booking } from '@/utils/types';
import BookingSlot from './BookingSlot';
import BookingModal from './BookingModal';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TimelineGrid: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);

  // Function to handle clicking on a booking
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Function to handle saving edited booking
  const handleSaveBooking = (updatedBooking: Booking) => {
    // Update the bookings state with the edited booking
    const updatedBookings = bookings.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    
    // Check for conflicts
    const potentialConflicts = updatedBookings.filter(booking => 
      booking.id !== updatedBooking.id && 
      booking.portId === updatedBooking.portId && 
      ((booking.startTime >= updatedBooking.startTime && booking.startTime < updatedBooking.endTime) ||
       (booking.endTime > updatedBooking.startTime && booking.endTime <= updatedBooking.endTime) ||
       (booking.startTime <= updatedBooking.startTime && booking.endTime >= updatedBooking.endTime))
    );
    
    if (potentialConflicts.length > 0) {
      // Mark conflict status
      updatedBooking.status = 'conflict';
      potentialConflicts.forEach(conflict => {
        const index = updatedBookings.findIndex(b => b.id === conflict.id);
        if (index !== -1) {
          updatedBookings[index] = {
            ...updatedBookings[index],
            status: 'conflict'
          };
        }
      });
      
      toast.warning('This booking now conflicts with existing bookings');
    } else if (updatedBooking.status === 'conflict') {
      // If the booking was previously in conflict but now isn't
      updatedBooking.status = 'booked';
      
      // Check if other bookings are no longer in conflict
      updatedBookings.forEach((booking, index) => {
        if (booking.status === 'conflict' && booking.portId === updatedBooking.portId) {
          // Recheck all other bookings to see if they're still in conflict
          const otherConflicts = updatedBookings.filter(b => 
            b.id !== booking.id && 
            b.portId === booking.portId && 
            ((b.startTime >= booking.startTime && b.startTime < booking.endTime) ||
             (b.endTime > booking.startTime && b.endTime <= booking.endTime) ||
             (b.startTime <= booking.startTime && b.endTime >= booking.endTime))
          );
          
          if (otherConflicts.length === 0) {
            updatedBookings[index] = {
              ...updatedBookings[index],
              status: 'booked'
            };
          }
        }
      });
    }
    
    setBookings(updatedBookings);
    toast.success('Booking has been updated');
  };

  // Custom function to check bookings at a specific time using the current bookings state
  const getBookingsAtTime = (portId: string, time: string): Booking[] => {
    return bookings.filter(booking => 
      booking.portId === portId && 
      time >= booking.startTime && 
      time < booking.endTime
    );
  };

  return (
    <div className="animate-fade-up">
      <div className="flex overflow-x-auto pb-4">
        {/* Time column */}
        <div className="flex-shrink-0 pr-4 pt-16">
          <div className="w-20">
            {TIME_SLOTS.map((time, index) => (
              <div key={`time-${index}`} className="h-12 flex items-center justify-end">
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  <Clock className="h-3 w-3 mr-1" />
                  {time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Port columns */}
        {PORTS.map((port, portIndex) => (
          <div key={port.id} className="flex-shrink-0 w-64 first:pl-0 pl-4">
            <div className="glass-panel h-16 mb-3 p-3 sticky top-0 z-10">
              <div className="font-semibold">{port.name}</div>
              <div className="text-xs text-gray-500">{port.description}</div>
            </div>
            
            {TIME_SLOTS.map((time, timeIndex) => {
              const bookingsAtTime = getBookingsAtTime(port.id, time);
              const isEvenHour = parseInt(time.split(':')[1]) === 0;
              
              return (
                <div 
                  key={`${port.id}-${time}`} 
                  className={cn(
                    "h-12 border-t relative",
                    isEvenHour ? "border-gray-200" : "border-gray-100"
                  )}
                >
                  {bookingsAtTime.length > 0 && timeIndex === TIME_SLOTS.findIndex(t => t >= bookingsAtTime[0].startTime) && (
                    bookingsAtTime.map(booking => (
                      <div 
                        key={booking.id} 
                        className="absolute left-0 right-0 z-10"
                      >
                        <BookingSlot 
                          booking={booking} 
                          onClick={handleBookingClick} 
                          isSmall={bookingsAtTime.length > 1}
                        />
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <BookingModal 
        booking={selectedBooking} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onEditSave={handleSaveBooking}
      />
    </div>
  );
};

export default TimelineGrid;
