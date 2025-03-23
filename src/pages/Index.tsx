
import React from 'react';
import Header from '@/components/Header';
import TimelineGrid from '@/components/TimelineGrid';
import { Info, Package } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 md:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Warehouse Offloading Schedule</h2>
          <p className="text-gray-500">View and manage cargo offloading slots for all warehouse bays</p>
        </div>
        
        <div className="glass-panel p-3 border-l-4 border-l-primary/60 mb-6 flex items-start space-x-3 animate-blur-in">
          <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">This schedule shows all offloading slots across the warehouse facility. Click on any booking to view details.</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-red-600 font-medium">Red highlights</span> indicate scheduling conflicts that need attention.
            </p>
          </div>
        </div>
        
        <div className="mb-8 animate-fade-up delay-150">
          <div className="h-[calc(100vh-240px)] overflow-auto pr-4 -mr-4">
            <TimelineGrid />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4 px-6 md:px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center mb-2 md:mb-0">
            <Package className="h-4 w-4 mr-2 text-primary" />
            <span>Cargo Bay Scheduler</span>
          </div>
          <div>© {new Date().getFullYear()} Warehouse Management System</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
