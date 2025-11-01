
import React from 'react';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyle: HeadshotStyle | null;
  onStyleSelect: (style: HeadshotStyle) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect, disabled }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-slate-200">Select a Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            disabled={disabled}
            className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
              selectedStyle?.id === style.id
                ? 'bg-indigo-500/20 border-indigo-500'
                : 'bg-slate-700/50 border-slate-700 hover:border-indigo-600 hover:bg-slate-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <h3 className="font-semibold text-slate-100">{style.name}</h3>
            <p className="text-sm text-slate-400">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
