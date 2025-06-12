
import React, { useState } from 'react';

const StickyNote: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed left-4 top-20 w-72 h-80 shadow-lg transition-all duration-300 cursor-pointer z-50 ${
        isHovered ? 'shadow-xl scale-105 -rotate-1' : 'shadow-lg scale-100 rotate-0'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#fef49c',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '6px',
      }}
    >
      {/* Note content area */}
      <div className="p-4 h-full w-full">
        <div className="text-gray-800 text-sm leading-relaxed h-full">
          <div className="font-medium mb-3 text-base">Hello & welcome!</div>
          <div className="space-y-3 text-sm">
            <p>I had a lot of fun making this website. Since my calendar is usually jam-packed, it felt right to make a site that resembles the same energy (peep the gallery to see my actual calendar!)</p>
            <p>Feel free to click around and play with everything on the site!</p>
            <p className="font-medium">Quick Note:</p>
            <p>This website looks best on a desktop computer.</p>
            <p className="text-xs mt-4 italic">P.S. If you use the camera, you'll need to refresh the page afterward. It's work in progress :)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
