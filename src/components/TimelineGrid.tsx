
import React, { useState } from 'react';
import styled from 'styled-components';
import { PORTS, TIME_SLOTS, hasBookingAtTime } from '@/utils/data';
import { Booking } from '@/utils/types';
import BookingSlot from './BookingSlot';
import BookingModal from './BookingModal';
import { Clock } from 'lucide-react';

const GridContainer = styled.div`
  animation: fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const TimeColumn = styled.div`
  flex-shrink: 0;
  padding-right: 1rem;
  padding-top: 4rem;
`;

const TimeBox = styled.div`
  width: 5rem;
`;

const TimeRow = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TimeLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #6B7280;
  font-weight: 500;
`;

const ClockIcon = styled.span`
  margin-right: 0.25rem;
  height: 0.75rem;
  width: 0.75rem;
`;

const PortColumn = styled.div`
  flex-shrink: 0;
  width: 16rem;
  padding-left: 1rem;

  &:first-child {
    padding-left: 0;
  }
`;

const PortHeader = styled.div`
  background-color: #FFFFFF;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 4rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.shadows.glass};
`;

const PortTitle = styled.div`
  font-weight: 600;
`;

const PortDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #6B7280;
`;

interface TimeSlotRowProps {
  isEvenHour: boolean;
}

const TimeSlotRow = styled.div<TimeSlotRowProps>`
  height: 3rem;
  border-top: 1px solid ${props => props.isEvenHour ? '#E5E7EB' : '#F3F4F6'};
  position: relative;
`;

const BookingSlotWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
`;

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
    <GridContainer>
      <ScrollContainer>
        {/* Time column */}
        <TimeColumn>
          <TimeBox>
            {TIME_SLOTS.map((time, index) => (
              <TimeRow key={`time-${index}`}>
                <TimeLabel>
                  <ClockIcon>
                    <Clock size={12} />
                  </ClockIcon>
                  {time}
                </TimeLabel>
              </TimeRow>
            ))}
          </TimeBox>
        </TimeColumn>

        {/* Port columns */}
        {PORTS.map((port) => (
          <PortColumn key={port.id}>
            <PortHeader>
              <PortTitle>{port.name}</PortTitle>
              <PortDescription>{port.description}</PortDescription>
            </PortHeader>
            
            {TIME_SLOTS.map((time, timeIndex) => {
              const bookingsAtTime = hasBookingAtTime(port.id, time);
              const isEvenHour = parseInt(time.split(':')[1]) === 0;
              
              return (
                <TimeSlotRow 
                  key={`${port.id}-${time}`}
                  isEvenHour={isEvenHour}
                >
                  {bookingsAtTime.length > 0 && timeIndex === TIME_SLOTS.findIndex(t => t >= bookingsAtTime[0].startTime) && (
                    bookingsAtTime.map(booking => (
                      <BookingSlotWrapper key={booking.id}>
                        <BookingSlot 
                          booking={booking} 
                          onClick={handleBookingClick} 
                          isSmall={bookingsAtTime.length > 1}
                        />
                      </BookingSlotWrapper>
                    ))
                  )}
                </TimeSlotRow>
              );
            })}
          </PortColumn>
        ))}
      </ScrollContainer>

      <BookingModal 
        booking={selectedBooking} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </GridContainer>
  );
};

export default TimelineGrid;
