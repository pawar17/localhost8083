
import React, { useState, CSSProperties } from 'react';
import { Clock, MapPin, Bell, Globe, Repeat } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
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
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
        <DialogContent className="p-0 max-w-md bg-white rounded-lg shadow-xl border border-gray-200" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600" onClick={() => setIsOpen(false)}></button>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Edit Event</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <input 
                type="text" 
                value={event.title} 
                readOnly 
                className="w-full text-xl font-medium border-none bg-transparent outline-none focus:ring-0 p-0 text-gray-900"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Location or Video Call</label>
              <input 
                type="text" 
                value={event.location || ''} 
                readOnly 
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                placeholder="Add location"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Calendar</label>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${event.color === 'blue' ? 'bg-blue-500' : event.color === 'green' ? 'bg-green-500' : event.color === 'yellow' ? 'bg-yellow-500' : event.color === 'red' ? 'bg-red-500' : 'bg-purple-500'}`}></div>
                  <span className="text-sm text-gray-900">Home</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">All Day</label>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Starts</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value="06/15/2024" 
                    readOnly 
                    className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                  <input 
                    type="text" 
                    value={event.time} 
                    readOnly 
                    className="w-20 text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Ends</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value="06/15/2024" 
                    readOnly 
                    className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                  <input 
                    type="text" 
                    value={event.endTime || event.time} 
                    readOnly 
                    className="w-20 text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Time Zone</label>
              <input 
                type="text" 
                value="Eastern Daylight Time" 
                readOnly 
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Repeat</label>
              <input 
                type="text" 
                value="Never" 
                readOnly 
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Alert</label>
              <input 
                type="text" 
                value="None" 
                readOnly 
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <div className="text-sm text-gray-700 p-3 border border-gray-300 rounded-md bg-gray-50 min-h-[100px]">
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
            </div>
            
            {/* Special content sections for specific events */}
            {event.id === '1' && (
              <div className="mt-4 strava-embed-container mx-auto">
                <iframe height={160} width={300} frameBorder={0} allowTransparency={true} scrolling="no" src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"></iframe>
              </div>
            )}
            
            {event.id === '4' && (
              <div className="mt-4 text-sm">
                <p className="font-medium mb-2">Learn More:</p>
                <ul className="space-y-1">
                  <li><a href="https://www.google.com/search?q=Innovateher+purdue&sca_esv=905f7b0eae3ddda1&rlz=1C1RXQR_enUS1019US1019&sxsrf=AE3TifPXvPxXGVCI6uhOyVfKq9IzZ4kblQ%3A1748317321739&ei=iTQ1aPvuLPag5NoP4c6KoAs&ved=0ahUKEwi716rH3cKNAxV2EFkFHWGnErQQ4dUDCBA&uact=5&oq=Innovateher+purdue&gs_lp=Egxnd3Mtd2l6LXNlcnAiEklubm92YXRlaGVyIHB1cmR1ZTIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0jRDlCXBljIDXABeAGQAQCYAVWgAecBqgEBM7gBA8gBAPgBAZgCBKAC_QHCAgoQIxiABBgnGIoFwgIFEAAY7wXCAggQABiABBiiBJgDAOIDBRIBMSBAiAYBkAYEkgcBNKAH6QuyBwEzuAf3AcIHAzItNMgHEA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Search Results</a></li>
                  <li><a href="https://www.purdueexponent.org/campus/women-coding-club-to-host-hackathon/article_297d44e4-cb8d-11ee-910a-f397edfebbde.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Purdue Newspaper Article</a></li>
                  <li><a href="https://www.instagram.com/innovateherhacks/?hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Instagram</a></li>
                  <li><a href="https://innovateherhacks.my.canva.site/#contact" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Info Site</a></li>
                </ul>
              </div>
            )}
            
            {event.id === '5' && (
              <div className="mt-4 text-sm">
                <a href="https://github.com/pawar17" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Profile</a>
              </div>
            )}
            
            {event.id === '6' && (
              <div className="mt-4 text-sm space-y-1">
                <p><strong>Certification:</strong> <a href="https://engineering.purdue.edu/Engr/Academics/Undergraduate/certificates/Milestones/Programming_with_Arduino/2024/Spring/lpMR2tC8I_WNEvN5iTTlDw.png/lpMR2tC8I_WNEvN5iTTlDw.png" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Certification</a></p>
                <p><strong>Projects Playlist:</strong> <a href="https://www.youtube.com/playlist?list=PLDjG7BISikRu_m3x5A4Ha9KvuqHsKhPYe" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Watch on YouTube</a></p>
              </div>
            )}
            
            {event.id === '12' && (
              <div className="mt-4 text-sm">
                <a href="https://docs.google.com/document/d/1Ju6e-mVTXWJqo8gsHTJC2ZR7HgV0ixd_/edit?usp=sharing&ouid=100865589809991997614&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Working CV</a>
              </div>
            )}
            
            {event.id === '7' && (
              <div className="mt-4 text-sm">
                <p className="font-medium mb-2">Learn More:</p>
                <ul className="space-y-1">
                  <li><a href="https://www.disability-visibility.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Website</a></li>
                  <li><strong>Media Features:</strong></li>
                  <li><a href="https://www.youtube.com/watch?v=ACmcNJJiRzo" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">YouTube Feature</a></li>
                  <li><a href="https://www.hindustantimes.com/lifestyle/art-culture/are-our-city-eateries-inclusive-101645187672291.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Hindustan Times Article</a></li>
                </ul>
              </div>
            )}
            
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium">
                Delete
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md text-sm font-medium">
                  Save
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarEvent;
