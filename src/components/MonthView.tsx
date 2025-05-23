import React, { useMemo } from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type MonthViewProps = {
  currentMonth: Date;
};

const MonthView: React.FC<MonthViewProps> = ({ currentMonth }) => {
  // Sample events - using the same events as in WeekView
  const events: EventType[] = useMemo(() => [
    // Personal activities - Blue
    { id: '1', title: 'Go on a run', time: '10:00 AM', color: 'blue', description: 'Morning exercise', location: 'Park', day: 0 },
    { id: '2', title: 'Meal Prep', time: '12:00 PM', color: 'blue', description: 'Prepare meals for the week', location: 'Home', day: 0 },
    { id: '3', title: 'Cafe Hopping to do work!', time: '2:00 PM', color: 'blue', description: 'Work at different cafes', location: 'Local Cafes', day: 0 },
    
    // Work/Technical - Green
    { id: '4', title: 'InnovateHer Meeting', time: '10:00 AM', color: 'green', description: 'Weekly team meeting', location: 'Conference Room', day: 1 },
    { id: '5', title: 'Update GitHub', time: '12:00 PM', color: 'green', description: 'Update project repositories', location: 'Remote', day: 1 },
    { id: '6', title: 'Arduino Projects', time: '2:00 PM', color: 'green', description: 'Work on Arduino prototypes', location: 'Lab', day: 1 },
    
    // Research/Learning - Yellow
    { id: '7', title: 'Disability Visibility India', time: '12:00 PM', color: 'yellow', description: 'Research session', location: 'Library', day: 2 },
    { id: '8', title: 'Research Project', time: '2:00 PM', color: 'yellow', description: 'Work on research paper', location: 'Study Room', day: 2 },
    
    // Meetings/Organizations - Red
    { id: '9', title: 'Consulting club casework', time: '10:00 AM', color: 'red', description: 'Club meeting and case studies', location: 'Business Building', day: 3 },
    { id: '10', title: 'Purdue Student Government Meeting', time: '2:00 PM', color: 'red', description: 'Student government weekly meeting', location: 'Student Union', day: 3 },
    
    // Career Development - Purple
    { id: '11', title: 'Certifications', time: '10:00 AM', color: 'purple', description: 'Work on professional certifications', location: 'Home Office', day: 4 },
    { id: '12', title: 'Edit resume', time: '12:00 PM', color: 'purple', description: 'Update resume with recent experiences', location: 'Home Office', day: 4 },
    { id: '13', title: 'On campus job', time: '2:00 PM', color: 'purple', description: 'Campus employment', location: 'University', day: 4 },
    
    // Important Reminders - Green
    { id: '14', title: 'Technical Projects', time: '10:00 AM', color: 'green', description: 'Work on technical portfolio projects', location: 'Home Office', day: 5 },
    { id: '15', title: 'CALL HOME!', time: '12:00 PM', color: 'blue', description: 'Weekly call with family', location: 'Home', day: 5 },
    { id: '16', title: 'Prepare for Interview!', time: '2:00 PM', color: 'purple', description: 'Interview preparation', location: 'Home Office', day: 5 },
  ], []);
  
  // Generate days for the calendar grid
  const daysInMonthGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysCount = lastDayOfMonth.getDate();
    
    const days = [];
    const firstDayWeekday = firstDayOfMonth.getDay(); // 0 for Sunday
    
    // Add previous month days to fill first week
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({
        date: day,
        isCurrentMonth: false,
        events: []
      });
    }
    
    // Add current month days
    for (let i = 1; i <= daysCount; i++) {
      const day = new Date(year, month, i);
      days.push({
        date: day,
        isCurrentMonth: true,
        events: getEventsForDay(day, events)
      });
    }
    
    // Add next month days to fill last week
    const lastWeekdayOfMonth = lastDayOfMonth.getDay(); // 0-6
    for (let i = 1; i < 7 - lastWeekdayOfMonth; i++) {
      const day = new Date(year, month + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false,
        events: []
      });
    }
    
    return days;
  }, [currentMonth, events]);
  
  // Function to get events for a specific day
  function getEventsForDay(day: Date, allEvents: EventType[]): EventType[] {
    const dayOfWeek = day.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayOfMonth = day.getDate();
    
    // Return events for the matching day of week, using the day index
    return allEvents.filter(event => event.day === dayOfWeek);
  }
  
  // Group days into weeks
  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < daysInMonthGrid.length; i += 7) {
      result.push(daysInMonthGrid.slice(i, i + 7));
    }
    return result;
  }, [daysInMonthGrid]);
  
  return (
    <div className="mac-month-view h-full bg-gray-900 text-blue-300">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-blue-800">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm text-blue-400 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-rows-6 h-[calc(100%-2rem)] divide-y divide-blue-800">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 divide-x divide-blue-800 h-full">
            {week.map((day, dayIndex) => {
              const isToday = day.date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={dayIndex} 
                  className={`relative overflow-hidden ${
                    day.isCurrentMonth ? 'bg-gray-900' : 'bg-gray-900 bg-opacity-50'
                  }`}
                >
                  <div className={`p-1 sticky top-0 z-10 ${isToday ? 'bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto mt-1' : 'text-right pr-2'}`}>
                    {isToday ? (
                      <div className="text-sm font-bold">{day.date.getDate()}</div>
                    ) : (
                      <div className={`text-sm ${day.isCurrentMonth ? 'text-blue-300' : 'text-blue-600'}`}>{day.date.getDate()}</div>
                    )}
                  </div>
                  
                  <div className="p-1 space-y-1 overflow-y-auto max-h-[calc(100%-1.75rem)]">
                    {day.events.map((event) => (
                      <div key={event.id} className="text-xs mb-1">
                        <CalendarEvent event={event} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
