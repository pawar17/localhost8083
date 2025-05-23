
import React, { useState } from 'react';
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
};

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getEventClasses = () => {
    let colorClasses = '';
    
    switch(event.color) {
      case 'blue': // Personal activities
        colorClasses = 'bg-blue-900 border border-blue-400 text-blue-300';
        break;
      case 'green': // Work/Technical
        colorClasses = 'bg-green-900 border border-green-400 text-green-300';
        break;
      case 'yellow': // Research/Learning
        colorClasses = 'bg-yellow-900 border border-yellow-400 text-yellow-300';
        break;
      case 'red': // Meetings/Organizations
        colorClasses = 'bg-red-900 border border-red-400 text-red-300';
        break;
      case 'purple': // Career Development
        colorClasses = 'bg-purple-900 border border-purple-400 text-purple-300';
        break;
      default:
        colorClasses = 'bg-blue-900 border border-blue-400 text-blue-300';
    }
    
    return `rounded-sm px-1 py-1 mb-1 ${colorClasses} overflow-hidden text-ellipsis w-[95%] mx-auto cursor-mac-pointer`;
  };
  
  const getTimeDisplay = () => {
    if (event.endTime) {
      return `${event.time} – ${event.endTime}`;
    }
    return event.time;
  };
  
  const getColorForHeader = () => {
    switch(event.color) {
      case 'blue': return 'bg-blue-800';
      case 'green': return 'bg-green-800';
      case 'yellow': return 'bg-yellow-800';
      case 'red': return 'bg-red-800';
      case 'purple': return 'bg-purple-800';
      default: return 'bg-gray-800';
    }
  };
  
  return (
    <>
      <div 
        className={getEventClasses()}
        onClick={() => setIsOpen(true)}
      >
        <div className="text-xs font-medium">{event.title}</div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-md bg-gray-900 text-blue-100 rounded-lg shadow-xl border border-blue-400">
          <DialogHeader className={`px-4 py-3 ${getColorForHeader()}`}>
            <DialogTitle>{event.title}</DialogTitle>
            <div className="text-sm opacity-75">{getTimeDisplay()}</div>
          </DialogHeader>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="text-sm">{event.description}</div>
            </div>
            
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-blue-300">
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
