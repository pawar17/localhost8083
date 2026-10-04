import React, { useState } from 'react';
import CalendarApp from '../components/calendar/CalendarApp';
import MacStatusBar from '../components/MacStatusBar';
import MacDock from '../components/MacDock';
import DesktopFolder from '../components/DesktopFolder';
import FolderWindow from '../components/FolderWindow';
import { RESUME_URL } from '@/data/portfolio';

const Index: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  return (
    <div className="desktop h-screen w-screen relative overflow-hidden">
      <MacStatusBar />

      <div className="absolute right-6 top-[52px] flex flex-col gap-5 items-center">
        <DesktopFolder
          title="Resume"
          iconSrc="/App icons/Files1.png"
          onOpen={() => setIsResumeOpen(true)}
        />
        <DesktopFolder
          title="Trash"
          iconSrc="/App icons/TrashFull.png"
          onOpen={() => setIsTrashOpen(true)}
        />
      </div>

      <FolderWindow
        title="Trash"
        subtitle="0 items"
        isOpen={isTrashOpen}
        onClose={() => setIsTrashOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-gray-500 text-[13px]">No items in Trash</div>
        </div>
      </FolderWindow>

      <FolderWindow
        title="Resume"
        subtitle="Documents"
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      >
        <div className="p-4">
          <button
            className="flex flex-col items-center group w-24"
            onClick={() => window.open(RESUME_URL, '_blank')}
          >
            <div className="w-16 h-16 mb-1 flex items-center justify-center">
              <img src="/App icons/PDF.png" alt="" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div className="text-[11px] text-center text-gray-800 max-w-full px-1 group-hover:bg-[#007AFF] group-hover:text-white rounded transition-colors">
              Aadya_Resume.pdf
            </div>
          </button>
        </div>
      </FolderWindow>

      <div className="calendar-window">
        <CalendarApp />
      </div>

      <MacDock />
    </div>
  );
};

export default Index;
