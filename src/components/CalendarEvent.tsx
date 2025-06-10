
import React, { useState, CSSProperties, useRef } from 'react';
import EventPopover from './EventPopover';

export type EventType = {
  id: string;
  title: string;
  time: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  description: string;
  location?: string;
  day?: number; // 0-6 for Sunday-Saturday
  endTime?: string;
  notes?: string;
  remindMe?: string;
  remindDate?: string;
  remindTime?: string;
  hasTime?: boolean;
  earlyReminder?: string;
  repeat?: string;
  priority?: string;
  list?: string;
  url?: string;
  images?: string;
  isExpandable?: boolean;
};

type CalendarEventProps = {
  event: EventType;
  style?: CSSProperties;
};

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const eventRef = useRef<HTMLDivElement>(null);
  
  const getEventClasses = () => {
    let colorClasses = '';

    switch(event.color) {
      case 'blue':
        colorClasses = 'bg-blue-100 border-l-4 border-blue-500 text-blue-800';
        break;
      case 'green':
        colorClasses = 'bg-green-100 border-l-4 border-green-500 text-green-800';
        break;
      case 'yellow':
        colorClasses = 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800';
        break;
      case 'red':
        colorClasses = 'bg-red-100 border-l-4 border-red-500 text-red-800';
        break;
      case 'purple':
        colorClasses = 'bg-purple-100 border-l-4 border-purple-500 text-purple-800';
        break;
    }
    
    const cursorClass = event.isExpandable ? 'cursor-pointer hover:opacity-80' : '';
    return `rounded-md px-2 py-1 mb-1 ${colorClasses} overflow-hidden text-ellipsis w-[95%] mx-auto ${cursorClass}`;
  };
  
  const getTimeDisplay = () => {
    if (event.endTime) {
      return `${event.time} – ${event.endTime}`;
    }
    return event.time;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!event.isExpandable) return;
    
    const rect = eventRef.current?.getBoundingClientRect();
    if (rect) {
      setPopoverPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
      setIsOpen(true);
    }
  };
  
  return (
    <>
      <div 
        ref={eventRef}
        className={getEventClasses()}
        onClick={handleClick}
        style={{
          ...style,
          cursor: event.isExpandable ? 'url(/cursors/cursor2.png), pointer' : 'url(/cursors/cursor1.png), auto'
        }}
      >
        <div className="text-xs font-medium">{event.title}</div>
        {event.time && <div className="text-xs">{getTimeDisplay()}</div>}
        {event.location && <div className="text-xs truncate">{event.location}</div>}
      </div>
      
      <EventPopover 
        event={event}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={popoverPosition}
      />
    </>
  );
};

export default CalendarEvent;
