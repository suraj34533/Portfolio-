
import React, { useState, useRef } from 'react';
import { Briefcase, ArrowLeft, ArrowRight, Bot, Calendar, Cpu, Zap, Sparkles, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Experience: React.FC = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate slightly based on mouse position (Max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const job = {
    company: "AIONUS",
    role: "Generative AI & Automation Intern",
    period: "3 Months | 2025",
    type: "AI Intern",
    description: [
      "Worked on Generative AI model integration and fine-tuning.",
      "Built intelligent Agent-AI workflows for automation.",
      "Developed automation pipelines using APIs and LLM-based tools.",
      "Collaborated with senior developers to integrate AI-driven features into production-level code."
    ]
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-navy-900 dark:text-white tracking-tight">
            PROFESSIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(0,217,255,0.4)]">EXPERIENCE</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500"></div>
             <div className="p-1.5 rounded-full border border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                <Briefcase size={16} className="text-cyan-400" />
             </div>
             <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>
        </div>

        {/* 3D Experience Card */}
        <div className="flex justify-center mb-16 perspective-1000">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-3xl transition-all duration-200 ease-out preserve-3d group cursor-default"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`,
            }}
          >
            {/* Card Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl opacity-50 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-500"></div>

            {/* Main Card Content */}
            <div className="relative bg-slate-50/90 dark:bg-[#0a0e27]/90 backdrop-blur-xl rounded-[22px] border border-cyan-500/30 p-8 md:p-12 overflow-hidden shadow-2xl">
              
              {/* Floating Background Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                 <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                 {/* Grid Pattern */}
                 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                
                {/* Left: 3D Icon & Company Info */}
                <div className="flex flex-col items-center md:items-start gap-4 min-w-[180px]">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Floating Icon Animation */}
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl rotate-45 blur-md animate-pulse"></div>
                    <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-cyan-950 to-navy-900 rounded-2xl border border-cyan-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.3)] animate-float">
                      <Bot size={40} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
                    </div>
                    {/* Orbiting particles */}
                    <div className="absolute w-28 h-28 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,217,255,1)]"></div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white tracking-wide mb-1">
                      {job.company}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase">
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Right: Role & Details */}
                <div className="flex-1">
                   <div className="mb-6 pb-6 border-b border-white/5 relative">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-3">
                           {job.role}
                           <Sparkles size={18} className="text-gold-400 animate-pulse" />
                        </h4>
                        <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                           <Calendar size={14} className="text-cyan-500" />
                           <span className="text-sm font-mono">{job.period}</span>
                        </div>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm italic">
                        Specializing in Agentic AI & Large Language Model Workflows
                      </p>
                   </div>

                   <div className="space-y-4">
                      {job.description.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 group/item">
                           <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,217,255,0.8)] group-hover/item:scale-150 transition-transform"></div>
                           <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed group-hover/item:text-white transition-colors">
                             {point}
                           </p>
                        </div>
                      ))}
                   </div>

                   {/* Tech Badges */}
                   <div className="flex flex-wrap gap-2 mt-8">
                      {["Generative AI", "LLMs", "Automation", "Python", "APIs"].map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-navy-950/50 border border-cyan-500/20 rounded text-xs font-mono text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors cursor-default">
                           {tech}
                        </span>
                      ))}
                   </div>
                </div>

              </div>
              
              {/* Glossy Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full max-w-5xl mx-auto mt-8">
            <button 
                onClick={() => navigate('/projects')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Previous
            </button>
            <button 
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all group"
            >
                Next: Contact <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
