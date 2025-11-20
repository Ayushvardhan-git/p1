import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Scissors, 
  MonitorPlay, 
  Mail, 
  MousePointer2, 
  AlignLeft,
  ArrowDown,
  Disc,
  Sparkles,
  Zap,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { GlitchText } from './components/GlitchText';
import { ProjectCard } from './components/ProjectCard';
import { TimecodeClock } from './components/TimecodeClock';
import { AgentChat } from './components/AgentChat';
import { PROJECTS } from './constants';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.INTRO);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!mainRef.current) return;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enterPortfolio = () => {
    setView(ViewState.WORK);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine active filter logic (simplified for portfolio view)
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MV' | 'COMMERCIAL' | 'SOCIAL'>('ALL');

  const filteredProjects = PROJECTS.filter(p => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'MV') return p.category === 'Music Video';
    if (activeFilter === 'COMMERCIAL') return p.category === 'Commercial';
    if (activeFilter === 'SOCIAL') return p.category === 'Social';
    return true;
  });

  if (view === ViewState.INTRO) {
    return (
      <div className="relative w-full h-screen bg-deep-void overflow-hidden flex items-center justify-center selection:bg-neon-pink selection:text-white">
        
        {/* Background Noise/Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div className="z-10 text-center space-y-8">
          <div className="mb-4">
            <TimecodeClock />
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mix-blend-difference">
            <GlitchText text="AYUSH" />
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-mono uppercase tracking-widest">
            Editor // Storyteller // Gen-Z
          </p>

          <button 
            onClick={enterPortfolio}
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-zinc-900 border-2 border-white hover:bg-white hover:text-black focus:outline-none"
          >
            <span className="absolute top-0 right-0 w-full h-full bg-neon-lime -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10 mix-blend-difference"></span>
            <span className="flex items-center gap-3 text-lg tracking-widest">
              INITIALIZE_PORTFOLIO <ArrowDown className="animate-bounce" />
            </span>
          </button>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 animate-spin-slow text-zinc-800">
            <Disc size={120} />
        </div>
        <div className="absolute bottom-10 right-10 text-zinc-800 font-mono text-[10rem] leading-none opacity-20 pointer-events-none select-none">
            01
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-deep-void text-white selection:bg-neon-lime selection:text-black font-sans">
      
      {/* Fixed Header / HUD */}
      <header className="fixed top-0 left-0 w-full z-40 bg-deep-void/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-neon-lime rounded-sm flex items-center justify-center font-black text-black text-lg">A</div>
          <span className="hidden md:block font-mono text-sm text-zinc-500">PROJECT: AYUSH_PORTFOLIO_V3.prproj</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1 text-xs font-mono text-zinc-400">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             LIVE_SERVER
          </div>
          <TimecodeClock />
          <button onClick={() => setView(ViewState.INTRO)} className="text-zinc-500 hover:text-white transition-colors">
            <Scissors size={18} />
          </button>
        </div>
      </header>

      {/* Progress Bar (Timeline Playhead) */}
      <div className="fixed top-[57px] left-0 w-full h-1 bg-zinc-800 z-50">
        <div 
          className="h-full bg-neon-lime shadow-[0_0_10px_#ccff00]" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-[61px] w-16 h-[calc(100vh-61px)] border-r border-zinc-800 bg-deep-void z-30 hidden md:flex flex-col items-center py-8 gap-8 text-zinc-600">
        <div className="tooltip group relative">
            <Layers className="text-neon-lime cursor-pointer" />
            <span className="absolute left-10 top-0 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">Timeline</span>
        </div>
        <div className="tooltip group relative">
            <MonitorPlay className="hover:text-white cursor-pointer transition-colors" />
             <span className="absolute left-10 top-0 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">Source Monitor</span>
        </div>
        <div className="tooltip group relative">
            <AlignLeft className="hover:text-white cursor-pointer transition-colors" />
             <span className="absolute left-10 top-0 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">Metadata</span>
        </div>
        <div className="mt-auto">
            <MousePointer2 className="animate-pulse" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 md:pl-24 pr-4 pb-24 max-w-[1600px] mx-auto">
        
        {/* Filter / Control Bar */}
        <div className="flex flex-wrap items-center justify-between mb-12 gap-4 sticky top-20 z-20 py-4 bg-deep-void/90 backdrop-blur">
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-neon-pink mr-2">/</span>SELECTED_WORK
          </h2>
          
          <div className="flex gap-2">
            {['ALL', 'MV', 'COMMERCIAL', 'SOCIAL'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-4 py-1 font-mono text-xs uppercase border ${
                  activeFilter === filter 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500'
                } transition-all`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (Bento-ish) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Marquee Section */}
        <div className="mt-24 border-y border-zinc-800 py-6 overflow-hidden bg-zinc-900">
           <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-black text-4xl md:text-6xl text-transparent stroke-text uppercase opacity-50" style={{ WebkitTextStroke: '1px #555' }}>
             <span>Storytelling</span> <span>Premiere Pro</span> <span>AI Generation</span> <span>Davinci Resolve</span> <span>Rhythm</span> <span>Emotion</span> <span>Gen-Z</span>
           </div>
        </div>

        {/* About / Bio Section - REDESIGNED FOR AYUSH */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Bio Block */}
            <div className="lg:col-span-8 p-8 md:p-12 border border-zinc-800 bg-zinc-900/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Sparkles size={64} className="text-neon-lime" />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black mb-8 flex flex-col md:flex-row md:items-end gap-4">
                    <span>WHO_IS_AYUSH?</span>
                    <span className="text-lg font-mono text-neon-pink mb-2 font-normal tracking-widest">// GEN-Z STORYTELLER</span>
                </h3>

                <div className="space-y-8 font-mono text-zinc-400">
                    <div>
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Zap size={16} className="text-neon-lime"/> THE_ORIGIN</h4>
                        <p className="leading-relaxed text-sm md:text-base">
                            I wasn’t the studious kid growing up; I was the one who loved sports and later got obsessed with how things work. During the lockdown, I discovered a whole new world — <span className="text-white">YouTube, online income, editing, creating, storytelling</span> — and that curiosity pulled me into the world of videos.
                        </p>
                    </div>

                    <div className="pl-4 border-l-2 border-zinc-700">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2"><MonitorPlay size={16} className="text-neon-pink"/> THE_OBSESSION</h4>
                        <p className="leading-relaxed text-sm md:text-base">
                            What started as a small interest became a full-time obsession. I’ve spent the last few years editing YouTube videos, talking-head content, narratives, and fast-paced Gen-Z style shorts. I love taking raw footage and turning it into something that feels alive — with <span className="text-white">rhythm, emotion, clever pacing, sound design, and a cinematic touch.</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-zinc-950 p-4 border border-zinc-800">
                             <h4 className="text-white font-bold mb-2 flex items-center gap-2"><GraduationCap size={16} className="text-zinc-500"/> THE_ACADEMIA</h4>
                             <p className="text-xs leading-relaxed">
                                NIT Rourkela Alum. Lived thousands of kilometers away from home, learning about people, responsibility, and how stories connect us all.
                             </p>
                        </div>
                        <div className="bg-zinc-950 p-4 border border-zinc-800">
                             <h4 className="text-white font-bold mb-2 flex items-center gap-2"><MapPin size={16} className="text-zinc-500"/> THE_MISSION</h4>
                             <p className="text-xs leading-relaxed">
                                Building myself as a creator blending <span className="text-neon-lime">Video Editing + AI + Storytelling</span>. Creating work that is fresh, modern, and uniquely "me".
                             </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* CTA / Sidebar Block */}
            <div className="lg:col-span-4 space-y-8">
                <div className="h-full p-8 border border-zinc-800 bg-neon-lime/5 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-neon-lime/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full blur-3xl"></div>
                    <Mail size={48} className="mb-4 text-white" />
                    <h3 className="text-2xl font-bold mb-2">"JUST ONE MORE SECOND"</h3>
                    <p className="text-zinc-400 text-xs font-mono mb-6 max-w-xs">
                        My goal is to make videos that don't just look good, but hit, inspire, and entertain. If you love creative editing and a little chaos mixed with ambition...
                    </p>
                    <a href="mailto:hello@ayush.edit" className="z-10 w-full py-3 bg-white text-black font-bold hover:bg-neon-lime hover:tracking-widest transition-all uppercase text-sm">
                        Let's Collaborate
                    </a>
                </div>
            </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-zinc-800 text-center md:text-left flex flex-col md:flex-row justify-between items-end pb-8 text-zinc-600 text-xs font-mono">
            <div>
                <p>&copy; 2024 AYUSH PRODUCTIONS.</p>
                <p>ALL RIGHTS RESERVED // RENDERED IN REAL-TIME</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
                <a href="#" className="hover:text-neon-lime">INSTAGRAM</a>
                <a href="#" className="hover:text-neon-lime">TWITTER</a>
                <a href="#" className="hover:text-neon-lime">LINKEDIN</a>
            </div>
        </footer>

      </main>

      {/* AI Agent Integration */}
      <AgentChat />
      
    </div>
  );
}

export default App;