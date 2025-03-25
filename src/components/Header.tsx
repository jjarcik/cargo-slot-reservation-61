
import React from 'react';
import styled from 'styled-components';
import { CalendarClock, Package } from 'lucide-react';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${({ theme }) => theme.animations.fadeIn};

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const IconContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
`;

const IconWrapper = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => `${theme.colors.card.background}70`};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const DateIconWrapper = styled.div`
  height: 1rem;
  width: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.5rem;
`;

const DateText = styled.span`
  font-weight: 500;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <IconContainer>
            <IconWrapper>
              <Package />
            </IconWrapper>
          </IconContainer>
          <Title>Cargo Bay Scheduler</Title>
        </LogoContainer>
        <DateContainer>
          <DateBadge>
            <DateIconWrapper>
              <CalendarClock />
            </DateIconWrapper>
            <DateText>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </DateText>
          </DateBadge>
        </DateContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
