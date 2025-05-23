import React, { ReactNode } from 'react';

interface MacWindowProps {
  children: ReactNode;
  title: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ children, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl max-w-full flex flex-col border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-t-lg border-b border-gray-200 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 border border-red-300"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-400 border border-yellow-300"></span>
          <span className="w-2 h-2 rounded-full bg-green-500 border border-green-300"></span>
        </div>
        <div className="flex-1 text-center text-sm text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MacWindow;