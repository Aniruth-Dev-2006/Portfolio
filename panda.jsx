import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity,
  Code2,
  Database,
  Terminal,
  Bot,
  Zap,
  Cpu,
  LayoutGrid,
  DatabaseIcon
} from 'lucide-react';

// --- CUSTOM ICONS ---
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 4.8 4.8 0 0 0-.1-3.8s-1.2-.38-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.6 5 2 5 2a4.8 4.8 0 0 0-.1 3.8A5.2 5.2 0 0 0 3 9.6c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24V22" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- CUSTOM CSS (Animations & Transitions) ---
const customStyles = `
  @keyframes bootUp {
    0% { height: 100vh; opacity: 1; }
    80% { height: 100vh; opacity: 1; }
    100% { height: 0vh; opacity: 0; display: none; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes typeText {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes progressFill {
    from { width: 0%; }
  }
  @keyframes scrollBg {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  
  /* Infinite Marquee Dual Tracks */
  @keyframes marqueeLeft {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marqueeRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }
  .animate-marquee-left {
    display: flex;
    width: 200%;
    animation: marqueeLeft 30s linear infinite;
  }
  .animate-marquee-right {
    display: flex;
    width: 200%;
    animation: marqueeRight 35s linear infinite;
  }
  .animate-marquee-left:hover, .animate-marquee-right:hover {
    animation-play-state: paused;
  }
  
  /* Glitch Text Effect */
  .glitch-wrapper { position: relative; display: inline-block; }
  .glitch { position: relative; color: white; font-weight: 800; }
  .glitch::before, .glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; }
  .glitch::before { left: 2px; text-shadow: -2px 0 #10b981; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim 3s infinite linear alternate-reverse; }
  .glitch::after { left: -2px; text-shadow: -2px 0 #f59e0b; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; }
  @keyframes glitch-anim {
    0% { clip: rect(10px, 9999px, 34px, 0); }
    20% { clip: rect(85px, 9999px, 11px, 0); }
    40% { clip: rect(23px, 9999px, 98px, 0); }
    60% { clip: rect(76px, 9999px, 23px, 0); }
    80% { clip: rect(12px, 9999px, 78px, 0); }
    100% { clip: rect(54px, 9999px, 45px, 0); }
  }

  .animate-boot { animation: bootUp 3s ease-in-out forwards; }
  .animate-progress { animation: progressFill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-scroll-bg { animation: scrollBg 40s linear infinite; }
  
  .typing-container {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: typeText 1.5s steps(40, end) forwards;
    width: 0;
  }
  .cursor-blink {
    display: inline-block;
    width: 8px; height: 1em; background-color: #fbbf24; margin-left: 4px; vertical-align: middle;
    animation: blink 1s step-end infinite;
  }

  /* Grid Background */
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  /* 3D Classes */
  .transform-style-3d { transform-style: preserve-3d; }
  .card-edge { transform: translateZ(-2px); filter: brightness(0.6); }

  /* Apple-style Page Transitions */
  .page-transition-wrapper {
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, filter 0.4s ease;
  }
  .page-enter {
    opacity: 1; transform: scale(1); filter: blur(0px);
  }
  .page-exit {
    opacity: 0; transform: scale(0.95) translateY(20px); filter: blur(8px); pointer-events: none;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #262626; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #404040; }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState('index.tsx');
  const [renderedTab, setRenderedTab] = useState('index.tsx');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [booted, setBooted] = useState(false);
  const [bootLogs, setBootLogs] = useState([]);

  // Boot Sequence
  useEffect(() => {
    const logs = [
      "kernel: Initializing Aniruth_OS v2.0.4",
      "system: Mounting virtual drives... [OK]",
      "network: Establishing secure connection... [OK]",
      "ai_module: Loading neural weights... [OK]",
      "workspace: Starting VS Code Server...",
      "SUCCESS: Environment ready. Launching UI..."
    ];
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 800);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Apple Mac-style Transition Handler
  const handleTabChange = (newTab) => {
    if (newTab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setRenderedTab(newTab);
      setIsTransitioning(false);
    }, 400); // 400ms CSS transition duration
  };

  return (
    <>
      <style>{customStyles}</style>
      
      {/* Boot Screen Overlay */}
      {!booted && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-end p-8 animate-boot pointer-events-none">
          <div className="font-mono text-xs md:text-sm text-green-500 space-y-1 mb-10">
            {bootLogs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
            <div className="cursor-blink bg-green-500 w-2 h-4 inline-block mt-1"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
             <div className="text-amber-500 font-mono text-5xl font-bold mb-4 glitch-wrapper">
               <span className="glitch" data-text="<A/> Workspace">&lt;A/&gt; Workspace</span>
             </div>
             <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
               <div className="h-full bg-amber-500 animate-progress" style={{ width: '100%' }}></div>
             </div>
          </div>
        </div>
      )}

      {/* Main IDE Layout */}
      <div className="flex flex-col h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
        <TopNav activeTab={activeTab} handleTabChange={handleTabChange} />
        
        {/* Transition Wrapper */}
        <div className={`flex flex-1 overflow-hidden page-transition-wrapper ${isTransitioning ? 'page-exit' : 'page-enter'}`}>
          {renderedTab === 'index.tsx' ? <LandingPage /> : <AboutPage />}
        </div>
      </div>
    </>
  );
}

// --- NAVIGATION COMPONENT ---
const TopNav = ({ activeTab, handleTabChange }) => (
  <header className="flex items-center justify-between px-4 h-12 min-h-[3rem] border-b border-[#1f1f1f] bg-[#0a0a0a] z-10 shrink-0">
    <div className="flex items-center gap-6 h-full">
      <div className="flex items-center gap-2 text-amber-500 font-mono font-bold tracking-tight">
        <span>&lt;A/&gt;</span>
        <span className="text-gray-300">Aniruth R.</span>
      </div>

      <nav className="hidden md:flex items-center h-full text-xs font-mono">
        <Tab icon="react" name="index.tsx" active={activeTab === 'index.tsx'} onClick={() => handleTabChange('index.tsx')} />
        <Tab icon="ts" name="about.ts" active={activeTab === 'about.ts'} onClick={() => handleTabChange('about.ts')} />
        <Tab icon="py" name="skills.py" active={false} />
        <Tab icon="json" name="exp.json" active={false} />
        <Tab icon="sh" name="contact.sh" active={false} />
      </nav>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 text-gray-500">
        <GithubIcon className="w-4 h-4 hover:text-gray-200 transition-colors cursor-pointer" />
        <LinkedinIcon className="w-4 h-4 hover:text-gray-200 transition-colors cursor-pointer" />
      </div>
      <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#112417] border border-[#1a4025] text-emerald-400 text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:bg-[#15301e] transition-colors">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        Open to work
      </div>
    </div>
  </header>
);

const Tab = ({ name, active, onClick }) => {
  const ext = name.split('.')[1];
  const colorMap = { tsx: 'text-blue-400', ts: 'text-blue-500', py: 'text-yellow-400', json: 'text-yellow-200', sh: 'text-green-400' };
  
  return (
    <div onClick={onClick} className={`flex items-center h-full gap-2 px-4 cursor-pointer border-t-2 transition-colors ${
      active ? 'bg-[#1e1e1e] border-amber-500 text-gray-200' : 'border-transparent text-gray-500 hover:bg-[#141414] hover:text-gray-300'
    }`}>
      <span className={colorMap[ext] || 'text-gray-400'}>
        {ext === 'json' ? '{}' : ext === 'sh' ? '$' : ext === 'py' ? '◧' : ext === 'tsx' ? '⚛' : 'TS'}
      </span>
      {name}
    </div>
  );
};

// --- DUAL-TRACK TECH CAROUSEL ---
const TechCarousel = () => {
  const techStack = [
    { name: "React", icon: <Code2 className="w-5 h-5 text-blue-400" /> },
    { name: "Kubernetes", icon: <DatabaseIcon className="w-5 h-5 text-blue-500" /> },
    { name: "Node.js", icon: <Terminal className="w-5 h-5 text-green-500" /> },
    { name: "Python", icon: <Bot className="w-5 h-5 text-yellow-400" /> },
    { name: "TensorFlow", icon: <Cpu className="w-5 h-5 text-orange-500" /> },
    { name: "Java", icon: <Database className="w-5 h-5 text-red-500" /> },
  ];
  
  const techStackRow2 = [
    { name: "Scikit-Learn", icon: <Activity className="w-5 h-5 text-blue-300" /> },
    { name: "C++", icon: <Terminal className="w-5 h-5 text-blue-600" /> },
    { name: "HTML5", icon: <LayoutGrid className="w-5 h-5 text-orange-400" /> },
    { name: "CSS3", icon: <LayoutGrid className="w-5 h-5 text-blue-400" /> },
    { name: "JavaScript", icon: <Code2 className="w-5 h-5 text-yellow-300" /> },
    { name: "C", icon: <Terminal className="w-5 h-5 text-blue-700" /> },
  ];

  const row1 = [...techStack, ...techStack, ...techStack];
  const row2 = [...techStackRow2, ...techStackRow2, ...techStackRow2];

  return (
    <div className="w-full relative overflow-hidden py-10 mt-8 border-t border-white/10 bg-[#020202]">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex flex-col gap-6">
        {/* Top Track (Moves Left) */}
        <div className="animate-marquee-left flex items-center">
          {row1.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-3 mx-6 group cursor-default">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                {tech.icon}
              </div>
              <span className="text-xl md:text-2xl font-black font-mono text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Bottom Track (Moves Right) */}
        <div className="animate-marquee-right flex items-center">
          {row2.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-3 mx-6 group cursor-default">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                {tech.icon}
              </div>
              <span className="text-xl md:text-2xl font-black font-mono text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- LANDING PAGE (index.tsx) ---
const LandingPage = () => {
  // Restart typing animation cleanly on mount
  const [typingKey, setTypingKey] = useState(0);
  useEffect(() => setTypingKey(prev => prev + 1), []);

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0a0a0a] bg-grid-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a] pointer-events-none z-0"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 relative z-10 min-h-full flex flex-col">
        
        {/* Top Layout Structure: 2 Columns. Left = Text+Code, Right = Lanyard Anchor */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 flex-1">
          
          {/* LEFT COLUMN: Header Text & Code Blocks */}
          <div className="flex-1 flex flex-col pt-8">
            
            {/* Header Area */}
            <div className="space-y-4 mb-16 relative">
              <div className="text-gray-500 font-mono text-sm flex items-center gap-2 mb-4">
                <span className="text-gray-600">//</span> Full Stack Developer & AI Solutions Builder
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter drop-shadow-2xl leading-[0.9]">
                Aniruth R.
              </h1>
              
              <div className="font-mono text-sm md:text-base mt-6 text-gray-300 flex items-center bg-white/5 border border-white/10 w-fit px-4 py-2.5 rounded-lg shadow-xl backdrop-blur-sm">
                <span className="text-blue-400 mr-2">const</span> 
                <span className="text-blue-300 mr-2">tagline</span> 
                <span className="text-white mr-2">=</span> 
                <span key={typingKey} className="text-green-400 typing-container">"Crafting scalable apps & AI-driven solutions."</span>
                <span className="text-white ml-0.5">;</span>
                <span className="cursor-blink"></span>
              </div>
            </div>

            {/* Code Blocks Area (Matches the original screenshot layout perfectly) */}
            <div className="flex flex-col xl:flex-row gap-6 max-w-4xl">
              {/* profile.json */}
              <div className="flex-1 rounded-xl border border-white/10 bg-[#0d0d0d] shadow-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                <div className="flex items-center px-4 py-2 bg-[#141414] border-b border-white/10">
                  <span className="text-xs font-mono text-gray-500">// profile.json</span>
                </div>
                <div className="p-5 font-mono text-xs md:text-sm leading-loose text-gray-300">
                  {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"name"</span>: <span className="text-green-400">"Aniruth"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"role"</span>: <span className="text-green-400">"Full Stack Dev"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"problems"</span>: <span className="text-amber-400">300+</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"stack"</span>: <span className="text-green-400">"React, Node, AI/ML"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"leetcode"</span>: <span className="text-green-400">"Aniruth_Pvt"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"open_source"</span>: <span className="text-purple-400">true</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-300">"status"</span>: <span className="text-emerald-400">"available"</span><br/>
                  {'}'}
                </div>
              </div>

              {/* Bash Terminal */}
              <div className="flex-1 rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                <div className="flex items-center px-4 py-2 bg-[#141414] border-b border-white/10 gap-2">
                  <div className="flex gap-1.5 mr-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 text-center flex-1 pr-8">bash - kernel</span>
                </div>
                <div className="p-5 font-mono text-xs md:text-sm leading-loose">
                  <div className="text-gray-300">
                    <span className="text-green-400 font-bold">aniruth@dev</span>:<span className="text-blue-400 font-bold">~</span>$ cat /etc/profile
                  </div>
                  <div className="mt-3 space-y-1.5 border-l-2 border-white/5 pl-3 ml-1">
                    <div className="text-amber-400">LOCATION = <span className="text-gray-300">"Chennai, TN"</span></div>
                    <div className="text-amber-400">EMAIL = <span className="text-gray-300">"aniruthrajagopal2006@gmail.com"</span></div>
                    <div className="text-amber-400">DEGREE = <span className="text-gray-300">"B.E - Computer Science"</span></div>
                    <div className="text-amber-400">COLLEGE = <span className="text-gray-300">"SVCE, Chennai"</span></div>
                    <div className="text-amber-400">YEAR = <span className="text-gray-300">"2nd Year • 2024-2028"</span></div>
                  </div>
                  <div className="text-gray-300 mt-4 flex items-center">
                    <span className="text-green-400 font-bold">aniruth@dev</span>:<span className="text-blue-400 font-bold">~</span>$ <span className="w-2 h-4 bg-gray-300 ml-2 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Dedicated Lanyard Space */}
          {/* This ensures the lanyard hangs exactly on the right and doesn't overlap text awkwardly */}
          <div className="w-full lg:w-[450px] relative h-[650px] flex justify-center pointer-events-none">
             <div className="absolute top-0 w-full h-full pointer-events-auto">
               <LanyardCard />
             </div>
          </div>

        </div>
        
        {/* Full-width Dual Track Tech Carousel */}
        <TechCarousel />
        
      </div>
    </main>
  );
};

// --- ADVANCED 3D DRAGGABLE PHYSICS LANYARD COMPONENT ---
const LanyardCard = () => {
  const cardRef = useRef(null);
  const stringRef = useRef(null);
  const glareRef = useRef(null);
  
  const [dragging, setDragging] = useState(false);
  
  // Physics State tracking
  const pos = useRef({ x: 0, y: 280 }); // Resting length of the lanyard increased for right-side anchor
  const vel = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handleDown = (e) => {
    setDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - pos.current.x, y: clientY - pos.current.y };
    vel.current = { x: 0, y: 0 };
    document.body.style.cursor = 'grabbing';
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const newX = clientX - dragStart.current.x;
      const newY = clientY - dragStart.current.y;
      vel.current = { x: newX - pos.current.x, y: newY - pos.current.y };
      pos.current = { x: newX, y: newY };
    };

    const handleUp = () => {
      if (dragging) {
         setDragging(false);
         document.body.style.cursor = 'auto';
      }
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [dragging]);

  // Main Physics Engine Loop
  useEffect(() => {
    let animationFrameId;
    const restingY = 280; // Resting length
    const stiffness = 0.05; // Spring tension
    const damping = 0.90;   // Bounciness
    const mass = 1.2;

    const updatePhysics = () => {
      if (!dragging) {
        const forceX = (0 - pos.current.x) * stiffness;
        const forceY = (restingY - pos.current.y) * stiffness;
        vel.current.x = (vel.current.x + forceX / mass) * damping;
        vel.current.y = (vel.current.y + forceY / mass) * damping;
        pos.current.x += vel.current.x;
        pos.current.y += vel.current.y;
      }

      if (cardRef.current && stringRef.current) {
         const dx = pos.current.x;
         const dy = pos.current.y;
         const length = Math.hypot(dx, dy);
         const angle = Math.atan2(dy, dx); 

         stringRef.current.style.width = `${length}px`;
         stringRef.current.style.transform = `rotate(${angle}rad)`;

         const tiltX = dragging ? (vel.current.y * -0.5) : ((restingY - dy) * 0.15 + vel.current.y * 0.5);
         const tiltY = dragging ? (vel.current.x * 0.5) : (dx * 0.05 + vel.current.x * 0.5);
         const tiltZ = dx * 0.05 + vel.current.x * 0.1;

         cardRef.current.style.transform = `translate3d(calc(-50% + ${dx}px), ${dy}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg)`;

         if (glareRef.current) {
            const glareX = 50 - (tiltY * 2);
            const glareY = 50 + (tiltX * 2);
            glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
         }
      }
      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    updatePhysics();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dragging]);

  return (
    <div className="absolute top-[0px] left-1/2 z-50 select-none">
      {/* Fixed Anchor Pin */}
      <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-700 rounded-full absolute top-[-12px] left-[-12px] border-2 border-gray-900 z-10 shadow-[0_5px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
         <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
      </div>

      {/* Dynamic 2D String */}
      <div
        ref={stringRef}
        className="bg-gradient-to-b from-[#111] via-[#444] to-[#111] absolute left-0 top-0 origin-left shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-0"
        style={{ height: '4px', width: '280px', transform: 'rotate(90deg)' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]"></div>
      </div>

      {/* The Physics Card Wrapper */}
      <div
        ref={cardRef}
        onMouseDown={handleDown}
        onTouchStart={handleDown}
        className={`absolute top-0 left-0 flex flex-col items-center transform-style-3d z-20 ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ transform: 'translate3d(-50%, 280px, 0)' }}
      >
        <div className="w-10 h-14 bg-gradient-to-br from-gray-200 via-gray-500 to-gray-800 rounded-t-lg border-x-2 border-t-2 border-gray-400 relative z-10 shadow-[0_10px_20px_rgba(0,0,0,0.7)] flex flex-col items-center justify-start pt-2">
           <div className="w-3 h-3 rounded-full bg-gray-900 shadow-inner border border-gray-600"></div>
           <div className="w-6 h-[2px] bg-gray-700 mt-2 opacity-50"></div>
           <div className="w-6 h-[2px] bg-gray-700 mt-1 opacity-50"></div>
        </div>
        
        <div className="card-3d-element w-72 h-[380px] bg-[#111] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative border border-white/10 -mt-3">
          <div className="absolute inset-0 bg-[#0a0a0a] rounded-2xl card-edge pointer-events-none"></div>
          <div ref={glareRef} className="absolute inset-0 rounded-2xl z-50 pointer-events-none"></div>
          <div className="absolute inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-2xl z-40 pointer-events-none backdrop-blur-[1px]"></div>
          
          <div className="absolute inset-[3px] bg-[#0d0d0d] rounded-[14px] flex flex-col p-4 overflow-hidden z-30 pointer-events-none">
            <div className="flex-1 bg-black rounded-xl overflow-hidden relative border border-white/5 shadow-inner">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] z-10"></div>
               <img 
                 src="./profile.jpg" 
                 alt="Aniruth R." 
                 className="w-full h-full object-cover relative z-0 transition-transform duration-700 hover:scale-110"
                 onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"; }}
               />
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-20 pointer-events-none"></div>
               <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono text-amber-500 border border-amber-500/30 z-30">
                 ACTIVE
               </div>
            </div>

            <div className="h-20 mt-4 flex flex-col items-center justify-center relative bg-white/5 rounded-lg border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-marquee-left pointer-events-none opacity-50"></div>
              <div className="text-white font-black text-xl tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">ANIRUTH R.</div>
              <div className="text-amber-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-1">Level 99 Engineer</div>
              <div className="text-gray-600 font-mono text-[8px] mt-2">ID: AR-0X9F4B</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ABOUT PAGE COMPONENT ---
