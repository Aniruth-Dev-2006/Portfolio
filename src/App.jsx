import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Route,
  Activity,
  Code2,
  Database,
  Terminal,
  Bot,
  Zap,
  Workflow,
  Cpu,
  LayoutGrid,
  DatabaseIcon,
  CheckCircle2,
  Flame,
  Globe,
  Radio,
  Copy,
  Check,
  Mail,
  Send,
  ChevronRight
} from 'lucide-react';
import Lanyard from './components/Lanyard/Lanyard';
import Background from './components/Background';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';

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

// --- PROFESSIONAL AVATAR URL ---
const AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&clothing=blazerAndShirt&backgroundColor=transparent";

// --- CUSTOM CSS (Animations & Transitions) ---
const customStyles = `
  @keyframes bootUp {
    0% { height: 100vh; opacity: 1; }
    80% { height: 100vh; opacity: 1; }
    100% { height: 0vh; opacity: 0; display: none; }
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes typeText { from { width: 0; } to { width: 100%; } }
  @keyframes progressFill { from { width: 0%; } }
  @keyframes scrollBg { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes pulseGlow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
  @keyframes barPulse { 0%, 100% { height: 20%; background: #333; } 50% { height: 100%; background: #f59e0b; } }
  
  @keyframes macWindowOpen {
    0% { opacity: 0; transform: scale(0.92) translateY(20px); filter: blur(12px); }
    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
  }
  .animate-mac-open { animation: macWindowOpen 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
  .animate-marquee { display: flex; width: 200%; animation: marquee 25s linear infinite; }
  .animate-marquee:hover { animation-play-state: paused; }
  
  .glitch-wrapper { position: relative; display: inline-block; }
  .glitch { position: relative; color: white; font-weight: 800; }
  .glitch::before, .glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; }
  .glitch::before { left: 2px; text-shadow: -2px 0 #10b981; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim 3s infinite linear alternate-reverse; }
  .glitch::after { left: -2px; text-shadow: -2px 0 #f59e0b; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; }
  @keyframes glitch-anim {
    0% { clip: rect(10px, 9999px, 34px, 0); } 20% { clip: rect(85px, 9999px, 11px, 0); } 40% { clip: rect(23px, 9999px, 98px, 0); }
    60% { clip: rect(76px, 9999px, 23px, 0); } 80% { clip: rect(12px, 9999px, 78px, 0); } 100% { clip: rect(54px, 9999px, 45px, 0); }
  }

  .animate-boot { animation: bootUp 3s ease-in-out forwards; }
  .animate-progress { animation: progressFill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-scroll-bg { animation: scrollBg 40s linear infinite; }
  .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  
  @keyframes travelRight { 0% { left: -5%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 105%; opacity: 0; } }
  @keyframes travelDown { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
  .animate-travel-x { animation: travelRight 2.5s infinite linear; }
  .animate-travel-y { animation: travelDown 2.5s infinite linear; }
  
  @keyframes progressX { from { width: 0%; } to { width: 100%; } }
  .animate-progress-x { animation: progressX 5s linear forwards; }
  
  .ping-bar { width: 4px; border-radius: 2px; animation: barPulse 1.5s infinite ease-in-out; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
  
  .typing-container { display: inline-block; overflow: hidden; white-space: nowrap; animation: typeText 1.5s steps(40, end) forwards; width: 0; }
  .cursor-blink { display: inline-block; width: 8px; height: 1em; background-color: #fff; margin-left: 4px; vertical-align: middle; animation: blink 1s step-end infinite; }

  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .transform-style-3d { transform-style: preserve-3d; }
  .card-edge { transform: translateZ(-1px); filter: brightness(0.4); }

  .page-transition-wrapper { }
  .page-enter { animation: macWindowOpen 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .page-exit { animation: macWindowClose 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; }
  
  @keyframes macWindowClose {
    0% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
    100% { opacity: 0; transform: scale(0.96) translateY(10px); filter: blur(5px); }
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #444; }
  
  .activity-box { transition: transform 0.1s; }
  .activity-box:hover { transform: scale(1.5); z-index: 10; box-shadow: 0 0 10px rgba(255,255,255,0.3); }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState('index.tsx');
  const [renderedTab, setRenderedTab] = useState('index.tsx');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bootSequenceFinished, setBootSequenceFinished] = useState(false);
  const [showIDE, setShowIDE] = useState(false);
  const [bootLogs, setBootLogs] = useState([]);

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
        setTimeout(() => {
          setBootSequenceFinished(true);
          setTimeout(() => setShowIDE(true), 100);
        }, 800);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setRenderedTab(newTab);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <>
      <style>{customStyles}</style>

      {!bootSequenceFinished && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-end p-8 animate-boot pointer-events-none">
          <div className="font-mono text-xs md:text-sm text-[#10b981] space-y-1 mb-10 relative z-10">
            {bootLogs.map((log, i) => (
              <div key={i} className="flex">
                <span className="text-[#10b981] mr-2">❯</span>
                <span dangerouslySetInnerHTML={{ __html: log }}></span>
                {i === bootLogs.length - 1 && <span className="cursor-blink bg-[#10b981] w-2 h-4 inline-block ml-1.5 align-middle"></span>}
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <div className="text-[#f59e0b] font-mono text-5xl font-bold mb-4 glitch-wrapper">
              <span className="glitch" data-text="<A/> Workspace">&lt;A/&gt; Workspace</span>
            </div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-[#f59e0b] animate-progress" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      )}

      {bootSequenceFinished && (
        <div className={`flex flex-col h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden selection:bg-white/20 selection:text-white ${showIDE ? 'animate-mac-open' : 'opacity-0'}`}>
          <TopNav activeTab={activeTab} handleTabChange={handleTabChange} />

          <div className={`flex flex-1 overflow-hidden page-transition-wrapper ${isTransitioning ? 'page-exit' : 'page-enter'}`}>
            {renderedTab === 'index.tsx' ? <LandingPage /> : renderedTab === 'about.ts' ? <AboutPage /> : renderedTab === 'projects.py' ? <ProjectsPage /> : renderedTab === 'contact.sh' ? <ContactPage /> : null}
          </div>
        </div>
      )}
    </>
  );
}

const TopNav = ({ activeTab, handleTabChange }) => (
  <header className="flex items-center justify-between px-4 h-12 min-h-[3rem] border-b border-[#222] bg-[#0a0a0a] z-50 relative shrink-0">
    <div className="flex items-center gap-6 h-full">
      <div className="flex items-center gap-2 font-mono font-bold tracking-tight cursor-default">
        <span className="text-white">&lt;A/&gt;</span>
        <span className="text-gray-300 hover:text-white transition-colors">Aniruth R.</span>
      </div>

      <nav className="hidden md:flex items-center h-full text-xs font-mono">
        <Tab name="index.tsx" active={activeTab === 'index.tsx'} onClick={() => handleTabChange('index.tsx')} />
        <Tab name="about.ts" active={activeTab === 'about.ts'} onClick={() => handleTabChange('about.ts')} />
        <Tab name="projects.py" active={activeTab === 'projects.py'} onClick={() => handleTabChange('projects.py')} />
        <Tab name="contact.sh" active={activeTab === 'contact.sh'} onClick={() => handleTabChange('contact.sh')} />
      </nav>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 text-gray-500">
        <a href="https://github.com/Aniruth-Dev-2006" target="_blank" rel="noreferrer">
          <GithubIcon className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
        </a>
        <a href="https://www.linkedin.com/in/aniruth-r-19b667374/" target="_blank" rel="noreferrer">
          <LinkedinIcon className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
        </a>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#111] border border-[#333] text-[#10b981] text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:border-[#10b981]/50 transition-colors">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-50"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]"></span>
        </span>
        Open to work
      </div>
    </div>
  </header>
);

const Tab = ({ name, active, onClick }) => {
  const ext = name.split('.')[1];
  const colorMap = {
    tsx: 'text-[#61afef]',
    ts: 'text-[#61afef]',
    py: 'text-[#e5c07b]',
    json: 'text-[#98c379]',
    sh: 'text-gray-300'
  };

  return (
    <div onClick={onClick} className={`flex items-center h-full gap-2 px-4 cursor-pointer border-t-2 transition-all duration-300 ${active ? 'bg-[#111] border-white text-white' : 'border-transparent text-[#7f848e] hover:bg-[#111] hover:text-gray-300'
      }`}>
      <span className={active ? colorMap[ext] : 'text-[#7f848e]'}>
        {name.includes('.json') ? '{}' : name.includes('.sh') ? '$' : name.includes('.py') ? '◧' : name.includes('.tsx') ? '⚛' : 'TS'}
      </span>
      {name}
    </div>
  );
};

const TechCarousel = () => {
  const techStack = [
    { name: "React", icon: <Code2 className="w-4 h-4 text-gray-400" /> },
    { name: "Kubernetes", icon: <DatabaseIcon className="w-4 h-4 text-gray-400" /> },
    { name: "Node.js", icon: <Terminal className="w-4 h-4 text-gray-400" /> },
    { name: "Python", icon: <Bot className="w-4 h-4 text-gray-400" /> },
    { name: "TensorFlow", icon: <Cpu className="w-4 h-4 text-gray-400" /> },
    { name: "Java", icon: <Database className="w-4 h-4 text-gray-400" /> },
    { name: "Scikit-Learn", icon: <Activity className="w-4 h-4 text-gray-400" /> },
    { name: "C++", icon: <Terminal className="w-4 h-4 text-gray-400" /> },
    { name: "HTML5", icon: <LayoutGrid className="w-4 h-4 text-gray-400" /> },
    { name: "CSS3", icon: <LayoutGrid className="w-4 h-4 text-gray-400" /> },
    { name: "JS", icon: <Code2 className="w-4 h-4 text-gray-400" /> },
    { name: "n8n", icon: <Workflow className="w-4 h-4 text-gray-400" /> },
  ];

  const row1 = [...techStack, ...techStack, ...techStack];

  return (
    <div className="w-full relative overflow-hidden py-3 bg-[#0a0a0a] border border-[#222] rounded-full shadow-lg">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none rounded-l-full"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none rounded-r-full"></div>

      <div className="animate-marquee flex items-center">
        {row1.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-2 mx-5 group cursor-default">
            <span className="text-gray-600 group-hover:text-white transition-colors duration-300">{tech.icon}</span>
            <span className="text-sm font-medium font-mono text-gray-500 group-hover:text-gray-200 transition-colors duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpotlightCard = ({ children, className }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-[#222] bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.03), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

const InteractiveJsonCard = () => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText('{"name": "Aniruth", "role": "Full Stack Dev"}');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = [
    { num: 1, text: '{' },
    { num: 2, text: '  "name": "Aniruth",', hl: ["name", "Aniruth"] },
    { num: 3, text: '  "role": "Full Stack Dev",', hl: ["role", "Full Stack Dev"] },
    { num: 4, text: '  "problems": 300+,', hl: ["problems"], isNum: true },
    { num: 5, text: '  "stack": "React, Node, AI/ML",', hl: ["stack", "React, Node, AI/ML"] },
    { num: 6, text: '  "status": "available"', hl: ["status", "available"] },
    { num: 7, text: '}' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050505]/40">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-[#222] backdrop-blur-sm">
        <span className="text-xs font-mono text-[#7f848e]">// profile.json</span>
        <button onClick={copyToClipboard} className="text-[#7f848e] hover:text-white transition-colors bg-[#111] p-1.5 rounded z-10 relative border border-transparent hover:border-[#333]">
          {copied ? <Check size={12} className="text-white" /> : <Copy size={12} />}
        </button>
      </div>
      <div className="p-4 font-mono text-xs md:text-sm leading-loose flex-1 overflow-y-auto">
        {lines.map((line) => (
          <div key={line.num} className="flex group hover:bg-[#111] px-2 -mx-2 rounded transition-colors cursor-text">
            <span className="text-[#444] w-6 select-none">{line.num}</span>
            <span className="text-gray-300">
              {line.num === 1 || line.num === 7 ? <span className="text-gray-300">{line.text}</span> : (
                <>
                  &nbsp;&nbsp;<span className="text-[#e06c75]">"{line.hl[0]}"</span><span className="text-gray-300">: </span>
                  <span className={line.isNum ? "text-[#d19a66]" : "text-[#98c379]"}>{line.isNum ? line.text.split(': ')[1] : `"${line.hl[1]}"`}</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'aniruth@dev:~$ whoami' },
    { type: 'output', text: 'Aniruth R. | CSE Student | AI Builder' },
    { type: 'system', text: 'aniruth@dev:~$ ls -la skills/' },
    { type: 'output', text: 'drwxr-xr-x 2 aniruth dev 4096 React Node Python AWS' },
    { type: 'info', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'system', text: `aniruth@dev:~$ ${input}` }];

      if (cmd === 'help') {
        newHistory.push({ type: 'output', text: 'Commands: help, whoami, skills, projects, contact, clear' });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'output', text: 'Aniruth R. - Full Stack Developer & AI Solutions Builder.' });
      } else if (cmd === 'skills') {
        newHistory.push({ type: 'output', text: 'React, Node.js, Python, TensorFlow, Kubernetes, AWS' });
      } else if (cmd === 'projects') {
        newHistory.push({ type: 'output', text: '1. Agentic RAG Pipeline\n2. Next.js SaaS Platform\n3. 3D Physics Portfolio' });
      } else if (cmd === 'contact') {
        newHistory.push({ type: 'output', text: 'Email: aniruthrajagopal2006@gmail.com\nGitHub: @aniruth_sys' });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd !== '') {
        newHistory.push({ type: 'error', text: `command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className={`flex flex-col h-full bg-[#050505]/40 backdrop-blur-sm transition-shadow duration-300 ${isFocused ? 'shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]' : ''}`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center px-4 py-2 bg-[#0a0a0a] border-b border-[#222] gap-2 shrink-0">
        <div className="flex gap-1.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-[#333]"></div>
          <div className="w-3 h-3 rounded-full bg-[#444]"></div>
          <div className="w-3 h-3 rounded-full bg-[#555]"></div>
        </div>
        <span className="text-xs font-mono text-[#7f848e] text-center flex-1 pr-8">bash - interactive</span>
      </div>
      <div ref={scrollRef} className="p-4 font-mono text-xs md:text-sm leading-relaxed flex-1 overflow-y-auto">
        {history.map((line, i) => (
          <div key={i} className={`mb-1.5 ${line.type === 'system' ? 'text-gray-300' :
            line.type === 'info' ? 'text-[#98c379] font-bold' :
              line.type === 'error' ? 'text-[#e06c75]' : 'text-gray-400 whitespace-pre-wrap'
            }`}>
            {line.type === 'system' ? (
              <span><span className="text-[#98c379] font-bold">aniruth</span><span className="text-[#61afef] font-bold">@dev</span><span className="text-gray-300 font-bold">:</span><span className="text-[#e5c07b] font-bold">~</span><span className="text-gray-300">$</span> <span className="text-gray-200">{line.text.split('$ ')[1]}</span></span>
            ) : line.text}
          </div>
        ))}
        <div className="flex items-center text-gray-400 mt-2">
          <span className="text-[#98c379] font-bold">aniruth</span><span className="text-[#61afef] font-bold">@dev</span><span className="text-gray-300 font-bold">:</span><span className="text-[#e5c07b] font-bold">~</span><span className="text-gray-300">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none ml-2 text-white font-mono focus:ring-0 relative z-10"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

const ContactFooter = () => (
  <div className="w-full mt-2 animate-fade-up delay-[600ms]">
    <div className="relative rounded-2xl overflow-hidden border border-[#222] bg-[#0a0a0a] p-8 md:p-10 group transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-white/10"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left w-full lg:w-auto flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-[#333] mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">Available for new opportunities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Initiate Connection.
          </h2>
          <p className="text-[#8b949e] font-mono text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
            Whether you have a question, an internship opportunity, or just want to discuss tech—my inbox is always open.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 z-20 relative">
          <a
            href="mailto:aniruthrajagopal2006@gmail.com"
            className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#10b981] text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Mail size={18} className="relative z-10" />
            <span className="relative z-10 font-mono text-sm">Send Email</span>
          </a>
          <a
            href="https://github.com/Aniruth-Dev-2006"
            target="_blank"
            rel="noreferrer"
            className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111] border border-[#333] text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-[#222]"
          >
            <GithubIcon className="w-5 h-5 relative z-10 text-gray-400 group-hover/btn:text-[#10b981] transition-colors" />
            <span className="relative z-10 font-mono text-sm text-gray-300 group-hover/btn:text-white transition-colors">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

// --- LANDING PAGE (index.tsx) ---
const LandingPage = () => {
  const [typingKey, setTypingKey] = useState(0);
  useEffect(() => setTypingKey(prev => prev + 1), []);

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#050505] bg-grid-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505] pointer-events-none z-0"></div>

      <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-10 pt-8 pb-12 relative z-10 min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 flex-1 mb-10 lg:mb-12">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-start z-20 w-full pr-0 lg:pr-4">
            <div className="space-y-3 mb-8 relative">
              <div className="text-[#8b949e] font-mono text-sm flex items-center gap-2 mb-2">
                // Full Stack Developer & AI Solutions Builder
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[90px] xl:text-[110px] font-black text-white tracking-tighter leading-[0.9]">
                Aniruth R.
              </h1>

              <div className="font-mono text-sm md:text-base mt-4 text-gray-300 flex items-center bg-[#0a0a0a] border border-[#222] w-fit px-4 py-2.5 rounded-lg shadow-lg">
                <span className="text-[#c678dd] mr-2">const</span>
                <span className="text-[#61afef] mr-2">tagline</span>
                <span className="text-gray-300 mr-2">=</span>
                <span key={typingKey} className="text-[#98c379] typing-container">"Crafting scalable apps & AI-driven solutions."</span>
                <span className="text-gray-500 ml-0.5">;</span>
                <span className="cursor-blink"></span>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-5 w-full mb-5">
              <SpotlightCard className="flex-1 min-h-[240px] z-20">
                <InteractiveJsonCard />
              </SpotlightCard>
              <SpotlightCard className="flex-1 min-h-[240px] z-20">
                <InteractiveTerminal />
              </SpotlightCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <a href="https://leetcode.com/u/Aniruth_Pvt/" target="_blank" rel="noopener noreferrer" className="block z-20 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <SpotlightCard className="p-5 flex flex-col justify-between group min-h-[140px] h-full border border-[#222] hover:border-[#555] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" /> Development Activity
                    </h3>
                    <div className="flex items-end h-5 gap-1 overflow-hidden">
                      <div className="w-1 bg-[#10b981]/40 h-2"></div>
                      <div className="w-1 bg-[#10b981]/60 h-4"></div>
                      <div className="w-1 bg-[#10b981]/80 h-3"></div>
                      <div className="w-1 bg-[#10b981] h-5"></div>
                      <div className="w-1 bg-white h-full animate-pulse shadow-[0_0_8px_#fff]"></div>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-[#8b949e] leading-relaxed">Consistently shipping code, solving complex algorithmic problems, and optimizing backend systems.</p>
                  <div className="mt-4 pt-3 border-t border-[#222] flex justify-between text-[10px] font-mono">
                    <span className="text-black bg-white px-2 py-0.5 rounded font-bold">300+ SOLVED</span>
                    <span className="text-gray-500">O(1) COMPLEXITY</span>
                  </div>
                </SpotlightCard>
              </a>

              <SpotlightCard className="p-5 flex flex-col justify-between group min-h-[140px] relative z-20">
                <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <Bot size={100} className="text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" /> Current Focus
                  </h3>
                  <p className="text-xs font-mono text-[#8b949e]">Agentic RAG Workflows & Scaling</p>
                </div>
                <div className="mt-4 flex items-center gap-2 relative z-10 px-2">
                  <div className="p-1.5 bg-[#111] rounded-md border border-[#333] group-hover:border-[#555] transition-colors"><User size={14} className="text-gray-300" /></div>
                  <div className="flex-1 h-[1px] bg-[#333] relative">
                    <div className="absolute left-0 top-[-3px] w-1.5 h-1.5 rounded-full bg-white animate-travel-x"></div>
                  </div>
                  <div className="p-1.5 bg-[#111] rounded-md border border-[#333] group-hover:border-[#555] transition-colors"><Cpu size={14} className="text-gray-300" /></div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 relative min-h-[500px] xl:min-h-[550px] pointer-events-none z-30 flex justify-center items-start mt-10 lg:-mt-10 xl:-mt-16">
            <div className="absolute top-0 w-full max-w-[350px] mx-auto h-[500px] xl:h-[600px] flex justify-center pointer-events-auto">
              <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} cardImage="/profile.jpeg" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 z-20 mt-4 lg:mt-0">
          <TechCarousel />
          <ContactFooter />
        </div>
      </div>
    </main>
  );
};




// --- ABOUT PAGE COMPONENT ---
const AboutPage = () => {
  const [typingKey, setTypingKey] = useState(0);
  useEffect(() => setTypingKey(prev => prev + 1), []);

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#050505] relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[8px] leading-tight text-white z-0 select-none">
        <div className="animate-scroll-bg h-[200%] w-full">
          {`function initializeSystem() { const matrix = new RAGPipeline(); while(true) { optimize(); connect_nodes(); fetch_data(); } } \n`.repeat(200)}
        </div>
      </div>

      <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-12 py-10 space-y-8 relative z-10 pt-16">

        {/* Restored Original About Content with VS Code Theme */}
        <div className="space-y-4 pt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center mb-2 w-fit">
            <span className="text-[#f59e0b] mr-3 text-2xl font-mono">{'>'}</span>
            <span key={typingKey} className="typing-container text-white pb-1">System Architecture & Metrics</span>
            <span className="cursor-blink bg-[#f59e0b] ml-1"></span>
          </h1>
          <div className="text-[#7f848e] font-mono text-sm mb-6">// background, experience, and skills</div>

          <p className="font-mono text-sm md:text-base text-[#8b949e] leading-relaxed max-w-3xl">
            I build clean, scalable software, design agentic AI workflows, and ship products with strong structure. Transitioned from theoretical knowledge to production-first engineering.
          </p>
        </div>

        {/* Top Row: Identity & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-[#61afef]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center px-4 py-2 bg-[#050505] border-b border-[#222]">
              <span className="text-xs font-mono text-[#7f848e] mr-2">SYS</span>
              <span className="text-[11px] font-mono text-[#61afef]">Identity_Matrix.ts</span>
            </div>
            <div className="flex flex-row flex-1 p-0 relative">
              <div className="w-[40%] bg-[#080808] border-r border-[#222] p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="w-20 h-20 relative z-10 mb-2 bg-[#050505] rounded-full flex items-center justify-center overflow-hidden border border-[#333]">
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_4s_linear_infinite] z-20 pointer-events-none"></div>
                  <img
                    src="./profile.jpeg"
                    className="w-[90%] h-[90%] object-cover object-[center_top] rounded-full z-10"
                    alt="Aniruth R."
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                </div>
                <span className="text-[10px] font-bold text-white z-10 tracking-widest mt-1">ANIRUTH.SYS</span>
                <span className="text-[8px] font-mono text-gray-500 z-10 mt-0.5">LVL 99 ENGINEER</span>
              </div>
              <div className="w-[60%] p-4 font-mono text-[12px] overflow-x-auto flex items-center leading-relaxed">
                <pre>
                  <span className="text-[#c678dd]">export class</span> <span className="text-[#e5c07b]">Builder</span> {'{'}
                  <br />  <span className="text-[#e06c75]">role</span> <span className="text-gray-300">=</span> <span className="text-[#98c379]">"Full-Stack Dev"</span>;
                  <br />  <span className="text-[#e06c75]">focus</span> <span className="text-gray-300">=</span> <span className="text-[#98c379]">"Agentic AI"</span>;
                  <br /><br />  <span className="text-[#61afef]">execute</span>() {'{'}
                  <br />    <span className="text-[#c678dd]">return</span> <span className="text-[#98c379]">"ship-products"</span>;
                  <br />  {'}'}
                  <br />{'}'};
                </pre>
              </div>
            </div>
          </div>

          <LiveTerminalAbout />

          <div className="rounded-xl border border-[#222] bg-[#0a0a0a] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-[#61afef]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#050505] border-b border-[#222]">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[11px] font-mono text-[#8b949e]">Live_Services.sys</span>
              </div>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-center gap-5">
              <div className="flex items-center justify-between border-b border-[#222] pb-3"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div><span className="text-[13px] font-mono text-gray-300">Luvara_Platform</span></div><div className="flex items-center gap-3"><span className="text-[11px] text-[#e5c07b] font-mono">12ms</span><span className="text-[11px] text-[#00e59b] font-mono">ONLINE</span></div></div>
              <div className="flex items-center justify-between border-b border-[#222] pb-3"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></div><span className="text-[13px] font-mono text-gray-300">Aurex_Creative_AI</span></div><div className="flex items-center gap-3"><span className="text-[11px] text-[#e5c07b] font-mono">45ms</span><span className="text-[11px] text-[#00e59b] font-mono">ONLINE</span></div></div>
              <div className="flex items-center justify-between border-b border-[#222] pb-3"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse"></div><span className="text-[13px] font-mono text-gray-300">Lawbridge_iCube</span></div><div className="flex items-center gap-3"><span className="text-[11px] text-[#e5c07b] font-mono">18ms</span><span className="text-[11px] text-[#00e59b] font-mono">ONLINE</span></div></div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE STORY & SKILLS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">

          {/* Interactive Journey Flow */}
          <div className="lg:col-span-8 rounded-xl border border-[#222] bg-[#0a0a0a] p-6 lg:p-8 flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
                <Route className="w-4 h-4 text-gray-500" /> The Developer Journey
              </h3>
            </div>
            <InteractiveJourney />
          </div>

          {/* Expanded Aesthetic Skills Grid */}
          <div className="lg:col-span-4 rounded-xl border border-[#222] bg-[#0a0a0a] p-6 lg:p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2 mb-6">
              <Cpu className="w-4 h-4 text-gray-500" /> Core Technologies
            </h3>
            <div className="space-y-6 flex-1 relative z-10">
              <SkillCategory title="Areas of Interest" skills={["Agentic AI", "Drug Repurposing", "Autonomous Workflows", "Cybersecurity"]} />
              <SkillCategory title="Languages" skills={["Python", "TypeScript", "C++", "Java", "SQL"]} />
              <SkillCategory title="AI & Data" skills={["TensorFlow", "Scikit-Learn", "Vector DBs", "RAG", "LLMs"]} />
              <SkillCategory title="Frontend" skills={["React", "Next.js", "Tailwind CSS", "Three.js"]} />
              <SkillCategory title="Backend & Ops" skills={["Node.js", "FastAPI", "REST API", "Kubernetes", "AWS"]} />
            </div>
          </div>

        </div>

        {/* Metrics and Graph Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="300+" label="DSA Solved" icon={Database} />
            <StatCard value="250+" label="LeetCode" icon={Code2} href="https://leetcode.com/u/Aniruth_Pvt/" />
            <StatCard value="5+" label="Projects" icon={Zap} />
            <StatCard value="20+" label="Technologies" icon={LayoutGrid} />
          </div>

          <div className="md:col-span-12 rounded-xl border border-[#222] bg-[#0a0a0a] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#61afef]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
                <Activity className="w-3 h-3 text-gray-500" /> Live Activity Matrix
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#61afef] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#61afef]"></span>
                </span>
                <span className="text-[10px] text-[#8b949e] font-mono uppercase">System Online</span>
              </div>
            </div>
            <ActivityGraph />
          </div>

          <div className="md:col-span-12 rounded-xl border border-[#222] bg-[#0a0a0a] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
                <Workflow className="w-3 h-3 text-gray-500" /> Agentic RAG Workflow Architecture
              </h3>
              <span className="text-[10px] font-mono text-black flex items-center gap-1.5 border border-white bg-white px-3 py-1 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                Live Pipeline
              </span>
            </div>

            <div className="mb-8 border-l-2 border-[#61afef] pl-4">
              <p className="text-sm font-mono text-[#8b949e] leading-relaxed max-w-4xl">
                <span className="text-[#61afef] font-bold">System Context:</span> I specialize in designing scalable, autonomous AI systems. 
                Below is a high-level visualization of a production-grade <strong className="text-white font-normal">Retrieval-Augmented Generation (RAG)</strong> pipeline I frequently deploy to orchestrate multi-agent reasoning and securely route data for AI applications.
              </p>
            </div>

            <WorkflowVisualizer />
          </div>
        </div>
      </div>
    </main>
  );
};

// --- ABOUT PAGE NEW COMPONENTS ---

const InteractiveJourney = () => {
  const steps = [
    {
      id: '01',
      title: 'The Spark',
      date: 'The Beginning',
      icon: Code2,
      text: 'My journey started with a fascination for how logic translates into interactive visuals. I built basic web applications, slowly transitioning from simple HTML/CSS to robust React ecosystems, mastering the art of state management and component architecture.'
    },
    {
      id: '02',
      title: 'The Shift',
      date: 'Diving Deep',
      icon: Database,
      text: 'As I mastered full-stack development, I fell into the rabbit hole of Data Structures, Algorithms, and Machine Learning. Solving 300+ DSA problems rewired how I approach optimization, leading me to explore neural networks and Python-backed systems.'
    },
    {
      id: '03',
      title: 'The Build',
      date: 'Present Day',
      icon: Bot,
      text: 'Today, I bridge the gap between intelligent systems and user-facing applications. I specialize in building Agentic RAG pipelines, deploying scalable microservices via Kubernetes, and engineering software that doesn’t just work—it thinks.'
    }
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeStep, steps.length]);

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full relative z-10">
      {/* Left side Timeline Navigation */}
      <div className="w-full md:w-1/3 flex flex-col justify-center gap-3 border-l border-[#333] pl-4 ml-2">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className={`text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${activeStep === idx ? 'bg-[#111] border border-[#333]' : 'hover:bg-[#111] border border-transparent'}`}
          >
            {/* Active Progress Bar */}
            {activeStep === idx && (
              <div className="absolute bottom-0 left-0 h-[2px] bg-white animate-progress-x"></div>
            )}
            <div className={`absolute -left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full transition-all duration-300 ${activeStep === idx ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-transparent'}`}></div>

            <div className={`text-[10px] font-mono mb-1 transition-colors duration-300 ${activeStep === idx ? 'text-[#e5c07b]' : 'text-[#7f848e]'}`}>
              {step.id} // {step.date}
            </div>
            <div className={`font-bold text-sm tracking-wide transition-colors duration-300 ${activeStep === idx ? 'text-[#61afef]' : 'text-gray-500 group-hover:text-gray-300'}`}>
              {step.title}
            </div>
          </button>
        ))}
      </div>

      {/* Right side Content Display */}
      <div className="w-full md:w-2/3 bg-[#050505] border border-[#222] rounded-xl p-6 lg:p-10 relative overflow-hidden flex flex-col justify-center min-h-[250px] shadow-inner">
        <div className="absolute top-0 right-0 p-4 text-[150px] font-black text-white/[0.01] leading-none select-none pointer-events-none transition-all duration-700">
          {steps[activeStep].id}
        </div>

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={`content-${step.id}`}
              className={`transition-all duration-700 absolute inset-0 p-6 lg:p-10 flex flex-col justify-center ${activeStep === idx ? 'opacity-100 translate-x-0 relative z-10' : 'opacity-0 translate-x-8 pointer-events-none absolute z-0'}`}
            >
              {/* Dynamic Watermark Background Icon */}
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
                <Icon size={240} className="text-white" />
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-[#111] rounded-lg border border-[#333] shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">{step.title}.</h4>
              </div>
              <p className="text-base text-[#8b949e] leading-relaxed font-mono relative z-10 max-w-lg">
                {step.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SkillCategory = ({ title, skills }) => {
  return (
    <div>
      <div className={`text-[10px] uppercase tracking-widest text-[#7f848e] font-bold mb-3`}>{title}</div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className={`px-3 py-1.5 bg-[#050505] border border-[#333] rounded-md text-xs font-mono text-gray-300 transition-all cursor-default hover:border-[#61afef] hover:text-[#61afef]`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- SHARED INFOGRAPHIC COMPONENTS ---

const LiveTerminalAbout = () => {
  const [logs, setLogs] = useState([]);
  const scrollRef = useRef(null);

  const bootSequence = [
    { text: "> Establishing connection to Aniruth_Engine...", delay: 500 },
    { text: "[INFO] Loading system design principles.", delay: 1000 },
    { text: "[OK] Agentic pipelines verified.", delay: 1500, type: "success" },
    { text: "> Compiling technical stack...", delay: 2000 },
    { text: "[WARN] High optimization detected in RAG index.", delay: 2700, type: "warn" },
    { text: "[OK] 15+ production modules mounted.", delay: 3300, type: "success" },
    { text: "> STATUS: Open to internships & roles.", delay: 4000, type: "highlight" },
    { text: "✓ Ready for command input.", delay: 4500, type: "success" }
  ];

  useEffect(() => {
    let timeouts = [];
    bootSequence.forEach((log) => {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, log.delay);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Isolated scroll targeting
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl border border-[#222] bg-[#050505] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative">
      <div className="flex items-center px-4 py-2 bg-[#0a0a0a] border-b border-[#222] relative z-20 shrink-0">
        <span className="text-xs font-mono text-[#7f848e]">bash - execution_log.sh</span>
      </div>
      <div ref={scrollRef} className="p-4 font-mono text-[12px] h-48 overflow-y-auto relative z-10">
        {logs.map((log, i) => (
          <div key={i} className={`mb-1.5 flex items-center flex-wrap ${log.type === 'success' ? 'text-[#98c379]' :
            log.type === 'warn' ? 'text-[#e5c07b]' :
              log.type === 'highlight' ? 'text-white font-bold' : 'text-gray-400'
            }`}>
            <span>{log.text}</span>
            {i === logs.length - 1 && i !== bootSequence.length - 1 && (
              <span className="cursor-blink bg-[#61afef] w-2 h-4 inline-block ml-1.5 align-middle"></span>
            )}
          </div>
        ))}
        {logs.length === bootSequence.length && (
          <div className="text-gray-500 flex items-center mt-2">
            <span className="text-[#98c379] mr-2">{'>'}</span>
            <span className="cursor-blink bg-[#61afef] w-2 h-3.5 inline-block align-middle"></span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DYNAMIC STATE-BASED ACTIVITY GRAPH ---
const ActivityGraph = () => {
  const cols = 56;
  const rows = 7;

  // Coordinate map for spelling "ANIRUTH"
  const [targetMatrix] = useState(() => {
    const targetPattern = [
      // A (0-2)
      [0, 2], [0, 3], [0, 4], [0, 5], [1, 1], [1, 3], [2, 2], [2, 3], [2, 4], [2, 5],
      // N (4-7)
      [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [5, 2], [6, 3], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5],
      // I (9)
      [9, 1], [9, 2], [9, 3], [9, 4], [9, 5],
      // R (11-13)
      [11, 1], [11, 2], [11, 3], [11, 4], [11, 5], [12, 1], [12, 3], [13, 1], [13, 2], [13, 4], [13, 5],
      // U (15-17)
      [15, 1], [15, 2], [15, 3], [15, 4], [16, 5], [17, 1], [17, 2], [17, 3], [17, 4],
      // T (19-21)
      [19, 1], [20, 1], [20, 2], [20, 3], [20, 4], [20, 5], [21, 1],
      // H (23-25)
      [23, 1], [23, 2], [23, 3], [23, 4], [23, 5], [24, 3], [25, 1], [25, 2], [25, 3], [25, 4], [25, 5]
    ];

    // Circuit Board Pattern (Cols 32-52)
    const circuitPattern = [
      // Input Nodes
      [31, 1], [31, 3], [31, 5],
      // Input Trace 1 (Top)
      [32, 1], [33, 1], [34, 1], [35, 2], [36, 2], [37, 2], [38, 2],
      // Input Trace 2 (Middle)
      [32, 3], [33, 3], [34, 3], [35, 3], [36, 3], [37, 3], [38, 3],
      // Input Trace 3 (Bottom)
      [32, 5], [33, 5], [34, 5], [35, 4], [36, 4], [37, 4], [38, 4],

      // Processor Box (Cols 39-43, Rows 1-5)
      // Top Edge
      [39, 1], [40, 1], [41, 1], [42, 1], [43, 1],
      // Bottom Edge
      [39, 5], [40, 5], [41, 5], [42, 5], [43, 5],
      // Left Edge
      [39, 2], [39, 3], [39, 4],
      // Right Edge
      [43, 2], [43, 3], [43, 4],
      // Core Dot
      [41, 3],

      // Output Trace 1 (Top)
      [44, 2], [45, 2], [46, 1], [47, 1], [48, 0], [49, 0], [50, 0],
      // Output Trace 2 (Middle)
      [44, 3], [45, 3], [46, 3], [47, 3], [48, 3], [49, 3], [50, 3],
      // Output Trace 3 (Bottom)
      [44, 4], [45, 4], [46, 5], [47, 5], [48, 6], [49, 6], [50, 6],

      // Output Nodes
      [51, 0], [51, 3], [51, 6],

      // Floating data fragments
      [29, 3], [53, 1], [54, 4]
    ];
    targetPattern.push(...circuitPattern);

    const mat = Array(56).fill(false).map(() => Array(7).fill(false));
    targetPattern.forEach(([c, r]) => {
      if (mat[c] && mat[c][r] !== undefined) mat[c][r] = true;
    });
    return mat;
  });

  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let c = 0; c < 56; c++) {
      const col = [];
      for (let r = 0; r < 7; r++) {
        if (targetMatrix[c][r]) {
          col.push(Math.random() > 0.5 ? 4 : 3); // Letters and circuit default to bright
        } else {
          col.push(Math.random() > 0.9 ? 1 : 0); // Background mostly dark
        }
      }
      initialGrid.push(col);
    }
    return initialGrid;
  });

  useEffect(() => {
    // Engine to simulate live commits twinkling within the pattern
    const interval = setInterval(() => {
      setGrid(prev => {
        const newGrid = [...prev].map(col => [...col]);

        for (let c = 0; c < 56; c++) {
          for (let r = 0; r < 7; r++) {
            if (targetMatrix[c][r]) {
              // Subtly flicker the active pattern to keep it feeling alive, but ALWAYS bright
              if (Math.random() > 0.7) {
                newGrid[c][r] = Math.random() > 0.5 ? 4 : 3;
              }
            } else {
              // Slight ambient background flicker to act as "other random commits"
              if (Math.random() > 0.95) {
                newGrid[c][r] = Math.random() > 0.85 ? 1 : 0;
              }
            }
          }
        }
        return newGrid;
      });
    }, 500); // Pulse speed

    return () => clearInterval(interval);
  }, [targetMatrix]);

  const getIntensityClass = (level) => {
    if (level === 4) return 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10 scale-[1.15]';
    if (level === 3) return 'bg-gray-300 z-10 scale-[1.05]';
    if (level === 2) return 'bg-gray-500';
    if (level === 1) return 'bg-gray-700';
    return 'bg-black border border-[#222] opacity-50';
  };

  return (
    <div className="flex flex-col gap-2 w-full overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex gap-1.5 w-max">
        {grid.map((col, c) => (
          <div key={c} className="flex flex-col gap-1.5">
            {col.map((level, r) => (
              <div
                key={`${c}-${r}`}
                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-all duration-700 ease-in-out ${getIntensityClass(level)}`}
                title={`Activity at col ${c} row ${r}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center gap-2 mt-2 text-[10px] text-[#7f848e] font-mono">
        <span>Less</span>
        <div className="w-3 h-3 rounded-[2px] bg-black border border-[#222] opacity-50"></div>
        <div className="w-3 h-3 rounded-[2px] bg-gray-700"></div>
        <div className="w-3 h-3 rounded-[2px] bg-gray-500"></div>
        <div className="w-3 h-3 rounded-[2px] bg-gray-300"></div>
        <div className="w-3 h-3 rounded-[2px] bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
        <span>More</span>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, icon: Icon, href }) => {
  const content = (
    <div className={`rounded-xl border border-[#222] bg-[#0a0a0a] p-6 flex flex-col items-center justify-center text-center transition-all duration-500 group hover:-translate-y-1 hover:border-[#61afef]/50 hover:bg-[#0a0a0a] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] h-full`}>
      <Icon className={`w-6 h-6 mb-3 text-gray-500 group-hover:text-[#61afef] group-hover:scale-110 transition-all duration-300`} />
      <span className={`text-2xl font-bold font-mono text-white transition-colors duration-300`}>
        {value}
      </span>
      <span className="text-[10px] text-[#7f848e] font-mono mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block h-full cursor-pointer relative z-50">
      {content}
    </a>
  ) : content;
};

const WorkflowVisualizer = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 w-full py-6 overflow-visible">
      <div className="hidden md:block absolute top-1/2 left-16 right-16 h-[2px] bg-[#222] -translate-y-1/2 z-0">
        <div className="absolute top-[-3px] w-12 h-[8px] bg-gradient-to-r from-transparent via-white to-transparent animate-travel-x rounded-full blur-[1px]"></div>
        <div className="absolute top-[-3px] w-12 h-[8px] bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-travel-x rounded-full blur-[1px]" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-[-3px] w-12 h-[8px] bg-gradient-to-r from-transparent via-white to-transparent animate-travel-x rounded-full blur-[1px]" style={{ animationDelay: '1.6s' }}></div>
      </div>

      <PipelineNode icon={User} title="Client Prompt" type="Input" />

      <div className="md:hidden w-[2px] h-6 bg-[#222] relative">
        <div className="absolute left-[-3px] w-[8px] h-6 bg-gradient-to-b from-transparent via-white to-transparent animate-travel-y blur-[1px] rounded-full"></div>
      </div>

      <PipelineNode icon={Bot} title="Agent Router" type="LLM Orchestrator" isCore />

      <div className="md:hidden w-[2px] h-6 bg-[#222] relative">
        <div className="absolute left-[-3px] w-[8px] h-6 bg-gradient-to-b from-transparent via-gray-500 to-transparent animate-travel-y blur-[1px] rounded-full" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <PipelineNode icon={Database} title="Vector DB" type="RAG Retrieval" />

      <div className="md:hidden w-[2px] h-6 bg-[#222] relative">
        <div className="absolute left-[-3px] w-[8px] h-6 bg-gradient-to-b from-transparent via-white to-transparent animate-travel-y blur-[1px] rounded-full" style={{ animationDelay: '1s' }}></div>
      </div>

      <PipelineNode icon={Zap} title="Action Engine" type="Output Generator" />
    </div>
  );
};

const PipelineNode = ({ icon: Icon, title, type, isCore }) => (
  <div className={`relative z-10 flex flex-col items-center justify-center p-4 rounded-xl bg-black border transition-all duration-500 hover:-translate-y-1 ${isCore ? 'border-[#61afef]/50 shadow-[0_0_20px_rgba(97,175,239,0.15)] transform scale-110' : `border-[#222] hover:border-[#61afef]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]`} min-w-[150px]`}>
    <div className={`p-2.5 rounded-lg ${isCore ? 'bg-[#61afef] text-black animate-pulse shadow-[0_0_10px_rgba(97,175,239,0.5)]' : 'bg-[#111] text-gray-400'} mb-3 transition-colors duration-300 group-hover:text-[#61afef]`}>
      <Icon className="w-5 h-5" />
    </div>
    <h4 className={`font-bold text-xs mb-1 transition-colors duration-300 ${isCore ? 'text-white' : 'text-gray-300'}`}>{title}</h4>
    <span className="text-[9px] uppercase tracking-widest text-[#7f848e] font-mono">{type}</span>
  </div>
);