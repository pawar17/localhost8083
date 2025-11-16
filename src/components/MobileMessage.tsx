import { useState, useEffect, useMemo } from 'react';
import { EventType } from './CalendarEvent';
import TextFileViewer from './TextFileViewer';

export function MobileMessage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [activeView, setActiveView] = useState<'today' | 'calendars' | 'inbox'>('today');
  const [expandedEvent, setExpandedEvent] = useState<EventType | null>(null);
  const [isTextFileOpen, setIsTextFileOpen] = useState(false);
  const [textFilePath, setTextFilePath] = useState('');
  const [textFileName, setTextFileName] = useState('');
  
  const handleAttachmentClick = (filePath: string, fileName: string) => {
    setTextFilePath(filePath);
    setTextFileName(fileName);
    setIsTextFileOpen(true);
  };

  const handleCloseMobilePopup = () => {
    setShowMobilePopup(false);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      // Only show on actual phones (max width 768px for phones, excluding tablets)
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Show popup when mobile is detected
      if (mobile) {
        setShowMobilePopup(true);
      }
    };

    // Check initially
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get current week (Monday to Sunday)
  const getCurrentWeek = () => {
    const today = new Date();
    const day = today.getDay();
    // Calculate days to subtract to get to Monday (1 = Monday, 0 = Sunday)
    const daysToMonday = day === 0 ? 6 : day - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  };

  const currentWeek = useMemo(() => getCurrentWeek(), []);

  // Format day name and date
  const formatDayName = (date: Date) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${dayName} – ${month} ${day}`;
  };

  // All events from WeekView
  const allEvents: EventType[] = useMemo(() => [
    // Day 0 (Sunday)
    { id: '1', title: 'Go on a run', time: '8:00 AM', endTime: '9:00 AM', color: 'blue', description: '', day: 0, isExpandable: true, hasTime: true },
    { id: '14', title: 'Technical Projects', time: '10:00 AM', endTime: '12:30 PM', color: 'purple', description: 'Click on attachment to learn more about all my technical projects', day: 0, isExpandable: true, hasTime: true },

    // Day 1 (Monday)
    { id: '4', title: 'InnovateHer Meeting', time: '8:30 AM', endTime: '10:00 AM', color: 'green', description: 'Click on attachment to learn more about InnovateHer', day: 1, isExpandable: true, hasTime: true },
    { id: '5', title: 'Update GitHub', time: '10:30 AM', endTime: '12:00 PM', color: 'blue', description: 'Click here to view my GitHub profiles!', day: 1, isExpandable: true, hasTime: true },

    // Day 2 (Tuesday)
    { id: '7', title: 'Disability Visibility India', time: '10:00 AM', endTime: '12:00 PM', color: 'yellow', description: 'Click on attachment to learn more about Disability Visibility India', day: 2, isExpandable: true, hasTime: true },
    { id: '8', title: 'Research Project', time: '1:30 PM', endTime: '3:30 PM', color: 'purple', description: 'Click on attachment to learn more about all my research projects', day: 2, isExpandable: true, hasTime: true },

    // Day 3 (Wednesday)
    { id: '9', title: 'Consulting club casework', time: '8:30 AM', endTime: '10:30 AM', color: 'red', description: `At PurdueThink, I led strategy and growth initiatives for student startups and organizations. As a consultant, I scaled Boilerexams through market research, survey analysis, and faculty outreach. Later, as Project Manager, I guided a team in restructuring Purdue Pilots Inc., delivered strategic recommendations, and secured three new projects hence expanding our campus-wide impact`, day: 3, isExpandable: true, hasTime: true },
    { id: '10', title: 'Purdue Student Government', time: '1:00 PM', endTime: '3:30 PM', color: 'green', description: `Served on Purdue Student Government's DEI Committee for two years & led multiple initiatives. As Executive Director, I led a 13-member team, worked on student body legislation, and launched campus-wide programs focused on accessibility, representation, and inclusion.`, day: 3, isExpandable: true, hasTime: true },

    // Day 4 (Thursday)
    { id: '13', title: 'On campus job', time: '2:00 PM', endTime: '4:30 PM', color: 'red', description: 'Click on attachment to learn more about all my on campus jobs', day: 4, isExpandable: true, hasTime: true },

    // Day 5 (Friday)
    { id: '6', title: 'Arduino Projects', time: '2:00 PM', endTime: '4:30 PM', color: 'red', description: 'I completed a certification in Arduino at Purdue. I enjoy working with microcontrollers and want to pursue independent projects with Arduino!', day: 5, isExpandable: true, hasTime: true },

    // Day 6 (Saturday)
    { id: '11', title: 'Certifications', time: '8:30 AM', endTime: '11:00 AM', color: 'purple', description: 'Click on attachment to learn more about all my certifications', day: 6, isExpandable: true, hasTime: true },
  ], []);

  // Get events for current week, grouped by day
  const getEventsForWeek = () => {
    const eventsByDay: { [key: number]: EventType[] } = {};

    allEvents.forEach(event => {
      if (event.day !== undefined) {
        if (!eventsByDay[event.day]) {
          eventsByDay[event.day] = [];
        }
        eventsByDay[event.day].push(event);
      }
    });

    return currentWeek.map((date, index) => {
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      // Convert to our day format: 0 = Monday, 6 = Sunday
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      return {
        date,
        dayName: formatDayName(date),
        items: eventsByDay[dayIndex] || []
      };
    });
  };

  const weekEvents = useMemo(() => getEventsForWeek(), [currentWeek, allEvents]);

  // Get today's events
  const today = new Date();
  const todayDayOfWeek = today.getDay();
  const todayEvents = weekEvents.find((dayData, index) => {
    const weekDay = currentWeek[index].getDay();
    return weekDay === todayDayOfWeek;
  }) || weekEvents[0];

  // Handle event click
  const handleEventClick = (event: EventType, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!event.isExpandable) return;

    e.preventDefault();
    e.stopPropagation();

    setExpandedEvent(event);
  };

  // Get color for event border
  const getEventColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': '#007AFF',
      'green': '#34C759',
      'yellow': '#FFCC00',
      'red': '#FF3B30',
      'purple': '#AF52DE'
    };
    return colorMap[color] || '#007AFF';
  };

  // Render event item
  const renderEventItem = (event: EventType, idx: number) => (
    <div
      key={`${event.id}-${idx}`}
      onClick={(e) => handleEventClick(event, e)}
      onTouchStart={(e) => {
        if (event.isExpandable) {
          e.currentTarget.style.opacity = '0.7';
        }
      }}
      onTouchEnd={(e) => {
        if (event.isExpandable) {
          e.currentTarget.style.opacity = '1';
          handleEventClick(event, e);
        }
      }}
      className={`mb-2 pl-3 border-l-[3px] py-2.5 ${event.isExpandable ? 'cursor-pointer active:opacity-70 touch-manipulation' : ''}`}
      style={{ borderColor: getEventColor(event.color) }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-[17px] font-semibold text-black leading-[1.29] mb-0.5 tracking-[-0.01em]">{event.title}</h3>
          {event.time && (
            <p className="text-[15px] text-gray-500 leading-[1.47] tracking-[-0.01em]">{event.time} – {event.endTime || event.time}</p>
          )}
        </div>
        <div className="text-right ml-3 flex-shrink-0">
          <div className="text-[15px] font-semibold text-black tracking-[-0.01em]">{event.time?.split(' ')[0]}</div>
          <div className="text-[15px] text-gray-500 leading-[1.47] tracking-[-0.01em]">{event.endTime?.split(' ')[0] || event.time?.split(' ')[0]}</div>
        </div>
      </div>
    </div>
  );

  // Early return AFTER all hooks
  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-[#f2f2f7] z-[9999] overflow-auto" style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility'
    }}>
      {/* Mobile Popup */}
      {showMobilePopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[10002]"
            onClick={handleCloseMobilePopup}
          />
          
          {/* Popup Modal */}
          <div
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-[20px] z-[10003] shadow-2xl max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-[22px] font-semibold text-black mb-3 tracking-[-0.01em]">Mobile Version Notice</h2>
              <p className="text-[17px] text-gray-800 leading-[1.47] mb-4 tracking-[-0.01em]">
                This website is designed for desktop viewing. The mobile version is currently a work in progress. For the best experience, please view on a desktop device.
              </p>
              <p className="text-[17px] text-gray-600 mb-6 leading-[1.47] tracking-[-0.01em]">
                In the meantime, you can check out my LinkedIn profile!
              </p>
              <a
                href="https://www.linkedin.com/in/aadyapawar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-[#007AFF] text-white px-6 py-3 rounded-[10px] active:bg-[#0051D5] transition-colors text-[17px] font-semibold mb-3 tracking-[-0.01em]"
              >
                Visit LinkedIn
              </a>
              <button
                onClick={handleCloseMobilePopup}
                className="w-full py-3 bg-gray-100 text-gray-800 text-[17px] font-semibold rounded-[10px] active:bg-gray-200 transition-colors tracking-[-0.01em]"
              >
                Got it
              </button>
            </div>
          </div>
        </>
      )}

      {/* Calendar Header */}
      <div className="bg-[#f2f2f7] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-[17px] text-[#007AFF] font-normal tracking-[-0.01em]">&lt;</button>
          <h1 className="text-[17px] font-semibold text-black tracking-[-0.01em]">
            {activeView === 'today' ? 'Today' : activeView === 'calendars' ? 'Calendars' : 'Inbox'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="6" width="20" height="2" rx="1"/>
              <rect x="2" y="11" width="20" height="2" rx="1"/>
              <rect x="2" y="16" width="20" height="2" rx="1"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="10" cy="10" r="7"/>
              <path d="M15 15l6 6"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center text-[#007AFF] text-[22px] font-light leading-none tracking-[-0.02em]">+</button>
        </div>
      </div>

      {/* Content based on active view */}
      {activeView === 'today' && (
        <>
          {/* Current Day */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-[34px] font-bold text-black mb-1 tracking-[-0.02em] leading-[1.1]">{todayEvents.dayName}</h2>
            {todayEvents.items.map((event, idx) => renderEventItem(event, idx))}
          </div>

          {/* Other Days */}
          {weekEvents.filter(day => day.dayName !== todayEvents.dayName).map((day, dayIdx) => (
            <div key={dayIdx} className="px-4 pt-6 pb-2 border-t border-gray-200">
              <h2 className="text-[34px] font-bold text-black mb-1 tracking-[-0.02em] leading-[1.1]">{day.dayName}</h2>
              {day.items.map((event, idx) => renderEventItem(event, idx))}
            </div>
          ))}
        </>
      )}

      {activeView === 'calendars' && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-[17px] text-gray-600 leading-[1.47] tracking-[-0.01em]">Calendar settings coming soon...</p>
        </div>
      )}

      {activeView === 'inbox' && (
        <div className="px-4 pt-4 pb-2">
          {/* Welcome Message */}
          <div className="mb-6 p-4 bg-white rounded-[10px] shadow-sm">
            <p className="text-[17px] text-gray-800 leading-[1.47] tracking-[-0.01em]">
              Hi! Welcome to Aadya's Portfolio. Click on each event to learn more. This is the mobile version of my portfolio site. For a better experience and to learn more about me, view on a desktop.
            </p>
          </div>

          {/* All Events */}
          <div className="space-y-6">
            {weekEvents.map((day, dayIdx) => (
              <div key={dayIdx} className="border-t border-gray-200 pt-4">
                <h2 className="text-[28px] font-bold text-black mb-3 tracking-[-0.02em] leading-[1.1]">{day.dayName}</h2>
                {day.items.length > 0 ? (
                  day.items.map((event, idx) => renderEventItem(event, idx))
                ) : (
                  <p className="text-[15px] text-gray-500 leading-[1.47] tracking-[-0.01em]">No events</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Event Modal */}
      {expandedEvent && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[10000]"
            onClick={() => setExpandedEvent(null)}
          />

          {/* Modal */}
          <div
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-[20px] z-[10001] max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-black flex-1 tracking-[-0.01em]">{expandedEvent.title}</h2>
              <button
                onClick={() => setExpandedEvent(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {/* Time */}
              {expandedEvent.time && (
                <div className="mb-4">
                  <div className="text-[15px] text-gray-600 mb-1 tracking-[-0.01em]">Time</div>
                  <div className="text-[17px] font-medium text-black leading-[1.47] tracking-[-0.01em]">
                    {expandedEvent.time} – {expandedEvent.endTime || expandedEvent.time}
                  </div>
                </div>
              )}

              {/* Description */}
              {(expandedEvent.description || expandedEvent.id === '1') && (
                <div className="mb-4">
                  {expandedEvent.id !== '1' && (
                    <div className="text-[15px] text-gray-600 mb-2 tracking-[-0.01em]">Description</div>
                  )}
                  <div className="text-[17px] text-gray-800 leading-[1.47] whitespace-pre-wrap tracking-[-0.01em]">
                    {(() => {
                      const event = expandedEvent;
                      // Go on a run: Strava embed
                      if (event.id === '1') {
                        return (
                          <div className="strava-embed-container mx-auto">
                            <iframe height={160} width="100%" frameBorder={0} allowTransparency={true} scrolling="no" src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"></iframe>
                          </div>
                        );
                      }
                      // InnovateHer Meeting: just show description
                      if (event.id === '4') {
                        return <div>{event.description}</div>;
                      }
                      // Update GitHub: GitHub link
                      if (event.id === '5') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div>
                              <a href="https://github.com/pawar17" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline tracking-[-0.01em]">View Profile</a>
                            </div>
                          </div>
                        );
                      }
                      // Arduino Projects: Certification and YouTube
                      if (event.id === '6') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div className="space-y-2">
                              <p className="tracking-[-0.01em]">Certification: <a href="https://engineering.purdue.edu/Engr/Academics/Undergraduate/certificates/Milestones/Programming_with_Arduino/2024/Spring/lpMR2tC8I_WNEvN5iTTlDw.png/lpMR2tC8I_WNEvN5iTTlDw.png" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline tracking-[-0.01em]">View Certification</a></p>
                              <p className="tracking-[-0.01em]">Projects Playlist: <a href="https://www.youtube.com/playlist?list=PLDjG7BISikRu_m3x5A4Ha9KvuqHsKhPYe" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline tracking-[-0.01em]">Watch on YouTube</a></p>
                            </div>
                          </div>
                        );
                      }
                      // Disability Visibility India: just show description
                      if (event.id === '7') {
                        return <div>{event.description}</div>;
                      }
                      // Edit resume: Resume link
                      if (event.id === '12') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div>
                              <a href="https://docs.google.com/document/d/1Ju6e-mVTXWJqo8gsHTJC2ZR7HgV0ixd_/edit?usp=sharing&ouid=100865589809991997614&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline tracking-[-0.01em]">View Working CV</a>
                            </div>
                          </div>
                        );
                      }
                      // Technical Projects: just show description
                      if (event.id === '14') {
                        return <div>{event.description}</div>;
                      }
                      // Certifications: just show description
                      if (event.id === '11') {
                        return <div>{event.description}</div>;
                      }
                      // Research Project: just show description
                      if (event.id === '8') {
                        return <div>{event.description}</div>;
                      }
                      // On campus job: just show description
                      if (event.id === '13') {
                        return <div>{event.description}</div>;
                      }
                      // Default: just show description
                      return <div>{event.description}</div>;
                    })()}
                  </div>
                </div>
              )}

              {/* Attachments Section */}
              {(expandedEvent.id === '14' || expandedEvent.id === '11' || expandedEvent.id === '8' || expandedEvent.id === '13' || expandedEvent.id === '4' || expandedEvent.id === '7') && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] text-gray-500 tracking-[-0.01em]">Attachments</span>
                    <button className="text-[#FF3B30] text-lg font-normal leading-none">+</button>
                  </div>
                  {expandedEvent.id === '14' && (
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/technical-projects.txt', 'technical-projects.txt')}>
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[17px] text-gray-900 tracking-[-0.01em]">technical-projects.txt</span>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {expandedEvent.id === '11' && (
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/certifications.txt', 'certifications.txt')}>
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[17px] text-gray-900 tracking-[-0.01em]">certifications.txt</span>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {expandedEvent.id === '8' && (
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/research-projects.txt', 'research-projects.txt')}>
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[17px] text-gray-900 tracking-[-0.01em]">research-projects.txt</span>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {expandedEvent.id === '13' && (
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/on-campus-jobs.txt', 'on-campus-jobs.txt')}>
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[17px] text-gray-900 tracking-[-0.01em]">on-campus-jobs.txt</span>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {expandedEvent.id === '4' && (
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/innovateher.txt', 'innovateher.txt')}>
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[17px] text-gray-900 tracking-[-0.01em]">innovateher.txt</span>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {expandedEvent.id === '7' && (
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/disability-visibility-india.txt', 'disability-visibility-india.txt')}>
                      <div className="flex items-center gap-2 flex-1">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[17px] text-gray-900 tracking-[-0.01em]">disability-visibility-india.txt</span>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Text File Viewer */}
      {textFilePath && (
        <TextFileViewer
          filePath={textFilePath}
          fileName={textFileName}
          isOpen={isTextFileOpen}
          onClose={() => {
            setIsTextFileOpen(false);
            setTextFilePath('');
            setTextFileName('');
          }}
        />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 flex justify-around items-center" style={{ paddingTop: '0.25rem', paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}>
        <button
          onClick={() => setActiveView('today')}
          className={`flex flex-col items-center gap-0.5 py-1.5 ${activeView === 'today' ? '' : 'opacity-60'}`}
        >
          <svg className={`w-[26px] h-[26px] ${activeView === 'today' ? 'text-[#007AFF]' : 'text-gray-600'}`} fill={activeView === 'today' ? 'currentColor' : 'none'} stroke={activeView === 'today' ? 'none' : 'currentColor'} strokeWidth={activeView === 'today' ? 0 : 1.5} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" fill={activeView === 'today' ? 'currentColor' : 'none'}/>
            <path d="M3 10h18M8 2v4M16 2v4"/>
          </svg>
          <span className={`text-[10px] ${activeView === 'today' ? 'text-[#007AFF]' : 'text-gray-600'} font-medium tracking-[-0.01em]`}>Today</span>
        </button>
        <button
          onClick={() => setActiveView('calendars')}
          className={`flex flex-col items-center gap-0.5 py-1.5 ${activeView === 'calendars' ? '' : 'opacity-60'}`}
        >
          <svg className={`w-[26px] h-[26px] ${activeView === 'calendars' ? 'text-[#007AFF]' : 'text-gray-600'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M3 10h18M8 2v4M16 2v4"/>
            <circle cx="8" cy="14" r="1" fill="currentColor"/>
            <circle cx="12" cy="14" r="1" fill="currentColor"/>
            <circle cx="16" cy="14" r="1" fill="currentColor"/>
          </svg>
          <span className={`text-[10px] ${activeView === 'calendars' ? 'text-[#007AFF]' : 'text-gray-600'} font-medium tracking-[-0.01em]`}>Calendars</span>
        </button>
        <button
          onClick={() => setActiveView('inbox')}
          className={`flex flex-col items-center gap-0.5 py-1.5 relative ${activeView === 'inbox' ? '' : 'opacity-60'}`}
        >
          <svg className={`w-[26px] h-[26px] ${activeView === 'inbox' ? 'text-[#007AFF]' : 'text-gray-600'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 4h16v12H8l-4 4V4z"/>
          </svg>
          <span className="absolute top-0 right-3 bg-[#FF3B30] text-white text-[11px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{allEvents.length}</span>
          <span className={`text-[10px] ${activeView === 'inbox' ? 'text-[#007AFF]' : 'text-gray-600'} font-medium tracking-[-0.01em]`}>Inbox</span>
        </button>
      </div>

      <div className="h-16"></div>
    </div>
  );
}
