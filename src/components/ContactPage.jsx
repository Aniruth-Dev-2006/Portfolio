import React, { useState } from 'react';
import { Mail, Code2, ArrowUpRight, Copy, Check, Database } from 'lucide-react';

const CustomGithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 4.8 4.8 0 0 0-.1-3.8s-1.2-.38-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.6 5 2 5 2a4.8 4.8 0 0 0-.1 3.8A5.2 5.2 0 0 0 3 9.6c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24V22" />
  </svg>
);

const CustomLinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('aniruthrajagopal2006@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactData = [
    {
      id: "email",
      type: "Primary",
      platform: "Email",
      value: "aniruthrajagopal2006@gmail.com",
      url: "mailto:aniruthrajagopal2006@gmail.com",
      icon: Mail
    },
    {
      id: "github",
      type: "Code",
      platform: "GitHub",
      value: "github.com/Aniruth-Dev-2006",
      url: "https://github.com/Aniruth-Dev-2006",
      icon: CustomGithubIcon
    },
    {
      id: "linkedin",
      type: "Network",
      platform: "LinkedIn",
      value: "linkedin.com/in/aniruth-r-19b667374",
      url: "https://www.linkedin.com/in/aniruth-r-19b667374/",
      icon: CustomLinkedinIcon
    },
    {
      id: "leetcode",
      type: "Problem Solving",
      platform: "LeetCode",
      value: "leetcode.com/u/Aniruth_Pvt",
      url: "https://leetcode.com/u/Aniruth_Pvt/",
      icon: Code2
    }
  ];

  return (
    <main className="flex-1 overflow-hidden bg-[#050505] relative flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background ambient glow - Neutral white/gray */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#ffffff_0%,_transparent_50%)] opacity-[0.02] pointer-events-none"></div>

      <div className="w-full max-w-[1800px] mx-auto h-[85vh] md:h-[75vh] flex flex-col lg:flex-row rounded-xl border border-[#222] bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 relative">
        
        {/* LEFT PANE: JSON View */}
        <div className="w-full lg:w-[40%] h-[40%] lg:h-full border-b lg:border-b-0 lg:border-r border-[#222] flex flex-col bg-[#050505]">
          <div className="h-10 bg-[#111] border-b border-[#222] flex items-center px-4 gap-4 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#333]"></div>
              <div className="w-3 h-3 rounded-full bg-[#444]"></div>
              <div className="w-3 h-3 rounded-full bg-[#555]"></div>
            </div>
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1 rounded-md border border-[#333]">
              <Database className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-mono text-gray-300">contact.json</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-xs md:text-sm leading-loose">
            <div className="text-gray-400">{'{'}</div>
            <div className="pl-4">
              <div className="text-[#61afef]">"status"<span className="text-gray-300">: </span><span className="text-[#98c379]">"available"</span><span className="text-gray-400">,</span></div>
              <div className="text-[#61afef]">"name"<span className="text-gray-300">: </span><span className="text-[#98c379]">"Aniruth R."</span><span className="text-gray-400">,</span></div>
              <div className="text-[#61afef]">"endpoints"<span className="text-gray-300">: </span><span className="text-gray-400">{'['}</span></div>
              
              <div className="pl-4 border-l border-[#222] ml-2 my-2 transition-all duration-300">
                {contactData.map((contact, idx) => (
                  <div key={contact.id} className={`transition-all duration-300 ${activeRow === contact.id ? 'bg-[#111] -mx-2 px-2 rounded-r border-l-2 border-[#61afef]' : 'border-l-2 border-transparent'}`}>
                    <span className="text-gray-400">{'{'}</span>
                    <div className="pl-4">
                      <div className="text-[#e5c07b]">"platform"<span className="text-gray-300">: </span><span className="text-[#98c379]">"{contact.platform}"</span><span className="text-gray-400">,</span></div>
                      <div className="text-[#e5c07b]">"value"<span className="text-gray-300">: </span><span className="text-[#98c379]">"{contact.value}"</span></div>
                    </div>
                    <span className="text-gray-400">{'}'}{idx < contactData.length - 1 ? ',' : ''}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-gray-400">{']'}</div>
            </div>
            <div className="text-gray-400">{'}'}</div>
          </div>
        </div>

        {/* RIGHT PANE: Table View */}
        <div className="w-full lg:w-[60%] h-[60%] lg:h-full bg-[#0a0a0a] flex flex-col">
          <div className="h-10 bg-[#111] border-b border-[#222] flex items-center px-4 shrink-0">
            <span className="text-xs font-mono text-[#7f848e]">Database Table View</span>
          </div>

          <div className="flex-1 p-6 lg:p-10 overflow-y-auto flex flex-col">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                Contact <span className="text-[#61afef]">Directory.</span>
              </h1>
              <p className="text-[#8b949e] font-mono text-xs md:text-sm">
                Querying 4 records from contact database. Click row to establish connection.
              </p>
            </div>

            {/* Data Table */}
            <div className="w-full border border-[#222] rounded-xl overflow-hidden bg-[#050505] flex-shrink-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 md:gap-4 p-4 border-b border-[#222] bg-[#111] font-mono text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-widest">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-3">Platform</div>
                <div className="col-span-3 hidden sm:block">Type</div>
                <div className="col-span-8 sm:col-span-5 text-right">Endpoint Value</div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col">
                {contactData.map((contact, idx) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={contact.id}
                      href={contact.url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setActiveRow(contact.id)}
                      onMouseLeave={() => setActiveRow(null)}
                      className={`grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 border-b border-[#222] last:border-b-0 items-center transition-all duration-300 cursor-pointer ${activeRow === contact.id ? 'bg-[#1a1a1a] scale-[1.01] shadow-lg border-transparent z-10 rounded-lg relative' : 'hover:bg-[#111]'} group`}
                    >
                      <div className="col-span-1 text-center font-mono text-[10px] md:text-xs text-[#555] group-hover:text-white transition-colors">
                        0{idx + 1}
                      </div>
                      <div className="col-span-3 flex items-center gap-2 md:gap-3">
                        <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-white transition-colors`} />
                        <span className="font-bold text-gray-300 group-hover:text-white text-xs md:text-sm">{contact.platform}</span>
                      </div>
                      <div className="col-span-3 hidden sm:block">
                        <span className="inline-block px-2 py-1 rounded bg-[#222] border border-[#333] font-mono text-[9px] md:text-[10px] text-gray-400 group-hover:text-gray-200">
                          {contact.type}
                        </span>
                      </div>
                      <div className="col-span-8 sm:col-span-5 text-right flex items-center justify-end gap-2 md:gap-3 overflow-hidden">
                        <span className="font-mono text-[9px] md:text-xs text-gray-500 group-hover:text-[#61afef] transition-colors truncate">
                          {contact.value}
                        </span>
                        {contact.id === 'email' ? (
                          <button 
                            onClick={copyEmail}
                            className="p-1 md:p-1.5 rounded hover:bg-[#333] transition-colors shrink-0"
                          >
                            {copied ? <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#61afef]" /> : <Copy className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400 group-hover:text-white" />}
                          </button>
                        ) : (
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-gray-500 group-hover:text-white shrink-0" />
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
