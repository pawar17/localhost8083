
import React, { ReactNode } from 'react';

interface MacWindowProps {
  children: ReactNode;
  title: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ children, title }) => {
  return (
    <div className="bg-white rounded-[10px] shadow-2xl max-w-full flex flex-col border border-gray-300 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#ececec] rounded-t-[10px] border-b border-[#d1d1d1] cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <span className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] hover:bg-[#FF4136] transition-colors shadow-sm"></span>
          <span className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] hover:bg-[#FFAA00] transition-colors shadow-sm"></span>
          <span className="w-[12px] h-[12px] rounded-full bg-[#28CA42] hover:bg-[#00D924] transition-colors shadow-sm"></span>
        </div>
        <div className="flex-1 text-center text-[13px] font-medium text-[#464646] overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </div>
        <div className="w-[60px]"></div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MacWindow;
