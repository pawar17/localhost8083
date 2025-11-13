import React, { useState, useEffect } from 'react';

type TextFileViewerProps = {
  filePath: string;
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
};

const TextFileViewer: React.FC<TextFileViewerProps> = ({ filePath, fileName, isOpen, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && filePath) {
      setLoading(true);
      fetch(filePath)
        .then(response => response.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading file:', error);
          setContent('Error loading file');
          setLoading(false);
        });
    }
  }, [isOpen, filePath]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-50"
        onClick={onClose}
      />
      
      {/* Text Editor Window */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl overflow-hidden"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '500px',
          boxShadow: '0 22px 70px 4px rgba(0, 0, 0, 0.56)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac title bar */}
        <div className="flex items-center px-3 py-2 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-[7px]">
            <button
              onClick={onClose}
              className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] hover:bg-[#FF4136] transition-colors"
            />
            <button className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] hover:bg-[#FFAA00] transition-colors" />
            <button className="w-[12px] h-[12px] rounded-full bg-[#28CA42] hover:bg-[#00D924] transition-colors" />
          </div>
          <h3 className="absolute left-1/2 transform -translate-x-1/2 text-[13px] font-semibold text-gray-700">
            {fileName} - Edited
          </h3>
        </div>

        {/* Text content area */}
        <div className="h-[calc(100%-40px)] overflow-auto bg-white p-4">
          {loading ? (
            <div className="text-gray-500 text-sm">Loading...</div>
          ) : (
            <pre className="text-[13px] font-mono text-gray-900 whitespace-pre-wrap leading-relaxed">
              {content}
            </pre>
          )}
        </div>
      </div>
    </>
  );
};

export default TextFileViewer;

