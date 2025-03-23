
import React, { useState } from 'react';
import { PORTS, TIME_SLOTS, hasBookingAtTime } from '@/utils/data';
import { Booking } from '@/utils/types';
import BookingSlot from './BookingSlot';
import BookingModal from './BookingModal';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const TimelineGrid: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle clicking on a booking
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              const bookingsAtTime = hasBookingAtTime(port.id, time);
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
      />
    </div>
  );
};

export default TimelineGrid;
