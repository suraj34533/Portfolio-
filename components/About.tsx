import React from 'react';
import { Terminal, Database, Brain, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <Brain size={32} className="text-cyan-600 dark:text-cyan-400" />,
      title: "AI & Machine Learning",
      description: "Developing intelligent agents and predictive models using TensorFlow, PyTorch, and Gemini API."
    },
    {
      icon: <Terminal size={32} className="text-gold-600 dark:text-gold-400" />,
      title: "Automation",
      description: "Building robust scripts and bots to automate complex workflows and increase efficiency."
    },
    {
      icon: <Globe size={32} className="text-purple-600 dark:text-purple-400" />,
      title: "Full Stack Web",
      description: "Creating responsive, 3D-accelerated web applications with React, TypeScript, and Node.js."
    },
    {
      icon: <Database size={32} className="text-emerald-600 dark:text-emerald-400" />,
      title: "Backend Systems",
      description: "Architecting scalable cloud infrastructure on AWS and efficient database schemas."
    }
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-sans">
              <span className="text-navy-900 dark:text-white">Architecting the </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Future</span>
            </h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              <p>
                I am Arunava Saha, a passionate <span className="text-cyan-600 dark:text-cyan-400 font-semibold">AI Developer</span> dedicated to bridging the gap between cutting-edge artificial intelligence and practical business solutions.
              </p>
              <p>
                With a deep focus on Generative AI and automation, I craft systems that don't just execute tasks—they learn and adapt. My work combines mathematical precision with creative engineering to solve complex problems.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {["Python", "React", "TypeScript", "TensorFlow", "AWS", "Docker"].map((tech) => (
                  <span key={tech} className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-full text-sm font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/10 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl glass-panel hover:bg-white dark:hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 shadow-lg dark:shadow-none"
              >
                <div className="mb-4 p-3 bg-slate-100 dark:bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 w-full">
            <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300"
            >
                <ArrowLeft size={20} /> Back to Home
            </button>
            <button 
                onClick={() => navigate('/skills')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold hover:bg-cyan-700 dark:hover:bg-white transition-colors"
            >
                Next: Skills <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default About;