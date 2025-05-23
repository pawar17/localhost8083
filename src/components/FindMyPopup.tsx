import React, { useState } from 'react';
// Removed react-leaflet imports
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'; // Removed Leaflet CSS import

interface FindMyPopupProps {
  onClose: () => void;
}

const FindMyPopup: React.FC<FindMyPopupProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Removed Mumbai coordinates
  // const mumbaiCoordinates: [number, number] = [19.0760, 72.8777];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-[800px] h-[600px] max-w-full max-h-full flex overflow-hidden relative">

        {/* Traffic Light Buttons */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">{/* Added z-10 to ensure they are clickable */}
          <button className="w-3 h-3 rounded-full bg-red-500 border-2 border-red-200 focus:outline-none" onClick={onClose} aria-label="Close"></button>
          <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-200"></span>{/* Minimize - non-functional */}
          <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-200"></span>{/* Maximize - non-functional */}
        </div>

        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50 pt-8">{/* Added pt-8 to make space for buttons */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">People</h3>
          </div>
          <div className="p-4">
            {/* Me entry */}
            <div className="flex items-center mb-4">
              {/* Removed rounded-full for square image */}
              <img src="ICON2.png" alt="Me" className="w-10 h-10 object-cover" />
              <div className="ml-3">
                <div className="font-medium">Me</div>
                <div className="text-sm text-gray-500">home</div>
              </div>
            </div>
            {/* Add other people/devices/items here */}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">{/* Added relative for positioning loading indicator */}
          {isLoading && ( // Conditionally render loading indicator
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-0">{/* Loading indicator */}
              Loading map...
            </div>
          )}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.2289711639!2d72.7141260459569!3d19.082806705298587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1747946610547!5m2!1sen!2sus"
            width="100%" // Set width to 100% to fill container
            height="100%" // Set height to 100% to fill container
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mumbai Map"
            onLoad={() => setIsLoading(false)} // Set loading to false on load
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default FindMyPopup; 