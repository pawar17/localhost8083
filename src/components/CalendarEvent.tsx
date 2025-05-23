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
};

type CalendarEventProps = {
  event: EventType;
  style?: CSSProperties;
};

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getEventClasses = () => {
    let colorClasses = '';
    
    switch(event.color) {
      case 'blue': // Personal activities
        colorClasses = 'bg-blue-100 border border-blue-500 text-blue-800';
        break;
      case 'green': // Work/Technical
        colorClasses = 'bg-green-100 border border-green-500 text-green-800';
        break;
      case 'yellow': // Research/Learning
        colorClasses = 'bg-yellow-100 border border-yellow-500 text-yellow-800';
        break;
      case 'red': // Meetings/Organizations
        colorClasses = 'bg-red-100 border border-red-500 text-red-800';
        break;
      case 'purple': // Career Development
        colorClasses = 'bg-purple-100 border border-purple-500 text-purple-800';
        break;
      default:
        colorClasses = 'bg-blue-100 border border-blue-500 text-blue-800';
    }
    
    return `rounded-sm px-1 py-1 ${colorClasses} overflow-hidden text-ellipsis w-[98%] mx-auto cursor-mac-pointer`;
  };
  
  const getTimeDisplay = () => {
    if (event.endTime) {
      return `${event.time} – ${event.endTime}`;
    }
    return event.time;
  };
  
  const getColorForHeader = () => {
    switch(event.color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <>
      <div 
        className={getEventClasses()}
        onClick={() => setIsOpen(true)}
        style={style}
      >
        <div className="text-xs font-medium">{event.title}</div>
        {event.endTime && (
           <div className="text-[10px] opacity-90">{getTimeDisplay()}</div>
        )}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-md bg-white text-gray-800 rounded-lg shadow-xl border border-gray-300">
          <DialogHeader className={`px-4 py-3 ${getColorForHeader()} text-white`}>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="text-sm">{event.description}</div>
            </div>
            
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>{getTimeDisplay()}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarEvent;
