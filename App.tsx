import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Resume from './components/Resume';
import ChatWidget from './components/ChatWidget';
import SettingsPanel from './components/SettingsPanel';
import CustomCursor from './components/CustomCursor';
import { SettingsProvider } from './contexts/SettingsContext';

const PageWrapper: React.FC = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = React.useState(location);
  const [transitionStage, setTransitionStage] = React.useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`min-h-screen w-full pt-20 transition-all duration-500 transform ${
        transitionStage === 'fadeIn' 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4'
      }`}
      onTransitionEnd={onAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <HashRouter>
        <div className="bg-slate-50 dark:bg-navy-950 min-h-screen text-navy-900 dark:text-slate-200 selection:bg-cyan-500/30 font-sans transition-colors duration-300 relative overflow-hidden">
          <CustomCursor />
          <ParticleBackground />
          
          {/* Fixed Elements */}
          <Navbar />
          <ChatWidget />
          <SettingsPanel />

          {/* Main Content Area */}
          <main className="relative z-10">
             <PageWrapper />
          </main>
        </div>
      </HashRouter>
    </SettingsProvider>
  );
};

export default App;