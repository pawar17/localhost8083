import React from 'react';
import MacWindow from '../components/MacWindow';
import Calendar from '../components/Calendar';
import MacStatusBar from '../components/MacStatusBar';
import MacDock from '../components/MacDock';

const Index: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-transparent cursor-mac">
      <div className="h-10 flex-shrink-0">
        <MacStatusBar />
      </div>
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-hidden w-full">
        <div className="h-full w-full flex flex-col">
          <MacWindow>
            <div className="flex-1 min-h-0 overflow-auto">
              <Calendar />
            </div>
          </MacWindow>
          <div className="text-center text-xs text-gray-500 mt-4 mb-0">
            Part of my interactive portfolio • Click on any event to expand it
          </div>
        </div>
      </div>
      <div className="h-24 flex-shrink-0">
        <MacDock />
      </div>
    </div>
  );
};

export default Index;
