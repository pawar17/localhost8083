import React, { useState } from 'react';

interface DesktopFolderProps {
  title: string;
  iconSrc?: string;
  position: { x: number; y: number };
  onDoubleClick: () => void;
}

const DesktopFolder: React.FC<DesktopFolderProps> = ({
  title,
  iconSrc = 'App icons/files1.png',
  position,
  onDoubleClick
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onClick={onDoubleClick}
    >
      <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110">
        <img src={iconSrc} alt={title} className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      <div className="mt-1 text-[11px] font-medium text-gray-800 text-center max-w-[100px] truncate">
        {title}
      </div>
    </div>
  );
};

export default DesktopFolder;
