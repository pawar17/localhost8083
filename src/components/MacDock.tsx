
import React from 'react';
import { 
  Music, Calendar, Mail, MessageSquare, Image, 
  Globe, FileText, Folder, Tv, Headphones, 
  Apple, Search, Settings, Trash2
} from 'lucide-react';

const MacDock: React.FC = () => {
  const dockIcons = [
    { icon: <Apple className="w-8 h-8 text-white" />, name: "Finder", color: "bg-blue-500" },
    { icon: <Globe className="w-6 h-6" />, name: "Safari", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { icon: <MessageSquare className="w-6 h-6 text-white" />, name: "Messages", color: "bg-green-500" },
    { icon: <Mail className="w-6 h-6 text-white" />, name: "Mail", color: "bg-blue-400" },
    { icon: <Calendar className="w-6 h-6 text-white" />, name: "Calendar", color: "bg-white" },
    { icon: <Image className="w-6 h-6 text-white" />, name: "Photos", color: "bg-gradient-to-br from-purple-400 to-pink-500" },
    { icon: <FileText className="w-6 h-6" />, name: "Notes", color: "bg-yellow-100" },
    { icon: <Tv className="w-6 h-6 text-white" />, name: "Apple TV", color: "bg-black" },
    { icon: <Music className="w-6 h-6 text-white" />, name: "Music", color: "bg-gradient-to-br from-pink-500 to-red-600" },
    { icon: <Headphones className="w-6 h-6 text-white" />, name: "Podcasts", color: "bg-purple-600" },
    { icon: <Search className="w-6 h-6 text-white" />, name: "App Store", color: "bg-blue-600" },
    { icon: <Settings className="w-6 h-6 text-white" />, name: "Settings", color: "bg-gray-600" },
    { icon: <Folder className="w-6 h-6" />, name: "Folder", color: "bg-blue-400" },
    { icon: <Trash2 className="w-6 h-6" />, name: "Trash", color: "bg-gray-200" }
  ];

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-end space-x-1 bg-white/20 backdrop-blur-xl py-1 px-2 rounded-2xl border border-white/30 shadow-lg">
        {dockIcons.map((item, index) => (
          <div 
            key={index} 
            className="group flex flex-col items-center cursor-mac-pointer transition-all duration-200 ease-in-out hover:scale-125 hover:-translate-y-2"
          >
            <div className={`relative w-12 h-12 flex items-center justify-center rounded-xl ${item.color} shadow-md overflow-hidden`}>
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
