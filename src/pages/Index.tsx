
import React from 'react';
import MacWindow from '../components/MacWindow';
import Calendar from '../components/Calendar';
import MacStatusBar from '../components/MacStatusBar';
import MacDock from '../components/MacDock';
import StickyNote from '../components/StickyNote';

const Index: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(/mac wallpaper 3.png)' }}>
      <MacStatusBar />
      <StickyNote />
      <div className="flex-1 min-h-0 flex flex-col w-full p-4 max-w-5xl mx-auto">
        <div className="flex flex-col flex-1 min-h-0">
          <MacWindow title="Calendar">
            <div className="flex-1 min-h-0 overflow-hidden">
              <Calendar />
            </div>
          </MacWindow>
        </div>
      </div>
      <div className="h-20 flex-shrink-0">
        <MacDock />
      </div>
    </div>
  );
};

export default Index;
