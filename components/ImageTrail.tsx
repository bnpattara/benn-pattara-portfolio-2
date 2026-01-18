
import React, { useState, useEffect, useCallback } from 'react';
import { CASE_STUDIES } from '../constants';

interface TrailItem {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
}

const ImageTrail: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [imageIndex, setImageIndex] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    const distance = Math.hypot(x - lastPosition.x, y - lastPosition.y);

    // Only drop an image if moved far enough (e.g., 80px)
    if (distance > 80) {
      const newItem: TrailItem = {
        id: Date.now(),
        x,
        y,
        imageUrl: CASE_STUDIES[imageIndex % CASE_STUDIES.length].imageUrl,
      };

      setTrail((prev) => [...prev.slice(-10), newItem]);
      setLastPosition({ x, y });
      setImageIndex((prev) => prev + 1);

      // Clean up item after animation
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 800);
    }
  }, [lastPosition, imageIndex]);

  return (
    <div 
      onMouseMove={handleMouseMove} 
      className="relative overflow-hidden w-full h-full"
    >
      {/* Trail Images */}
      {trail.map((item) => (
        <div
          key={item.id}
          className="fixed pointer-events-none z-10 animate-trail"
          style={{ 
            left: item.x, 
            top: item.y,
          }}
        >
          <div className="w-32 md:w-48 aspect-[3/4] border border-stone-200 bg-white overflow-hidden shadow-2xl">
            <img 
              src={item.imageUrl} 
              alt="trail" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        </div>
      ))}
      
      {/* Container Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default ImageTrail;
