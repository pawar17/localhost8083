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
        className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-300 w-[480px] h-[520px] overflow-hidden"
        style={{
          left: Math.min(position.x - 240, window.innerWidth - 500),
          top: Math.max(position.y - 260, 20),
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
          {/* Notes/Description (moved up) */}
          {event.description && (
          <div>
              <div className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-line">
                {(() => {
                  // Go on a run: Strava embed
                  if (event.id === '1') {
                    return (
                      <>
                        <div>{event.description}</div>
                        <div className="mt-4 strava-embed-container mx-auto">
                          <iframe height={160} width={300} frameBorder={0} allowTransparency={true} scrolling="no" src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"></iframe>
                        </div>
                      </>
                    );
                  }
                  // InnovateHer Meeting: resource links
                  if (event.id === '4') {
                    return (
                      <>
                        <div>{event.description.split('\n')[0]}</div>
                        <ul className="list-disc list-inside mt-1">
                          {event.description.split('\n').slice(1).filter(line => line.startsWith('- ')).map((line, index) => {
                            const cleanItem = line.substring(2);
                            return <li key={index}>{cleanItem}</li>;
                          })}
                        </ul>
                        <div className="mt-4 text-sm">
                          <p>Learn More:</p>
                          <ul>
                            <li><a href="https://www.google.com/search?q=Innovateher+purdue&sca_esv=905f7b0eae3ddda1&rlz=1C1RXQR_enUS1019US1019&sxsrf=AE3TifPXvPxXGVCI6uhOyVfKq9IzZ4kblQ%3A1748317321739&ei=iTQ1aPvuLPag5NoP4c6KoAs&ved=0ahUKEwi716rH3cKNAxV2EFkFHWGnErQQ4dUDCBA&uact=5&oq=Innovateher+purdue&gs_lp=Egxnd3Mtd2l6LXNlcnAiEklubm92YXRlaGVyIHB1cmR1ZTIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0jRDlCXBljIDXABeAGQAQCYAVWgAecBqgEBM7gBA8gBAPgBAZgCBKAC_QHCAgoQIxiABBgnGIoFwgIFEAAY7wXCAggQABiABBiiBJgDAOIDBRIBMSBAiAYBkAYEkgcBNKAH6QuyBwEzuAf3AcIHAzItNMgHEA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" className="text-pink-500">Google Search Results</a></li>
                            <li><a href="https://www.purdueexponent.org/campus/women-coding-club-to-host-hackathon/article_297d44e4-cb8d-11ee-910a-f397edfebbde.html" target="_blank" rel="noopener noreferrer" className="text-pink-500">Purdue Newspaper Article</a></li>
                            <li><a href="https://www.instagram.com/innovateherhacks/?hl=en" target="_blank" rel="noopener noreferrer" className="text-pink-500">Instagram</a></li>
                            <li><a href="https://innovateherhacks.my.canva.site/#contact" target="_blank" rel="noopener noreferrer" className="text-pink-500">Info Site</a></li>
                          </ul>
                        </div>
                      </>
                    );
                  }
                  // Update GitHub: GitHub link
                  if (event.id === '5') {
                    return (
                      <>
                        <div>{event.description}</div>
                        <div className="mt-4 text-sm">
                          <a href="https://github.com/pawar17" target="_blank" rel="noopener noreferrer" className="text-pink-500">View Profile</a>
                        </div>
                      </>
                    );
                  }
                  // Arduino Projects: Certification and YouTube
                  if (event.id === '6') {
                    return (
                      <>
                        <div>{event.description}</div>
                        <div className="mt-4 text-sm">
                          <p>Certification: <a href="https://engineering.purdue.edu/Engr/Academics/Undergraduate/certificates/Milestones/Programming_with_Arduino/2024/Spring/lpMR2tC8I_WNEvN5iTTlDw.png/lpMR2tC8I_WNEvN5iTTlDw.png" target="_blank" rel="noopener noreferrer" className="text-pink-500">View Certification</a></p>
                          <p>Projects Playlist: <a href="https://www.youtube.com/playlist?list=PLDjG7BISikRu_m3x5A4Ha9KvuqHsKhPYe" target="_blank" rel="noopener noreferrer" className="text-pink-500">Watch on YouTube</a></p>
                        </div>
                      </>
                    );
                  }
                  // Disability Visibility India: Website and media
                  if (event.id === '7') {
                    return (
                      <>
                        <div>{event.description}</div>
                        <div className="mt-4 text-sm">
                          <p>Learn More:</p>
                          <ul>
                            <li><a href="https://www.disability-visibility.com/" target="_blank" rel="noopener noreferrer" className="text-pink-500">Website</a></li>
                            <li><p>Media Features:</p></li>
                            <li><a href="https://www.youtube.com/watch?v=ACmcNJJiRzo" target="_blank" rel="noopener noreferrer" className="text-pink-500">YouTube Feature</a></li>
                            <li><a href="https://www.hindustantimes.com/lifestyle/art-culture/are-our-city-eateries-inclusive-101645187672291.html" target="_blank" rel="noopener noreferrer" className="text-pink-500">Hindustan Times Article</a></li>
                          </ul>
                        </div>
                      </>
                    );
                  }
                  // Edit resume: Resume link
                  if (event.id === '12') {
                    return (
                      <>
                        <div>{event.description}</div>
                        <div className="mt-4 text-sm">
                          <a href="https://docs.google.com/document/d/1Ju6e-mVTXWJqo8gsHTJC2ZR7HgV0ixd_/edit?usp=sharing&ouid=100865589809991997614&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-blue-500">View Working CV</a>
                        </div>
                      </>
                    );
                  }
                  // Default: just show description
                  return <div>{event.description}</div>;
                })()}
              </div>
          </div>
          )}
          
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
        </div>
        
        {/* Footer with actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div>
            {/* Delete button (example) */}
            <button
              className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              onClick={onClose}
            >
              Delete Event
            </button>
          </div>
          <div className="flex gap-2">
            {/* Cancel button */}
            <button
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            {/* Save button */}
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
              onClick={onClose}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPopover;
