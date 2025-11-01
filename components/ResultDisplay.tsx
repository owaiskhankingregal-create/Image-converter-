import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { DownloadIcon, SparklesIcon } from './icons';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  editPrompt: string;
  onEditPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerateDisabled: boolean;
  showEditPrompt: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  generatedImage,
  isLoading,
  editPrompt,
  onEditPromptChange,
  onGenerate,
  isGenerateDisabled,
  showEditPrompt,
}) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const extension = generatedImage.split(';')[0].split('/')[1] || 'png';
    link.download = `ai-headshot-${timestamp}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
        <div className="relative w-full aspect-square bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
        {isLoading && <LoadingSpinner />}
        {!isLoading && !generatedImage && (
            <div className="text-center text-slate-400 p-8">
                <SparklesIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-xl font-medium">Your Headshot Awaits</h3>
                <p className="text-slate-500">Select a style and click "Generate" to see the magic happen.</p>
            </div>
        )}
        {generatedImage && <img src={generatedImage} alt="Generated headshot" className="w-full h-full object-cover" />}
        </div>

        {showEditPrompt && (
            <div className="flex flex-col gap-2">
                <label htmlFor="edit-prompt" className="font-medium text-slate-300">Refine with a prompt (optional)</label>
                <textarea
                    id="edit-prompt"
                    value={editPrompt}
                    onChange={(e) => onEditPromptChange(e.target.value)}
                    placeholder="e.g., Add a retro filter, change the background to blue..."
                    className="w-full bg-slate-700 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    rows={2}
                    disabled={isLoading}
                />
            </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row gap-4">
            {generatedImage && (
                <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-200 font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
                >
                    <DownloadIcon className="w-6 h-6" />
                    <span>Download</span>
                </button>
            )}
            <button
                onClick={onGenerate}
                disabled={isGenerateDisabled}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200"
            >
                <SparklesIcon className="w-6 h-6" />
                <span>{generatedImage ? 'Refine Headshot' : 'Generate Headshot'}</span>
            </button>
        </div>
    </div>
  );
};

export default ResultDisplay;