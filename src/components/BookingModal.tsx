
import React from 'react';
import styled, { css } from 'styled-components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Booking } from '@/utils/types';
import StatusBadge from './StatusBadge';
import { 
  Building, 
  Calendar, 
  Clock, 
  Package, 
  Phone, 
  Truck, 
  User,
  AlertTriangle,
  StickyNote
} from 'lucide-react';

interface BookingModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const DialogDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const ConflictAlert = styled.div`
  background-color: ${({ theme }) => `${theme.colors.conflict}50`};
  border: 1px solid ${({ theme }) => theme.colors.conflictBorder};
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const AlertIcon = styled.div`
  color: #C0392B;
  flex-shrink: 0;
`;

const AlertText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #C0392B;
`;

const ModalGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoPanel = styled.div`
  background-color: #FFFFFF;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadows.glass};
`;

const PanelTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
`;

const InfoText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const NoteItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NoteIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  margin-top: 2px;
`;

const BookingModal: React.FC<BookingModalProps> = ({ booking, isOpen, onClose }) => {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="pb-2">
          <div className="flex justify-between items-center mb-1">
            <DialogTitle className="text-xl">{booking.company}</DialogTitle>
            <StatusBadge status={booking.status} />
          </div>
          <DialogDescription>
            Booking details for cargo offloading
          </DialogDescription>
        </DialogHeader>

        {booking.status === 'conflict' && (
          <ConflictAlert>
            <AlertIcon>
              <AlertTriangle size={20} />
            </AlertIcon>
            <AlertText>
              This booking conflicts with another reservation during the same time slot.
            </AlertText>
          </ConflictAlert>
        )}

        <ModalGrid>
          <InfoPanel>
            <PanelTitle>Delivery Information</PanelTitle>
            <InfoList>
              <InfoItem>
                <IconWrapper>
                  <Calendar />
                </IconWrapper>
                <InfoText>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </InfoText>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <Clock />
                </IconWrapper>
                <InfoText>{booking.startTime} - {booking.endTime}</InfoText>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <Package />
                </IconWrapper>
                <InfoText>{booking.cargoType}</InfoText>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <Truck />
                </IconWrapper>
                <InfoText>{booking.vehicleType} {booking.vehicleNumber ? `(${booking.vehicleNumber})` : ""}</InfoText>
              </InfoItem>
              {booking.notes && (
                <NoteItem>
                  <NoteIconWrapper>
                    <StickyNote />
                  </NoteIconWrapper>
                  <InfoText>{booking.notes}</InfoText>
                </NoteItem>
              )}
            </InfoList>
          </InfoPanel>

          <InfoPanel>
            <PanelTitle>Contact Information</PanelTitle>
            <InfoList>
              <InfoItem>
                <IconWrapper>
                  <Building />
                </IconWrapper>
                <InfoText>{booking.company}</InfoText>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <User />
                </IconWrapper>
                <InfoText>{booking.contactName}</InfoText>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <Phone />
                </IconWrapper>
                <InfoText>{booking.contactPhone}</InfoText>
              </InfoItem>
            </InfoList>
          </InfoPanel>
        </ModalGrid>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
