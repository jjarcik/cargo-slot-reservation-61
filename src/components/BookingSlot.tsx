
import React from 'react';
import styled from 'styled-components';
import { Booking } from '@/utils/types';
import StatusBadge from './StatusBadge';
import { Truck, AlertCircle, Package } from 'lucide-react';

interface BookingSlotProps {
  booking: Booking;
  onClick: (booking: Booking) => void;
  isSmall?: boolean;
}

interface SlotContainerProps {
  status: 'booked' | 'conflict' | 'available';
  height: number;
  isSmall: boolean;
}

const SlotContainer = styled.div<SlotContainerProps>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  height: ${props => `${props.height}rem`};
  font-size: ${props => props.isSmall ? '0.75rem' : '0.875rem'};
  
  ${({ status, theme }) => {
    switch (status) {
      case 'booked':
        return `
          background-color: ${theme.colors.booked};
          border-color: ${theme.colors.bookedBorder};
        `;
      case 'conflict':
        return `
          background-color: ${theme.colors.conflict};
          border-color: ${theme.colors.conflictBorder};
        `;
      case 'available':
        return `
          background-color: ${theme.colors.available};
          border-color: ${theme.colors.availableBorder};
        `;
      default:
        return '';
    }
  }}
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
`;

const CompanyName = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.25rem;
  max-width: 70%;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #4B5563;
  margin-bottom: 0.25rem;
`;

const IconWrapper = styled.div`
  height: 0.75rem;
  width: 0.75rem;
  margin-right: 0.25rem;
`;

const InfoText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeText = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
`;

const AlertIcon = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  color: #C0392B;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const BookingSlot: React.FC<BookingSlotProps> = ({ booking, onClick, isSmall = false }) => {
  const handleClick = () => {
    onClick(booking);
  };

  // Calculate height based on duration (each 30 mins = 3rem height)
  const startMinutes = parseInt(booking.startTime.split(':')[0]) * 60 + parseInt(booking.startTime.split(':')[1]);
  const endMinutes = parseInt(booking.endTime.split(':')[0]) * 60 + parseInt(booking.endTime.split(':')[1]);
  const durationMinutes = endMinutes - startMinutes;
  const slotHeight = (durationMinutes / 30) * 3;

  return (
    <SlotContainer 
      status={booking.status} 
      height={slotHeight} 
      isSmall={isSmall}
      onClick={handleClick}
    >
      <HeaderContainer>
        <CompanyName>{booking.company}</CompanyName>
        <StatusBadge status={booking.status} showText={!isSmall} />
      </HeaderContainer>
      
      {!isSmall && (
        <>
          <InfoRow>
            <IconWrapper>
              <Truck />
            </IconWrapper>
            <InfoText>{booking.vehicleType}</InfoText>
          </InfoRow>
          <InfoRow>
            <IconWrapper>
              <Package />
            </IconWrapper>
            <InfoText>{booking.cargoType}</InfoText>
          </InfoRow>
        </>
      )}
      
      <TimeText>
        {booking.startTime} - {booking.endTime}
      </TimeText>
      
      {booking.status === 'conflict' && (
        <AlertIcon>
          <AlertCircle size={16} />
        </AlertIcon>
      )}
    </SlotContainer>
  );
};

export default BookingSlot;
