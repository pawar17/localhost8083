import React, { useState, CSSProperties } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  
  const getEventClasses = () => {
    let colorClasses = '';
    let borderColorClass = '';
    let textColorClass = '';
    let bgColorClass = '';

    switch(event.color) {
      case 'blue': // Personal activities
        bgColorClass = 'bg-blue-500/30'; // Translucent background
        borderColorClass = 'border-blue-500'; // Solid border color
        textColorClass = 'text-blue-800'; // Darker text color
        break;
      case 'green': // Work/Technical
        bgColorClass = 'bg-green-500/30';
        borderColorClass = 'border-green-500';
        textColorClass = 'text-green-800';
        break;
      case 'yellow': // Research/Learning
        bgColorClass = 'bg-yellow-500/30';
        borderColorClass = 'border-yellow-500';
        textColorClass = 'text-yellow-900'; // Slightly darker for yellow
        break;
      case 'red': // Meetings/Organizations
        bgColorClass = 'bg-red-500/30';
        borderColorClass = 'border-red-500';
        textColorClass = 'text-red-800';
        break;
      case 'purple': // Career Development
        bgColorClass = 'bg-purple-500/30';
        borderColorClass = 'border-purple-500';
        textColorClass = 'text-purple-800';
        break;
      default:
        bgColorClass = 'bg-blue-500/30';
        borderColorClass = 'border-blue-500';
        textColorClass = 'text-blue-800';
    }

    // Apply classes for rounded corners, padding, overflow, width, border-left and cursor
    return `rounded-sm px-1 py-1 overflow-hidden text-ellipsis w-[98%] mx-auto cursor-mac-pointer border-l-4 ${bgColorClass} ${borderColorClass} ${textColorClass}`;
  };
  
  const getTimeDisplay = () => {
    if (event.endTime) {
      return `${event.time} – ${event.endTime}`;
    }
    return event.time;
  };
  
  return (
    <>
      <div 
        className={`${getEventClasses()} ${event.isExpandable ? 'cursor-mac-pointer' : ''}`}
        onClick={event.isExpandable ? () => setIsOpen(true) : undefined}
        style={style}
      >
        <div className="text-xs font-semibold">{event.title}</div>
        {event.endTime && (
           <div className="text-[10px] opacity-90">{getTimeDisplay()}</div>
        )}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-md bg-white text-gray-800 rounded-lg shadow-xl border border-gray-300 overflow-hidden hide-default-close">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200 cursor-pointer" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 border border-red-300"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-400 border border-yellow-300"></span>
              <span className="w-2 h-2 rounded-full bg-green-500 border border-green-300"></span>
            </div>
          </div>

          <div className={`px-4 py-2 text-gray-800`}>
            <div className="text-lg font-bold">{event.title}</div>
            {event.notes && (
                <div className="text-sm text-gray-500 font-normal mt-2">Notes</div>
            )}
            {event.description && (
                <div className="text-sm text-gray-800 font-normal mt-1">{event.description}</div>
            )}
          </div>
          
          <div className="p-4 text-sm text-gray-700 space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">remind me</div>
              <div className="text-gray-800">{event.remindMe || 'None'}</div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <div className={`w-4 h-4 border border-gray-400 rounded ${event.hasTime ? 'bg-blue-500 border-blue-500' : ''} flex items-center justify-center`}>
                      {event.hasTime && <span className="text-white text-xs">✔</span>}
                   </div>
                   <div className="text-gray-600">At a Time</div>
                </div>
                {event.remindTime && <div className="text-gray-800">{event.remindTime}</div>}
             </div>

             {event.location && (
                <div className="flex justify-between items-center">
                    <div className="text-gray-600">At a Location</div>
                    <div className="text-gray-800">{event.location}</div>
                </div>
             )}
            
            <div className="flex justify-between items-center">
               <div className="text-gray-600">early reminder</div>
               <div className="text-gray-800">{event.earlyReminder || 'None'}</div>
            </div>
             <div className="flex justify-between items-center">
               <div className="text-gray-600">repeat</div>
               <div className="text-gray-800">{event.repeat || 'Never'}</div>
            </div>
             <div className="flex justify-between items-center">
               <div className="text-gray-600">priority</div>
               <div className="text-gray-800">{event.priority || 'None'}</div>
            </div>
             <div className="flex justify-between items-center">
               <div className="text-gray-600">list</div>
               <div className="text-gray-800">{event.list || 'None'}</div>
            </div>
             <div className="flex justify-between items-center">
               <div className="text-gray-600">URL</div>
               <div className="text-gray-800">{event.url || 'None'}</div>
            </div>
             <div className="flex justify-between items-center">
               <div className="text-gray-600">images</div>
               <div className="text-blue-600 cursor-mac-pointer">{event.images || '+ Add image...'}</div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarEvent;
