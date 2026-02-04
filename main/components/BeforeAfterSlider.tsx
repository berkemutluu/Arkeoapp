import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  labelBefore?: string;
  labelAfter?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage, 
  afterImage,
  labelBefore = "BEFORE",
  labelAfter = "AFTER"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = () => setIsResizing(true);
  
  const handleMove = (clientX: number) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsResizing(false);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    if (isResizing) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden select-none shadow-2xl rounded-lg border-4 border-arch-stone cursor-ew-resize group"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* Background Image (After/Restored - Right Side) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="block w-full h-auto pointer-events-none" 
        draggable={false}
      />

      {/* Foreground Image (Before/Original - Left Side) - Clipped */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none border-r-2 border-arch-gold/50"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute top-0 left-0 max-w-none h-full"
          // We calculate the width relative to the parent to ensure it matches the background image exactly
          style={{ width: `${10000 / Math.max(sliderPosition, 0.01)}%` }} 
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-arch-gold z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-arch-gold rounded-full flex items-center justify-center border-2 border-white shadow-lg text-arch-stone">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
           </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs font-bold font-serif pointer-events-none tracking-widest border border-white/20 backdrop-blur-sm">
        {labelBefore}
      </div>
      <div className="absolute top-4 right-4 bg-arch-gold/90 text-arch-stone px-3 py-1 rounded text-xs font-bold font-serif pointer-events-none tracking-widest border border-arch-stone/20 backdrop-blur-sm shadow-sm">
        {labelAfter}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;