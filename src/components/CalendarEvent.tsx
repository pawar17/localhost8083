
import React, { useState } from 'react';

export type EventType = {
  id: string;
  title: string;
  time: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  description: string;
  location?: string;
  day?: number; // 0-6 for Sunday-Saturday
};

type CalendarEventProps = {
  event: EventType;
};

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <>
      <div 
        className={`gcal-event gcal-event-${event.color} w-[95%] mx-auto`}
        onClick={toggleExpand}
      >
        {event.time} {event.title}
      </div>
      
      {isExpanded && (
        <div className="gcal-modal" onClick={toggleExpand}>
          <div 
            className="gcal-modal-content cursor-default max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className={`h-2 bg-${event.color}-500 rounded-t-lg w-full`}></div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-medium">{event.title}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  onClick={toggleExpand}
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    🕒
                  </span>
                  {event.time}
                </div>
                {event.location && (
                  <div className="text-sm text-gray-600 mb-2 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      📍
                    </span>
                    {event.location}
                  </div>
                )}
              </div>
              <div className="border-t pt-3">
                <p className="text-sm text-gray-700">{event.description}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">
                  Edit
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarEvent;
