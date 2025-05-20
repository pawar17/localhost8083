
import React, { useState } from 'react';

export type EventType = {
  id: string;
  title: string;
  time: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  description: string;
  location?: string;
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
        className={`gcal-event gcal-event-${event.color}`}
        onClick={toggleExpand}
      >
        {event.time} {event.title}
      </div>
      
      {isExpanded && (
        <div className="gcal-modal" onClick={toggleExpand}>
          <div 
            className="gcal-modal-content cursor-default"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">{event.title}</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleExpand}
              >
                ×
              </button>
            </div>
            <div className="mb-2">
              <div className="text-sm text-gray-600 mb-1">{event.time}</div>
              {event.location && (
                <div className="text-sm text-gray-600 mb-1">
                  📍 {event.location}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarEvent;
