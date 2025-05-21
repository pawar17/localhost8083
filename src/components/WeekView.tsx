import React from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type WeekViewProps = {
  startDate: Date;
};

// Time slots from 7 AM to 9 PM
const timeSlots = Array.from({ length: 15 }, (_, i) => i + 7);

const WeekView: React.FC<WeekViewProps> = ({ startDate }) => {
  // Full week, 2-hour events, color-matched
  const events: EventType[] = React.useMemo(() => [
    // Sunday
    { id: '1', title: 'Work: Sprint Planning', time: '9:00 AM', endTime: '11:00 AM', color: 'red', description: 'Plan the week with the team', location: 'Office', day: 0 },
    { id: '2', title: 'Personal: Gym', time: '11:00 AM', endTime: '1:00 PM', color: 'blue', description: 'Workout session', location: 'Gym', day: 0 },
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
