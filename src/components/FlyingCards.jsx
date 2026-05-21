import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const FlyingCards = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll wheel to fly through cards
  useEffect(() => {
    let scrollAccumulator = 0;
    let lastScrollTime = Date.now();
    
    const handleWheel = (e) => {
      // Prevent the actual webpage from scrolling
      if (Math.abs(e.deltaY) > 5) {
        e.preventDefault();
      }

      const now = Date.now();
      // Reset accumulator if there's a pause in scrolling (feels like a new swipe)
      if (now - lastScrollTime > 150) {
        scrollAccumulator = 0;
      }
      lastScrollTime = now;
      
      // Accumulate scroll delta
      scrollAccumulator += e.deltaY;
      
      // Threshold for moving to next card
      if (scrollAccumulator > 60) {
        setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
        scrollAccumulator = 0;
      } else if (scrollAccumulator < -60) {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        scrollAccumulator = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [projects.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1200px] overflow-visible">
      
      <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
        {projects.map((project, index) => {
          const offset = index - activeIndex;

          // Don't render cards that are too far away to save DOM performance
          if (offset < -2 || offset > 4) return null;

          const side = index % 2 === 0 ? 1 : -1;
          
          let translateX = 0;
          let translateY = 0;
          let translateZ = 0;
          let rotateY = 0;
          let rotateX = 0;
          let opacity = 1;

          if (offset === 0) {
            // Active Center Card
            translateX = 0;
            translateY = 0;
            translateZ = 0;
            rotateY = 0;
            rotateX = 0;
            opacity = 1;
          } else if (offset > 0) {
            // Future cards (waiting in the deep background)
            translateX = side * offset * 320; 
            translateY = offset * 30; // Slightly lower
            translateZ = offset * -700; // Pushed deep back
            rotateY = side * offset * -30; // Angled inwards
            opacity = Math.max(1 - offset * 0.25, 0); // Fade out in distance
          } else if (offset < 0) {
            // Past cards (flown past the camera)
            translateX = side * offset * -450; // Fly out to the sides
            translateY = offset * 120; // Fly downwards
            translateZ = offset * -1000; // Positive Z (moves towards/past camera)
            rotateY = side * offset * 50; // Spin away
            rotateX = offset * -35;
            opacity = 0; // Completely faded once passed
          }

          return (
            <div 
              key={index}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                opacity,
                zIndex: 100 - offset, // Active is highest, background is lower
                pointerEvents: offset === 0 ? 'auto' : 'auto',
              }}
            >
              <div 
                className={`transition-all duration-1000 ${offset === 0 ? 'cursor-default shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'cursor-pointer brightness-[0.3] hover:brightness-75'}`}
                onClick={() => offset !== 0 && setActiveIndex(index)}
              >
                <div style={{ pointerEvents: offset === 0 ? 'auto' : 'none' }}>
                  <ProjectCard project={project} index={index} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 flex gap-3 z-[200]">
        {projects.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white w-8' : 'bg-[#444] hover:bg-gray-400 w-3'}`}
            aria-label={`Fly to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlyingCards;
