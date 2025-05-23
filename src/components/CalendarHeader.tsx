
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';

type ViewType = 'day' | 'week' | 'month' | 'year';

type CalendarHeaderProps = {
  currentDate: Date;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  onToday: () => void;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentDate, 
  onPrevPeriod, 
  onNextPeriod, 
  onToday,
  view,
  onViewChange
}) => {
  const formatPeriodRange = (date: Date, view: ViewType) => {
    if (view === 'month') {
      return `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;
    }
    
    if (view === 'year') {
      return date.getFullYear().toString();
    }
    
    if (view === 'day') {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
    }

    // Default week view formatting
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
    <div className="gcal-header border-b border-gray-200 bg-white p-3">
      <div className="flex items-center">
        <button 
          className="bg-white hover:bg-gray-100 text-sm rounded-md px-3 py-1 border border-gray-300 transition-colors text-gray-800"
          onClick={onToday}
        >
          Today
        </button>
        <div className="flex items-center mx-4">
          <button 
            className="p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer text-gray-700" 
            onClick={onPrevPeriod}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer text-gray-700" 
            onClick={onNextPeriod}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{formatPeriodRange(currentDate, view)}</h2>
        
        <button className="ml-4 bg-white hover:bg-gray-100 rounded-full p-1 text-gray-700">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center">
        <div className="flex space-x-1">
          {['Day', 'Week', 'Month', 'Year'].map((viewOption) => (
            <button 
              key={viewOption} 
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                view === viewOption.toLowerCase() 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => onViewChange(viewOption.toLowerCase() as ViewType)}
            >
              {viewOption}
            </button>
          ))}
        </div>
        <div className="ml-4 p-1 hover:bg-gray-100 rounded-full cursor-mac-pointer text-gray-700">
          <CalendarIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
