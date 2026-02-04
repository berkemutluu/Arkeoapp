import React, { useState, useEffect } from 'react';
import { ModuleType, NavItem } from './types';
import RestorationModule from './components/RestorationModule';
import TranslationModule from './components/TranslationModule';
import MosaicModule from './components/MosaicModule';
import VaseModule from './components/VaseModule';
import FrigatedModule from './components/FrigatedModule';
import { translations, Language } from './translations';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.RESTORATION);
  const [hasKey, setHasKey] = useState(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const NAV_ITEMS: NavItem[] = [
    {
      id: ModuleType.RESTORATION,
      label: t.navRestoration,
      icon: '🏛️',
      description: t.navRestorationDesc
    },
    {
      id: ModuleType.TRANSLATION,
      label: t.navTranslation,
      icon: '📜',
      description: t.navTranslationDesc
    },
    {
      id: ModuleType.MOSAIC,
      label: t.navMosaic,
      icon: '🧩',
      description: t.navMosaicDesc
    },
    {
      id: ModuleType.VASE,
      label: t.navVase,
      icon: '🏺',
      description: t.navVaseDesc
    },
    {
      id: ModuleType.FRIGATED,
      label: t.navFrigated,
      icon: '🛡️',
      description: t.navFrigatedDesc
    }
  ];

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio) {
          const has = await window.aistudio.hasSelectedApiKey();
          setHasKey(has);
        } else {
          // If not running in AI Studio environment, assume key is present in env
          setHasKey(true);
        }
      } catch (e) {
        console.error("Error checking API key status", e);
      } finally {
        setIsCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        setHasKey(true);
      } catch (e) {
        console.error("Failed to select key", e);
      }
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'tr' : 'en');
  };

  if (isCheckingKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-arch-parchment">
        <div className="animate-pulse text-arch-stone font-serif text-xl">{t.loading}</div>
      </div>
    );
  }

  if (!hasKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-arch-parchment p-4 text-center">
        <div className="absolute top-4 right-4">
            <button onClick={toggleLang} className="font-serif font-bold text-arch-stone bg-white/50 px-3 py-1 rounded border border-arch-stone/20 hover:bg-white">
              {lang === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧'}
            </button>
        </div>
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border-4 border-arch-stone">
          <div className="w-20 h-20 bg-arch-gold rounded-full flex items-center justify-center text-arch-stone text-4xl font-bold shadow-inner mx-auto mb-6">
            A
          </div>
          <h1 className="text-3xl font-serif font-bold text-arch-stone mb-4">{t.appTitle}</h1>
          <p className="text-stone-600 mb-8 font-serif leading-relaxed">
            {t.connectKeyDesc}
          </p>
          
          <button 
            onClick={handleConnectKey}
            className="w-full py-4 bg-arch-clay text-white font-serif text-xl rounded-lg shadow-lg hover:bg-stone-700 transition-all border-2 border-arch-gold flex items-center justify-center gap-2 mb-4"
          >
            <span>🔑</span> {t.connectKeyBtn}
          </button>
          
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-stone-500 hover:text-arch-clay underline"
          >
            {t.billingDocs}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-arch-parchment">
      {/* Header */}
      <header className="bg-arch-stone text-arch-sand py-6 shadow-lg border-b-4 border-arch-gold sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-arch-gold rounded-full flex items-center justify-center text-arch-stone text-2xl font-bold shadow-inner">
              A
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-wider">{t.appTitle}</h1>
              <p className="text-xs text-arch-sand/70 uppercase tracking-widest">{t.appSubtitle}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={toggleLang} className="text-xs bg-black/20 hover:bg-black/40 text-arch-sand px-3 py-1 rounded transition-colors border border-arch-sand/20 font-bold">
              {lang === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧'}
            </button>
            <button 
              onClick={handleConnectKey}
              className="text-xs bg-black/20 hover:bg-black/40 text-arch-sand px-3 py-1 rounded transition-colors border border-arch-sand/20"
              title="Change API Key"
            >
              {t.apiKeyBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 max-w-7xl mx-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`
                flex flex-col items-center justify-center p-4 lg:p-6 rounded-xl transition-all duration-300 border-2
                ${activeModule === item.id 
                  ? 'bg-white border-arch-gold shadow-xl scale-105 z-10' 
                  : 'bg-arch-sand/20 border-transparent hover:bg-arch-sand/40 text-stone-600 hover:scale-[1.02]'
                }
              `}
            >
              <span className="text-4xl mb-2 filter drop-shadow-sm">{item.icon}</span>
              <span className={`font-serif font-bold text-lg ${activeModule === item.id ? 'text-arch-stone' : 'text-stone-500'}`}>
                {item.label}
              </span>
              <span className="text-xs text-center mt-1 opacity-80 max-w-[90%]">
                {item.description}
              </span>
            </button>
          ))}
        </div>

        {/* Active Module Container */}
        <div className="bg-white rounded-2xl shadow-2xl min-h-[500px] border border-stone-200 relative overflow-hidden">
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-arch-gold rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-arch-gold rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-arch-gold rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-arch-gold rounded-br-xl pointer-events-none"></div>

          <div className="p-8">
            {activeModule === ModuleType.RESTORATION && <RestorationModule lang={lang} />}
            {activeModule === ModuleType.TRANSLATION && <TranslationModule lang={lang} />}
            {activeModule === ModuleType.MOSAIC && <MosaicModule lang={lang} />}
            {activeModule === ModuleType.VASE && <VaseModule lang={lang} />}
            {activeModule === ModuleType.FRIGATED && <FrigatedModule lang={lang} />}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-400 py-6 text-center border-t border-stone-700">
        <div className="container mx-auto px-4">
          <p className="font-serif text-sm">
            {t.footerCopyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <p className="text-xs mt-2 text-stone-600">
            {t.footerTagline}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;