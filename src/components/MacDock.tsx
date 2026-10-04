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
          <img src="./App icons/2.png" alt="Launchpad" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Launchpad",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/CwKoPLck9kD8CifRkrpug3socM.png" alt="Mail" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Mail",
      onClick: () => { window.location.href = 'mailto:aadyapawar7104@gmail.com'; }
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/fm90fwzWoBMCvK5C0MOyKdo94.png" alt="Messages" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Messages",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/gi6dMq8dbjba0LyjZSuySu4X6zg.png" alt="Contacts" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Contacts",
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
          <img src="./App icons/mjYHu1WKSujuvzAuskfVJSx2w.png" alt="App Store" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "App Store",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/NMuItXJj2OKiPiAC2EdivhRPYY.png" alt="Reminders" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Reminders",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/Spotify.png" alt="Spotify" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Spotify",
      onClick: () => setShowSpotify((prev) => !prev)
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/lwNP7fGxNGl6VSwvqD3AorA1h0.png" alt="Documents" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Documents",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/pjjxP6KY1Ttnqhuqt9oF3QBfmE.png" alt="Music" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Music",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/qQISGOSSnz748TdrZn91l44R5u0.png" alt="Safari" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Safari",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/VbY44vBZlQp4srNQK6ohxpco.png" alt="System Settings" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "System Settings",
      onClick: handleOtherAppClick
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="./App icons/VeljykK560qBRDkQkYyhx8ChI.png" alt="Calendar" className="w-full h-full object-contain" />
        </div>
      ), 
      name: "Calendar",
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
        <div className="flex items-end gap-1.5 bg-white/35 backdrop-blur-2xl py-1.5 px-2.5 rounded-[20px] border border-white/50" style={{ boxShadow: '0 10px 30px rgba(70,20,50,0.14), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
          {dockIcons.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center cursor-mac-pointer cursor-pointer relative dock-icon-clickable-area"
              onClick={item.onClick}
              aria-label={item.name}
              role="button"
            >
              <span className="dock-label">{item.name}</span>
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[1.18] group-hover:-translate-y-1.5 origin-bottom">
                {item.icon}
              </div>
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
                  <td className="text-gray-400 py-1 pr-2 text-right w-24">email</td>
                  <td className="text-gray-700 py-1 pl-2 break-all">aadyapawar7104@gmail.com</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="text-gray-400 py-1 pr-2 text-right">birthday</td>
                  <td className="text-gray-700 py-1 pl-2">January 7th</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="text-gray-400 py-1 pr-2 text-right align-top">home</td>
                  <td className="text-gray-700 py-1 pl-2">New York, NY</td>
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
