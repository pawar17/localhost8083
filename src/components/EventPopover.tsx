
import React from 'react';
import { X } from 'lucide-react';
import { EventType } from './CalendarEvent';
import { Checkbox } from "@/components/ui/checkbox";

type EventPopoverProps = {
  event: EventType;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
};

const EventPopover: React.FC<EventPopoverProps> = ({ event, isOpen, onClose, position }) => {
  if (!isOpen) return null;

  const getTimeDisplay = () => {
    if (event.endTime) {
      return `${event.time} – ${event.endTime}`;
    }
    return event.time;
  };

  return (
    <>
      {/* Invisible clickable area to close */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Mac-style window with traffic lights */}
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-300 w-[520px] h-[600px] overflow-hidden"
        style={{
          left: Math.min(position.x - 260, window.innerWidth - 540),
          top: Math.max(position.y - 300, 20),
        }}
      >
        {/* Mac title bar with traffic lights */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
          </div>
          <h3 className="font-medium text-gray-900 text-center flex-1">Edit Event</h3>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
          {/* Event Title */}
          <div>
            <input 
              type="text" 
              value={event.title} 
              readOnly 
              className="w-full text-lg font-medium border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Location */}
          <div>
            <input 
              type="text" 
              placeholder="Location or Video Call"
              value={event.location || ''}
              readOnly
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Calendar Selection */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 w-24">Calendar</span>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <span className="text-sm">Home</span>
              <div className={`w-4 h-4 rounded-full ${
                event.color === 'blue' ? 'bg-blue-500' :
                event.color === 'green' ? 'bg-green-500' :
                event.color === 'yellow' ? 'bg-yellow-500' :
                event.color === 'red' ? 'bg-red-500' :
                'bg-purple-500'
              }`}></div>
            </div>
          </div>
          
          {/* All Day Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 w-24">All Day</span>
            <div className="flex-1 flex justify-end">
              <Checkbox checked={!event.hasTime} />
            </div>
          </div>
          
          {/* Start Time */}
          {event.hasTime && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 w-24">Starts</span>
              <div className="flex gap-3">
                <input 
                  type="date" 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  defaultValue="2025-06-15" 
                />
                <input 
                  type="time" 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  defaultValue={event.time} 
                />
                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          )}
          
          {/* End Time */}
          {event.hasTime && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 w-24">Ends</span>
              <div className="flex gap-3">
                <input 
                  type="date" 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  defaultValue="2025-06-15" 
                />
                <input 
                  type="time" 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  defaultValue={event.endTime || event.time} 
                />
                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Repeat */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 w-24">Repeat</span>
            <div className="flex-1 flex justify-end">
              <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Never</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          
          {/* Alert */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 w-24">Alert</span>
            <div className="flex-1 flex justify-end">
              <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>None</option>
                <option>5 minutes before</option>
                <option>15 minutes before</option>
                <option>30 minutes before</option>
                <option>1 hour before</option>
              </select>
            </div>
          </div>
          
          {/* Invitees */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 w-24">Invitees</span>
            <div className="flex-1 flex justify-end">
              <button className="text-sm text-red-500 hover:text-red-600 text-2xl leading-none">+</button>
            </div>
          </div>
          
          {/* Attachments */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 w-24">Attachments</span>
            <div className="flex-1 flex justify-end">
              <button className="text-sm text-red-500 hover:text-red-600 text-2xl leading-none">+</button>
            </div>
          </div>
          
          {/* URL */}
          <div>
            <input 
              type="text" 
              placeholder="URL"
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Notes */}
          <div>
            <textarea 
              placeholder="Notes"
              value={event.description}
              readOnly
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <button className="text-sm text-red-500 hover:bg-red-50 px-4 py-2 rounded-md transition-colors">
            Delete
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="text-sm text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button className="text-sm bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPopover;
