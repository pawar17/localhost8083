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

  // Function to render markdown-like formatting and links
  const renderFormattedText = (text: string) => {
    // URL regex pattern
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split by URLs first, then by bold markers
    const urlParts: (string | { type: 'url'; url: string })[] = [];
    let lastIndex = 0;
    let match;
    
    // Find all URLs
    while ((match = urlRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        urlParts.push(text.substring(lastIndex, match.index));
      }
      urlParts.push({ type: 'url', url: match[0] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      urlParts.push(text.substring(lastIndex));
    }
    
    // Process each part for bold formatting and render
    const result: React.ReactNode[] = [];
    urlParts.forEach((part, partIndex) => {
      if (typeof part === 'object' && part.type === 'url') {
        result.push(
          <a
            key={`url-${partIndex}`}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {part.url}
          </a>
        );
      } else {
        // Process bold and italic formatting within text parts
        // First handle bold (**text**), then italic (*text*)
        const boldParts = part.split(/(\*\*.*?\*\*)/g);
        boldParts.forEach((boldPart, boldIndex) => {
          if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
            const boldText = boldPart.slice(2, -2);
            result.push(
              <strong key={`${partIndex}-${boldIndex}`} className="font-semibold text-gray-900">
                {boldText}
              </strong>
            );
          } else {
            // Process italic formatting
            const italicParts = boldPart.split(/(\*[^*].*?\*)/g);
            italicParts.forEach((italicPart, italicIndex) => {
              if (italicPart.startsWith('*') && italicPart.endsWith('*') && !italicPart.startsWith('**')) {
                const italicText = italicPart.slice(1, -1);
                result.push(
                  <em key={`${partIndex}-${boldIndex}-${italicIndex}`} className="italic text-gray-900">
                    {italicText}
                  </em>
                );
              } else {
                result.push(
                  <span key={`${partIndex}-${boldIndex}-${italicIndex}`} className="text-gray-900">
                    {italicPart}
                  </span>
                );
              }
            });
          }
        });
      }
    });
    
    return result;
  };

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
        className="fixed inset-0 bg-black/5 z-50"
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
            <div className="text-[13px] text-gray-900 whitespace-pre-wrap leading-relaxed">
              {renderFormattedText(content)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TextFileViewer;

