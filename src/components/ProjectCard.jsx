import React, { useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to open links
  const handleCardClick = (e) => {
    // If they clicked a specific link inside, don't trigger the whole card click
    if (e.target.closest('a')) return;
    const url = project.live || project.github;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="relative w-[85vw] sm:w-[400px] md:w-[480px] xl:w-[550px] h-[360px] md:h-[380px] bg-[#121212] border border-[#2a2a2a] rounded-xl flex flex-col shadow-2xl transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      
      {/* HOVER PREVIEW WINDOW (Mac Style) - Hidden on Mobile/Tablet */}
      {project.live && (
        <div 
          className={`hidden lg:block absolute top-0 -right-[320px] xl:-right-[380px] 2xl:-right-[420px] w-[300px] xl:w-[350px] 2xl:w-[400px] bg-[#0a0a0a] border border-[#333] rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 transform origin-left ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'}`}
          style={{ zIndex: -1 }} // So it sits slightly behind the card's edge
        >
          {/* Mac Header */}
          <div className="flex items-center px-4 py-3 bg-[#111] border-b border-[#222]">
            <div className="flex gap-1.5 mr-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="text-[10px] xl:text-[11px] font-mono text-gray-500 truncate flex-1">
              {project.live.replace('https://', '')}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 border border-[#333] px-2 py-0.5 rounded bg-[#1a1a1a]">
              Visit <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
          {/* Preview Iframe / Image */}
          <div className="w-full h-[220px] xl:h-[260px] 2xl:h-[300px] overflow-hidden bg-black flex items-center justify-center relative">
            
            {project.iframeUrl ? (
              <div className="w-full h-full relative">
                {/* Scale down the iframe to fit like a desktop thumbnail */}
                <iframe 
                  src={project.iframeUrl} 
                  className="absolute top-0 left-0 w-[1333px] h-[933px] origin-top-left pointer-events-none border-none opacity-90"
                  style={{ transform: 'scale(0.3)' }}
                  title={`${project.title} live preview`}
                />
              </div>
            ) : project.image ? (
              <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-cover opacity-80" />
            ) : null}
            
            {/* Overlay hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold text-gray-300 tracking-wide">Live Preview</span>
            </div>
          </div>
        </div>
      )}

      {/* Card Content Wrapper */}
      <div className="flex flex-col flex-1 p-6 lg:p-8 hover:bg-white/[0.02] transition-colors rounded-xl h-full">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[#555] text-base font-bold group-hover:text-[#888] transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            {project.live ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1f1f1f] border border-[#333]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-gray-300 tracking-wider">LIVE</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1f1f1f] border border-[#333]">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                <span className="text-[10px] font-bold text-gray-300 tracking-wider">OFFLINE</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-gray-400 font-bold">{project.stars || '5'}</span>
            </div>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors cursor-pointer font-bold relative z-10">
                Live <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors cursor-pointer font-bold relative z-10">
                &lt;&gt; <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Body */}
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-[#10b981] transition-colors">
          {project.title}
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        {project.features && (
          <div className="flex flex-wrap gap-2 mb-auto">
            {project.features.map((feat, i) => (
              <span key={i} className="px-3 py-1.5 text-[10px] md:text-xs font-mono text-gray-400 bg-[#1a1a1a] border border-[#2a2a2a] rounded shadow-inner">
                {feat}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-[#2a2a2a] flex items-center justify-between mt-auto">
          <div className="text-[10px] md:text-xs font-mono text-gray-500 flex gap-2">
            {project.tech.split(',').map(t => t.trim()).join(' · ')}
          </div>
          <div className="text-[10px] md:text-xs font-mono text-gray-500 font-bold">
            {project.year || '2024'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
