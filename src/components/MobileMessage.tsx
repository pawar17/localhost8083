import { useState, useEffect, useMemo } from 'react';
import { EventType } from './CalendarEvent';

export function MobileMessage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeView, setActiveView] = useState<'today' | 'calendars' | 'inbox'>('today');
  const [expandedEvent, setExpandedEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      // Only show on actual phones (max width 768px for phones, excluding tablets)
      setIsMobile(window.innerWidth <= 768);
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
    { id: '1', title: 'Go on a run', time: '8:00 AM', endTime: '9:00 AM', color: 'blue', description: 'You can check my strava out and follow my journey as I train for a half marathon in October!', day: 0, isExpandable: true, hasTime: true },
    { id: '2', title: 'Meal Prep', time: '9:00 AM', endTime: '11:00 AM', color: 'green', description: '', day: 0, isExpandable: false, hasTime: true },
    { id: '3', title: 'Cafe Hopping to do work!', time: '2:00 PM', endTime: '4:00 PM', color: 'yellow', description: '', day: 0, isExpandable: false, hasTime: true },
    { id: '14a', title: 'Technical Project: Build Financial Transaction Platform', time: '11:00 AM', endTime: '1:30 PM', color: 'purple', description: `Built full-stack app with React.js, Firebase, and Checkbook API enabling secure international payments; placed 2nd at Stanford Treehacks. Learn more: <a href="https://devpost.com/software/cashflow-7xqoc4" target="_blank" rel="noopener noreferrer">CashFlow on Devpost</a>`, day: 0, isExpandable: true, hasTime: true },

    { id: '4', title: 'InnovateHer Meeting', time: '8:30 AM', endTime: '10:00 AM', color: 'green', description: `As a woman in CS, I founded InnovateHer to create space for others like me. What started as a student government idea became Purdue's first women-centric hackathon and a community of 500+.\n\n- Brought together 7+ orgs to launch 2 hackathons with 200+ participants each\n- Raised over $80K to support inclusive, impact-driven tech projects\n- Built and led a 60-member team; now proudly sustained by new leadership`, day: 1, isExpandable: true, hasTime: true },
    { id: '5', title: 'Update GitHub', time: '10:30 AM', endTime: '12:00 PM', color: 'blue', description: 'Click here to view my GitHub profiles!', day: 1, isExpandable: true, hasTime: true },
    { id: '6', title: 'Arduino Projects', time: '2:00 PM', endTime: '4:30 PM', color: 'red', description: 'I completed a certification in Arduino at Purdue. I enjoy working with microcontrollers and want to pursue independent projects with Arduino!', day: 1, isExpandable: true, hasTime: true },
    { id: '14b', title: 'Technical Project: Build Disability Visibility India Website', time: '12:00 PM', endTime: '2:00 PM', color: 'yellow', description: `Developed accessible web platform to support and grow disability awareness in India while creating a toolkit resource. Learn more in the next event titled Disability Visibility. Visit: <a href="https://linktr.ee/disabilityvisibilityindia" target="_blank" rel="noopener noreferrer">Disability Visibility India Linktree</a>`, day: 1, isExpandable: true, hasTime: true },

    { id: '7', title: 'Disability Visibility India', time: '10:00 AM', endTime: '12:00 PM', color: 'yellow', description: `I launched this in 2020 as a digital toolkit for families of individuals with disabilities in India. What started as a simple website resource became a growing community - one that taught me about accessibility, care, and inclusive design. It's still one of the most meaningful projects I've built.`, day: 2, isExpandable: true, hasTime: true },
    { id: '8', title: 'Research Project', time: '1:30 PM', endTime: '3:30 PM', color: 'purple', description: `At C-Lab, I worked on a generative AI project focused on simulating part mobility using 3D point clouds. I implemented and compared diffusion and transformer-based models, integrating them into a CAD-compatible pipeline in Python to explore real-world mechanical design applications.\n\nIn the CAST project, I focused on improving speech-to-text systems for children, who are often underrepresented in commercial ASR models. I fine-tuned transformer architectures and developed a deep phoneme classification model using PyTorch, resulting in a 12% improvement in accuracy. The project emphasized accessibility and the potential of AI in educational and therapeutic settings.\n\nLearn more about what I did by taking a look at my resume!`, day: 2, isExpandable: true, hasTime: true },
    { id: '14c', title: 'Technical Project: Build Music Recommender System', time: '8:00 AM', endTime: '10:00 AM', color: 'red', description: 'Implemented deep learning (RNN/LSTM) and collaborative filtering to enhance song recommendations on large-scale dataset.', day: 2, isExpandable: true, hasTime: true },

    { id: '9', title: 'Consulting club casework', time: '8:30 AM', endTime: '10:30 AM', color: 'red', description: `At PurdueThink, I led strategy and growth initiatives for student startups and organizations. As a consultant, I scaled Boilerexams through market research, survey analysis, and faculty outreach. Later, as Project Manager, I guided a team in restructuring Purdue Pilots Inc., delivered strategic recommendations, and secured three new projects hence expanding our campus-wide impact`, day: 3, isExpandable: true, hasTime: true },
    { id: '10', title: 'Purdue Student Government', time: '1:00 PM', endTime: '3:30 PM', color: 'green', description: `Served on Purdue Student Government's DEI Committee for two years & led multiple initiatives. As Executive Director, I led a 13-member team, worked on student body legislation, and launched campus-wide programs focused on accessibility, representation, and inclusion.`, day: 3, isExpandable: true, hasTime: true },
    { id: '14d', title: 'Technical Project: Build S&P 500 Stock Forecasting', time: '10:30 AM', endTime: '1:00 PM', color: 'blue', description: `This Project Analyses a data about S&P 500 to:\nLink to the dataset: <a href="https://www.kaggle.com/datasets/andrewmvd/sp-500-stocks" target="_blank" rel="noopener noreferrer">https://www.kaggle.com/datasets/andrewmvd/sp-500-stocks</a>\n\n- Explore the S&P 500 stock market performance.\n- Analyze company-level data to study sectoral trends, market capitalization, and volatility.\n- Explore index-wide trends and compare with individual stock behaviors.`, day: 3, isExpandable: true, hasTime: true },

    { id: '11', title: 'Certifications', time: '8:30 AM', endTime: '11:00 AM', color: 'purple', description: `<i>Currently pursuing: Six Sigma Greenbelt certification</i>\n- Forage Program: Citi Asia – Global Consumer Banking Virtual Reality Intern\n- Forage Program: Goldman Sachs – Virtual Engineering Intern\n- Purdue Milestones Program – Programming with Arduino\n- Grow with Google – Data Analytics\n- Grow with Google – Project Management`, day: 4, isExpandable: true, hasTime: true },
    { id: '12', title: 'Edit resume', time: '11:30 AM', endTime: '1:00 PM', color: 'green', description: 'This is my 3 page working CV, I have all my experiences from the last 4 years listed on this resume', day: 4, isExpandable: true, hasTime: true },
    { id: '13', title: 'On campus job', time: '2:00 PM', endTime: '4:30 PM', color: 'red', description: `Office of Undergraduate Research, West Lafayette, IN\nResearch Assistant | Feb 2023 – Present\nDeveloped interactive Tableau dashboards for research data visualization and conducted sentiment analysis on survey responses.\n\nDisability Resource Center, West Lafayette, IN\nStudent Intern | Aug 2023 – Aug 2024\nConverted and edited course materials into Braille and accessible formats to support inclusive learning.\n\nPurdue Dining & Culinary, West Lafayette, IN\nStudent Staff | Oct 2022 – Feb 2023\nServed 1,000+ students per shift, assisted in meal prep and inventory, and collaborated with a team to improve operational efficiency.`, day: 4, isExpandable: true, hasTime: true },

    { id: '14e', title: 'Technical Project: Build IPL Player Performance Predictor', time: '8:00 AM', endTime: '10:30 AM', color: 'blue', description: `Designed ML model to predict player performance for Indian Premier League 2025, India's most popular T-20 format league, using historical data (2008–2024); webscraped real-time stats, recent form, and contextual match metrics to drive accuracy to improve sports betting odds.`, day: 5, isExpandable: true, hasTime: true },
    { id: '15', title: 'CALL HOME!', time: '11:00 AM', endTime: '1:00 PM', color: 'yellow', description: '', day: 5, isExpandable: false, hasTime: true },
    { id: '16', title: 'Prepare for Interview!', time: '2:00 PM', endTime: '5:00 PM', color: 'green', description: '', day: 5, isExpandable: false, hasTime: true },

    { id: '17', title: 'Grocery Shopping', time: '9:30 AM', endTime: '11:00 AM', color: 'purple', description: '', day: 6, isExpandable: false, hasTime: true },
    { id: '18', title: 'Gym', time: '11:00 AM', endTime: '12:00 PM', color: 'red', description: 'Been a (sort of consistent) gym girly for the last 4 years, I really enjoy working out and lifting weights :)', day: 6, isExpandable: true, hasTime: true },
    { id: '19', title: 'Read a book', time: '1:00 PM', endTime: '2:30 PM', color: 'blue', description: '', day: 6, isExpandable: false, hasTime: true },
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
          <h3 className="text-[17px] font-semibold text-black leading-tight mb-0.5">{event.title}</h3>
          {event.time && (
            <p className="text-[15px] text-gray-500">{event.time} – {event.endTime || event.time}</p>
          )}
        </div>
        <div className="text-right ml-3 flex-shrink-0">
          <div className="text-[15px] font-semibold text-black">{event.time?.split(' ')[0]}</div>
          <div className="text-[15px] text-gray-500">{event.endTime?.split(' ')[0] || event.time?.split(' ')[0]}</div>
        </div>
      </div>
    </div>
  );

  // Early return AFTER all hooks
  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-[#f2f2f7] z-[9999] overflow-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      {/* Calendar Header */}
      <div className="bg-[#f2f2f7] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-[17px] text-[#007AFF] font-normal">&lt;</button>
          <h1 className="text-[17px] font-semibold text-black">
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
          <button className="w-7 h-7 flex items-center justify-center text-[#007AFF] text-[22px] font-light leading-none">+</button>
        </div>
      </div>

      {/* Content based on active view */}
      {activeView === 'today' && (
        <>
          {/* Current Day */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-[34px] font-bold text-black mb-1">{todayEvents.dayName}</h2>
            {todayEvents.items.map((event, idx) => renderEventItem(event, idx))}
          </div>

          {/* Other Days */}
          {weekEvents.filter(day => day.dayName !== todayEvents.dayName).map((day, dayIdx) => (
            <div key={dayIdx} className="px-4 pt-6 pb-2 border-t border-gray-200">
              <h2 className="text-[34px] font-bold text-black mb-1">{day.dayName}</h2>
              {day.items.map((event, idx) => renderEventItem(event, idx))}
            </div>
          ))}
        </>
      )}

      {activeView === 'calendars' && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-[17px] text-gray-600">Calendar settings coming soon...</p>
        </div>
      )}

      {activeView === 'inbox' && (
        <div className="px-4 pt-4 pb-2">
          {/* Welcome Message */}
          <div className="mb-6 p-4 bg-white rounded-[10px] shadow-sm">
            <p className="text-[17px] text-gray-800 leading-relaxed">
              Hi! Welcome to Aadya's Portfolio. Click on each event to learn more. This is the mobile version of my portfolio site. For a better experience and to learn more about me, view on a desktop.
            </p>
          </div>

          {/* All Events */}
          <div className="space-y-6">
            {weekEvents.map((day, dayIdx) => (
              <div key={dayIdx} className="border-t border-gray-200 pt-4">
                <h2 className="text-[28px] font-bold text-black mb-3">{day.dayName}</h2>
                {day.items.length > 0 ? (
                  day.items.map((event, idx) => renderEventItem(event, idx))
                ) : (
                  <p className="text-[15px] text-gray-500">No events</p>
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
              <h2 className="text-[20px] font-semibold text-black flex-1">{expandedEvent.title}</h2>
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
                  <div className="text-[15px] text-gray-600 mb-1">Time</div>
                  <div className="text-[17px] font-medium text-black">
                    {expandedEvent.time} – {expandedEvent.endTime || expandedEvent.time}
                  </div>
                </div>
              )}

              {/* Description */}
              {expandedEvent.description && (
                <div className="mb-4">
                  <div className="text-[15px] text-gray-600 mb-2">Description</div>
                  <div className="text-[17px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {(() => {
                      const event = expandedEvent;
                      // Go on a run: Strava embed
                      if (event.id === '1') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div className="strava-embed-container mx-auto">
                              <iframe height={160} width="100%" frameBorder={0} allowTransparency={true} scrolling="no" src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"></iframe>
                            </div>
                          </div>
                        );
                      }
                      // InnovateHer Meeting: resource links
                      if (event.id === '4') {
                        return (
                          <div>
                            <div className="mb-2">{event.description.split('\n')[0]}</div>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                              {event.description.split('\n').slice(1).filter(line => line.startsWith('- ')).map((line, index) => {
                                const cleanItem = line.substring(2);
                                return <li key={index}>{cleanItem}</li>;
                              })}
                            </ul>
                            <div className="mt-4 text-sm">
                              <p className="font-semibold mb-2">Learn More:</p>
                              <ul className="space-y-1">
                                <li><a href="https://www.google.com/search?q=Innovateher+purdue&sca_esv=905f7b0eae3ddda1&rlz=1C1RXQR_enUS1019US1019&sxsrf=AE3TifPXvPxXGVCI6uhOyVfKq9IzZ4kblQ%3A1748317321739&ei=iTQ1aPvuLPag5NoP4c6KoAs&ved=0ahUKEwi716rH3cKNAxV2EFkFHWGnErQQ4dUDCBA&uact=5&oq=Innovateher+purdue&gs_lp=Egxnd3Mtd2l6LXNlcnAiEklubm92YXRlaGVyIHB1cmR1ZTIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0jRDlCXBljIDXABeAGQAQCYAVWgAecBqgEBM7gBA8gBAPgBAZgCBKAC_QHCAgoQIxiABBgnGIoFwgIFEAAY7wXCAggQABiABBiiBJgDAOIDBRIBMSBAiAYBkAYEkgcBNKAH6QuyBwEzuAf3AcIHAzItNMgHEA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Google Search Results</a></li>
                                <li><a href="https://www.purdueexponent.org/campus/women-coding-club-to-host-hackathon/article_297d44e4-cb8d-11ee-910a-f397edfebbde.html" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Purdue Newspaper Article</a></li>
                                <li><a href="https://www.instagram.com/innovateherhacks/?hl=en" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Instagram</a></li>
                                <li><a href="https://innovateherhacks.my.canva.site/#contact" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Info Site</a></li>
                              </ul>
                            </div>
                          </div>
                        );
                      }
                      // Update GitHub: GitHub link
                      if (event.id === '5') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div>
                              <a href="https://github.com/pawar17" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">View Profile</a>
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
                              <p>Certification: <a href="https://engineering.purdue.edu/Engr/Academics/Undergraduate/certificates/Milestones/Programming_with_Arduino/2024/Spring/lpMR2tC8I_WNEvN5iTTlDw.png/lpMR2tC8I_WNEvN5iTTlDw.png" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">View Certification</a></p>
                              <p>Projects Playlist: <a href="https://www.youtube.com/playlist?list=PLDjG7BISikRu_m3x5A4Ha9KvuqHsKhPYe" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Watch on YouTube</a></p>
                            </div>
                          </div>
                        );
                      }
                      // Disability Visibility India: Website and media
                      if (event.id === '7') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div>
                              <p className="font-semibold mb-2">Learn More:</p>
                              <ul className="space-y-1">
                                <li><a href="https://www.disability-visibility.com/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Website</a></li>
                                <li><p className="font-semibold mt-2">Media Features:</p></li>
                                <li><a href="https://www.youtube.com/watch?v=ACmcNJJiRzo" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">YouTube Feature</a></li>
                                <li><a href="https://www.hindustantimes.com/lifestyle/art-culture/are-our-city-eateries-inclusive-101645187672291.html" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">Hindustan Times Article</a></li>
                              </ul>
                            </div>
                          </div>
                        );
                      }
                      // Edit resume: Resume link
                      if (event.id === '12') {
                        return (
                          <div>
                            <div className="mb-4">{event.description}</div>
                            <div>
                              <a href="https://docs.google.com/document/d/1Ju6e-mVTXWJqo8gsHTJC2ZR7HgV0ixd_/edit?usp=sharing&ouid=100865589809991997614&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] underline">View Working CV</a>
                            </div>
                          </div>
                        );
                      }
                      // Technical Project events: render HTML description
                      if (["14a", "14b", "14d", "14e"].includes(event.id)) {
                        return (
                          <div>
                            <style>{`.mobile-event-html a { color: #007AFF !important; text-decoration: underline; }`}</style>
                            <div className="mobile-event-html" dangerouslySetInnerHTML={{ __html: event.description }} />
                          </div>
                        );
                      }
                      // Default: just show description
                      return <div>{event.description}</div>;
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
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
          <span className={`text-[10px] ${activeView === 'today' ? 'text-[#007AFF]' : 'text-gray-600'} font-medium`}>Today</span>
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
          <span className={`text-[10px] ${activeView === 'calendars' ? 'text-[#007AFF]' : 'text-gray-600'} font-medium`}>Calendars</span>
        </button>
        <button
          onClick={() => setActiveView('inbox')}
          className={`flex flex-col items-center gap-0.5 py-1.5 relative ${activeView === 'inbox' ? '' : 'opacity-60'}`}
        >
          <svg className={`w-[26px] h-[26px] ${activeView === 'inbox' ? 'text-[#007AFF]' : 'text-gray-600'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 4h16v12H8l-4 4V4z"/>
          </svg>
          <span className="absolute top-0 right-3 bg-[#FF3B30] text-white text-[11px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{allEvents.length}</span>
          <span className={`text-[10px] ${activeView === 'inbox' ? 'text-[#007AFF]' : 'text-gray-600'} font-medium`}>Inbox</span>
        </button>
      </div>

      <div className="h-16"></div>
    </div>
  );
}
