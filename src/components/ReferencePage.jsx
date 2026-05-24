import React, { useState } from 'react';
import FlyingPosters from './FlyingPosters';
import CoverFlow from './CoverFlow';

const ReferencePage = () => {
  const [showCards, setShowCards] = useState(false);

  const projects = [
    {
      title: "Luvara",
      description: "AI Studio full-stack application built to instantly deploy custom AI agents. Connect to various models, configure personalities, and embed anywhere.",
      tech: "React, Node.js, AI Studio",
      features: ["Custom AI Agents", "Embeddable widgets", "Model routing"],
      github: "https://github.com/Aniruth-Dev-2006/Luvara",
      live: "https://luvara.vercel.app/",
      stars: 12,
      year: 2024
    },
    {
      title: "Aurex",
      description: "AI-powered ad creative platform for generating, editing, adapting, and publishing campaign creatives. Features a drag-and-drop canvas editor.",
      tech: "React, Node.js, MongoDB, Groq AI",
      features: ["Copy Generation", "Canvas Editor", "Meta Graph API"],
      github: "https://github.com/Aniruth-Dev-2006/Aurex",
      live: "https://aurexai.vercel.app/",
      stars: 8,
      year: 2024
    },
    {
      title: "Lawbridge (i-Cube)",
      description: "Intelligent legal assistant powered by Retrieval Augmented Generation (RAG) technology using Gemini LLM to answer Indian cybercrime queries.",
      tech: "React, Node.js, Python, RAG",
      features: ["Vector Search", "Gemini LLM", "Source Citations", "OAuth"],
      github: "https://github.com/Aniruth-Dev-2006/i-Cube",
      live: "https://i-cube.vercel.app/",
      stars: 15,
      year: 2024
    },
    {
      title: "AlumInium",
      description: "Comprehensive Alumni Management System with event organization, job postings, dashboards, and an alumni leaderboard.",
      tech: "Node.js, Express, MongoDB",
      features: ["Role-based access", "Job Board", "Event RSVP"],
      github: "https://github.com/Aniruth-Dev-2006/SIH",
      live: null,
      stars: 5,
      year: 2023
    },
    {
      title: "ML CPU Scheduler",
      description: "Adaptive CPU scheduling platform with a machine learning regression model to predict burst times and dynamically switch scheduling algorithms.",
      tech: "React, Node.js, FastAPI, Java",
      features: ["FastAPI Regression", "Java Engine", "Dynamic Switching"],
      github: "https://github.com/Aniruth-Dev-2006/ML-CPU-Scheduler",
      live: null,
      stars: 10,
      year: 2023
    }
  ];

  const images = [
    "/projects/luvara.png",
    "/projects/aurex.png",
    "/projects/lawbridge.png",
    "/projects/aluminium.png",
    "/projects/cpu_scheduler.png"
  ];

  return (
    <main className="flex-1 overflow-hidden relative h-full bg-transparent flex flex-col justify-center items-center pb-20">
      
      {/* Background Poster Transition */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-[1500ms] ease-in-out ${showCards ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
        onClick={() => setShowCards(true)}
      >
        <div 
          className="w-full h-full relative"
          style={{ 
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)'
          }}
        >
          <FlyingPosters 
            items={images} 
            planeWidth={450} 
            planeHeight={300} 
            scrollEase={0.05} 
            cameraFov={45}
          />
        </div>

        {!showCards && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none bg-black/40 backdrop-blur-[2px]">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1] mb-4">
              Enter The <span className="text-[#f59e0b]">Matrix.</span>
            </h1>
            <p className="text-[#8b949e] font-mono text-sm mt-2 animate-pulse">
              [ Click Anywhere to Launch Projects ]
            </p>
          </div>
        )}
      </div>

      {/* The Carousel Cards */}
      <div className={`w-full flex-1 z-20 flex flex-col items-center justify-center transition-all duration-[1500ms] ease-in-out ${showCards ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center text-center px-6 mt-16 mb-8 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#111] border border-[#333] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">05 Featured Projects</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1]">
            Featured <span className="text-[#f59e0b]">Projects.</span>
          </h1>
          <button 
            onClick={() => setShowCards(false)}
            className="text-[#8b949e] font-mono text-xs mt-6 hover:text-white transition-colors pointer-events-auto border border-[#333] px-3 py-1 rounded-md"
          >
            ← Back to WebGL Orbit
          </button>
        </div>

        <div className="w-full flex-1 z-20">
          <CoverFlow projects={projects} />
        </div>
      </div>

    </main>
  );
};

export default ReferencePage;
