import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CoverFlow = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center perspective-[1500px]">
      
      <div className="relative w-full h-[400px] flex items-center justify-center [transform-style:preserve-3d]">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === (activeIndex - 1 + projects.length) % projects.length;
          const isNext = index === (activeIndex + 1) % projects.length;

          // Calculate offset from active (e.g., -2, -1, 0, 1, 2)
          let offset = index - activeIndex;
          if (offset < -Math.floor(projects.length / 2)) offset += projects.length;
          if (offset > Math.floor(projects.length / 2)) offset -= projects.length;

          // We only render a few nearby cards to save DOM elements
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          // Cover flow transforms
          const translateX = offset * 250; // Spread out horizontally
          const translateZ = Math.abs(offset) * -200; // Push back side elements
          const rotateY = offset * -45; // Rotate side elements towards center
          const zIndex = 100 - Math.abs(offset);
          const opacity = isActive ? 1 : Math.max(1 - Math.abs(offset) * 0.4, 0.1);

          return (
            <div 
              key={index}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
              }}
            >
              <div 
                className={`transition-all duration-700 ${isActive ? 'cursor-default' : 'cursor-pointer brightness-50 blur-[1px] hover:brightness-75'}`}
                onClick={() => !isActive && setActiveIndex(index)}
                style={{ pointerEvents: isActive ? 'auto' : 'auto' }}
              >
                <div style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
                  <ProjectCard project={project} index={index} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 flex items-center gap-6 z-[200]">
        <button onClick={prev} className="p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/5 border border-transparent hover:border-[#333]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
          {projects.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white w-8' : 'bg-gray-700 hover:bg-gray-400 w-3'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/5 border border-transparent hover:border-[#333]">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoverFlow;
