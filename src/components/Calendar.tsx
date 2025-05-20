
import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarSidebar from './CalendarSidebar';
import WeekView from './WeekView';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get the start of the current week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };
  
  const startOfWeek = getStartOfWeek(new Date(currentDate));
  
  const goToPrevWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };
  
  const goToNextWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevWeek={goToPrevWeek}
        onNextWeek={goToNextWeek}
        onToday={goToToday}
      />
      <div className="flex flex-1 overflow-hidden">
        <CalendarSidebar />
        <div className="flex-1 overflow-auto">
          <WeekView startDate={startOfWeek} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
