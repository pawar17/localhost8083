
import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarSidebar from './CalendarSidebar';
import CalendarGrid from './CalendarGrid';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  return (
    <div className="flex flex-col h-full">
      <CalendarHeader />
      <div className="flex flex-1 overflow-hidden">
        <CalendarSidebar />
        <div className="gcal-main">
          <CalendarGrid currentMonth={currentMonth} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
