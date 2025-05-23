
import React from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type WeekViewProps = {
  startDate: Date;
};

// Time slots from 8 AM to 6 PM
const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);

const WeekView: React.FC<WeekViewProps> = ({ startDate }) => {
  // Custom events based on user's image
  const events: EventType[] = React.useMemo(() => [
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
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    return day;
  });
  
  // Format day header (Mon 15)
  const formatDayHeader = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    return (
      <div className={`text-center py-2 ${isToday ? 'border-b-2 border-red-500' : ''}`}>
        <div className="text-sm text-gray-600">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
        <div className={`text-lg font-medium ${isToday ? 'text-red-500' : 'text-gray-800'}`}>
          {date.getDate()}
        </div>
      </div>
    );
  };
  
  // Get events for a specific day and hour
  const getEventsForTimeSlot = (day: number, hour: number): EventType[] => {
    return events.filter(event => {
      const eventDay = event.day;
      const eventHour = parseInt(event.time.split(':')[0]);
      const isPM = event.time.includes('PM') && eventHour !== 12;
      const normalizedHour = isPM ? eventHour + 12 : eventHour;
      return eventDay === day && normalizedHour === hour;
    });
  };
  
  return (
    <div className="mac-week-view h-full bg-gray-900 text-blue-300">
      {/* Time column and day headers */}
      <div className="grid grid-cols-8 border-b border-blue-800">
        <div className="text-right pr-2"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="border-l border-blue-800">
            {formatDayHeader(day)}
          </div>
        ))}
      </div>
      {/* Time grid */}
      <div className="overflow-auto">
        {timeSlots.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-blue-800">
            {/* Time gutter */}
            <div className="text-right pr-2 py-1 text-xs text-blue-400 pt-2">
              {hour === 12 ? 'Noon' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            {/* Day columns */}
            {weekDays.map((_, dayIndex) => {
              const events = getEventsForTimeSlot(dayIndex, hour);
              return (
                <div key={dayIndex} className="border-l border-blue-800 min-h-[60px] relative">
                  {/* Half hour divider */}
                  <div className="absolute w-full border-t border-dashed border-blue-900 top-[50%]"></div>
                  
                  {events.map(event => (
                    <CalendarEvent key={event.id} event={event} />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
