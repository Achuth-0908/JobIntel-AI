import React from 'react';
import { Brain } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-icon">
        <Brain size={16} />
      </div>
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;