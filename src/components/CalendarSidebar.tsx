
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const CalendarSidebar: React.FC = () => {
  const currentDate = new Date();
  
  const miniCalendarDays = Array.from({ length: 31 }, (_, i) => i + 1).slice(0, 28);
  
  return (
    <div className="gcal-sidebar">
      <div className="gcal-primary-button flex items-center justify-center mb-4">
        <span className="mr-1">+</span> Create
      </div>
      
      <div className="flex items-center mb-4">
        <Clock className="w-4 h-4 mr-2" />
        <span>{currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
      
      {/* Mini Month View */}
      <div className="mb-4">
        <div className="text-xs font-medium mb-1">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-xs text-center text-gray-500">
              {day}
            </div>
          ))}
          {miniCalendarDays.map((day, i) => (
            <div
              key={i}
              className={`text-xs text-center p-1 rounded-full ${
                day === currentDate.getDate() ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      
      {/* My Calendars */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">My calendars</div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm">Work</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Personal</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-sm">Meetings</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm">Health</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
          <span className="text-sm">Learning</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
