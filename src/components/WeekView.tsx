
import React, { CSSProperties } from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type WeekViewProps = {
  startDate: Date;
};

// Time slots from 8 AM to 7 PM (representing the start of each hour)
const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8, 9, ..., 19
const totalHours = timeSlots.length;
const hoursInDay = 24;
const minutesInHour = 60;

const WeekView: React.FC<WeekViewProps> = ({ startDate }) => {
  // Mock events based on the screenshot layout
  const events: EventType[] = React.useMemo(() => [
    { id: '1', title: 'Go on a run', time: '8:00 AM', endTime: '9:00 AM', color: 'blue', description: '', day: 0, isExpandable: true }, // Monday
    { id: '2', title: 'Meal Prep', time: '9:00 AM', endTime: '11:00 AM', color: 'blue', description: '', day: 0, isExpandable: false }, // Monday
    { id: '3', title: 'Cafe Hopping to do work!', time: '1:00 PM', endTime: '4:00 PM', color: 'blue', description: '', day: 0, isExpandable: false }, // Monday

    { id: '4', title: 'InnovateHer Meeting', time: '8:30 AM', endTime: '10:00 AM', color: 'green', description: '', day: 1, isExpandable: true }, // Tuesday
    { id: '5', title: 'Update GitHub', time: '10:30 AM', endTime: '12:00 PM', color: 'green', description: '', day: 1, isExpandable: true }, // Tuesday
    { id: '6', title: 'Arduino Projects', time: '1:00 PM', endTime: '3:30 PM', color: 'green', description: '', day: 1, isExpandable: true }, // Tuesday

    { id: '7', title: 'Disability Visibility India', time: '10:00 AM', endTime: '12:00 PM', color: 'yellow', description: '', day: 2, isExpandable: false }, // Wednesday
    { id: '8', title: 'Research Project', time: '1:30 PM', endTime: '3:30 PM', color: 'yellow', description: '', day: 2, isExpandable: false }, // Wednesday

    { id: '9', title: 'Consulting club casework', time: '8:30 AM', endTime: '10:30 AM', color: 'red', description: '', day: 3, isExpandable: true }, // Thursday
    { id: '10', title: 'Purdue Student Government', time: '12:00 PM', endTime: '1:30 PM', color: 'red', description: '', day: 3, isExpandable: true }, // Thursday

    { id: '11', title: 'Certifications', time: '8:30 AM', endTime: '11:00 AM', color: 'purple', description: '', day: 4, isExpandable: true }, // Friday
    { id: '12', title: 'Edit resume', time: '11:30 AM', endTime: '1:00 PM', color: 'purple', description: '', day: 4, isExpandable: true }, // Friday
    { id: '13', title: 'On campus job', time: '2:00 PM', endTime: '4:30 PM', color: 'purple', description: '', day: 4, isExpandable: false }, // Friday

    { id: '14', title: 'Technical Projects', time: '8:30 AM', endTime: '10:30 AM', color: 'blue', description: '', day: 5, isExpandable: true }, // Saturday
    { id: '15', title: 'CALL HOME!', time: '11:00 AM', endTime: '1:00 PM', color: 'yellow', description: '', day: 5, isExpandable: false }, // Saturday
    { id: '16', title: 'Prepare for Interview!', time: '2:00 PM', endTime: '5:00 PM', color: 'green', description: '', day: 5, isExpandable: false }, // Saturday

    // Additional Saturday events
    { id: '17', title: 'Grocery Shopping', time: '9:30 AM', endTime: '10:30 AM', color: 'purple', description: '', day: 6, isExpandable: false }, // Saturday
    { id: '18', title: 'Gym', time: '1:30 PM', endTime: '2:30 PM', color: 'red', description: '', day: 6, isExpandable: true }, // Saturday
    { id: '19', title: 'Read a book', time: '4:00 PM', endTime: '5:30 PM', color: 'blue', description: '', day: 6, isExpandable: false }, // Saturday

  ], []);

  // Helper function to parse time string (e.g., "10:00 AM") into minutes since midnight
  const parseTimeToMinutes = (time: string): number => {
    const [timePart, ampm] = time.split(' ');
    const [hour, minute] = timePart.split(':').map(Number);
    let hours = hour;
    if (ampm === 'PM' && hour !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hour === 12) {
      hours = 0; // 12 AM is 0 hours
    }
    return hours * minutesInHour + minute;
  };
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    return day;
  });
  
  // Format day header like Apple Calendar (25 Sun, 26 Mon, etc.)
  const formatDayHeader = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();

    return (
      <div className="text-center py-3 px-2">
        <div className={`text-lg font-medium ${isToday ? 'text-red-500' : 'text-gray-800'}`}>
          {dayNumber}
        </div>
        <div className="text-sm text-gray-600 -mt-1">
          {dayName}
        </div>
        {isToday && (
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mx-auto mt-1">
            <div className="text-xs text-white font-medium">{dayNumber}</div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="mac-week-view h-full bg-white text-gray-800 flex flex-col">
      {/* Day headers */}
      <div className="week-header-grid">
        <div className="w-20"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="header-cell">
            {formatDayHeader(day)}
          </div>
        ))}
      </div>
      
      {/* Time grid with events */}
      <div className="flex-1 overflow-auto">
        <div className="week-time-grid">
          {timeSlots.map((hour) => {
            // Calculate slot start and end times for the current hour
            const slotStartTimeMinutes = hour * minutesInHour;
            const slotEndTimeMinutes = (hour + 1) * minutesInHour;

            return (
              <React.Fragment key={hour}>
                {/* Time slot */}
                <div className="time-slot">
                  {hour === 0 ? '12 AM' : 
                   hour === 12 ? '12 PM' : 
                   hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
                
                {/* Daily columns for the hour */}
                {weekDays.map((_, dayIndex) => {
                  // Filter events for the current day and within this hour slot
                  const eventsForHourSlot = events.filter(event => {
                    const startTimeMinutes = parseTimeToMinutes(event.time);
                    const endTimeMinutes = parseTimeToMinutes(event.endTime || event.time);

                    return event.day === dayIndex &&
                           ((startTimeMinutes < slotEndTimeMinutes && endTimeMinutes > slotStartTimeMinutes) || 
                            (startTimeMinutes >= slotStartTimeMinutes && startTimeMinutes < slotEndTimeMinutes) || 
                            (endTimeMinutes > slotStartTimeMinutes && endTimeMinutes <= slotEndTimeMinutes)); 
                  });

                  return (
                    <div key={dayIndex} className="grid-cell">
                      {/* Render events that fall within this hour slot */}
                      {eventsForHourSlot.map(event => {
                        const startTimeMinutes = parseTimeToMinutes(event.time);
                        const endTimeMinutes = parseTimeToMinutes(event.endTime || event.time);
                        const durationMinutes = endTimeMinutes - startTimeMinutes;

                        // Calculate top position and height relative to the start of this hour slot
                        const topOffsetMinutes = startTimeMinutes - slotStartTimeMinutes;
                        const topPosition = (topOffsetMinutes / minutesInHour) * 64; // Convert minutes offset to pixels (64px = 4rem height)
                        const eventHeight = (durationMinutes / minutesInHour) * 64; // Convert duration in minutes to pixels

                        const eventStyle: CSSProperties = {
                          top: `${topPosition}px`,
                          height: `${eventHeight}px`,
                          position: 'absolute',
                          left: '2px',
                          right: '2px',
                          zIndex: 10,
                        };

                        // Only render the event if it starts within this hour slot
                        const eventStartsInThisSlot = startTimeMinutes >= slotStartTimeMinutes && startTimeMinutes < slotEndTimeMinutes;

                        if (eventStartsInThisSlot) {
                          return (
                            <CalendarEvent
                              key={event.id}
                              event={event}
                              style={eventStyle}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
