
import React from 'react';

const MacDock: React.FC = () => {
  const dockIcons = [
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-white flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-white opacity-90"></div>
            <div className="w-7 h-7 bg-white z-10 mask-finder"></div>
          </div>
        </div>
      ), 
      name: "Finder"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-600"></div>
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-5 h-5 text-white font-bold">N</div>
              </div>
            </div>
          </div>
        </div>
      ), 
      name: "Safari"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-600 opacity-90"></div>
            <div className="w-7 h-7 bg-white rounded-xl z-10"></div>
          </div>
        </div>
      ), 
      name: "Messages"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700"></div>
            <div className="w-7 h-5 bg-white z-10 rounded-sm transform rotate-12"></div>
          </div>
        </div>
      ), 
      name: "Mail"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-red-500 to-red-600 flex flex-col items-center justify-start relative">
            <div className="w-full h-1/3 bg-red-500 flex items-center justify-center text-white font-bold text-xs">
              JUL
            </div>
            <div className="w-full h-2/3 bg-white flex items-center justify-center text-black font-bold text-xl">
              17
            </div>
          </div>
        </div>
      ), 
      name: "Calendar"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 via-pink-400 to-pink-600 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tl from-indigo-400 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>
      ), 
      name: "Photos"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-yellow-100 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-200"></div>
            <div className="w-8 h-6 bg-yellow-100 z-10 border-b border-yellow-300 flex flex-col justify-center">
              <div className="w-full h-px bg-yellow-400 mb-1"></div>
              <div className="w-full h-px bg-yellow-400"></div>
            </div>
          </div>
        </div>
      ), 
      name: "Notes"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center relative">
            <div className="text-white font-bold flex items-center">
              <span className="text-xs">tv</span>
            </div>
          </div>
        </div>
      ), 
      name: "Apple TV"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center relative">
            <div className="w-7 h-7 text-white font-bold">♫</div>
          </div>
        </div>
      ), 
      name: "Music"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-700"></div>
            <div className="w-6 h-6 text-white font-bold">🎧</div>
          </div>
        </div>
      ), 
      name: "Podcasts"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center">
            <div className="text-white font-bold text-2xl">A</div>
          </div>
        </div>
      ), 
      name: "App Store"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600"></div>
            <div className="w-7 h-7 border-4 border-white rounded-full z-10"></div>
          </div>
        </div>
      ), 
      name: "Settings"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500"></div>
            <div className="w-7 h-5 bg-white z-10 rounded-t-md"></div>
          </div>
        </div>
      ), 
      name: "Folder"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
            <div className="w-8 h-10 bg-white rounded-md transform rotate-6 flex items-center justify-center">
              <div className="w-8 h-7 bg-gray-100 rounded-t-md border border-gray-300"></div>
            </div>
          </div>
        </div>
      ), 
      name: "Trash"
    },
    { 
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-green-300 via-green-500 to-green-600"></div>
            <div className="w-7 h-7 bg-white rounded-md z-10 flex items-center justify-center">
              <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
            </div>
          </div>
        </div>
      ), 
      name: "FaceTime"
    },
  ];

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-end space-x-1 bg-white/20 backdrop-blur-xl py-1 px-2 rounded-2xl border border-white/30 shadow-lg">
        {dockIcons.map((item, index) => (
          <div 
            key={index} 
            className="group flex flex-col items-center cursor-mac-pointer transition-all duration-200 ease-in-out hover:scale-125 hover:-translate-y-2"
          >
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl shadow-md overflow-hidden">
              {item.icon}
            </div>
            <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 bg-black/75 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
              {item.name}
            </div>
            <div className="h-1 w-1 bg-white/60 rounded-full mt-1 opacity-0 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacDock;
