
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
      
      {/* Popover */}
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -100%)',
          marginTop: '-8px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Edit Event</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-3 space-y-3">
          <input 
            type="text" 
            value={event.title} 
            readOnly 
            className="w-full text-sm font-medium border border-gray-200 rounded px-2 py-1"
          />
          
          <input 
            type="text" 
            placeholder="Location or Video Call"
            value={event.location || ''}
            readOnly
            className="w-full text-sm border border-gray-200 rounded px-2 py-1"
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Calendar</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">Home</span>
              <div className={`w-3 h-3 rounded-full ${
                event.color === 'blue' ? 'bg-blue-500' :
                event.color === 'green' ? 'bg-green-500' :
                event.color === 'yellow' ? 'bg-yellow-500' :
                event.color === 'red' ? 'bg-red-500' :
                'bg-purple-500'
              }`}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">All Day</span>
            <Checkbox checked={!event.hasTime} />
          </div>
          
          {event.hasTime && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Starts</span>
                <div className="flex gap-2">
                  <input type="date" className="text-xs border border-gray-200 rounded px-1" defaultValue="2025-06-15" />
                  <input type="time" className="text-xs border border-gray-200 rounded px-1" defaultValue={event.time} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ends</span>
                <div className="flex gap-2">
                  <input type="date" className="text-xs border border-gray-200 rounded px-1" defaultValue="2025-06-15" />
                  <input type="time" className="text-xs border border-gray-200 rounded px-1" defaultValue={event.endTime || event.time} />
                </div>
              </div>
            </>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Repeat</span>
            <span className="text-sm">Never</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Alert</span>
            <span className="text-sm">None</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Invitees</span>
            <button className="text-sm text-red-500">+</button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Attachments</span>
            <button className="text-sm text-red-500">+</button>
          </div>
          
          <input 
            type="text" 
            placeholder="URL"
            className="w-full text-sm border border-gray-200 rounded px-2 py-1"
          />
          
          <textarea 
            placeholder="Notes"
            value={event.description}
            readOnly
            className="w-full text-sm border border-gray-200 rounded px-2 py-1 h-16 resize-none"
          />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-gray-200">
          <button className="text-sm text-red-500 hover:bg-red-50 px-3 py-1 rounded">
            Delete
          </button>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="text-sm text-gray-600 hover:bg-gray-100 px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button className="text-sm bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPopover;
