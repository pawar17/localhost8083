
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
        colorClasses = 'bg-[#D6E9FF] border-l-[3px] border-[#007AFF] text-[#003D80]';
        break;
      case 'green':
        colorClasses = 'bg-[#D8F5E3] border-l-[3px] border-[#34C759] text-[#1A7537]';
        break;
      case 'yellow':
        colorClasses = 'bg-[#FFF3CD] border-l-[3px] border-[#FFCC00] text-[#806600]';
        break;
      case 'red':
        colorClasses = 'bg-[#FFDCE0] border-l-[3px] border-[#FF3B30] text-[#8F2119]';
        break;
      case 'purple':
        colorClasses = 'bg-[#EAE0FF] border-l-[3px] border-[#AF52DE] text-[#5A2970]';
        break;
    }

    const cursorClass = event.isExpandable ? 'cursor-pointer hover:opacity-90' : '';
    return `rounded-[4px] px-1.5 py-0.5 mb-0.5 ${colorClasses} overflow-hidden text-ellipsis w-[98%] mx-auto shadow-sm ${cursorClass} transition-opacity`;
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
        <div className="text-[11px] font-semibold leading-tight">{event.title}</div>
        {event.time && <div className="text-[10px] opacity-90 leading-tight">{getTimeDisplay()}</div>}
        {event.location && <div className="text-[10px] opacity-80 truncate leading-tight">{event.location}</div>}
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
