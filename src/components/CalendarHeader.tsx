
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const CalendarHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };
  
  const goToday = () => {
    setCurrentMonth(new Date());
  };
  
  return (
    <div className="gcal-header">
      <div className="flex items-center">
        <button className="gcal-button" onClick={goToday}>
          Today
        </button>
        <div className="flex items-center mx-4">
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer" onClick={prevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer" onClick={nextMonth}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-xl font-medium">{formatMonth(currentMonth)}</h2>
      </div>
      
      <div className="flex items-center">
        <div className="text-sm text-gray-500 mr-4">
          {currentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })}
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-mac-pointer">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
