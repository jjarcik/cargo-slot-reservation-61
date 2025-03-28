
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
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
          <DialogDescription className="text-sm text-muted-foreground">
            Booking details for cargo offloading
          </DialogDescription>
        </DialogHeader>

        {booking.status === 'conflict' && (
          <div className="bg-conflict/50 border border-conflict-border rounded-lg p-3 mb-4 flex gap-3 items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">
              This booking conflicts with another reservation during the same time slot.
            </p>
          </div>
        )}

        <div className="grid gap-4">
          <div className="glass-panel p-4">
            <h3 className="font-medium mb-3">Delivery Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm">{booking.cargoType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-sm">{booking.vehicleType} {booking.vehicleNumber ? `(${booking.vehicleNumber})` : ""}</span>
              </div>
              {booking.notes && (
                <div className="flex gap-2">
                  <StickyNote className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{booking.notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="glass-panel p-4">
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                <span className="text-sm">{booking.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm">{booking.contactName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">{booking.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
