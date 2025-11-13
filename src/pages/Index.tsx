
import React, { useState } from 'react';
import MacWindow from '../components/MacWindow';
import Calendar from '../components/Calendar';
import MacStatusBar from '../components/MacStatusBar';
import MacDock from '../components/MacDock';
import DesktopFolder from '../components/DesktopFolder';
import FolderWindow from '../components/FolderWindow';

const Index: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/15Hld0A1rit7ox5sXsuvtpq2BOqPR_TTT/view?usp=sharing', '_blank');
  };

  return (
      <div className="h-screen w-screen flex flex-col relative" style={{
      background: 'url("/mac wallpaper 6.png")',
    }}>
      <MacStatusBar />

      {/* Desktop Folder - Resume */}
      <DesktopFolder
        title="Resume"
        iconSrc="/App icons/Files1.png"
        position={{ x: 50, y: 80 }}
        onDoubleClick={() => setIsResumeOpen(true)}
      />

      {/* Desktop Folder - Trash */}
      <DesktopFolder
        title="Trash"
        iconSrc="/App icons/TrashFull.png"
        position={{ x: window.innerWidth - 150, y: window.innerHeight - 200 }}
        onDoubleClick={() => setIsTrashOpen(true)}
      />

      {/* Trash Folder Window */}
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

      {/* Resume Folder Window */}
      <FolderWindow
        title="Resume"
        subtitle="Documents"
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      >
        <div className="p-4">
          <div
            className="flex flex-col items-center cursor-pointer group w-24"
            onClick={handleResumeClick}
          >
            <div className="w-16 h-16 mb-1 flex items-center justify-center">
              <img src="/App icons/PDF.png" alt="PDF" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div className="text-[11px] text-center text-gray-800 max-w-full px-1 group-hover:bg-[#007AFF] group-hover:text-white rounded transition-colors">
              Aadya_Resume.pdf
            </div>
          </div>
        </div>
      </FolderWindow>

      <div className="flex-1 min-h-0 flex flex-col w-full p-4 max-w-5xl mx-auto">
        <div className="flex flex-col flex-1 min-h-0">
          <MacWindow title="Calendar">
            <div className="flex-1 min-h-0 overflow-hidden">
              <Calendar />
            </div>
          </MacWindow>
        </div>
      </div>
      <div className="h-20 flex-shrink-0">
        <MacDock />
      </div>
    </div>
  );
};

export default Index;
