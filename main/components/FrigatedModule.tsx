import React from 'react';
import { translations, Language } from '../translations';

interface FrigatedModuleProps {
  lang: Language;
}

const FrigatedModule: React.FC<FrigatedModuleProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif text-arch-stone mb-4">{t.frigatedTitle}</h2>
        <p className="text-xl text-arch-clay italic">{t.frigatedSubtitle}</p>
      </div>

      <div className="bg-arch-parchment border-4 border-arch-gold rounded-xl p-10 max-w-2xl shadow-2xl relative overflow-hidden group hover:shadow-arch-gold/20 transition-all">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-arch-sand/20 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-arch-sand/20 rounded-tr-full -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 bg-white p-6 rounded-full shadow-md border-2 border-arch-stone/10">
                <span className="text-6xl">🛡️</span>
            </div>
            
            <p className="text-stone-700 font-serif text-lg leading-relaxed mb-8">
                {t.frigatedContent}
            </p>

            <a 
                href="https://frigated.onurpatent.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-4 bg-arch-stone text-arch-parchment font-serif font-bold text-xl rounded-lg shadow-lg hover:bg-arch-gold hover:text-arch-stone transition-all duration-300 transform hover:-translate-y-1 border-2 border-arch-gold flex items-center gap-3"
            >
                <span>🔐</span> {t.frigatedBtn}
            </a>
            
            <div className="mt-4 text-xs text-arch-stone/50 font-serif">
                onurpatent.com
            </div>
        </div>
      </div>
    </div>
  );
};

export default FrigatedModule;