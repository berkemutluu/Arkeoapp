import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { completeMosaic } from '../services/gemini';
import LoadingSpinner from './LoadingSpinner';
import BeforeAfterSlider from './BeforeAfterSlider';
import { translations, Language } from '../translations';

interface MosaicModuleProps {
  lang: Language;
}

const MosaicModule: React.FC<MosaicModuleProps> = ({ lang }) => {
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [context, setContext] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPermissionError, setIsPermissionError] = useState(false);

  const t = translations[lang];

  const handleComplete = async () => {
    if (!inputImage) return;
    
    setLoading(true);
    setError(null);
    setResultImage(null);
    setIsPermissionError(false);

    try {
      const result = await completeMosaic(inputImage, context);
      setResultImage(result);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || JSON.stringify(err);
      
      if (errorMessage.includes('403') || errorMessage.includes('permission') || errorMessage.includes('PERMISSION_DENIED')) {
        setIsPermissionError(true);
        setError(t.permissionError);
      } else {
        setError(t.mosaicError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setError(null);
      setIsPermissionError(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-arch-stone mb-2">{t.mosaicTitle}</h2>
        <p className="text-arch-clay italic">{t.mosaicSubtitle}</p>
      </div>

      <ImageUploader 
        label={t.mosaicLabel} 
        lang={lang}
        onImageSelected={(img) => {
          setInputImage(img);
          setResultImage(null);
          setError(null);
          setIsPermissionError(false);
        }} 
      />

      {inputImage && !loading && !resultImage && (
        <div className="max-w-lg mx-auto mb-8 animate-fade-in">
          <label className="block text-arch-stone font-serif font-bold mb-2 text-left">
            {t.mosaicContextLabel}
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={t.mosaicContextPlaceholder}
            className="w-full p-4 rounded-lg bg-arch-parchment border-2 border-arch-stone/30 focus:border-arch-gold focus:ring-1 focus:ring-arch-gold outline-none text-stone-800 font-serif placeholder-stone-400 min-h-[100px] shadow-inner resize-y"
          />
          <p className="text-xs text-arch-clay mt-1 text-right italic">{t.mosaicContextHint}</p>
        </div>
      )}

      {inputImage && !loading && !resultImage && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleComplete}
            className="px-8 py-3 bg-teal-700 text-white font-serif text-lg rounded shadow-lg hover:bg-teal-800 transition-all border-2 border-arch-gold flex items-center gap-2"
          >
            <span>🧩</span> {t.mosaicBtn}
          </button>
        </div>
      )}

      {loading && <LoadingSpinner lang={lang} />}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded mb-6 text-center flex flex-col items-center">
          <p className="mb-2">{error}</p>
          {isPermissionError && (
             <button 
               onClick={handleChangeKey}
               className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded border border-red-300 hover:bg-red-200 text-sm font-bold"
             >
               {t.changeKey}
             </button>
          )}
        </div>
      )}

      {resultImage && inputImage && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-xl font-serif text-arch-stone mb-4 text-center border-b border-arch-gold/30 pb-2">{t.mosaicResultTitle}</h3>
          
          <div className="mx-auto max-w-3xl">
            <BeforeAfterSlider 
              beforeImage={inputImage}
              afterImage={resultImage}
              labelBefore={t.fragment}
              labelAfter={t.completed}
            />
          </div>

          <div className="mt-4 flex justify-center text-center">
             <p className="text-arch-stone text-sm italic opacity-70 mb-2 w-full">{t.dragSlider}</p>
          </div>

          <div className="flex justify-center gap-4 mt-4">
             <button 
               onClick={() => {
                 setResultImage(null);
               }}
               className="text-arch-stone border border-arch-stone/30 px-4 py-1 rounded hover:bg-arch-sand/20 text-sm font-serif"
             >
               {t.tryAgain}
             </button>
             <a href={resultImage} download="mosaic-restored.png" className="text-arch-clay underline text-sm hover:text-arch-stone font-serif flex items-center">
               {t.download}
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MosaicModule;