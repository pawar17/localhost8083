
import React from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type WeekViewProps = {
  startDate: Date;
};

// Time slots from 7 AM to 9 PM
const timeSlots = Array.from({ length: 15 }, (_, i) => i + 7);

const WeekView: React.FC<WeekViewProps> = ({ startDate }) => {
  // Sample portfolio events
  const events: EventType[] = React.useMemo(() => [
    {
      id: '1',
      title: 'Review resume',
      time: '9:00 AM',
      endTime: '10:00 AM',
      color: 'blue',
      description: 'Update skills section and add recent achievements',
      location: 'Home office',
      day: 1 // Monday
    },
    {
      id: '2',
      title: 'Build project X',
      time: '10:30 AM',
      endTime: '12:00 PM',
      color: 'green',
      description: 'Work on the frontend components and implement responsive design',
      location: 'Coffee shop',
      day: 1 // Monday
    },
    {
      id: '3',
      title: 'Go on a run',
      time: '6:00 PM',
      endTime: '7:00 PM',
      color: 'red',
      description: '5k run to clear the mind and stay healthy',
      location: 'City park',
      day: 2 // Tuesday
    },
    {
      id: '4',
      title: 'Meeting with mentor',
      time: '2:00 PM',
      endTime: '3:30 PM',
      color: 'yellow',
      description: 'Discuss career goals and get feedback on recent projects',
      location: 'Zoom call',
      day: 3 // Wednesday
    },
    {
      id: '5',
      title: 'Learn new framework',
      time: '8:00 PM',
      endTime: '9:30 PM',
      color: 'purple',
      description: 'Follow tutorial on the latest web framework',
      location: 'Home office',
      day: 3 // Wednesday
    },
    {
      id: '6',
      title: 'Tech meetup',
      time: '7:00 PM',
      endTime: '9:00 PM',
      color: 'blue',
      description: 'Networking event for professionals in the industry',
      location: 'Tech Hub Downtown',
      day: 4 // Thursday
    },
    {
      id: '7',
      title: 'Portfolio update',
      time: '11:00 AM',
      endTime: '12:30 PM',
      color: 'green',
      description: 'Refresh portfolio with latest projects and update design',
      location: 'Home office',
      day: 4 // Thursday
    },
    {
      id: '8',
      title: 'Technical interview',
      time: '3:30 PM',
      endTime: '5:00 PM',
      color: 'yellow',
      description: 'Coding interview for senior developer position',
      location: 'Remote',
      day: 5 // Friday
    },
    {
      id: '9',
      title: 'Read tech articles',
      time: '9:00 PM',
      endTime: '10:00 PM',
      color: 'purple',
      description: 'Stay updated on industry trends and new technologies',
      location: 'Home',
      day: 6 // Saturday
    },
    {
      id: '10',
      title: 'Contribute to open source',
      time: '4:00 PM',
      endTime: '6:00 PM',
      color: 'red',
      description: 'Work on fixes for open issues in GitHub project',
      location: 'Home office',
      day: 0 // Sunday
    }
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
      <div className={`text-center py-2 ${isToday ? 'bg-blue-100 rounded-full font-bold' : ''}`}>
        <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
        <div className={`text-lg ${isToday ? 'text-blue-600' : ''}`}>{date.getDate()}</div>
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
    <div className="gcal-week-view">
      {/* Time column and day headers */}
      <div className="gcal-week-header grid grid-cols-8 border-b">
        <div className="gcal-time-gutter"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="border-l">
            {formatDayHeader(day)}
          </div>
        ))}
      </div>
      
      {/* Time grid */}
      <div className="gcal-week-body">
        {timeSlots.map((hour) => (
          <div key={hour} className="gcal-time-row grid grid-cols-8 border-b">
            {/* Time gutter */}
            <div className="gcal-time-label text-right pr-2 pt-1 text-sm text-gray-500">
              {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            
            {/* Day columns */}
            {weekDays.map((_, dayIndex) => {
              const events = getEventsForTimeSlot(dayIndex, hour);
              
              return (
                <div key={dayIndex} className="border-l min-h-[60px] relative">
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
