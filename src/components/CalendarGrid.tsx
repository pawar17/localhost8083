
import React, { useMemo } from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type CalendarGridProps = {
  currentMonth: Date;
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentMonth }) => {
  // Sample portfolio events
  const events: EventType[] = useMemo(() => [
    {
      id: '1',
      title: 'Review resume',
      time: '9:00 AM',
      color: 'blue',
      description: 'Update skills section and add recent achievements',
      location: 'Home office'
    },
    {
      id: '2',
      title: 'Build project X',
      time: '10:30 AM',
      color: 'green',
      description: 'Work on the frontend components and implement responsive design',
      location: 'Coffee shop'
    },
    {
      id: '3',
      title: 'Go on a run',
      time: '6:00 PM',
      color: 'red',
      description: '5k run to clear the mind and stay healthy',
      location: 'City park'
    },
    {
      id: '4',
      title: 'Meeting with mentor',
      time: '2:00 PM',
      color: 'yellow',
      description: 'Discuss career goals and get feedback on recent projects',
      location: 'Zoom call'
    },
    {
      id: '5',
      title: 'Learn new framework',
      time: '8:00 PM',
      color: 'purple',
      description: 'Follow tutorial on the latest web framework',
      location: 'Home office'
    },
    {
      id: '6',
      title: 'Network event',
      time: '7:00 PM',
      color: 'blue',
      description: 'Tech meetup for professionals in the industry',
      location: 'Tech Hub Downtown'
    },
    {
      id: '7',
      title: 'Portfolio update',
      time: '11:00 AM',
      color: 'green',
      description: 'Refresh portfolio with latest projects and update design',
      location: 'Home office'
    },
    {
      id: '8',
      title: 'Technical interview',
      time: '3:30 PM',
      color: 'yellow',
      description: 'Coding interview for senior developer position',
      location: 'Remote'
    },
    {
      id: '9',
      title: 'Read tech articles',
      time: '9:00 PM',
      color: 'purple',
      description: 'Stay updated on industry trends and new technologies',
      location: 'Home'
    },
    {
      id: '10',
      title: 'Contribute to open source',
      time: '4:00 PM',
      color: 'red',
      description: 'Work on fixes for open issues in GitHub project',
      location: 'Home office'
    }
  ], []);

  // Generate days for the calendar grid
  const daysInMonth = useMemo(() => {
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
        isCurrentMonth: false
      });
    }
    
    // Add current month days
    for (let i = 1; i <= daysCount; i++) {
      const day = new Date(year, month, i);
      days.push({
        date: day,
        isCurrentMonth: true
      });
    }
    
    // Add next month days to fill last week
    const lastWeekdayOfMonth = lastDayOfMonth.getDay(); // 0-6
    for (let i = 1; i < 7 - lastWeekdayOfMonth; i++) {
      const day = new Date(year, month + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false
      });
    }
    
    return days;
  }, [currentMonth]);
  
  // Distribute events across days
  const getEventsForDay = (date: Date) => {
    // Just distribute them to make calendar look busy
    const day = date.getDate();
    return events.filter((_, index) => (day + index) % 10 === index);
  };
  
  return (
    <div className="gcal-calendar">
      {/* Weekday Headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
        <div key={day} className="p-2 text-center font-medium text-sm border-r border-t">
          {day}
        </div>
      ))}
      
      {/* Calendar days */}
      {daysInMonth.map((day, index) => (
        <div 
          key={index} 
          className={`gcal-day ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
        >
          <div className="gcal-day-header text-right">
            {day.date.getDate()}
          </div>
          <div>
            {getEventsForDay(day.date).map(event => (
              <CalendarEvent key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
