import { useState, useEffect } from 'react';

export function MobileMessage() {
  const [isMobile, setIsMobile] = useState(false);

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

  if (!isMobile) return null;

  // Your calendar events data
  const events = [
    { day: 'Monday – Nov 10', date: '2025-11-10', items: [
      { title: 'Go on a run', time: '7:00 AM', endTime: '8:00 AM', color: '#FF3B30' },
      { title: 'Technical Project: Build IPL Player Performance Predictor', time: '8:00 AM', endTime: '10:30 AM', color: '#007AFF' },
      { title: 'Certifications', time: '8:30 AM', endTime: '11:00 AM', color: '#AF52DE' },
      { title: 'Consulting club casework', time: '8:30 AM', endTime: '10:30 AM', color: '#FF3B30' }
    ]},
    { day: 'Tuesday – Nov 11', date: '2025-11-11', items: [
      { title: 'Disability Visibility India', time: '10:00 AM', endTime: '12:00 PM', color: '#FFCC00' },
      { title: 'Technical Project: Build S&P 500 Stock Forecasting', time: '10:30 AM', endTime: '1:00 PM', color: '#007AFF' }
    ]},
    { day: 'Wednesday – Nov 12', date: '2025-11-12', items: [
      { title: 'Grocery Shopping', time: '9:30 AM', endTime: '11:00 AM', color: '#AF52DE' },
      { title: 'Edit resume', time: '11:30 AM', endTime: '1:00 PM', color: '#34C759' },
      { title: 'CALL HOME!', time: '11:00 AM', endTime: '1:00 PM', color: '#FFCC00' },
      { title: 'Gym', time: '11:00 AM', endTime: '12:00 PM', color: '#FF3B30' }
    ]},
    { day: 'Thursday – Nov 13', date: '2025-11-13', items: [
      { title: 'Technical Project: Build Music Recommender System', time: '8:00 AM', endTime: '10:00 AM', color: '#FF3B30' }
    ]},
    { day: 'Friday – Nov 14', date: '2025-11-14', items: [
      { title: 'Read a book', time: '1:00 PM', endTime: '2:30 PM', color: '#007AFF' }
    ]}
  ];

  const today = events[0]; // Monday Nov 10 is "today"

  return (
    <div className="fixed inset-0 bg-[#f2f2f7] z-[9999] overflow-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      {/* iPhone Status Bar */}
      <div className="bg-white pt-2 pb-1 px-6 flex justify-between items-center text-[15px] font-semibold">
        <span className="font-semibold">4:11</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-[17px] h-3.5" viewBox="0 0 24 12" fill="currentColor">
            <rect x="1" y="3" width="4" height="6" rx="1"/>
            <rect x="7" y="1" width="4" height="10" rx="1"/>
            <rect x="13" y="0" width="4" height="12" rx="1"/>
            <rect x="19" y="2" width="4" height="8" rx="1"/>
          </svg>
          <svg className="w-4 h-3.5" viewBox="0 0 20 15" fill="currentColor">
            <path d="M1 7c2.8-2.8 7.2-2.8 10 0M4 10c1.7-1.7 4.3-1.7 6 0M7 13l3 2 3-2"/>
          </svg>
          <div className="flex items-center">
            <span className="text-[11px] font-semibold mr-0.5">72</span>
            <svg className="w-6 h-3" viewBox="0 0 26 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1"/>
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor"/>
              <rect x="2" y="2" width="17" height="8" rx="1.5" fill="#FFCC00"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-[#f2f2f7] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-[17px] text-[#007AFF] font-normal">&lt;</button>
          <h1 className="text-[17px] font-semibold text-black">November</h1>
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

      {/* Current Day */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-[34px] font-bold text-black mb-1">{today.day}</h2>

        {today.items.map((event, idx) => (
          <div key={idx} className="mb-2 pl-3 border-l-[3px] py-2.5" style={{ borderColor: event.color }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-[17px] font-semibold text-black leading-tight mb-0.5">{event.title}</h3>
                {event.time && (
                  <p className="text-[15px] text-gray-500">{event.time} – {event.endTime}</p>
                )}
              </div>
              <div className="text-right ml-3 flex-shrink-0">
                <div className="text-[15px] font-semibold text-black">{event.time?.split(' ')[0]}</div>
                <div className="text-[15px] text-gray-500">{event.endTime?.split(' ')[0]}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Days */}
      {events.slice(1).map((day, dayIdx) => (
        <div key={dayIdx} className="px-4 pt-6 pb-2 border-t border-gray-200">
          <h2 className="text-[34px] font-bold text-black mb-1">{day.day}</h2>

          {day.items.map((event, idx) => (
            <div key={idx} className="mb-2 pl-3 border-l-[3px] py-2.5" style={{ borderColor: event.color }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[17px] font-semibold text-black leading-tight mb-0.5">{event.title}</h3>
                  {event.time && (
                    <p className="text-[15px] text-gray-500">{event.time} – {event.endTime}</p>
                  )}
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <div className="text-[15px] font-semibold text-black">{event.time?.split(' ')[0]}</div>
                  <div className="text-[15px] text-gray-500">{event.endTime?.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 flex justify-around items-center" style={{ paddingTop: '0.25rem', paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}>
        <button className="flex flex-col items-center gap-0.5 py-1.5">
          <svg className="w-[26px] h-[26px] text-[#007AFF]" fill="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 10h18M8 2v4M16 2v4"/>
          </svg>
          <span className="text-[10px] text-[#007AFF] font-medium">Today</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 py-1.5">
          <svg className="w-[26px] h-[26px] text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M3 10h18M8 2v4M16 2v4"/>
            <circle cx="8" cy="14" r="1" fill="currentColor"/>
            <circle cx="12" cy="14" r="1" fill="currentColor"/>
            <circle cx="16" cy="14" r="1" fill="currentColor"/>
          </svg>
          <span className="text-[10px] text-gray-600 font-medium">Calendars</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 py-1.5 relative">
          <svg className="w-[26px] h-[26px] text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16v12H8l-4 4V4z"/>
          </svg>
          <span className="absolute top-0 right-3 bg-[#FF3B30] text-white text-[11px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">6</span>
          <span className="text-[10px] text-gray-600 font-medium">Inbox</span>
        </button>
      </div>

      <div className="h-16"></div>
    </div>
  );
}
