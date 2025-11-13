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
    <div className="flex flex-col w-[600px] h-[500px] bg-white rounded-[10px] overflow-hidden" style={{ boxShadow: '0 22px 70px 4px rgba(0, 0, 0, 0.56)' }}>
      {/* Mac-style title bar */}
      <div className="flex items-center px-3 py-2.5 bg-white relative">
        <div className="flex items-center gap-[7px]">
          <button
            onClick={handleClose}
            className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] hover:bg-[#FF4136] transition-colors"
            aria-label="Close"
          />
          <span className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] hover:bg-[#FFAA00] transition-colors" />
          <span className="w-[12px] h-[12px] rounded-full bg-[#28CA42] hover:bg-[#00D924] transition-colors" />
        </div>
        <h3 className="absolute left-1/2 transform -translate-x-1/2 text-[13px] font-semibold text-[#000]">
          Photo Booth
        </h3>
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

      <div className="flex-1 flex flex-col items-center justify-center bg-white relative" style={{ paddingBottom: '56px' }}>
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 text-sm bg-white px-4 py-2 rounded shadow z-30">
            {error}
          </div>
        )}

        {/* Main display area: show video or selected image */}
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {viewImage ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
              <img
                src={viewImage}
                alt="Captured"
                className="max-h-full max-w-full object-contain"
                style={{
                  transform: 'scaleX(-1)'
                }}
              />
            </div>
          ) : (
            <>
              {isCameraLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <span className="text-gray-500 text-sm">Loading camera...</span>
                </div>
              )}
              {!isCameraStarted && !isCameraLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                  <button
                    onClick={startCamera}
                    className="px-6 py-3 bg-[#007AFF] text-white text-[14px] font-medium rounded-[6px] hover:bg-[#0062CC] transition-colors shadow-lg"
                  >
                    Start Camera
                  </button>
                  {hasPermission === false && (
                    <div className="text-gray-500 text-sm mt-3">Please grant access to camera</div>
                  )}
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover bg-black"
                style={{
                  transform: 'scaleX(-1)',
                  display: isCameraStarted ? 'block' : 'none'
                }}
              />
            </>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {isCameraStarted && !viewImage && (
            <button
              className="absolute left-1/2 -translate-x-1/2 bottom-20 w-14 h-14 rounded-full bg-[#FF3B30] border-[3px] border-white shadow-lg flex items-center justify-center focus:outline-none hover:bg-[#E6322E] transition-colors z-20"
              onClick={handleCapture}
              aria-label="Capture"
            >
              <div className="w-8 h-8 rounded-full bg-white"></div>
            </button>
          )}
        </div>

        {/* Bottom bar */}
        <div className="absolute left-0 right-0 bottom-0 bg-[#f5f5f5] border-t border-gray-300 flex items-center justify-between px-3 py-2" style={{ height: '56px', zIndex: 10 }}>
          <div className="flex items-center gap-3">
            <button title="Grid" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><rect x="2" y="2" width="7" height="7"/><rect x="11" y="2" width="7" height="7"/><rect x="2" y="11" width="7" height="7"/><rect x="11" y="11" width="7" height="7"/></svg>
            </button>
            <button title="Photo" className="w-8 h-8 flex items-center justify-center text-[#007AFF] hover:bg-blue-100 rounded transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10.5" r="2.5"/></svg>
            </button>
            <button title="Video" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm13 1l3-2v10l-3-2V6z"/></svg>
            </button>
          </div>

          <div className="flex-1 flex gap-2 overflow-x-auto mx-4">
            {capturedImages.length === 0 && <div className="text-gray-400 text-xs italic">No photos yet</div>}
            {capturedImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Captured ${idx + 1}`}
                className={`h-10 w-14 object-cover rounded cursor-pointer ${viewImage === img ? 'ring-2 ring-[#007AFF]' : 'ring-1 ring-gray-300'}`}
                onClick={() => setViewImage(img)}
              />
            ))}
          </div>

          <button className="px-4 py-1 rounded-[5px] bg-[#e5e5e5] hover:bg-[#d5d5d5] text-gray-800 text-[13px] font-medium transition-colors">
            Effects
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraApp;
