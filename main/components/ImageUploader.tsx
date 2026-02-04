import React, { useState } from 'react';
import { translations, Language } from '../translations';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  label: string;
  lang?: Language;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, label, lang = 'en' }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const t = translations[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <label className="block text-arch-stone font-serif text-lg mb-2 font-bold">
        {label}
      </label>
      <div className="border-2 border-dashed border-arch-clay rounded-lg p-6 bg-arch-parchment flex flex-col items-center justify-center text-center hover:bg-white transition-colors cursor-pointer relative">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {preview ? (
          <div className="relative w-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-64 mx-auto rounded shadow-md border-4 border-arch-gold" 
            />
            <p className="mt-2 text-sm text-arch-stone italic">{t.clickToChange}</p>
          </div>
        ) : (
          <div className="py-8">
            <svg className="mx-auto h-12 w-12 text-arch-clay mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="block text-arch-stone font-medium">{t.uploadImage}</span>
            <span className="text-sm text-arch-clay/70">{t.uploadFormat}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;