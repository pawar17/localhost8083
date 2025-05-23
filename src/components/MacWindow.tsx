
import React, { ReactNode } from 'react';

interface MacWindowProps {
  children: ReactNode;
  title: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ children, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl max-w-full flex flex-col border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-t-lg border-b border-gray-200 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></span>
        </div>
        <div className="flex-1 text-center text-sm font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MacWindow;
