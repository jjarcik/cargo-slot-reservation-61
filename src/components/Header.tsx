
import React from 'react';
import { CalendarClock, Package } from 'lucide-react';
import { Trans } from '@lingui/macro';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-6 md:px-8 border-b border-border animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            <Trans>Cargo Bay Scheduler</Trans>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <div className="flex items-center text-sm bg-white/70 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg shadow-sm">
            <CalendarClock className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
