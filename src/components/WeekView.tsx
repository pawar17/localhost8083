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
    { id: '1', title: 'Go on a run', time: '8:00 AM', endTime: '9:00 AM', color: 'blue', description: 'You can check my strava out and follow my journey as I train for a half marathon in October!', day: 0, isExpandable: true }, // Monday
    { id: '2', title: 'Meal Prep', time: '9:00 AM', endTime: '11:00 AM', color: 'green', description: '', day: 0, isExpandable: false }, // Monday
    { id: '3', title: 'Cafe Hopping to do work!', time: '1:00 PM', endTime: '4:00 PM', color: 'yellow', description: '', day: 0, isExpandable: false }, // Monday

    { id: '4', title: 'InnovateHer Meeting', time: '8:30 AM', endTime: '10:00 AM', color: 'green', description: `As a woman in CS, I founded InnovateHer to create space for others like me. What started as a student government idea became Purdue's first women-centric hackathon and a community of 500+.

- Brought together 7+ orgs to launch 2 hackathons with 200+ participants each
- Raised over $80K to support inclusive, impact-driven tech projects
- Built and led a 60-member team; now proudly sustained by new leadership`, day: 1, isExpandable: true }, // Tuesday
    { id: '5', title: 'Update GitHub', time: '10:30 AM', endTime: '12:00 PM', color: 'blue', description: 'Click here to view my GitHub profiles!', day: 1, isExpandable: true }, // Tuesday
    { id: '6', title: 'Arduino Projects', time: '1:00 PM', endTime: '3:30 PM', color: 'red', description: 'I completed a certification in Arduino at Purdue. I enjoy working with microcontrollers and want to pursue independent projects with Arduino!', day: 1, isExpandable: true }, // Tuesday

    { id: '7', title: 'Disability Visibility India', time: '10:00 AM', endTime: '12:00 PM', color: 'yellow', description: `I launched this in 2020 as a digital toolkit for families of individuals with disabilities in India. What started as a simple website resource became a growing community - one that taught me about accessibility, care, and inclusive design. It's still one of the most meaningful projects I've built.
`, day: 2, isExpandable: true }, // Wednesday
    { id: '8', title: 'Research Project', time: '1:30 PM', endTime: '3:30 PM', color: 'purple', description: `At C-Lab, I worked on a generative AI project focused on simulating part mobility using 3D point clouds. I implemented and compared diffusion and transformer-based models, integrating them into a CAD-compatible pipeline in Python to explore real-world mechanical design applications.

In the CAST project, I focused on improving speech-to-text systems for children, who are often underrepresented in commercial ASR models. I fine-tuned transformer architectures and developed a deep phoneme classification model using PyTorch, resulting in a 12% improvement in accuracy. The project emphasized accessibility and the potential of AI in educational and therapeutic settings.

Learn more about what I did by taking a look at my resume!`, day: 2, isExpandable: true }, // Wednesday

    { id: '9', title: 'Consulting club casework', time: '8:30 AM', endTime: '10:30 AM', color: 'red', description: `At PurdueThink, I led strategy and growth initiatives for student startups and organizations. As a consultant, I scaled Boilerexams through market research, survey analysis, and faculty outreach. Later, as Project Manager, I guided a team in restructuring Purdue Pilots Inc., delivered strategic recommendations, and secured three new projects hence expanding our campus-wide impact`, day: 3, isExpandable: true }, // Thursday
    { id: '10', title: 'Purdue Student Government', time: '12:00 PM', endTime: '1:30 PM', color: 'blue', description: `Served on Purdue Student Government's DEI Committee for two years. As Executive Director, I led a 13-member team, worked on student body legislation, and launched campus-wide initiatives focused on accessibility, representation, and inclusion.`, day: 3, isExpandable: true }, // Thursday

    { id: '11', title: 'Certifications', time: '8:30 AM', endTime: '11:00 AM', color: 'purple', description: `- Forage Program: Citi Asia – Global Consumer Banking Virtual Reality Intern
- Forage Program: Goldman Sachs – Virtual Engineering Intern
- Purdue Milestones Program – Programming with Arduino
- Grow with Google – Data Analytics
- Project Management`, day: 4, isExpandable: true }, // Friday
    { id: '12', title: 'Edit resume', time: '11:30 AM', endTime: '1:00 PM', color: 'green', description: 'This is my 3 page working CV, I have all my experiences from the last 4 years listed on this resume', day: 4, isExpandable: true }, // Friday
    { id: '13', title: 'On campus job', time: '2:00 PM', endTime: '4:30 PM', color: 'red', description: `Office of Undergraduate Research, West Lafayette, IN
Research Assistant | Feb 2023 – Present
Developed interactive Tableau dashboards for research data visualization and conducted sentiment analysis on survey responses.

Disability Resource Center, West Lafayette, IN
Student Intern | Aug 2023 – Aug 2024
Converted and edited course materials into Braille and accessible formats to support inclusive learning.

Purdue Dining & Culinary, West Lafayette, IN
Student Staff | Oct 2022 – Feb 2023
Served 1,000+ students per shift, assisted in meal prep and inventory, and collaborated with a team to improve operational efficiency.`, day: 4, isExpandable: true }, // Friday

    { id: '14', title: 'Technical Projects', time: '8:30 AM', endTime: '10:30 AM', color: 'blue', description: `Financial Transaction Platform: Built full-stack app with React.js, Firebase, and Checkbook API enabling secure international payments; placed 2nd at Treehacks.

Disability Visibility India Website: Developed accessible web platform to support and grow disability community in India.

Music Recommender System: Implemented deep learning (RNN/LSTM) and collaborative filtering to enhance song recommendations on large-scale dataset.

S&P 500 Stock Forecasting: Created LSTM-based model improving stock trend predictions by 18%.

IPL Player Performance Predictor: Designed ML model to predict player performance for IPL 2025 using historical data (2008–2024); webscraped real-time stats, recent form, and contextual match metrics to drive accuracy.

Arduino Musical Box: Programmed sensor-driven interactive musical device using Arduino.`, day: 5, isExpandable: true }, // Saturday
    { id: '15', title: 'CALL HOME!', time: '11:00 AM', endTime: '1:00 PM', color: 'yellow', description: '', day: 5, isExpandable: false }, // Saturday
    { id: '16', title: 'Prepare for Interview!', time: '2:00 PM', endTime: '5:00 PM', color: 'green', description: '', day: 5, isExpandable: false }, // Saturday

    // Additional Saturday events
    { id: '17', title: 'Grocery Shopping', time: '9:30 AM', endTime: '11:00 AM', color: 'purple', description: '', day: 6, isExpandable: false }, // Saturday
    { id: '18', title: 'Gym', time: '11:00 AM', endTime: '12:00 PM', color: 'red', description: 'Been a (sort of consistent) gym girly for the last 4 years, I really enjoy working out and lifting weights :)', day: 6, isExpandable: true }, // Saturday
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
