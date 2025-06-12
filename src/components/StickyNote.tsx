import React, { useState } from 'react';
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json';

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
        <EmojiProvider data={emojiData}>
          <div className="text-gray-800 text-sm leading-relaxed h-full">
            <div className="font-medium mb-3 text-base flex items-center gap-2">
              <Emoji name="waving hand" width={20} />
              Hello & welcome!
              <Emoji name="smiling face with smiling eyes" width={20} />
            </div>
            <div className="space-y-3 text-sm">
              <p className="mb-3">
                Since my calendar is usually jam-packed, it felt right to make a site that resembles the same energy (peep the gallery to see my actual calendar!)<Emoji name="calendar" width={12} style={{ verticalAlign: 'middle', display: 'inline-block' }} />
              </p>
              <p className="mb-3">
                Feel free to click around and play with everything on the site! I had a lot of fun making this website.<Emoji name="glowing star" width={14} style={{ verticalAlign: 'middle', display: 'inline-block' }} />
              </p>
              <p className="mb-3">
                Click on this note to make it disappear
              </p>
              <p className="text-xs mt-4 italic mb-3" style={{ fontSize: '11px' }}>
              <Emoji name="camera" width={13} style={{ verticalAlign: 'middle', display: 'inline-block' }} /> P.S. If you use the camera, you'll need to refresh the page afterward. It's work in progress :)
              </p>
              <p className="mt-4 italic mb-3" style={{ fontSize: '10px' }}>
               This website looks best on computer 
              </p>
            </div>
          </div>
        </EmojiProvider>
      </div>
    </div>
  );
};

export default StickyNote;
