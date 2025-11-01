
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
      <div className="w-16 h-16 border-4 border-slate-500 border-t-indigo-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-slate-300">Generating your headshot...</p>
    </div>
  );
};

export default LoadingSpinner;
