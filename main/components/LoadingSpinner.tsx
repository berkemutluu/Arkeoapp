import React from 'react';
import { translations, Language } from '../translations';

interface LoadingSpinnerProps {
  lang?: Language;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-arch-sand rounded-full opacity-25"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-arch-clay rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-arch-stone font-serif italic animate-pulse">{t.loadingSpinner}</p>
    </div>
  );
};

export default LoadingSpinner;