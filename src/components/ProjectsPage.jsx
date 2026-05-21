import React from 'react';
import FlyingCards from './FlyingCards';

const ProjectsPage = () => {
  const projects = [
    {
      title: "Luvara",
      description: "AI Studio full-stack application built to instantly deploy custom AI agents. Connect to various models, configure personalities, and embed anywhere.",
      tech: "React, Node.js, AI Studio",
      features: ["Custom AI Agents", "Embeddable widgets", "Model routing"],
      github: "https://github.com/dinesh4o/Blueprints",
      live: "https://luvara.vercel.app/",
      iframeUrl: "https://luvara.vercel.app/",
      image: "/projects/luvara.png",
      stars: 12,
      year: 2024
    },
    {
      title: "Aurex",
      description: "AI-powered ad creative platform for generating, editing, adapting, and publishing campaign creatives. Features a drag-and-drop canvas editor.",
      tech: "React, Node.js, MongoDB, Groq AI",
      features: ["Copy Generation", "Canvas Editor", "Meta Graph API"],
      github: "https://github.com/dinesh4o/Aurex",
      live: "https://aurexai.vercel.app/",
      iframeUrl: "https://aurexai.vercel.app/",
      image: "/projects/aurex.png",
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
      iframeUrl: "https://i-cube.vercel.app/chat",
      image: "/projects/lawbridge.png",
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
      image: "/projects/aluminium.png",
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
      image: "/projects/cpu_scheduler.png",
      stars: 10,
      year: 2023
    }
  ];

  return (
    <main className="flex-1 overflow-hidden relative h-full bg-transparent flex flex-col items-center pt-6 md:pt-10">
      
      {/* Gradient overlays to smoothly blend edges */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030303] to-transparent z-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent z-40 pointer-events-none"></div>

      {/* Header Area - Top of the flex column */}
      <div className="w-full flex flex-col items-center justify-center text-center px-6 z-30 shrink-0 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#111] border border-[#333] mb-3 md:mb-4">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">05 Featured Projects</span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1]">
          Featured <span className="text-[#f59e0b]">Projects.</span>
        </h1>
      </div>

      {/* 3D Flying Cards Container - Takes the REST of the height so it never overlaps the header */}
      <div className="w-full flex-1 z-20 flex items-center justify-center min-h-0 relative">
        <FlyingCards projects={projects} />
      </div>

    </main>
  );
};

export default ProjectsPage;
