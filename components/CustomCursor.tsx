
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the current element or its parents are interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.group') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Safety checks for mouse leaving/entering the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="relative">
        {/* Main Dot - Using white to invert against content via mix-blend-difference */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full transition-all duration-300"
          style={{ 
            transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.3)' : 'scale(1)'}` 
          }}
        />
        
        {/* Pulsing Outer Ring - Tighter size (w-10 instead of w-14) */}
        <div 
          className={`absolute top-1/2 left-1/2 rounded-full border border-white/60 transition-all duration-500 ease-out
            ${isHovering 
              ? 'w-10 h-10 opacity-100 animate-pulse-custom' 
              : 'w-0 h-0 opacity-0 -translate-x-1/2 -translate-y-1/2'
            }`}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
