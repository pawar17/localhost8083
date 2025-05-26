
import React, { useState } from 'react';
import { Clock, MapPin, Bell, Globe, Repeat } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

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
        className={`${getEventClasses()} ${event.isExpandable ? 'cursor-mac-pointer' : ''}`}
        onClick={event.isExpandable ? () => setIsOpen(true) : undefined}
        style={style}
      >
        <div className="text-xs font-medium">{event.title}</div>
        {event.time && <div className="text-xs">{getTimeDisplay()}</div>}
        {event.location && <div className="text-xs truncate">{event.location}</div>}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-md bg-gray-50 rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-100 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
              </div>
              <div className="flex text-sm">
                <button className="px-2 py-1 rounded hover:bg-gray-200 transition-colors">Event</button>
                <button className="px-2 py-1 rounded bg-gray-300">Reminder</button>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <input 
                type="text" 
                value={event.title} 
                readOnly 
                className="w-full text-lg font-medium border-none bg-transparent outline-none focus:ring-0 p-0"
              />
              <div className="text-sm text-gray-500 mt-1">Notes</div>
              <div className="text-sm text-gray-700 mt-1">{event.description}</div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between py-1">
                <div className="text-sm text-gray-600">remind me</div>
                <div className="text-sm">On a Day</div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="w-4"></div>
                <div className="text-sm">06/15/2024</div>
              </div>
              <div className="flex items-center py-1">
                <div className="mr-2">
                  <Checkbox checked={true} />
                </div>
                <div className="text-sm text-gray-600">At a Time</div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="w-4"></div>
                <div className="text-sm">{getTimeDisplay()}</div>
              </div>
              
              {event.location && (
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">At a Location</div>
                  <div className="text-sm">{event.location}</div>
                </div>
              )}
              
              <div className="flex items-center justify-between py-1">
                <div className="text-sm text-gray-600">When Messaging a Person</div>
              </div>
              
              <div className="mt-2">
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">early reminder</div>
                  <div className="text-sm">None</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">repeat</div>
                  <div className="text-sm">Never</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">priority</div>
                  <div className="text-sm">None</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">list</div>
                  <div className="text-sm">Errands</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">URL</div>
                  <div className="text-sm">None</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">images</div>
                  <div className="text-sm text-blue-500">+ Add image...</div>
                </div>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarEvent;
