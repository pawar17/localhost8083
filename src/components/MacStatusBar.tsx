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
    <div className="mac-status-bar flex items-center justify-between text-white px-4 py-1 text-sm bg-gray-200 bg-opacity-80">
      <div className="flex items-center gap-4">
        <img src="/logo/icon.png" alt="Apple Logo" className="h-6 w-auto" />
        <span className="text-xs font-medium text-zinc-600">Aadya's Calendar</span>
        <span className="text-zinc-600 text-xs">File</span>
        <span className="text-zinc-600 text-xs">Edit</span>
        <span className="text-zinc-600 text-xs">View</span>
        <span className="text-xs text-zinc-600">Window</span>
        <span className="text-xs text-zinc-600">Help</span>
      </div>
      <div className="flex items-center gap-4">
        <Bluetooth className="w-4 h-4 text-zinc-600" />
        <Wifi className="w-4 h-4 text-zinc-600" />
        {isCharging ? <BatteryCharging className="w-4 h-4 text-zinc-600" /> : <Battery className="w-4 h-4 text-zinc-600" />}
        <Search className="w-4 h-4 text-zinc-600" />
        <img src="/control-center-icon.png" alt="Control Center" className="w-4 h-4 opacity-60" />
        <img src="/siri__fsb5b98qe526_og-removebg-preview.png" alt="Siri" className="w-8 h-8 object-contain" />
        <span className="text-zinc-600 text-xs">{formatDate(currentTime)}</span>
        <span className="text-zinc-600 text-xs">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default MacStatusBar;