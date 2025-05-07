import React, { useEffect } from 'react';
import './Banner.css';

interface BannerProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Banner: React.FC<BannerProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  console.log("inside banner");

  return (
    <div className={`banner ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Banner;
