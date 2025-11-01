
import React, { useState, useCallback } from 'react';
import { HeadshotStyle } from './types';
import { HEADSHOT_STYLES } from './constants';
import { generateHeadshot } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import { CameraIcon, SparklesIcon } from './components/icons';

type AppState = 'UPLOADING' | 'SELECTING_STYLE' | 'GENERATING' | 'EDITING';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('UPLOADING');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedFile(file);
    setUploadedFilePreview(URL.createObjectURL(file));
    setAppState('SELECTING_STYLE');
    setGeneratedImage(null);
    setSelectedStyle(null);
    setError(null);
  };

  const handleStyleSelect = (style: HeadshotStyle) => {
    setSelectedStyle(style);
  };

  const handleGenerate = useCallback(async () => {
    if (!uploadedFile || !selectedStyle) {
      setError('Please upload an image and select a style first.');
      return;
    }

    setAppState('GENERATING');
    setError(null);

    try {
      const basePrompt = selectedStyle.prompt;
      const fullPrompt = editPrompt ? `${basePrompt}. Additional instructions: ${editPrompt}` : basePrompt;
      const imageToEdit = generatedImage ? { base64: generatedImage.split(',')[1], mimeType: 'image/png' } : uploadedFile;

      const result = await generateHeadshot(imageToEdit, fullPrompt);
      setGeneratedImage(result);
      setAppState('EDITING');
    } catch (e) {
      console.error(e);
      setError('Failed to generate headshot. Please try again.');
      setAppState(generatedImage ? 'EDITING' : 'SELECTING_STYLE');
    }
  }, [uploadedFile, selectedStyle, editPrompt, generatedImage]);

  const handleStartOver = () => {
    setAppState('UPLOADING');
    setUploadedFile(null);
    setUploadedFilePreview(null);
    setSelectedStyle(null);
    setGeneratedImage(null);
    setEditPrompt('');
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'UPLOADING':
        return <ImageUploader onImageUpload={handleImageUpload} />;
      case 'SELECTING_STYLE':
      case 'GENERATING':
      case 'EDITING':
        return (
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex flex-col gap-6">
              <div className="bg-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-200">Your Photo</h2>
                {uploadedFilePreview && (
                  <img src={uploadedFilePreview} alt="Uploaded selfie" className="w-full h-auto rounded-lg object-cover" />
                )}
              </div>
              <StyleSelector
                styles={HEADSHOT_STYLES}
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
                disabled={appState === 'GENERATING'}
              />
            </div>
            <div className="lg:w-2/3 flex flex-col">
              <ResultDisplay
                originalImage={uploadedFilePreview}
                generatedImage={generatedImage}
                isLoading={appState === 'GENERATING'}
                editPrompt={editPrompt}
                onEditPromptChange={setEditPrompt}
                onGenerate={handleGenerate}
                isGenerateDisabled={!selectedStyle || appState === 'GENERATING'}
                showEditPrompt={!!generatedImage}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <CameraIcon className="w-10 h-10 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
              AI Headshot Photographer
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Upload a selfie, pick a style, and generate a professional headshot in seconds.
          </p>
        </header>

        <main>
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}
          {renderContent()}
        </main>

        <footer className="text-center mt-12">
          {appState !== 'UPLOADING' && (
            <button
              onClick={handleStartOver}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Start Over
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default App;
