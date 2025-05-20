
import React from 'react';
import MacWindow from '../components/MacWindow';
import Calendar from '../components/Calendar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 cursor-mac">
      <MacWindow>
        <div className="h-[calc(100vh-160px)]">
          <Calendar />
        </div>
      </MacWindow>
      <div className="text-center text-xs text-gray-500 mt-4">
        Part of my interactive portfolio • Click on any event to expand it
      </div>
    </div>
  );
};

export default Index;
