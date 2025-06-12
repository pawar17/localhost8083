import React, { useState } from 'react';
import FindMyPopup from './FindMyPopup';
import Gallery from './Gallery';
import CameraApp from './CameraApp';

const MacDock: React.FC = () => {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showFindMy, setShowFindMy] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [message, setMessage] = useState<{ text: string, x: number, y: number } | null>(null);

  const handleOtherAppClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Calculate position for the tooltip to appear above the icon
    // Adjust the y position based on the desired distance above the icon and tooltip height
    // The exact values might need fine-tuning based on the tooltip's rendered size
    setMessage({ text: 'Try Another app ;)', x: rect.left + rect.width / 2, y: rect.top });

    setTimeout(() => {
      setMessage(null);
    }, 2000); // Hide message after 2 seconds
  };

  const dockIcons = [
    {
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/camera.webp" alt="Camera" className="w-full h-full object-contain" />
        </div>
      ),
      name: "Camera",
      onClick: () => {
        setShowCamera(true);
        setShowGallery(false);
        setShowSpotify(false);
        setShowContact(false);
        setShowEmail(false);
        setShowFindMy(false);
      }
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/1.png" alt="Finder" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Finder",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/2.png" alt="Safari" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Safari",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/CwKoPLck9kD8CifRkrpug3socM.png" alt="Email" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Email",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/fm90fwzWoBMCvK5C0MOyKdo94.png" alt="Mail" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Mail",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/gi6dMq8dbjba0LyjZSuySu4X6zg.png" alt="Contact Book" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Contact Book",
      onClick: () => {
        console.log('Contact Book icon clicked, toggling showContact');
        setShowContact(prevShowContact => !prevShowContact);
      }
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/ogWIDEJmWxA8SVRZpEe7gk35FcM.png" alt="Photos" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Photos",
      onClick: () => {
        setShowGallery(true);
        setShowSpotify(false);
        setShowContact(false);
        setShowEmail(false);
        setShowFindMy(false);
      }
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/mjYHu1WKSujuvzAuskfVJSx2w.png" alt="Notes" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Notes",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/NMuItXJj2OKiPiAC2EdivhRPYY.png" alt="Apple TV" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Apple TV",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/Spotify.png" alt="Music" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Music",
      onClick: () => setShowSpotify((prev) => !prev)
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/lwNP7fGxNGl6VSwvqD3AorA1h0.png" alt="Podcasts" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Podcasts",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/pjjxP6KY1Ttnqhuqt9oF3QBfmE.png" alt="App Store" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "App Store",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/qQISGOSSnz748TdrZn91l44R5u0.png" alt="Settings" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Settings",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/VbY44vBZlQp4srNQK6ohxpco.png" alt="Folder" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Folder",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/VeljykK560qBRDkQkYyhx8ChI.png" alt="Trash" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Trash",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/xxKf6tPzYecSWOavDJjUB0MtXw.png" alt="FaceTime" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "FaceTime",
      onClick: handleOtherAppClick
    },
    {
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="./App icons/FindMy.png" alt="Find My" className="w-full h-full object-contain" />
        </div>
      ),
      name: "Find My",
      onClick: () => setShowFindMy((prev) => !prev),
    },
    {
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/LinkedIn.png" alt="LinkedIn" className="w-full h-full object-contain" />
        </div>
      ),
      name: "LinkedIn",
      onClick: () => window.open('https://www.linkedin.com/in/aadyapawar/', '_blank'),
    },
    {
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="./App icons/Pinterest.png" alt="Pinterest" className="w-full h-full object-contain" />
        </div>
      ),
      name: "Pinterest",
      onClick: () => window.open('https://pin.it/2koY5rhiP', '_blank'),
    },
  ];

  return (
    <>
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 mac-dock-container">
        <div className="flex items-end space-x-1 bg-white/20 backdrop-blur-xl py-1 px-2 rounded-2xl border border-white/30 shadow-lg">
          {dockIcons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-mac-pointer cursor-pointer transition-all duration-200 ease-in-out hover:scale-125 hover:-translate-y-2 relative dock-icon-clickable-area"
              onClick={item.onClick}
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-xl shadow-md overflow-hidden">
                {item.icon}
              </div>
              <div className="h-1 w-1 bg-white/60 rounded-full mt-1 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Display Area (Tooltip) */}
      {message && (
        <div
          className="absolute px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-md shadow-lg transform -translate-x-1/2"
          style={{
            top: `${message.y - 40}px`, // Position above the icon (adjust 40 based on desired spacing and tooltip height)
            left: `${message.x}px`, // Center horizontally above the icon
            zIndex: 60, // Ensure it's above the dock
          }}
        >
          {message.text}
          {/* Tooltip pointer */}
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{
            bottom: '-5px', // Position at the bottom of the tooltip
            width: '0',
            height: '0',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #e5e7eb', // Match background color (gray-200)
          }}></div>
        </div>
      )}

      <div className={`fixed left-1/2 bottom-20 transform -translate-x-1/2 z-50 flex flex-col items-center transition-opacity duration-150 ${showSpotify ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}> 
        <button
          className="mb-2 text-gray-200 hover:text-white text-2xl bg-black bg-opacity-40 rounded-full px-3 py-1"
          onClick={() => setShowSpotify(false)}
        >
          &times;
        </button>
        <iframe
          style={{ borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
          src="https://open.spotify.com/embed/playlist/4vLeJq33bOKTUainFnixWo?utm_source=generator"
          width="400"
          height="352"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${showContact ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}> 
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] max-w-full border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-t-2xl border-b border-gray-200">
            <button className="w-3 h-3 rounded-full bg-red-500 border-2 border-red-200 focus:outline-none" onClick={() => setShowContact(false)}></button>
            <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-200"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-200"></span>
          </div>
          <div className="flex flex-col items-center px-6 pt-4 pb-6">
            <img src="./ICON3.png" alt="Aadya Pawar" className="w-24 h-24 object-contain mb-2 mx-auto" />
            <div className="text-lg font-semibold mb-1">Aadya Pawar</div>
            <table className="w-full text-sm mt-2">
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="text-gray-400 py-1 pr-2 text-right w-24">home</td>
                  <td className="text-gray-700 py-1 pl-2 break-all">pawar17@purdue.edu</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="text-gray-400 py-1 pr-2 text-right">birthday</td>
                  <td className="text-gray-700 py-1 pl-2">January 7th</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="text-gray-400 py-1 pr-2 text-right align-top">home</td>
                  <td className="text-gray-700 py-1 pl-2">West Lafayette, IN</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="text-gray-400 py-1 pr-2 text-right align-top">note</td>
                  <td className="text-gray-700 py-1 pl-2">Feel free to reach out :)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showFindMy && <FindMyPopup onClose={() => setShowFindMy(false)} />}
      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed top-16 right-8 z-50" style={{ pointerEvents: 'auto' }}>
          <Gallery onClose={() => setShowGallery(false)} />
        </div>
      )}
      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed top-16 left-8 z-50" style={{ pointerEvents: 'auto' }}>
          <CameraApp onClose={() => setShowCamera(false)} />
        </div>
      )}
    </>
  );
};

export default MacDock;
