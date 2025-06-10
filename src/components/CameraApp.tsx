import React, { useEffect, useRef, useState } from 'react';

interface CameraAppProps {
  onClose: () => void;
}

const CameraApp: React.FC<CameraAppProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initializeCamera = async () => {
      try {
        // Check if mediaDevices is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Your browser does not support camera access');
        }

        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });

        // Set the stream to video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Ensure video plays
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(err => {
              console.error('Error playing video:', err);
              setError('Error starting video playback');
            });
          };
        }

        setHasPermission(true);
        setError(null);
      } catch (err) {
        console.error('Camera error:', err);
        setHasPermission(false);
        setError(err instanceof Error ? err.message : 'Failed to access camera');
      }
    };

    initializeCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video or canvas reference not found');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Draw the current video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to image
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImages([dataUrl, ...capturedImages]);
    } catch (err) {
      console.error('Capture error:', err);
      setError('Failed to capture image');
    }
  };

  return (
    <div className="flex flex-col w-[600px] h-[520px] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
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
          Photo Booth
        </div>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 relative pb-0">
        {error && (
          <div className="text-red-500 text-lg mb-4">{error}</div>
        )}
        
        {hasPermission === null && (
          <div className="text-gray-500 text-lg">Loading camera...</div>
        )}
        
        {hasPermission === false && (
          <div className="text-gray-500 text-lg">Please grant access to camera :)</div>
        )}
        
        {hasPermission && !viewImage && (
          <>
            <div className="relative flex flex-col items-center w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted // Add muted to ensure autoplay works
                className="rounded-lg bg-black max-h-[320px] max-w-full border border-gray-300 shadow"
                style={{ 
                  aspectRatio: '4/3', 
                  width: '90%', 
                  objectFit: 'cover', 
                  marginTop: '16px',
                  transform: 'scaleX(-1)' // Mirror the video for selfie view
                }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <button
                className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-16 h-16 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center focus:outline-none z-20"
                onClick={handleCapture}
                aria-label="Capture"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
              >
                <span className="w-8 h-8 rounded-full bg-white block"></span>
              </button>
            </div>
          </>
        )}

        {viewImage && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img 
              src={viewImage} 
              alt="Captured" 
              className="rounded-lg max-h-[320px] max-w-full border border-gray-300 shadow bg-black" 
              style={{ 
                aspectRatio: '4/3', 
                width: '90%', 
                objectFit: 'cover',
                transform: 'scaleX(-1)' // Mirror the image to match video
              }} 
            />
            <button
              className="mt-4 px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
              onClick={() => setViewImage(null)}
            >
              Close
            </button>
          </div>
        )}

        {/* Bottom bar */}
        <div className="absolute left-0 right-0 bottom-0 bg-gray-200 border-t border-gray-300 flex items-center px-4 py-2" style={{ minHeight: '64px', zIndex: 10 }}>
          <div className="flex items-center gap-2 mr-4">
            <span title="Grid" className="text-xl">🔲</span>
            <span title="Photo" className="text-xl">📷</span>
            <span title="Video" className="text-xl">🎥</span>
          </div>
          
          <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {capturedImages.length === 0 && <div className="text-gray-400 text-xs italic">No photos yet</div>}
            {capturedImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Captured ${idx + 1}`}
                className="h-12 w-16 object-cover rounded border-2 border-blue-400 cursor-pointer bg-white"
                onClick={() => setViewImage(img)}
              />
            ))}
          </div>
          
          <button className="ml-4 px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium shadow" style={{ minWidth: '80px' }}>
            Effects
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraApp; 