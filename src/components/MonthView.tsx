import React, { useMemo } from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type MonthViewProps = {
  currentMonth: Date;
};

const MonthView: React.FC<MonthViewProps> = ({ currentMonth }) => {
  // Sample events - reusing the same events from WeekView
  const events: EventType[] = useMemo(() => [
    // Sunday
    { id: '1', title: 'Work: Sprint Planning', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Plan the week with the team', location: 'Office', day: 0 },
    { id: '2', title: 'Personal: Gym', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Workout session', location: 'Gym', day: 0 },
    // More events from WeekView...
    { id: '3', title: 'Meetings: Team Sync', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'Weekly team sync', location: 'Zoom', day: 0 },
    { id: '4', title: 'Health: Yoga', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Yoga for relaxation', location: 'Studio', day: 0 },
    { id: '5', title: 'Learning: React Course', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'Complete React module', location: 'Home', day: 0 },
    // Monday
    { id: '6', title: 'Work: Code Review', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Review PRs', location: 'Office', day: 1 },
    { id: '7', title: 'Personal: Reading', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Read a new book', location: 'Home', day: 1 },
    { id: '8', title: 'Meetings: Client Call', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'Discuss project', location: 'Zoom', day: 1 },
    { id: '9', title: 'Health: Run', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Evening run', location: 'Park', day: 1 },
    { id: '10', title: 'Learning: Python', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'Python exercises', location: 'Home', day: 1 },
    // Tuesday
    { id: '11', title: 'Work: Design Review', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Review UI/UX', location: 'Office', day: 2 },
    { id: '12', title: 'Personal: Groceries', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Weekly shopping', location: 'Store', day: 2 },
    { id: '13', title: 'Meetings: Standup', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'Daily standup', location: 'Zoom', day: 2 },
    { id: '14', title: 'Health: Swim', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Swimming laps', location: 'Pool', day: 2 },
    { id: '15', title: 'Learning: Algorithms', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'Algorithm practice', location: 'Home', day: 2 },
    // Wednesday
    { id: '16', title: 'Work: Feature Dev', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Develop new feature', location: 'Office', day: 3 },
    { id: '17', title: 'Personal: Coffee', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Coffee with friend', location: 'Cafe', day: 3 },
    { id: '18', title: 'Meetings: Planning', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'Sprint planning', location: 'Zoom', day: 3 },
    { id: '19', title: 'Health: Walk', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Evening walk', location: 'Park', day: 3 },
    { id: '20', title: 'Learning: Math', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'Math exercises', location: 'Home', day: 3 },
    // Thursday
    { id: '21', title: 'Work: Demo Prep', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Prepare for demo', location: 'Office', day: 4 },
    { id: '22', title: 'Personal: Call Mom', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Catch up call', location: 'Home', day: 4 },
    { id: '23', title: 'Meetings: Demo', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'Product demo', location: 'Zoom', day: 4 },
    { id: '24', title: 'Health: Bike', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Biking', location: 'Trail', day: 4 },
    { id: '25', title: 'Learning: History', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'History reading', location: 'Home', day: 4 },
    // Friday
    { id: '26', title: 'Work: Retrospective', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Sprint retro', location: 'Office', day: 5 },
    { id: '27', title: 'Personal: Movie', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Watch a movie', location: 'Theater', day: 5 },
    { id: '28', title: 'Meetings: 1:1', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'One-on-one', location: 'Zoom', day: 5 },
    { id: '29', title: 'Health: Meditation', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Meditation session', location: 'Home', day: 5 },
    { id: '30', title: 'Learning: Science', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'Science doc', location: 'Home', day: 5 },
    // Saturday
    { id: '31', title: 'Work: Docs', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Documentation', location: 'Office', day: 6 },
    { id: '32', title: 'Personal: Shopping', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Shopping trip', location: 'Mall', day: 6 },
    { id: '33', title: 'Meetings: Review', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: 'Review session', location: 'Zoom', day: 6 },
    { id: '34', title: 'Health: Hike', time: '4:00 PM', endTime: '6:00 PM', color: 'green', description: 'Hiking', location: 'Trail', day: 6 },
    { id: '35', title: 'Learning: Art', time: '7:00 PM', endTime: '9:00 PM', color: 'purple', description: 'Art class', location: 'Studio', day: 6 },
    // Keeping a subset for brevity
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
    // For demonstration, just distribute events across days
    const dayOfMonth = day.getDate();
    return allEvents.filter((_, index) => (dayOfMonth + index) % 10 === index % 3);
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
    <div className="mac-month-view h-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm text-gray-600 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-rows-6 h-[calc(100%-2rem)] divide-y">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 divide-x h-full">
            {week.map((day, dayIndex) => {
              const isToday = day.date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={dayIndex} 
                  className={`relative overflow-hidden ${
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div className={`p-1 sticky top-0 z-10 ${isToday ? 'bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto mt-1' : 'text-right pr-2'}`}>
                    {isToday ? (
                      <div className="text-sm font-bold">{day.date.getDate()}</div>
                    ) : (
                      <div className={`text-sm ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}>{day.date.getDate()}</div>
                    )}
                  </div>
                  
                  <div className="p-1 space-y-1 overflow-y-auto max-h-[calc(100%-1.75rem)]">
                    {day.events.map((event) => (
                      <div 
                        key={event.id} 
                        className={`text-xs p-1 rounded overflow-hidden truncate cursor-mac-pointer bg-${event.color}-100 border-l-2 border-${event.color}-500`}
                      >
                        <div className="truncate">{event.time} {event.title}</div>
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
