
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

type CalendarHeaderProps = {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentDate, 
  onPrevWeek, 
  onNextWeek, 
  onToday 
}) => {
  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    
    const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'long' });
    
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const year = endOfWeek.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };
  
  return (
    <div className="gcal-header">
      <div className="flex items-center">
        <button className="gcal-button" onClick={onToday}>
          Today
        </button>
        <div className="flex items-center mx-4">
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer" onClick={onPrevWeek}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer" onClick={onNextWeek}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-xl font-medium">{formatWeekRange(currentDate)}</h2>
      </div>
      
      <div className="flex items-center">
        <div className="flex space-x-2 mr-4">
          <button className="px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
            Day
          </button>
          <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 transition-colors">
            Week
          </button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
            Month
          </button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
            Year
          </button>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-mac-pointer">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
