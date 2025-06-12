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
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // Check for available cameras
  useEffect(() => {
    const checkCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Available cameras:', videoDevices);
        setAvailableCameras(videoDevices);
      } catch (err) {
        console.error('Error checking cameras:', err);
      }
    };
    checkCameras();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('[CameraApp] Component unmounting, cleaning up');
      cleanup();
    };
  }, []);

  const cleanup = () => {
    console.log('[CameraApp] Cleanup called');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log('[CameraApp] Stopping track:', track);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraLoading(true);
      setError(null);
      
      // Check if we're in a secure context
      if (!window.isSecureContext) {
        throw new Error('Camera access requires a secure context (HTTPS or localhost)');
      }

      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not available in this browser');
      }

      console.log('Starting camera...');
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      // Get camera stream
      const constraints = {
        video: {
          deviceId: availableCameras[0]?.deviceId ? { exact: availableCameras[0].deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      console.log('Requesting camera with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Got stream:', stream);
      
      // Store the stream reference
      streamRef.current = stream;
      
      if (!videoRef.current) {
        throw new Error('Video element not found');
      }

      // Set the stream to video element
      videoRef.current.srcObject = stream;
      
      // Wait for video to be ready and play
      await new Promise((resolve, reject) => {
        if (!videoRef.current) return reject('Video element not found');
        
        const video = videoRef.current;
        
        const onLoadedMetadata = async () => {
          console.log('Video metadata loaded');
          try {
            await video.play();
            console.log('Video playing successfully');
            resolve(true);
          } catch (playError) {
            console.error('Error playing video:', playError);
            reject('Failed to start video playback');
          }
        };
        
        const onError = (e: Event) => {
          console.error('Video error:', e);
          reject('Error loading video');
        };
        
        video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        video.addEventListener('error', onError, { once: true });
        
        // Cleanup listeners on reject
        setTimeout(() => {
          video.removeEventListener('loadedmetadata', onLoadedMetadata);
          video.removeEventListener('error', onError);
          reject('Timeout loading video');
        }, 10000);
      });

      setHasPermission(true);
      setIsCameraStarted(true);
      setError(null);
      setIsCameraLoading(false);

    } catch (err) {
      console.error('Camera error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start camera');
      setHasPermission(false);
      setIsCameraStarted(false);
      setIsCameraLoading(false);
      cleanup();
    }
  };

  const handleClose = () => {
    console.log('[CameraApp] handleClose called');
    cleanup();
    setViewImage(null);
    setError(null);
    setCapturedImages([]);
    setIsCameraStarted(false);
    setHasPermission(null);
    onClose();
  };

  const handleBackToCamera = async () => {
    cleanup();
    setViewImage(null);
    setIsCameraLoading(true);
    await startCamera();
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      // Limit to 5 images: remove oldest if already 5
      setCapturedImages(prev => {
        const newImages = [dataUrl, ...prev];
        return newImages.length > 5 ? newImages.slice(0, 5) : newImages;
      });
    } catch (err) {
      setError('Failed to capture image');
    }
  };

  return (
    <div className="flex flex-col w-[600px] h-[520px] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
      {/* Mac-style title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 relative">
        <div className="flex items-center gap-2">
          <button
            onClick={handleClose}
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
        {/* Back button, only when viewing image */}
        {viewImage && (
          <button
            className="absolute left-4 top-12 flex items-center gap-1 bg-white bg-opacity-90 rounded px-3 py-1 shadow hover:bg-opacity-100 transition z-20"
            onClick={handleBackToCamera}
            title="Back"
          >
            <span className="text-lg">←</span>
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 relative pb-0">
        {error && (
          <div className="text-red-500 text-lg mb-4">{error}</div>
        )}
        
        {/* Main display area: show video or selected image */}
        <div className="relative flex flex-col items-center w-full">
          {viewImage ? (
            <div className="relative w-full flex flex-col items-center">
              <img
                src={viewImage}
                alt="Captured"
                className="rounded-lg max-h-[320px] max-w-full border border-gray-300 shadow bg-black"
                style={{
                  aspectRatio: '4/3',
                  width: '90%',
                  objectFit: 'cover',
                  transform: 'scaleX(-1)'
                }}
              />
            </div>
          ) : (
            <>
              {isCameraLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
                  <span className="text-gray-500 text-lg">Loading camera...</span>
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded-lg bg-black max-h-[320px] max-w-full border border-gray-300 shadow"
                style={{
                  aspectRatio: '4/3',
                  width: '90%',
                  objectFit: 'cover',
                  marginTop: '16px',
                  transform: 'scaleX(-1)',
                  display: isCameraStarted ? 'block' : 'none'
                }}
              />
            </>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {isCameraStarted && !viewImage && (
            <button
              className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-16 h-16 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center focus:outline-none z-20"
              onClick={handleCapture}
              aria-label="Capture"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              <span className="w-8 h-8 rounded-full bg-white block"></span>
            </button>
          )}
        </div>
        
        {!isCameraStarted && (
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4"
          >
            Start Camera
          </button>
        )}
        
        {hasPermission === false && (
          <div className="text-gray-500 text-lg">Please grant access to camera :)</div>
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
                className={`h-12 w-16 object-cover rounded border-2 cursor-pointer bg-white ${viewImage === img ? 'border-blue-600' : 'border-blue-400'}`}
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
