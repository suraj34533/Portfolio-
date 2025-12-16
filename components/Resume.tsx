
import React, { useState, useRef } from 'react';
import {
  Download, Mail, MapPin, Award, GraduationCap,
  Terminal, Cpu, FileText, ZoomIn, ZoomOut,
  Moon, Sun, ExternalLink, Shield, Layers, Zap, Upload, FileQuestion, Phone, Linkedin, Globe
} from 'lucide-react';

const Resume: React.FC = () => {
  // Default to local path, but allow overriding via upload
  const [pdfUrl, setPdfUrl] = useState<string>("/resume.pdf");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pdfDarkMode, setPdfDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const skills = [
    "React", "C/C++", "Java", "Python", "JavaScript",
    "Flask", "Django", "REST APIs",
    "Supabase", "MySQL", "N8N", "ChatGPT", "Gemini",
    "Linux (Kali/Ubuntu)", "Networking", "System Security",
    "Git", "GitHub", "CI/CD", "Virtualization"
  ];

  const projects = [
    {
      title: "IRONBEAST - Fitness Platform",
      desc: "Full-featured fitness website for athletes & powerlifters. Delivered all-in-one ecosystem for training planning, diet execution, and user engagement.",
      tech: "React, Web Dev, UX/UI",
      color: "border-red-500/30"
    },
    {
      title: "Personal Portfolio Website",
      desc: "A premium personal portfolio showcasing professional experience, AI skills, and certifications. Strengthened personal branding and recruiter visibility.",
      tech: "React, Tailwind, Three.js",
      color: "border-cyan-500/30"
    },
    {
      title: "AI Telegram Bot",
      desc: "ChatGPT-Style Assistant with Image Generation. A fully functional Telegram bot capable of answering questions and generating content.",
      tech: "Python, AI APIs, Telegram Bot API",
      color: "border-blue-500/30"
    }
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] py-12 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Title Section */}
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-navy-900 dark:text-white tracking-tight">
            RESUME <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">& CV</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(0,217,255,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

          {/* LEFT COLUMN - Personal Info (Sticky) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Profile Card */}
            <div className="glass-panel p-8 rounded-[2rem] relative overflow-hidden group border border-slate-200 dark:border-white/10 shadow-2xl">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-cyan-500">
                <Shield size={180} />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="mb-6">
                  <h1 className="text-4xl font-black text-navy-900 dark:text-white mb-2 tracking-tight leading-tight drop-shadow-lg">
                    Arunava<br />Saha
                  </h1>
                  <div className="flex flex-col gap-1">
                    <span className="text-xl text-cyan-600 dark:text-cyan-400 font-bold tracking-wide flex items-center gap-2">
                      <Shield size={20} className="inline" /> Cybersecurity Analyst
                    </span>
                    <span className="text-lg text-gold-600 dark:text-gold-400 font-medium flex items-center gap-2">
                      <Cpu size={20} className="inline" /> AI Developer
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-slate-600 dark:text-slate-300 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                    <div className="p-2 bg-gold-500/20 rounded-lg text-gold-600 dark:text-gold-400">
                      <MapPin size={18} />
                    </div>
                    <span className="font-medium">KWCS orchid, Mumbai, 410218</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                    <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-600 dark:text-cyan-400">
                      <Mail size={18} />
                    </div>
                    <a href="mailto:sahap3264@gmail.com" className="font-medium hover:text-cyan-500 transition-colors">sahap3264@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                      <Phone size={18} />
                    </div>
                    <a href="tel:07304356686" className="font-medium hover:text-purple-500 transition-colors">07304356686</a>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                      <Linkedin size={18} />
                    </div>
                    <a href="https://linkedin.com/in/arunava6920" target="_blank" rel="noreferrer" className="font-medium hover:text-blue-500 transition-colors">linkedin.com/in/arunava6920</a>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-8"></div>

                {/* Education */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GraduationCap size={16} /> Education
                  </h3>
                  <div className="space-y-6 pl-4 border-l-2 border-slate-200 dark:border-white/10 relative">
                    {[
                      { title: "BSc-IT - AI & Cybersecurity", loc: "KLE Society's SCI & COM, Mumbai", year: "Apr 2025", desc: "CGPA: 7.35 | 'Thought of the Month' certificate" },
                      { title: "12th Sci", loc: "Harmony Public School And Jr Collage", year: "Apr 2022", desc: "66%" },
                      { title: "10th", loc: "ST Joseph High School", year: "Apr 2020", desc: "68%" }
                    ].map((edu, i) => (
                      <div key={i} className="relative group/item">
                        <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-navy-900 dark:bg-slate-800 border-2 border-cyan-500 group-hover/item:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(0,217,255,0.4)]"></span>
                        <h4 className="font-bold text-navy-900 dark:text-white group-hover/item:text-cyan-400 transition-colors">{edu.title}</h4>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{edu.loc}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 w-fit">{edu.year}</span>
                          <span className="text-xs text-slate-500">{edu.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Globe size={16} /> Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["English", "Hindi", "Marathi", "Bengali"].map((lang, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Projects & Skills */}
          <div className="lg:col-span-7 space-y-8">

            {/* Experience */}
            <div className="glass-panel p-6 rounded-2xl border border-gold-500/30 bg-white/50 dark:bg-navy-900/40 hover:bg-white dark:hover:bg-navy-800/60 transition-all duration-300 group shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gold-500/10 rounded-lg text-gold-500 border border-gold-500/20">
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-500 transition-colors">Internship - AI Developer & Automation</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Mumbai | Sep 2025 - Dec 2025</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Worked on building full-stack web applications and workflow automation tools using N8N, Supabase, and APIs. Familiar with Kali Linux, networking basics, virtualization, and security fundamentals.
              </p>
            </div>

            {/* Certifications */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-navy-900/40">
              <div className="flex items-center gap-3 mb-4">
                <Award size={20} className="text-purple-500" />
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">Certifications</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Cybersecurity - Silver Grade",
                  "Oracle Cloud Infrastructure 2025 – AI Foundations Associate (93%)",
                  "Oracle Cloud Infrastructure 2025 – Generative AI Professional (92%)",
                ].map((cert, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                    <Zap size={16} className="text-gold-500 mt-0.5 shrink-0" />
                    <span className="leading-snug">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500 border border-cyan-500/20">
                  <Terminal size={20} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white">Featured Projects</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className={`glass-panel p-6 rounded-2xl border ${proj.color} bg-white/50 dark:bg-navy-900/40 hover:bg-white dark:hover:bg-navy-800/60 transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] hover:-translate-y-1`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-cyan-500 transition-colors">{proj.title}</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{proj.desc}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {proj.tech.split(', ').map((t, j) => (
                        <span key={j} className="text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 px-2 py-1 rounded border border-cyan-200 dark:border-cyan-500/20 flex items-center gap-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Cloud */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-xl">
              <div className="absolute -bottom-10 -right-10 opacity-5 text-purple-500 rotate-12">
                <Layers size={200} />
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 border border-purple-500/20">
                  <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white">Technical Skills</h3>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="group/skill relative px-4 py-2 rounded-full text-sm font-bold text-slate-700 dark:text-cyan-100 overflow-hidden transition-all duration-300 hover:scale-105 cursor-default border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] bg-white dark:bg-navy-950/50"
                  >
                    <span className="relative z-10">{skill}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover/skill:opacity-100 transition-opacity"></span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: PDF VIEWER & DOWNLOAD */}
        <div id="resume-viewer" className="mt-8 mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <span className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-widest uppercase bg-cyan-500/5 px-6 py-2 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(0,217,255,0.1)]">
              <FileText size={16} /> Document Viewer
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          </div>

          <div className="glass-panel rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col h-[850px] relative group transition-all duration-500 hover:border-cyan-500/30 ring-1 ring-white/5">

            {/* Viewer Toolbar */}
            <div className="h-16 bg-slate-100/80 dark:bg-navy-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
              {/* Window Controls / Status */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm hover:bg-amber-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm hover:bg-emerald-400 transition-colors"></div>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-white/5 rounded-md border border-slate-200 dark:border-white/5">
                  <Shield size={10} className="text-cyan-500" />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">SECURE_VIEWER_V2.0</span>
                </div>
              </div>

              {/* Tools */}
              <div className="flex items-center gap-3">
                {/* Upload Feature */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="application/pdf"
                  className="hidden"
                />
                <button
                  onClick={triggerFileUpload}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider transition-all"
                  title="Upload local PDF to preview"
                >
                  <Upload size={14} /> <span className="hidden sm:inline">Upload Preview</span>
                </button>

                <div className="w-px h-6 bg-slate-300 dark:bg-white/10 mx-1"></div>

                <div className="flex items-center bg-white/50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 p-1 backdrop-blur-sm">
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 px-2 min-w-[3rem] text-center border-l border-r border-slate-200 dark:border-white/5 h-4 flex items-center justify-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setPdfDarkMode(!pdfDarkMode)}
                  className={`p-2 rounded-lg border transition-all duration-300 ${pdfDarkMode
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                      : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-cyan-500'
                    }`}
                  title="Toggle Contrast"
                >
                  {pdfDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>

            {/* PDF Container */}
            <div className="flex-1 bg-slate-200 dark:bg-[#0f111a] overflow-auto relative flex justify-center scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              </div>

              <div
                className="transition-all duration-300 origin-top shadow-2xl w-full h-full"
                style={{
                  transform: `scale(${zoomLevel})`,
                  filter: pdfDarkMode ? 'invert(1) hue-rotate(180deg) contrast(0.9)' : 'none'
                }}
              >
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  className="bg-white min-h-[1100px] shadow-[0_0_50px_rgba(0,0,0,0.2)] w-full block"
                >
                  {/* FALLBACK UI */}
                  <div className="flex flex-col items-center justify-center h-[800px] w-[800px] bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 p-12 text-center">
                    <div className="p-6 bg-slate-100 dark:bg-white/5 rounded-full mb-6">
                      <FileQuestion size={64} className="text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Resume Not Found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                      The file <code className="bg-slate-100 dark:bg-black/30 px-2 py-1 rounded text-sm font-mono text-cyan-600">/resume.pdf</code> could not be loaded directly.
                    </p>

                    <div className="flex flex-col gap-4 w-full max-w-xs">
                      <button
                        onClick={triggerFileUpload}
                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2"
                      >
                        <Upload size={18} /> Upload to Preview
                      </button>
                      <p className="text-xs text-slate-400 mt-2">
                        * This will display your local file temporarily in this browser session.
                      </p>
                    </div>
                  </div>
                </object>
              </div>
            </div>
          </div>

          {/* Main Download Button */}
          <div className="flex justify-center mt-12">
            <a
              href={pdfUrl}
              download="Arunava-Resume.pdf"
              className="group relative px-12 py-5 bg-navy-900 dark:bg-transparent overflow-hidden rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="absolute inset-0 bg-cyan-950/80 dark:bg-cyan-950/30 border border-cyan-500/50 rounded-2xl group-hover:border-cyan-400 shadow-[0_0_20px_rgba(0,217,255,0.2)] group-hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] transition-all duration-300 backdrop-blur-md"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

              <div className="relative flex items-center gap-4 z-10">
                <span className="text-cyan-100 font-bold text-lg tracking-widest uppercase drop-shadow-md group-hover:text-white transition-colors">Download Resume</span>
                <div className="p-2 bg-cyan-500/20 rounded-full group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,217,255,0.3)]">
                  <Download size={20} className="group-hover:animate-bounce" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
