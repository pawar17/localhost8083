
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
    
    return `rounded-md px-2 py-1 mb-1 ${colorClasses} overflow-hidden text-ellipsis w-[95%] mx-auto cursor-mac-pointer`;
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
      >
        <div className="text-xs font-medium">{event.title}</div>
        {event.time && <div className="text-xs">{getTimeDisplay()}</div>}
        {event.location && <div className="text-xs truncate">{event.location}</div>}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-md">
          <div className={`h-2 ${getColorForHeader()} rounded-t-lg w-full`}></div>
          <DialogHeader className="px-4 pt-4 pb-0">
            <DialogTitle className="text-xl font-medium">{event.title}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                {getTimeDisplay()}
              </div>
              {event.location && (
                <div className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarEvent;
