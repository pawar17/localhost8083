import React from 'react';
type MacWindowProps = {
  children: React.ReactNode;
};
const MacWindow: React.FC<MacWindowProps> = ({
  children
}) => {
  return <div className="mac-window w-full max-w-6xl mx-auto my-8">
      <div className="mac-titlebar">
        <div className="flex">
          <div className="mac-button mac-close"></div>
          <div className="mac-button mac-minimize"></div>
          <div className="mac-button mac-maximize"></div>
        </div>
        <div className="flex-1 text-center text-sm text-gray-800\n">Calendar</div>
      </div>
      <div className="overflow-hidden">
        {children}
      </div>
    </div>;
};
export default MacWindow;