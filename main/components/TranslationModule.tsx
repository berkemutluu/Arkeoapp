import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { translateAncientText } from '../services/gemini';
import LoadingSpinner from './LoadingSpinner';
import { translations, Language } from '../translations';

interface TranslationModuleProps {
  lang: Language;
}

const TranslationModule: React.FC<TranslationModuleProps> = ({ lang }) => {
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPermissionError, setIsPermissionError] = useState(false);
  const [targetLang, setTargetLang] = useState<string>("English");

  const t = translations[lang];

  // If the app language switches to Turkish, we might want the default translation output to be Turkish too
  useEffect(() => {
    if (lang === 'tr') setTargetLang("Turkish");
    else setTargetLang("English");
  }, [lang]);

  const handleTranslate = async () => {
    if (!inputImage) return;

    setLoading(true);
    setError(null);
    setTranslation(null);
    setIsPermissionError(false);

    try {
      const result = await translateAncientText(inputImage, targetLang);
      setTranslation(result);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || JSON.stringify(err);
      
      if (errorMessage.includes('403') || errorMessage.includes('permission') || errorMessage.includes('PERMISSION_DENIED')) {
        setIsPermissionError(true);
        setError(t.permissionError);
      } else {
        setError(t.translationError);
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
        <h2 className="text-3xl font-serif text-arch-stone mb-2">{t.translationTitle}</h2>
        <p className="text-arch-clay italic">{t.translationSubtitle}</p>
      </div>

      <ImageUploader 
        label={t.translationLabel} 
        lang={lang}
        onImageSelected={(img) => {
          setInputImage(img);
          setTranslation(null);
          setError(null);
          setIsPermissionError(false);
        }} 
      />

      {inputImage && !loading && !translation && (
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <label className="text-arch-stone font-serif font-bold mb-2">{t.translationTargetLabel}</label>
          <div className="flex gap-4 p-2 bg-arch-sand/20 rounded-lg border border-arch-stone/20">
            <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded transition-all ${targetLang === "English" ? "bg-white shadow-sm ring-1 ring-arch-gold" : "hover:bg-white/50"}`}>
              <input 
                type="radio" 
                name="lang" 
                value="English" 
                checked={targetLang === "English"} 
                onChange={() => setTargetLang("English")}
                className="hidden"
              />
              <span className={`font-serif ${targetLang === "English" ? "text-arch-stone font-bold" : "text-stone-500"}`}>English 🇬🇧</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded transition-all ${targetLang === "Turkish" ? "bg-white shadow-sm ring-1 ring-arch-gold" : "hover:bg-white/50"}`}>
              <input 
                type="radio" 
                name="lang" 
                value="Turkish" 
                checked={targetLang === "Turkish"} 
                onChange={() => setTargetLang("Turkish")}
                className="hidden"
              />
              <span className={`font-serif ${targetLang === "Turkish" ? "text-arch-stone font-bold" : "text-stone-500"}`}>Türkçe 🇹🇷</span>
            </label>
          </div>
        </div>
      )}

      {inputImage && !loading && !translation && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleTranslate}
            className="px-8 py-3 bg-arch-stone text-white font-serif text-lg rounded shadow-lg hover:bg-stone-800 transition-all border-2 border-arch-gold flex items-center gap-2"
          >
            <span>📜</span> {t.translationBtn}
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

      {translation && (
        <div className="mt-8 bg-white p-8 rounded shadow-xl border-l-4 border-arch-gold relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-arch-stone">
               <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <div className="prose font-serif max-w-none text-stone-800 leading-relaxed" dangerouslySetInnerHTML={{ 
            // Very basic markdown parsing for display
            __html: translation.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') 
          }} />
           <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
             <button 
               onClick={() => {
                 setTranslation(null);
               }}
               className="text-arch-stone border border-arch-stone/30 px-4 py-1 rounded hover:bg-arch-sand/20 text-sm font-serif mr-4"
             >
               {t.tryAgain}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationModule;