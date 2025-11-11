import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FolderWindowProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FolderWindow: React.FC<FolderWindowProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/10"
        onClick={onClose}
      />

      {/* Folder Window */}
      <div
        className="fixed z-50 bg-white rounded-[10px] border border-gray-300 w-[700px] h-[450px] overflow-hidden"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Mac title bar with traffic lights */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#ececec] rounded-t-[10px] border-b border-[#d1d1d1]">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] hover:bg-[#FF4136] transition-colors shadow-sm"
            />
            <button className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] hover:bg-[#FFAA00] transition-colors shadow-sm" />
            <button className="w-[12px] h-[12px] rounded-full bg-[#28CA42] hover:bg-[#00D924] transition-colors shadow-sm" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-[13px] font-medium text-[#464646]">{title}</div>
          </div>
          <div className="w-[60px]"></div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f9f9f9] border-b border-gray-200">
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1 text-[12px] text-gray-600 text-center font-medium">
            {subtitle || 'Documents'}
          </div>
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex h-[calc(100%-88px)]">
          {/* Sidebar - Authentic macOS style */}
          <div className="w-[200px] bg-[#f5f5f7] border-r border-[#e0e0e0] py-3 px-0">
            <div className="mb-4">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-4 mb-2">
                Favorites
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] text-gray-700 hover:bg-[#e5e5e5] cursor-pointer">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <span>AirDrop</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] text-gray-700 hover:bg-[#e5e5e5] cursor-pointer">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span>Recents</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] text-gray-700 hover:bg-[#e5e5e5] cursor-pointer">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                  <span>Applications</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] text-gray-700 hover:bg-[#e5e5e5] cursor-pointer">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                  <span>Desktop</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] bg-[#e0e0e0] text-gray-900">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  <span>Documents</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] text-gray-700 hover:bg-[#e5e5e5] cursor-pointer">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  <span>Downloads</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content with white background */}
          <div
            className="flex-1 p-6 overflow-auto bg-white"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderWindow;
