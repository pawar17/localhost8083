import React, { useState, useEffect } from 'react';
import { Wifi, Battery, BatteryCharging, Bluetooth, Search, SlidersHorizontal, Mic } from 'lucide-react';

const MacStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85); // Mock battery level
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate battery changes
    const batteryTimer = setInterval(() => {
      if (isCharging && batteryLevel < 100) {
        setBatteryLevel(prev => Math.min(prev + 1, 100));
      } else if (!isCharging && batteryLevel > 5) {
        setBatteryLevel(prev => Math.max(prev - 1, 5));
      }

      // Randomly toggle charging state
      if (Math.random() > 0.95) {
        setIsCharging(prev => !prev);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(batteryTimer);
    };
  }, [batteryLevel, isCharging]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex items-center justify-between text-white px-4 py-1 text-sm bg-white/25 backdrop-blur-xl border-b border-white/10" style={{ height: '28px' }}>
      <div className="flex items-center gap-4">
        <img src="/logo/icon.png" alt="Apple Logo" className="h-5 w-auto" />
        <span className="text-[13px] font-semibold text-gray-800">Aadya's Calendar</span>
        <span className="text-gray-800 text-[13px]">File</span>
        <span className="text-gray-800 text-[13px]">Edit</span>
        <span className="text-gray-800 text-[13px]">View</span>
        <span className="text-[13px] text-gray-800">Window</span>
        <span className="text-[13px] text-gray-800">Help</span>
      </div>
      <div className="flex items-center gap-3">
        <Bluetooth className="w-[14px] h-[14px] text-gray-800" />
        <Wifi className="w-[14px] h-[14px] text-gray-800" />
        {isCharging ? <BatteryCharging className="w-[14px] h-[14px] text-gray-800" /> : <Battery className="w-[14px] h-[14px] text-gray-800" />}
        <Search className="w-[14px] h-[14px] text-gray-800" />
        <img src="./control-center-icon.png" alt="Control Center" className="w-[14px] h-[14px]" />
        <img src="/siri__fsb5b98qe526_og-removebg-preview.png" alt="Siri" className="w-7 h-7 object-contain" />
        <span className="text-gray-800 text-[13px]">{formatDate(currentTime)}</span>
        <span className="text-gray-800 text-[13px] font-medium">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default MacStatusBar;