import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarSidebar from './CalendarSidebar';
import WeekView from './WeekView';
import MonthView from './MonthView';

type ViewType = 'day' | 'week' | 'month' | 'year';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('week'); // Setting default to week view
  
  // Get the start of the current week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };
  
  const startOfWeek = getStartOfWeek(new Date(currentDate));
  
  const goToPrevPeriod = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'week') {
        newDate.setDate(prev.getDate() - 7);
      } else if (view === 'month') {
        newDate.setMonth(prev.getMonth() - 1);
      } else if (view === 'day') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setFullYear(prev.getFullYear() - 1);
      }
      return newDate;
    });
  };
  
  const goToNextPeriod = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'week') {
        newDate.setDate(prev.getDate() + 7);
      } else if (view === 'month') {
        newDate.setMonth(prev.getMonth() + 1);
      } else if (view === 'day') {
        newDate.setDate(prev.getDate() + 1);
      } else {
        newDate.setFullYear(prev.getFullYear() + 1);
      }
      return newDate;
    });
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-900 text-blue-300">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevPeriod={goToPrevPeriod}
        onNextPeriod={goToNextPeriod}
        onToday={goToToday}
        view={view}
        onViewChange={setView}
      />
      <div className="flex flex-1 overflow-hidden">
        <CalendarSidebar currentDate={currentDate} />
        <div className="flex-1 min-h-0 overflow-auto">
          {view === 'week' && <WeekView startDate={startOfWeek} />}
          {view === 'month' && <MonthView currentMonth={currentDate} />}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
