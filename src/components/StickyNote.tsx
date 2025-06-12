
import React, { useState } from 'react';
import { StickyNote as StickyNoteIcon } from 'lucide-react';

const StickyNote: React.FC = () => {
  const [isBehind, setIsBehind] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsBehind(!isBehind);
  };

  return (
    <div
      className={`fixed left-4 top-20 w-64 h-64 bg-yellow-200 border border-yellow-300 shadow-lg transition-all duration-300 cursor-pointer ${
        isBehind ? 'z-0' : 'z-50'
      } ${isHovered ? 'shadow-xl scale-105' : 'shadow-lg scale-100'}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)',
        fontFamily: 'Marker Felt, fantasy, cursive',
      }}
    >
      {/* Top bar with slight darker yellow */}
      <div className="w-full h-6 bg-yellow-300 bg-opacity-50 border-b border-yellow-400 flex items-center justify-between px-2">
        <StickyNoteIcon className="w-4 h-4 text-yellow-700 opacity-70" />
        <div className="text-xs text-yellow-700 opacity-70">Sticky Note</div>
      </div>
      
      {/* Note content area */}
      <div className="p-4 h-full">
        <div className="text-gray-800 text-sm leading-relaxed">
          <div className="font-medium mb-2">To do:</div>
          <div className="space-y-1 text-xs">
            <div>Land my dream UX job</div>
            <div>Drink water</div>
            <div>Move to the US</div>
            <div>Finish grad school without losing my mind</div>
            <div>Build that banger spotify playlist</div>
            <div>World domination</div>
            <div className="line-through opacity-60">Get really good at making pasta</div>
            <div>Travel somewhere new every year</div>
          </div>
        </div>
      </div>
      
      {/* Corner fold effect */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-300 transform rotate-45 translate-x-3 -translate-y-3 border border-yellow-400"></div>
    </div>
  );
};

export default StickyNote;
