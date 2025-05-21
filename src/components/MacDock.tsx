
import React from 'react';
import { 
  Music, Calendar, Mail, MessageSquare, Image, 
  Globe, FileText, Folder, Tv, Headphones, 
  Search, Settings, Trash2, Smile, Heart
} from 'lucide-react';

const MacDock: React.FC = () => {
  const dockIcons = [
    { 
      icon: <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <Smile className="w-5 h-5 text-white" />
      </div>, 
      name: "Finder", 
      color: "bg-gradient-to-br from-blue-500 to-blue-600" 
    },
    { 
      icon: <Globe className="w-6 h-6 text-white" />, 
      name: "Safari", 
      color: "bg-gradient-to-br from-blue-400 to-blue-600" 
    },
    { 
      icon: <MessageSquare className="w-6 h-6 text-white" />, 
      name: "Messages", 
      color: "bg-gradient-to-r from-green-400 to-green-600" 
    },
    { 
      icon: <Mail className="w-6 h-6 text-white" />, 
      name: "Mail", 
      color: "bg-gradient-to-br from-sky-400 to-sky-600" 
    },
    { 
      icon: <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <Calendar className="w-4 h-4 text-red-500" />
      </div>, 
      name: "Calendar", 
      color: "bg-white" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
        <Image className="w-4 h-4 text-white" />
      </div>, 
      name: "Photos", 
      color: "bg-gradient-to-br from-purple-400 to-pink-500" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
        <FileText className="w-4 h-4 text-yellow-600" />
      </div>, 
      name: "Notes", 
      color: "bg-yellow-100" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
        <Tv className="w-4 h-4 text-sky-400" />
      </div>, 
      name: "Apple TV", 
      color: "bg-black" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center">
        <Music className="w-4 h-4 text-white" />
      </div>, 
      name: "Music", 
      color: "bg-gradient-to-br from-pink-500 to-red-600" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
        <Headphones className="w-4 h-4 text-white" />
      </div>, 
      name: "Podcasts", 
      color: "bg-purple-600" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
        <Search className="w-4 h-4 text-white" />
      </div>, 
      name: "App Store", 
      color: "bg-blue-600" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
        <Settings className="w-4 h-4 text-white" />
      </div>, 
      name: "Settings", 
      color: "bg-gray-600" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 flex items-center justify-center">
        <Folder className="w-4 h-4 text-white" />
      </div>, 
      name: "Folder", 
      color: "bg-blue-400" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <Trash2 className="w-4 h-4 text-gray-500" />
      </div>, 
      name: "Trash", 
      color: "bg-gray-200" 
    },
    { 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
        <Heart className="w-4 h-4 text-white" />
      </div>, 
      name: "Health", 
      color: "bg-red-500" 
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
            <div className={`relative w-12 h-12 flex items-center justify-center rounded-xl shadow-md overflow-hidden ${item.color}`}>
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
