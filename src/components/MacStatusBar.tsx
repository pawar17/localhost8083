import React, { useState, useEffect } from 'react';
import { Wifi, Battery, BatteryCharging } from 'lucide-react';
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
  return <div className="mac-status-bar flex items-center justify-between bg-opacity-80 text-white px-4 py-1 text-sm bg-stone-100">
      <div className="flex items-center gap-4">
        <span>🍎</span>
        <span className="text-xs font-medium text-zinc-600">Aadya's Portfolio</span>
        <span className="text-zinc-600 text-xs">File</span>
        <span className="text-zinc-600 text-xs">Edit</span>
        <span className="text-zinc-600 text-xs">View</span>
        <span className="text-xs text-zinc-600">Window</span>
        <span className="text-xs text-zinc-600">Help</span>
      </div>
      <div className="flex items-center gap-4">
        <Wifi className="w-4 h-4" />
        {isCharging ? <BatteryCharging className="w-4 h-4" /> : <Battery className="w-4 h-4" />}
        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>;
};
export default MacStatusBar;