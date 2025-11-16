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
    // Day 0 (Sunday)
    { id: '1', title: 'Go on a run', time: '8:00 AM', endTime: '9:00 AM', color: 'blue', description: '', day: 0, isExpandable: true },
    { id: '14', title: 'Technical Projects', time: '11:00 AM', endTime: '1:30 PM', color: 'purple', description: 'Click on attachment to learn more about all my technical projects', day: 0, isExpandable: true },

    // Day 1 (Monday)
    { id: '4', title: 'InnovateHer Meeting', time: '8:00 AM', endTime: '10:00 AM', color: 'green', description: 'Click on attachment to learn more about InnovateHer', day: 1, isExpandable: true },
    { id: '5', title: 'Update GitHub', time: '10:30 AM', endTime: '12:00 PM', color: 'blue', description: 'Click here to view my GitHub profiles!', day: 1, isExpandable: true },

    // Day 2 (Tuesday)
    { id: '7', title: 'Disability Visibility India', time: '9:00 AM', endTime: '10:00 AM', color: 'yellow', description: 'Click on attachment to learn more about Disability Visibility India', day: 2, isExpandable: true },
    { id: '8', title: 'Research Project', time: '11:00 AM', endTime: '12:00 PM', color: 'purple', description: 'Click on attachment to learn more about all my research projects', day: 2, isExpandable: true },

    // Day 3 (Wednesday)
    { id: '9', title: 'Consulting club casework', time: '8:00 AM', endTime: '10:30 AM', color: 'red', description: `At PurdueThink, I led strategy and growth initiatives for student startups and organizations. As a consultant, I scaled Boilerexams through market research, survey analysis, and faculty outreach. Later, as Project Manager, I guided a team in restructuring Purdue Pilots Inc., delivered strategic recommendations, and secured three new projects hence expanding our campus-wide impact`, day: 3, isExpandable: true },
    { id: '10', title: 'Purdue Student Government', time: '11:00 AM', endTime: '1:30 PM', color: 'green', description: `Served on Purdue Student Government's DEI Committee for two years & led multiple initiatives. As Executive Director, I led a 13-member team, worked on student body legislation, and launched campus-wide programs focused on accessibility, representation, and inclusion.`, day: 3, isExpandable: true },

    // Day 4 (Thursday)
    { id: '13', title: 'On campus job', time: '10:30 AM', endTime: '12:30 PM', color: 'red', description: 'Click on attachment to learn more about all my on campus jobs', day: 4, isExpandable: true },

    // Day 5 (Friday)
    { id: '6', title: 'Arduino Projects', time: '9:30 AM', endTime: '11:30 AM', color: 'yellow', description: 'I completed a certification in Arduino at Purdue. I enjoy working with microcontrollers and want to pursue independent projects with Arduino!', day: 5, isExpandable: true },

    // Day 6 (Saturday)
    { id: '11', title: 'Certifications', time: '8:30 AM', endTime: '10:00 AM', color: 'purple', description: 'Click on attachment to learn more about all my certifications', day: 6, isExpandable: true },
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
      <div className="text-center">
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
    <div className="h-full bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <div className="calendar-week-header">
        <div className="time-column-header"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="day-header-cell">
            {formatDayHeader(day)}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="calendar-week-grid">
        {timeSlots.map((hour) => {
          const slotStartTimeMinutes = hour * minutesInHour;
          const slotEndTimeMinutes = (hour + 1) * minutesInHour;

          return (
            <React.Fragment key={hour}>
              {/* Time slot */}
              <div className="time-label-cell">
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
                  <div key={dayIndex} className="day-cell">
                    {/* Render events that fall within this hour slot */}
                    {eventsForHourSlot.map(event => {
                      const startTimeMinutes = parseTimeToMinutes(event.time);
                      const endTimeMinutes = parseTimeToMinutes(event.endTime || event.time);
                      const durationMinutes = endTimeMinutes - startTimeMinutes;

                      // Calculate top position and height relative to the start of this hour slot
                      const topOffsetMinutes = startTimeMinutes - slotStartTimeMinutes;
                      const topPosition = (topOffsetMinutes / minutesInHour) * 60; // Convert minutes offset to pixels (60px = cell height)
                      const eventHeight = (durationMinutes / minutesInHour) * 60; // Convert duration in minutes to pixels

                      const eventStyle: CSSProperties = {
                        top: `${topPosition}px`,
                        height: `${eventHeight}px`,
                        position: 'absolute',
                        left: '1px',
                        right: '1px',
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
  );
};

export default WeekView;
