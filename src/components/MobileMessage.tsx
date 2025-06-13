import { useState, useEffect } from 'react';

export function MobileMessage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is typical laptop width
    };

    // Check initially
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md text-center font-sans">
        <h2 className="text-xl font-semibold mb-4 font-sans">Desktop Experience Required 💻</h2>
        <p className="text-gray-600 mb-4 font-sans">
          This website is designed like a macbook screen & is best viewed on a computer.
        </p>
        <p className="text-gray-600 mb-6 font-sans">
          In the meantime, you can check out my LinkedIn profile!
        </p>
        <a
          href="https://www.linkedin.com/in/aadyapawar/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-sans"
        >
          Visit LinkedIn
        </a>
      </div>
    </div>
  );
} 