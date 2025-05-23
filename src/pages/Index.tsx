import React from 'react';
import MacWindow from '../components/MacWindow';
import Calendar from '../components/Calendar';
import MacStatusBar from '../components/MacStatusBar';
import MacDock from '../components/MacDock';

const Index: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-center bg-cover" style={{ backgroundImage: 'url(\/wallpaper mac.png)' }}>
      <div className="h-10 flex-shrink-0">
        <MacStatusBar />
      </div>
      <div className="flex-1 min-h-0 flex flex-col w-full px-4 py-2">
        <div className="flex flex-col flex-1 min-h-0">
          <MacWindow>
            <div className="flex-1 min-h-0 overflow-auto">
              <Calendar />
            </div>
          </MacWindow>
        </div>
      </div>
      <div className="h-24 flex-shrink-0">
        <MacDock />
      </div>
    </div>
  );
};

export default Index;
