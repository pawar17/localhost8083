import React from 'react';
import { Calendar, Plus } from 'lucide-react';
const CalendarSidebar: React.FC = () => {
  const currentDate = new Date();

  // Generate mini calendar days for current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const miniCalendarDays = Array.from({
    length: 42
  },
  // 6 rows of 7 days
  (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
  return <div className="gcal-sidebar">
      <div className="gcal-primary-button flex items-center justify-center mb-4">
        <Plus className="w-4 h-4 mr-1" />
        <span>Create</span>
      </div>
      
      {/* Mini Month View */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2 flex justify-between items-center">
          <Calendar className="w-4 h-4" />
          <span>{currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          })}</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <div key={i} className="text-xs text-center text-gray-500 font-medium">
              {day}
            </div>)}
          {miniCalendarDays.map((day, i) => <div key={i} className={`text-xs text-center p-1 rounded-full ${day === currentDate.getDate() ? 'bg-blue-500 text-white' : day ? 'hover:bg-gray-100 cursor-mac-pointer' : ''}`}>
              {day}
            </div>)}
        </div>
      </div>
      
      {/* My Calendars */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">My calendars</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500 mr-2" checked readOnly />
            <div className="w-3 h-3 rounded-full mr-2 bg-pink-600"></div>
            <span className="text-sm">Work</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-green-500 mr-2" checked readOnly />
            <div className="w-3 h-3 rounded-full mr-2 bg-sky-300"></div>
            <span className="text-sm">Personal</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-yellow-500 mr-2" checked readOnly />
            <div className="w-3 h-3 rounded-full mr-2 bg-amber-200"></div>
            <span className="text-sm">Meetings</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-red-500 mr-2" checked readOnly />
            <div className="w-3 h-3 rounded-full mr-2 bg-lime-300"></div>
            <span className="text-sm">Health</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-purple-500 mr-2" checked readOnly />
            <div className="w-3 h-3 rounded-full mr-2 bg-violet-300"></div>
            <span className="text-sm">Learning</span>
          </div>
        </div>
      </div>
      
      {/* Other Calendars */}
      <div>
        <div className="text-sm font-medium mb-2">Other calendars</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-gray-500 mr-2" checked readOnly />
            <span className="text-sm">Holidays</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded text-gray-500 mr-2" checked readOnly />
            <span className="text-sm">Birthdays</span>
          </div>
        </div>
      </div>
    </div>;
};
export default CalendarSidebar;