
import React from 'react';
import styled from 'styled-components';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { BookingStatus } from '@/utils/types';

interface StatusBadgeProps {
  status: BookingStatus;
  showText?: boolean;
  className?: string;
}

interface BadgeContainerProps {
  status: BookingStatus;
}

const BadgeContainer = styled.span<BadgeContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid;
  
  ${({ status }) => {
    switch (status) {
      case 'available':
        return `
          background-color: #E5FCEC;
          color: #1E8449;
          border-color: #A3E9C1;
        `;
      case 'booked':
        return `
          background-color: #E9F0FF;
          color: #2E5AAC;
          border-color: #B1C5F6;
        `;
      case 'conflict':
        return `
          background-color: #FFF0F0;
          color: #C0392B;
          border-color: #FFCDD2;
        `;
      default:
        return '';
    }
  }}
`;

const IconWrapper = styled.div`
  height: 14px;
  width: 14px;
`;

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showText = true,
  className 
}) => {
  let icon, text;

  switch (status) {
    case 'available':
      icon = <Clock />;
      text = 'Available';
      break;
    case 'booked':
      icon = <CheckCircle />;
      text = 'Booked';
      break;
    case 'conflict':
      icon = <AlertTriangle />;
      text = 'Conflict';
      break;
  }

  return (
    <BadgeContainer status={status} className={className}>
      <IconWrapper>{icon}</IconWrapper>
      {showText && <span>{text}</span>}
    </BadgeContainer>
  );
};

export default StatusBadge;
