import React, { useState, useEffect } from 'react';

interface ImageData {
  src: string;
  name: string;
  description: string;
  size: string;
  dimensions: string;
  created: string;
  modified: string;
  lastOpened: string;
  resolution: string;
}

const images: ImageData[] = [
  {
    src: '/Gallery_vienna.jpg',
    name: 'Gallery_vienna.jpg',
    description: 'An actual photo of what my calendar looks like some weeks alongside my iced strawberry matcha :)',
    size: '2.1 MB',
    dimensions: '1024 x 768',
    created: 'Today, 9:41 AM',
    modified: 'Today, 9:41 AM',
    lastOpened: 'Today, 5:34 PM',
    resolution: '72x72',
  },
  {
    src: '/Profile.jpeg',
    name: 'Profile.jpeg',
    description: "Hi! I'm Aadya, a senior at Purdue University studying Computer Science and Artificial Intelligence. I'm passionate about accessible technology and inclusion. I love playing around with data, analyzing it, building models and enhancing productivity with AI tools.",
    size: '1.8 MB',
    dimensions: '1024 x 768',
    created: 'Today, 10:15 AM',
    modified: 'Today, 10:15 AM',
    lastOpened: 'Today, 5:45 PM',
    resolution: '72x72',
  },
  {
    src: '/Little.jpeg',
    name: 'Little.jpeg',
    description: 'A cheerful moment captured at the Macau Museum, showcasing a bright smile and joyful memories.',
    size: '1.5 MB',
    dimensions: '1024 x 768',
    created: 'Today, 11:00 AM',
    modified: 'Today, 11:00 AM',
    lastOpened: 'Today, 6:00 PM',
    resolution: '72x72',
  },
];

interface GalleryProps {
  onClose: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      } else if (event.key === 'ArrowRight') {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
              {currentImage.description}
            </div>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div><span className="font-medium text-gray-700">Created:</span> {currentImage.created}</div>
            <div><span className="font-medium text-gray-700">Modified:</span> {currentImage.modified}</div>
            <div><span className="font-medium text-gray-700">Last opened:</span> {currentImage.lastOpened}</div>
            <div><span className="font-medium text-gray-700">Dimensions:</span> {currentImage.dimensions}</div>
            <div><span className="font-medium text-gray-700">Resolution:</span> {currentImage.resolution}</div>
            <div><span className="font-medium text-gray-700">Size:</span> {currentImage.size}</div>
          </div>
        </div>
        {/* Main image and thumbnails */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          <img src={currentImage.src} alt={currentImage.name} className="max-h-[340px] max-w-full rounded-lg shadow mb-4 border border-gray-200" />
          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-2 overflow-x-auto w-full justify-center">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.name}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-16 w-24 object-cover rounded cursor-pointer transition-all ${
                  index === currentImageIndex
                    ? 'border-2 border-blue-500 ring-2 ring-blue-200'
                    : 'border border-gray-300 hover:border-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 