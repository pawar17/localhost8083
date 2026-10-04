import React from 'react';

interface DesktopFolderProps {
  title: string;
  iconSrc: string;
  onOpen: () => void;
}

const DesktopFolder: React.FC<DesktopFolderProps> = ({ title, iconSrc, onOpen }) => (
  <button className="desktop-icon" onClick={onOpen} onDoubleClick={onOpen}>
    <img src={iconSrc} alt="" />
    <span>{title}</span>
  </button>
);

export default DesktopFolder;
