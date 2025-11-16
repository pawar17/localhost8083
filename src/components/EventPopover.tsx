import React, { useState } from 'react';
import { EventType } from './CalendarEvent';
import TextFileViewer from './TextFileViewer';

type EventPopoverProps = {
  event: EventType;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
};

const EventPopover: React.FC<EventPopoverProps> = ({ event, isOpen, onClose, position }) => {
  const [isTextFileOpen, setIsTextFileOpen] = useState(false);
  const [textFilePath, setTextFilePath] = useState('');
  const [textFileName, setTextFileName] = useState('');
  
  const handleAttachmentClick = (filePath: string, fileName: string) => {
    setTextFilePath(filePath);
    setTextFileName(fileName);
    setIsTextFileOpen(true);
  };
  
  if (!isOpen) return null;

  return (
    <>
      {/* Invisible clickable area to close */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Mac-style window */}
      <div
        className="fixed z-50 bg-white rounded-[10px] w-[420px] overflow-hidden"
        style={{
          left: Math.min(position.x - 210, window.innerWidth - 440),
          top: Math.max(position.y - 260, 20),
          boxShadow: '0 22px 70px 4px rgba(0, 0, 0, 0.56)'
        }}
      >
        {/* Mac title bar with traffic lights */}
        <div className="flex items-center px-3 py-2.5 bg-white">
          <div className="flex items-center gap-[7px]">
            <button
              onClick={onClose}
              className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] hover:bg-[#FF4136] transition-colors"
            />
            <button className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] hover:bg-[#FFAA00] transition-colors" />
            <button className="w-[12px] h-[12px] rounded-full bg-[#28CA42] hover:bg-[#00D924] transition-colors" />
          </div>
          <h3 className="absolute left-1/2 transform -translate-x-1/2 text-[13px] font-semibold text-[#000]">Edit Event</h3>
        </div>

        {/* Content */}
        <div className="max-h-[500px] overflow-y-auto bg-[#fafafa]">
          {/* Event Title */}
          <div className="px-3 pt-3 pb-2 bg-white">
            <input
              type="text"
              value={event.title}
              readOnly
              className="w-full text-[13px] font-normal border border-[#d1d1d6] rounded-[5px] px-2.5 py-1.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
            />
          </div>

          {/* Notes/Description */}
          {(event.description || event.id === '1') && (
          <div className="px-3 pb-2 bg-white">
              <div className="w-full text-[13px] border border-[#d1d1d6] rounded-[5px] px-2.5 py-1.5 bg-white text-gray-700 min-h-[60px] max-h-[100px] overflow-y-auto">
                {(() => {
                  // Go on a run: Strava embed
                  if (event.id === '1') {
                    return (
                      <div className="strava-embed-container mx-auto">
                        <iframe height={160} width={300} frameBorder={0} allowTransparency={true} scrolling="no" src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"></iframe>
                      </div>
                    );
                  }
                  // InnovateHer Meeting: just show description
                  if (event.id === '4') {
                    return <div>{event.description}</div>;
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
                  // Disability Visibility India: just show description
                  if (event.id === '7') {
                    return <div>{event.description}</div>;
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
                  // Technical Projects: just show description
                  if (event.id === '14') {
                    return <div>{event.description}</div>;
                  }
                  // Certifications: just show description
                  if (event.id === '11') {
                    return <div>{event.description}</div>;
                  }
                  // Research Project: just show description
                  if (event.id === '8') {
                    return <div>{event.description}</div>;
                  }
                  // On campus job: just show description
                  if (event.id === '13') {
                    return <div>{event.description}</div>;
                  }
                  // Default: just show description
                  return <div>{event.description}</div>;
                })()}
              </div>
          </div>
          )}

          {/* Field rows - light gray background */}
          <div className="bg-[#fafafa] pt-2">
            {/* Calendar Selection */}
            <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
              <span className="text-[13px] text-gray-600">Calendar</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-900">Home</span>
                <div className={`w-2 h-2 rounded-full ${
                  event.color === 'blue' ? 'bg-[#007AFF]' :
                  event.color === 'green' ? 'bg-[#34C759]' :
                  event.color === 'yellow' ? 'bg-[#FFCC00]' :
                  event.color === 'red' ? 'bg-[#FF3B30]' :
                  'bg-[#AF52DE]'
                }`}></div>
                <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
              <span className="text-[13px] text-gray-600">All Day</span>
              <div className={`w-10 h-[22px] rounded-full transition-colors ${!event.hasTime ? 'bg-[#34C759]' : 'bg-[#d1d1d6]'} relative cursor-pointer flex items-center`}>
                <div className={`absolute ${!event.hasTime ? 'right-[2px]' : 'left-[2px]'} w-[18px] h-[18px] bg-white rounded-full transition-all shadow-sm`}></div>
              </div>
            </div>

            {/* Starts */}
            {event.hasTime && (
              <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
                <span className="text-[13px] text-gray-600">Starts</span>
                <div className="flex items-center gap-2 text-[13px] text-gray-900">
                  <span>10/23/2025</span>
                  <span>07:45</span>
                  <span>PM</span>
                  <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Ends */}
            {event.hasTime && (
              <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
                <span className="text-[13px] text-gray-600">Ends</span>
                <div className="flex items-center gap-2 text-[13px] text-gray-900">
                  <span>10/23/2025</span>
                  <span>08:45</span>
                  <span>PM</span>
                  <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Time Zone */}
            {event.hasTime && (
              <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
                <span className="text-[13px] text-gray-600">Time Zone</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-gray-900">UTC</span>
                  <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Repeat */}
            <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
              <span className="text-[13px] text-gray-600">Repeat</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-900">Never</span>
                <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Alert */}
            <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
              <span className="text-[13px] text-gray-600">Alert</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-900">15 minutes before</span>
                <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* 2nd Alert */}
            <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
              <span className="text-[13px] text-gray-600">2nd Alert</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-900">None</span>
                <svg className="w-2 h-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Invitees */}
            <div className="flex items-center justify-between px-3 py-2 bg-white mb-[1px]">
              <span className="text-[13px] text-gray-600">Invitees</span>
              <button className="text-[#FF3B30] text-base font-normal leading-none">+</button>
            </div>

            {/* Attachments */}
            <div className="px-3 py-2 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-gray-500">Attachments</span>
                <button className="text-[#FF3B30] text-base font-normal leading-none">+</button>
              </div>
              {event.id === '14' && (
                <div className="flex items-center justify-between py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/technical-projects.txt', 'technical-projects.txt')}>
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">technical-projects.txt</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {event.id === '11' && (
                <div className="flex items-center justify-between py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/certifications.txt', 'certifications.txt')}>
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">certifications.txt</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {event.id === '8' && (
                <div className="flex items-center justify-between py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/research-projects.txt', 'research-projects.txt')}>
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">research-projects.txt</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {event.id === '13' && (
                <div className="flex items-center justify-between py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/on-campus-jobs.txt', 'on-campus-jobs.txt')}>
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">on-campus-jobs.txt</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {event.id === '4' && (
                <div className="flex items-center justify-between py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/innovateher.txt', 'innovateher.txt')}>
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">innovateher.txt</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {event.id === '7' && (
                <div className="flex items-center justify-between py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer group" onClick={() => handleAttachmentClick('/disability-visibility-india.txt', 'disability-visibility-india.txt')}>
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">disability-visibility-india.txt</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l6 6m0-6l-6 6" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with actions */}
        <div className="px-3 py-2.5 bg-white flex justify-between items-center">
          <button
            className="px-4 py-1 rounded-[5px] bg-[#FF3B30] text-white text-[13px] font-medium hover:bg-[#E6322E] transition-colors"
            onClick={onClose}
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              className="px-4 py-1 rounded-[5px] bg-[#e5e5e5] text-gray-800 text-[13px] font-medium hover:bg-[#d5d5d5] transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 rounded-[5px] bg-[#FFB3D9] text-white text-[13px] font-medium hover:bg-[#FF9ACF] transition-colors"
              onClick={onClose}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      {/* Text File Viewer */}
      {textFilePath && (
        <TextFileViewer
          filePath={textFilePath}
          fileName={textFileName}
          isOpen={isTextFileOpen}
          onClose={() => {
            setIsTextFileOpen(false);
            setTextFilePath('');
            setTextFileName('');
          }}
        />
      )}
    </>
  );
};

export default EventPopover;
