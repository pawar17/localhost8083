import React, { CSSProperties } from 'react';
import CalendarEvent, { EventType } from './CalendarEvent';

type WeekViewProps = {
  startDate: Date;
};

// Time slots from 8 AM to 6 PM (representing the start of each hour)
const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8, 9, ..., 18
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
  
  return (
    <div className="mac-week-view h-full bg-white text-gray-800 flex flex-col"> {/* Use flex-col to arrange time header and grid */}
      {/* Time column and day headers */}
      <div className="grid grid-cols-8 border-b border-gray-300 flex-shrink-0"> {/* flex-shrink-0 to prevent shrinking */}
        <div className="text-right pr-2"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="border-l border-gray-300">
            {formatDayHeader(day)}
          </div>
        ))}
      </div>
      {/* Time grid with events - Restructured */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 h-full">
          {timeSlots.map((hour, hourIndex) => {
            // Calculate slot start and end times for the current hour
            const slotStartTimeMinutes = hour * minutesInHour;
            const slotEndTimeMinutes = (hour + 1) * minutesInHour;

            return (
              <React.Fragment key={hour}>
                {/* Time gutter for the hour */}
                <div className="text-right text-xs text-gray-500 pr-2 border-r border-b border-gray-300 flex items-start justify-end h-[60px]"> {/* align-items: start to align text at top */}
                   {hour === 12 ? 'Noon' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
                 {/* Daily columns for the hour */}
            {weekDays.map((_, dayIndex) => {
                  // Filter events for the current day and within this hour slot
                  const eventsForHourSlot = events.filter(event => {
                      const startTimeMinutes = parseTimeToMinutes(event.time);
                      const endTimeMinutes = parseTimeToMinutes(event.endTime || event.time);

                      return event.day === dayIndex &&
                             ((startTimeMinutes < slotEndTimeMinutes && endTimeMinutes > slotStartTimeMinutes) || // Event overlaps with the hour slot
                              (startTimeMinutes >= slotStartTimeMinutes && startTimeMinutes < slotEndTimeMinutes) || // Event starts within the hour slot
                              (endTimeMinutes > slotStartTimeMinutes && endTimeMinutes <= slotEndTimeMinutes)); // Event ends within the hour slot
                  });

                  return (
                    <div key={dayIndex} className="border-b border-gray-300 relative h-[60px]"> {/* border-b for hour line, h-[60px] for slot height, removed border-l */}
                       {/* Render events that fall within this hour slot */}
                       {eventsForHourSlot.map(event => {
                         const startTimeMinutes = parseTimeToMinutes(event.time);
                         const endTimeMinutes = parseTimeToMinutes(event.endTime || event.time);
                         const durationMinutes = endTimeMinutes - startTimeMinutes;

                         // Calculate top position and height relative to the start of this hour slot
                         const topOffsetMinutes = startTimeMinutes - slotStartTimeMinutes;
                         const topPosition = (topOffsetMinutes / minutesInHour) * 60; // Convert minutes offset to pixels
                         const eventHeight = (durationMinutes / minutesInHour) * 60; // Convert duration in minutes to pixels

                         const eventStyle: CSSProperties = {
                           top: `${topPosition}px`,
                           height: `${eventHeight}px`,
                           position: 'absolute',
                           left: '2px',
                           right: '2px',
                           zIndex: 10,
                         };

                         // Only render the event if it starts within this hour slot or if it's a multi-hour event
                         // that started in a previous slot but extends into this one.
                         // We can simplify this by rendering the event in the slot where it starts
                         // and let its height cover subsequent slots.
                          const eventStartsInThisSlot = startTimeMinutes >= slotStartTimeMinutes && startTimeMinutes < slotEndTimeMinutes;

                          if (eventStartsInThisSlot) {
              return (
                                <CalendarEvent
                                  key={event.id}
                                  event={event}
                                  style={eventStyle}
                                />
                              );
                          } else if (startTimeMinutes < slotStartTimeMinutes && endTimeMinutes > slotStartTimeMinutes) {
                             // This handles events that span across multiple hours and need to be visible in later hour slots
                             // We might need to adjust the rendering logic slightly if events need to be fully contained within a slot div.
                             // For now, the absolute positioning with height calculation should largely handle this visually.
                             // A more robust solution for multi-day/multi-hour events might involve calculating the portion of the event
                             // that falls within this specific hour slot and rendering a smaller, segmented event block.
                             // However, for the current goal of basic alignment and placement based on the screenshot, the current absolute positioning approach should work.
                             // We'll stick to rendering events only in their starting hour slot for simplicity with absolute positioning across the grid.
                             return null; // Only render event in its starting slot
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
