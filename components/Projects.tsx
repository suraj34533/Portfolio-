import React from 'react';
import { ExternalLink, Github, ArrowRight, ArrowLeft } from 'lucide-react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

const projects: Project[] = [
  {
    id: 1,
    title: "Neural Nexus",
    category: "AI Analytics",
    description: "A real-time predictive analytics dashboard powered by Gemini Flash, visualizing complex datasets with D3.js. Features customizable widgets and automated reporting agents.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    techStack: ["React", "Python", "Gemini API", "D3.js"],
    link: "https://neural-nexus-demo.example.com",
    github: "https://github.com/username/neural-nexus"
  },
  {
    id: 2,
    title: "Quantum Flow",
    category: "Automation Suite",
    description: "Enterprise-grade automation tool utilizing custom agents to streamline dev-ops pipelines. Reduces deployment time by 60% through intelligent error prediction.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=800&auto=format&fit=crop",
    techStack: ["Node.js", "Docker", "AWS", "Redis"],
    link: "https://quantum-flow.example.com",
    github: "https://github.com/username/quantum-flow"
  },
  {
    id: 3,
    title: "Visionary 3D",
    category: "Interactive Web",
    description: "An immersive 3D product configurator for luxury goods, featuring real-time raytracing simulation. Optimized for WebGL with fallback for mobile devices.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    techStack: ["Three.js", "React Fiber", "WebGL", "GSAP"],
    link: "https://visionary-3d.example.com",
    github: "https://github.com/username/visionary-3d"
  }
];

const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-amber-600 dark:from-gold-400 dark:to-amber-600 mb-4">
            FEATURED WORKS
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Hover over the cards to reveal project details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group h-[420px] w-full [perspective:1200px]"
            >
              <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)_scale(1.05)] rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(0,217,255,0.3)] dark:shadow-none dark:hover:shadow-[0_25px_50px_-12px_rgba(0,217,255,0.25)]">
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10">
                  <div className="h-full w-full relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent opacity-80 dark:opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 backdrop-blur-sm shadow-[0_0_15px_rgba(0,217,255,0.3)]">
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">{project.title}</h3>
                      <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                        <span>View Details</span>
                        <ArrowRight size={16} className="text-gold-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/10 p-8 flex flex-col shadow-inner bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay">
                  
                  {/* Decorative element */}
                  <div className="absolute -top-10 -right-10 p-10 opacity-5 dark:opacity-10 pointer-events-none">
                    <Github size={180} className="text-cyan-500 transform rotate-12" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-1">{project.title}</h3>
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm mb-6">{project.category}</span>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-auto font-light">
                      {project.description}
                    </p>
                    
                    <div className="mt-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs font-medium text-navy-800 dark:text-cyan-100 bg-white dark:bg-cyan-900/30 border border-slate-200 dark:border-cyan-500/20 px-2.5 py-1 rounded-md shadow-sm transition-all duration-300 hover:scale-110 hover:bg-cyan-50 dark:hover:bg-cyan-800/50 hover:border-cyan-400 cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                         <a 
                           href={project.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] active:scale-95 active:shadow-none transition-all duration-200 transform hover:-translate-y-1"
                         >
                           <ExternalLink size={16} /> Live Demo
                         </a>
                         <a 
                           href={project.github || "https://github.com"} 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-300 dark:border-white/20 text-navy-900 dark:text-white font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 active:scale-95 transition-all duration-200 transform hover:-translate-y-1"
                         >
                           <Github size={16} /> GitHub
                         </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full">
            <button 
                onClick={() => navigate('/skills')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300"
            >
                <ArrowLeft size={20} /> Previous
            </button>
            <button 
                onClick={() => navigate('/experience')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold hover:bg-cyan-700 dark:hover:bg-white transition-colors"
            >
                Next: Experience <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;