const AboutPage = () => (
  <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0a0a0a] relative">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[8px] leading-tight text-emerald-500 z-0 select-none">
      <div className="animate-scroll-bg h-[200%] w-full">
        {`function initializeSystem() { const matrix = new RAGPipeline(); while(true) { optimize(); connect_nodes(); fetch_data(); } } \n`.repeat(200)}
      </div>
    </div>

    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-6 relative z-10 pt-16">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-100 flex items-center">
          <span className="text-amber-500 mr-3 text-2xl font-mono">{'>'}</span>
          <span className="text-white">System Architecture & Metrics</span>
          <span className="cursor-blink"></span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed">
          I build clean, scalable software, design agentic AI workflows, and ship products with strong structure. Transitioned from theoretical knowledge to production-first engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Identity Matrix */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] overflow-hidden flex flex-col shadow-lg">
          <div className="flex items-center px-4 py-2 bg-[#141414] border-b border-white/10">
            <span className="text-xs font-mono text-gray-500 mr-2">SYS</span>
            <span className="text-[11px] font-mono text-gray-300">Identity_Matrix.ts</span>
          </div>
          <div className="flex flex-row flex-1 p-0 relative">
            <div className="w-[40%] bg-[#080808] border-r border-white/10 p-4 flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.4)_0%,transparent_70%)] group-hover:opacity-40 transition-opacity duration-500"></div>
               <div className="w-20 h-20 relative z-10 mb-2">
                  <div className="absolute inset-0 border border-amber-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                  <div className="absolute inset-[-4px] border border-dashed border-emerald-500/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
                  <img src="https://api.dicebear.com/7.x/micah/svg?seed=Aniruth&backgroundColor=transparent" className="w-full h-full p-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" alt="Avatar"/>
               </div>
               <span className="text-[10px] font-bold text-gray-200 z-10 tracking-widest mt-1">ANIRUTH.SYS</span>
               <span className="text-[8px] font-mono text-amber-500 z-10 mt-0.5">LVL 99 ENGINEER</span>
            </div>
            <div className="w-[60%] p-4 font-mono text-[12px] overflow-x-auto flex items-center leading-relaxed">
              <pre>
                <span className="text-pink-400">export class</span> <span className="text-amber-200">Builder</span> {'{'}
                <br/>  <span className="text-blue-400">role</span> = <span className="text-green-400">"Full-Stack Dev"</span>;
                <br/>  <span className="text-blue-400">focus</span> = <span className="text-green-400">"Agentic AI"</span>;
                <br/><br/>  <span className="text-yellow-200">execute</span>() {'{'}
                <br/>    <span className="text-pink-400">return</span> <span className="text-green-400">"ship-products"</span>;
                <br/>  {'}'}
                <br/>{'}'};
              </pre>
            </div>
          </div>
        </div>

        {/* Dynamic Terminal */}
        <div className="rounded-xl border border-white/10 bg-[#050505] overflow-hidden flex flex-col shadow-lg relative">
          <div className="flex items-center px-4 py-2 bg-[#141414] border-b border-white/10 relative z-20">
            <span className="text-xs font-mono text-gray-500">bash - execution_log.sh</span>
          </div>
          <div className="p-5 font-mono text-[13px] h-48 overflow-y-auto relative z-10">
             <div className="text-emerald-400 mb-2">[OK] Agentic pipelines verified.</div>
             <div className="text-gray-400 mb-2">{'>'} Compiling technical stack...</div>
             <div className="text-yellow-400 mb-2">[WARN] High optimization detected.</div>
             <div className="text-emerald-400 mb-2">[OK] 15+ production modules mounted.</div>
             <div className="text-amber-400 font-bold mb-2">{'>'} STATUS: Open to internships.</div>
             <div className="text-emerald-400 mb-2">✓ Ready for command input.</div>
             <div className="text-gray-500 flex items-center gap-2 mt-3">
               <span className="text-amber-500">{'>'}</span> <span className="cursor-blink"></span>
             </div>
          </div>
        </div>

        {/* Live Services Health */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] overflow-hidden flex flex-col shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] font-mono text-gray-300">Live_Services.sys</span>
            </div>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center gap-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div><span className="text-[13px] font-mono text-gray-300">Agentic_Router_API</span></div><div className="flex items-center gap-3"><span className="text-[11px] text-gray-500 font-mono">12ms</span><span className="text-[11px] text-emerald-400 font-mono">ONLINE</span></div></div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div><span className="text-[13px] font-mono text-gray-300">Vector_Embeddings</span></div><div className="flex items-center gap-3"><span className="text-[11px] text-gray-500 font-mono">45ms</span><span className="text-[11px] text-emerald-400 font-mono">ONLINE</span></div></div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div><span className="text-[13px] font-mono text-gray-300">Auth_Gateway</span></div><div className="flex items-center gap-3"><span className="text-[11px] text-gray-500 font-mono">18ms</span><span className="text-[11px] text-emerald-400 font-mono">ONLINE</span></div></div>
          </div>
        </div>
      </div>
    </div>
  </main>
);