import React from 'react';
import { Calendar, Plus } from 'lucide-react';

type CalendarSidebarProps = {
  currentDate: Date;
};

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ currentDate }) => {
  // Generate mini calendar days for current month
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    return Array.from({
      length: 42 // 6 rows of 7 days
    }, (_, i) => {
      const day = i - firstDayOfMonth + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  };

  const miniCalendarDays = generateCalendarDays(currentDate);
  
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const isCurrentMonth = 
    today.getMonth() === currentMonth && 
    today.getFullYear() === currentYear;
  
  return (
    <div className="gcal-sidebar w-64 bg-gray-50 p-4 border-r border-gray-200">
      <div className="text-lg font-medium mb-4 text-gray-800">iCloud</div>
      
      {/* Create Button */}
      <div className="mb-6">
        <button className="gcal-primary-button flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm w-full">
          <Plus className="w-4 h-4 mr-1" />
          <span>Create</span>
        </button>
      </div>
      
      {/* Mini Month View */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2 flex justify-between items-center">
          <span className="text-gray-800">
            {currentDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-xs text-gray-500 font-medium py-1">
              {day}
            </div>
          ))}
          {miniCalendarDays.map((day, i) => {
            const isToday = isCurrentMonth && day === today.getDate();
            return (
              <div 
                key={i} 
                className={`text-xs p-1 w-6 h-6 mx-auto flex items-center justify-center rounded-full ${
                  isToday ? 'bg-red-500 text-white' : 
                  day ? 'hover:bg-gray-200 cursor-mac-pointer text-gray-800' : ''
                } ${!day ? 'text-gray-300' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* My Calendars */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2 text-gray-700">My calendars</div>
        <div className="space-y-2">
          {[
            { name: 'Home', color: 'bg-rose-500', checked: true },
            { name: 'Calendar', color: 'bg-purple-500', checked: true },
            { name: 'Work', color: 'bg-green-500', checked: true },
            { name: 'Family', color: 'bg-blue-500', checked: true },
            { name: 'Holidays', color: 'bg-yellow-500', checked: true },
            { name: 'Chores', color: 'bg-lime-500', checked: true },
          ].map((cal) => (
            <div key={cal.name} className="flex items-center">
              <input 
                type="checkbox" 
                className={`rounded mr-2 border-gray-300`} 
                checked={cal.checked} 
                readOnly 
              />
              <div className={`w-3 h-3 rounded-sm mr-2 ${cal.color}`}></div>
              <span className="text-sm text-gray-800">{cal.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Other Calendars */}
      <div>
        <div className="text-sm font-medium mb-2 text-gray-700">Other calendars</div>
        <div className="space-y-2">
          {[
            { name: 'US Holidays', checked: true },
            { name: 'Birthdays', checked: true },
            { name: 'Siri Suggestions', checked: true }
          ].map((cal) => (
            <div key={cal.name} className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded text-gray-500 mr-2 border-gray-300" 
                checked={cal.checked} 
                readOnly 
              />
              <span className="text-sm text-gray-800">{cal.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
