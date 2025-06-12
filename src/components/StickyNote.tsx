
import React, { useState } from 'react';

const StickyNote: React.FC = () => {
  const [isBehind, setIsBehind] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsBehind(!isBehind);
  };

  return (
    <div
      className={`fixed left-4 top-20 w-64 h-64 shadow-lg transition-all duration-300 cursor-pointer ${
        isBehind ? 'z-10' : 'z-50'
      } ${isHovered ? 'shadow-xl scale-102' : 'shadow-lg scale-100'}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#fef49c',
        fontFamily: 'Bradley Hand, cursive, fantasy',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '2px',
      }}
    >
      {/* Note content area */}
      <div className="p-3 h-full w-full">
        <div className="text-gray-800 text-sm leading-relaxed h-full">
          <div className="font-medium mb-2 text-base">To do:</div>
          <div className="space-y-1 text-sm">
            <div>• Land my dream UX job</div>
            <div>• Drink water</div>
            <div>• Move to the US</div>
            <div>• Finish grad school without losing my mind</div>
            <div>• Build that banger spotify playlist</div>
            <div>• World domination</div>
            <div className="line-through opacity-60">• Get really good at making pasta</div>
            <div>• Travel somewhere new every year</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
