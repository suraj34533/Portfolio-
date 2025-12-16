import React, { useState, useEffect } from 'react';
import { Menu, X, Code, User, Briefcase, Mail, Cpu, Settings, Home, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsSettingsOpen } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Skills', path: '/skills', icon: <Code size={18} /> },
    { name: 'Projects', path: '/projects', icon: <Cpu size={18} /> },
    { name: 'Experience', path: '/experience', icon: <Briefcase size={18} /> },
    { name: 'Resume', path: '/resume', icon: <FileText size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`mx-auto w-[90%] md:w-[95%] max-w-7xl rounded-2xl transition-all duration-300 relative ${
        scrolled 
          ? 'bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-cyan-900/10' 
          : 'bg-transparent'
      }`}>
        <div className="px-6 py-3 flex justify-between items-center relative min-h-[60px]">
          {/* Left: Logo */}
          <div className="flex-shrink-0 z-50">
            <Link 
                to="/" 
                className="text-2xl font-bold font-sans tracking-tighter group cursor-pointer relative"
            >
                <span className="text-navy-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">A</span>
                <span className="text-cyan-600 dark:text-cyan-400 group-hover:text-navy-900 dark:group-hover:text-white transition-colors">S</span>
                <span className="w-2 h-2 rounded-full bg-gold-400 inline-block ml-1 animate-pulse"></span>
            </Link>
          </div>

          {/* Center: Desktop Menu with 3D Effects */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:gap-4 xl:gap-8 z-40">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group perspective-500">
                <Link
                  to={link.path}
                  className={`relative block px-3 py-2 transition-all duration-300 transform-style-3d group-hover:-translate-y-1 ${
                    isActive(link.path) ? 'translate-y-[-2px]' : ''
                  }`}
                >
                  {/* Front Face (Main Text) */}
                  <span className={`relative z-10 text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                  }`}>
                    {link.name}
                  </span>

                  {/* 3D Depth Layer (Shadow Text) */}
                  <span className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs lg:text-sm font-bold uppercase tracking-widest text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-50 transition-all duration-300 transform translate-y-1 scale-y-[-0.5] blur-[1px] select-none pointer-events-none -z-10`}>
                    {link.name}
                  </span>

                  {/* Bottom Glow Indicator */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(0,217,255,0.8)] transition-all duration-300 group-hover:w-full ${
                    isActive(link.path) ? 'w-full' : ''
                  }`}></span>
                  
                  {/* Subtle Box Background on Hover */}
                  <span className="absolute inset-0 bg-slate-100 dark:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20 transform scale-90 group-hover:scale-100 border border-slate-200 dark:border-white/5"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Right: Settings & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            {/* Settings Button */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
              aria-label="Settings"
            >
              <Settings size={20} className="hover:rotate-90 transition-transform duration-500" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-navy-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full px-6 z-40">
          <div className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col space-y-4 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 text-lg font-medium p-3 rounded-lg transition-all cursor-pointer border border-transparent ${
                  isActive(link.path)
                    ? 'text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/5 shadow-inner'
                    : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;