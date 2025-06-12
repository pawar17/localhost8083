
import React, { useState } from 'react';

const StickyNote: React.FC = () => {
  const [isBehind, setIsBehind] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsBehind(!isBehind);
  };

  return (
    <div
      className={`fixed left-4 top-20 w-64 h-64 bg-yellow-200 shadow-lg transition-all duration-300 cursor-pointer ${
        isBehind ? 'z-10' : 'z-50'
      } ${isHovered ? 'shadow-xl scale-105' : 'shadow-lg scale-100'}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#fef49c',
        fontFamily: 'Bradley Hand, cursive, fantasy',
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* Note content area */}
      <div className="p-4 h-full w-full">
        <div className="text-gray-800 text-base leading-relaxed h-full">
          <div className="font-medium mb-3 text-lg">To do:</div>
          <div className="space-y-2 text-sm">
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
