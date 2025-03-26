
import React from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { BookingStatus } from '@/utils/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: BookingStatus;
  showText?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showText = true,
  className 
}) => {
  let icon, text, badgeClasses;

  switch (status) {
    case 'available':
      icon = <Clock className="h-3.5 w-3.5" />;
      text = 'Available';
      badgeClasses = 'bg-available text-green-800 border-available-border';
      break;
    case 'booked':
      icon = <CheckCircle className="h-3.5 w-3.5" />;
      text = 'Booked';
      badgeClasses = 'bg-booked text-blue-800 border-booked-border';
      break;
    case 'conflict':
      icon = <AlertTriangle className="h-3.5 w-3.5" />;
      text = 'Conflict';
      badgeClasses = 'bg-conflict text-red-800 border-conflict-border';
      break;
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border',
      badgeClasses,
      className
    )}>
      {icon}
      {showText && <span>{text}</span>}
    </span>
  );
};

export default StatusBadge;
