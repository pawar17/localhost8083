
import React from 'react';
import MacWindow from '../components/MacWindow';
import Calendar from '../components/Calendar';
import MacStatusBar from '../components/MacStatusBar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 cursor-mac flex flex-col">
      <MacStatusBar />
      <div className="flex-1 p-4">
        <MacWindow>
          <div className="h-[calc(100vh-160px)]">
            <Calendar />
          </div>
        </MacWindow>
        <div className="text-center text-xs text-gray-500 mt-4">
          Part of my interactive portfolio • Click on any event to expand it
        </div>
      </div>
    </div>
  );
};

export default Index;
