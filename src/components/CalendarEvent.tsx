
import React, { useState, CSSProperties } from 'react';
import { Clock, MapPin, Bell, Globe, Repeat } from 'lucide-react';
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
  
  return (
    <>
      <div 
        className={getEventClasses()}
        onClick={event.isExpandable ? () => setIsOpen(true) : undefined}
        style={{
          ...style,
          cursor: event.isExpandable ? 'url(/cursors/cursor2.png), pointer' : 'url(/cursors/cursor1.png), auto'
        }}
      >
        <div className="text-xs font-medium">{event.title}</div>
        {event.time && <div className="text-xs">{getTimeDisplay()}</div>}
        {event.location && <div className="text-xs truncate">{event.location}</div>}
      </div>
      
      {/* Custom Mac-style drawer */}
      {isOpen && (
        <>
          {/* Invisible clickable area to close */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer panel */}
          <div 
            className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-gray-200 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ maxHeight: '100vh', overflowY: 'auto' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <button 
                    className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  ></button>
                  <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <div className="flex text-sm">
                  <button className="px-3 py-1 rounded hover:bg-gray-200 transition-colors">Event</button>
                  <button className="px-3 py-1 rounded bg-gray-300">Reminder</button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <input 
                  type="text" 
                  value={event.title} 
                  readOnly 
                  className="w-full text-lg font-medium border-none bg-transparent outline-none focus:ring-0 p-0 mb-2"
                />
                <div className="text-sm text-gray-500 mb-2">Notes</div>
                <div className="text-sm text-gray-700 min-h-[100px] p-3 bg-gray-50 rounded-md">
                  {event.id === '8' ? (
                    <div>
                      {event.description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? 'mt-2' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : event.id === '11' ? (
                    <ul className="list-disc list-inside">
                      {event.description.split('\n').map((item, index) => {
                        const cleanItem = item.startsWith('- ') ? item.substring(2) : item;
                        return <li key={index}>{cleanItem}</li>;
                      })}
                    </ul>
                  ) : event.id === '13' ? (
                    <div>
                      {event.description.split('\n\n').map((jobBlock, jobIndex) => {
                        const lines = jobBlock.split('\n');
                        const locationAndRole = lines[0];
                        const titleAndDates = lines[1];
                        const descriptionPoints = lines.slice(2).filter(line => line.trim() !== '');

                        return (
                          <div key={jobIndex} className={jobIndex > 0 ? 'mt-4' : ''}>
                            <p><strong className="font-medium">{locationAndRole}</strong></p>
                            <p className="text-sm text-gray-600">{titleAndDates}</p>
                            {descriptionPoints.length > 0 && (
                              <ul className="list-disc list-inside mt-1">
                                {descriptionPoints.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : event.id === '14' ? (
                    <ul className="list-disc list-inside">
                      {event.description.split('\n\n').map((project, index, arr) => {
                        const parts = project.split(': ', 2);
                        const title = parts[0];
                        const description = parts.length > 1 ? parts[1] : '';
                        return (
                          <li key={index} style={{ marginBottom: index < arr.length - 1 ? '0.5rem' : '0' }}>
                            <strong className="font-medium">{title}:</strong> {description}
                          </li>
                        );
                      })}
                    </ul>
                  ) : event.id === '4' ? (
                    <div>
                      {event.description.split('\n').map((line, index, arr) => {
                         if (index === 0) {
                          return <p key={index}>{line}</p>;
                         } else if (line.startsWith('- ')) {
                           return null;
                         }
                         return null;
                      })}
                      <ul className="list-disc list-inside mt-1">
                        {event.description.split('\n').slice(1).filter(line => line.startsWith('- ')).map((line, index) => {
                           const cleanItem = line.substring(2);
                           return <li key={index}>{cleanItem}</li>;
                        })}
                      </ul>
                    </div>
                  ) : (
                    event.description
                  )}
                </div>
                
                {/* Additional content sections for specific events */}
                {event.id === '1' && (
                  <div className="mt-4 strava-embed-container mx-auto">
                    <iframe height={160} width={300} frameBorder={0} allowTransparency={true} scrolling="no" src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"></iframe>
                  </div>
                )}
                {event.id === '4' && (
                  <div className="mt-4 text-sm">
                    <p>Learn More:</p>
                    <ul>
                      <li><a href="https://www.google.com/search?q=Innovateher+purdue&sca_esv=905f7b0eae3ddda1&rlz=1C1RXQR_enUS1019US1019&sxsrf=AE3TifPXvPxXGVCI6uhOyVfKq9IzZ4kblQ%3A1748317321739&ei=iTQ1aPvuLPag5NoP4c6KoAs&ved=0ahUKEwi716rH3cKNAxV2EFkFHWGnErQQ4dUDCBA&uact=5&oq=Innovateher+purdue&gs_lp=Egxnd3Mtd2l6LXNlcnAiEklubm92YXRlaGVyIHB1cmR1ZTIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0jRDlCXBljIDXABeAGQAQCYAVWgAecBqgEBM7gBA8gBAPgBAZgCBKAC_QHCAgoQIxiABBgnGIoFwgIFEAAY7wXCAggQABiABBiiBJgDAOIDBRIBMSBAiAYBkAYEkgcBNKAH6QuyBwEzuAf3AcIHAzItNMgHEA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" className="text-pink-500">Google Search Results</a></li>
                      <li><a href="https://www.purdueexponent.org/campus/women-coding-club-to-host-hackathon/article_297d44e4-cb8d-11ee-910a-f397edfebbde.html" target="_blank" rel="noopener noreferrer" className="text-pink-500">Purdue Newspaper Article</a></li>
                      <li><a href="https://www.instagram.com/innovateherhacks/?hl=en" target="_blank" rel="noopener noreferrer" className="text-pink-500">Instagram</a></li>
                      <li><a href="https://innovateherhacks.my.canva.site/#contact" target="_blank" rel="noopener noreferrer" className="text-pink-500">Info Site</a></li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">remind me</div>
                    <div className="text-sm">On a Day</div>
                  </div>
                  <div className="flex items-center justify-between pl-4">
                    <div className="w-4"></div>
                    <div className="text-sm">06/15/2024</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Checkbox checked={true} />
                    </div>
                    <div className="text-sm text-gray-600">At a Time</div>
                  </div>
                  <div className="flex items-center justify-between pl-4">
                    <div className="w-4"></div>
                    <div className="text-sm">{getTimeDisplay()}</div>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">At a Location</div>
                      <div className="text-sm">{event.location}</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">When Messaging a Person</div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">early reminder</div>
                      <div className="text-sm">None</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">repeat</div>
                      <div className="text-sm">Never</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">priority</div>
                      <div className="text-sm">None</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">list</div>
                      <div className="text-sm">Errands</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">URL</div>
                      <div className="text-sm">None</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">images</div>
                      <div className="text-sm text-blue-500">+ Add image...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CalendarEvent;
