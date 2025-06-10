import React from 'react';

const image = {
  src: '/Gallery_vienna.jpg',
  name: 'Gallery_vienna.jpg',
  size: '2.1 MB',
  dimensions: '1024 x 768',
  created: 'Today, 9:41 AM',
  modified: 'Today, 9:41 AM',
  lastOpened: 'Today, 5:34 PM',
  resolution: '72x72',
};

interface GalleryProps {
  onClose: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onClose }) => {
  return (
    <div className="flex w-[800px] h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 flex-col">
      {/* Mac-style title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            aria-label="Close"
          />
          <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
          <span className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
        </div>
        <div className="flex-1 text-center font-medium text-gray-900">
          Gallery
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-700 mb-2">
              An actual photo of what my calendar looks like some weeks alongside my iced strawberry matcha :)
            </div>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div><span className="font-medium text-gray-700">Created:</span> {image.created}</div>
            <div><span className="font-medium text-gray-700">Modified:</span> {image.modified}</div>
            <div><span className="font-medium text-gray-700">Last opened:</span> {image.lastOpened}</div>
            <div><span className="font-medium text-gray-700">Dimensions:</span> {image.dimensions}</div>
            <div><span className="font-medium text-gray-700">Resolution:</span> {image.resolution}</div>
            <div><span className="font-medium text-gray-700">Size:</span> {image.size}</div>
          </div>
        </div>
        {/* Main image and thumbnails */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          <img src={image.src} alt={image.name} className="max-h-[340px] max-w-full rounded-lg shadow mb-4 border border-gray-200" />
          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-2 overflow-x-auto w-full justify-center">
            <img src={image.src} alt={image.name} className="h-16 w-24 object-cover rounded border-2 border-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 