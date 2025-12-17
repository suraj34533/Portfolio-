
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { reducedMotion } = useSettings();
  const [loaded, setLoaded] = useState(false);

  // Image Loading Logic
  const PROFILE_IMAGE = '/photo.png';
  const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleImageError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // Parallax for Text
    if (textRef.current) {
      textRef.current.style.transform = `
        perspective(1000px) 
        rotateX(${y * -10}deg) 
        rotateY(${x * 10}deg)
        translateZ(20px)
        `;
    }

    // Subtle Parallax for Image (Reverse direction for depth)
    if (imageRef.current) {
      imageRef.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (textRef.current) {
      textRef.current.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg)
        translateZ(0)
        `;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden py-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Centered Container: Adjusted max-w and alignment for perfect centering */}
      <div className="z-10 w-full max-w-5xl px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-center gap-12 lg:gap-16">

        {/* LEFT SIDE: Profile Image */}
        <div
          ref={imageRef}
          className={`relative flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
        >
          <div className="group relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full transition-transform duration-500 will-change-transform">

            {/* Glow Effects */}
            <div className="absolute -inset-4 bg-purple-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] transition-shadow duration-500"></div>

            {/* Gradient Border Container */}
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-purple-500 via-purple-400 to-cyan-400 group-hover:rotate-180 transition-all duration-[3s] ease-linear shadow-inner">
              {/* Inner Content */}
              <div className="w-full h-full rounded-full overflow-hidden bg-navy-900 relative z-10 border-[3px] border-transparent">
                <img
                  src={imgSrc}
                  alt="Arunava Saha - AI Developer"
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
                {/* Inner Shadow Overlay for Depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,217,255,0.2)] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* 1. System Badge */}
          <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase animate-pulse">
              System Online
            </span>
          </div>

          {/* 2. "Hii I'm" Text */}
          <p className={`text-2xl md:text-3xl lg:text-4xl font-black mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(0,217,255,0.5)] select-none transition-all duration-700 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            HII I'M
          </p>

          {/* 3. Main Name - ARUNAVA SAHA */}
          <div className="relative perspective-1000">
            <h1
              ref={textRef}
              className={`text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(0,217,255,0.5)] select-none transition-all duration-700 delay-300 transform-gpu ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              ARUNAVA   SAHA
            </h1>
          </div>

          {/* 4. Subtitle */}
          <div className={`flex flex-col items-center lg:items-start gap-6 mt-2 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 font-light tracking-wide max-w-2xl">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">AI Developer</span>
              <span className="mx-3 text-slate-300 dark:text-slate-600">|</span>
              <span className="text-gold-600 dark:text-gold-400 font-bold">Automation Engineer</span>
            </p>

            {/* 5. Buttons */}
            <div className="flex gap-4 mt-6">
              <Link
                to="/projects"
                className="px-6 py-3 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold rounded-none skew-x-[-12deg] hover:bg-navy-900 dark:hover:bg-white hover:skew-x-0 transition-all duration-300 shadow-lg dark:shadow-none cursor-pointer group"
              >
                <span className="block skew-x-[12deg] group-hover:skew-x-0 text-sm tracking-wider">VIEW PROJECTS</span>
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-gold-600 dark:border-gold-400 text-gold-600 dark:text-gold-400 font-bold rounded-none skew-x-[-12deg] hover:bg-gold-600 dark:hover:bg-gold-400 hover:text-white dark:hover:text-black transition-all duration-300 cursor-pointer group"
              >
                <span className="block skew-x-[12deg] group-hover:skew-x-0 text-sm tracking-wider">CONTACT ME</span>
              </Link>
              <a
                href="/resume.pdf"
                download="Arunava_Saha_Resume.pdf"
                className="px-6 py-3 border border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-bold rounded-none skew-x-[-12deg] hover:bg-purple-600 dark:hover:bg-purple-400 hover:text-white dark:hover:text-black transition-all duration-300 cursor-pointer group"
              >
                <span className="block skew-x-[12deg] group-hover:skew-x-0 text-sm tracking-wider">DOWNLOAD CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500 cursor-pointer transition-opacity duration-1000 delay-1000" style={{ opacity: loaded ? 1 : 0 }} onClick={() => navigate('/about')}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-slate-400 opacity-70">Next: About</span>
          <ArrowRight size={24} className="rotate-90 opacity-70" />
        </div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[128px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
