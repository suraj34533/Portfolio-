import React, { useEffect, useRef, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useSettings();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Track mouse position for smooth animation
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // If reduced motion is enabled, do not hide cursor or run animation loop
    if (reducedMotion) return;

    // Hide default cursor globally
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      body { overflow-x: hidden; }
    `;
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button';

      setIsHovering(!!isInteractive);
    };

    // Animation Loop
    const animate = () => {
      // Smooth lerp for cursor movement
      const dt = 0.15; // Ease factor
      cursor.current.x += (mouse.current.x - cursor.current.x) * dt;
      cursor.current.y += (mouse.current.y - cursor.current.y) * dt;

      if (cursorRef.current) {
        // Apply transform
        // Note: No -50% translate because standard pointers anchor at top-left (0,0)
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [reducedMotion]); // Dependency added to handle toggle

  if (reducedMotion) return null;

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform flex items-start justify-start"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }} // Initial off-screen
      >
        {/* Glow Halo Container - Centered on the cursor tip roughly */}
        <div 
          ref={glowRef}
          className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-500/30 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
            isHovering ? 'scale-[2.5] opacity-50' : 'scale-100 opacity-30'
          } ${isClicking ? 'scale-[0.8] opacity-60' : ''}`}
          style={{
            animation: 'pulseGlow 3s infinite ease-in-out'
          }}
        />

        {/* The 3D Arrow SVG */}
        <div className={`relative transition-transform duration-200 ease-out origin-top-left pointer-events-none ${
          isHovering ? 'scale-110' : 'scale-100'
        } ${isClicking ? 'scale-90' : ''}`}>
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]"
          >
            <defs>
              <linearGradient id="luxuryGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#d8b4fe" /> {/* Light Purple */}
                <stop offset="100%" stopColor="#7e22ce" /> {/* Dark Purple */}
              </linearGradient>
              <filter id="innerBevel" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lightingColor="#ffffff" result="specOut">
                  <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
              </filter>
            </defs>
            
            {/* Main Arrow Shape */}
            <path 
              d="M2 2L10.5 28.5L14.5 18.5L24 18.5L2 2Z" 
              fill="url(#luxuryGradient)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            
            {/* Optional: subtle detail line for extra 3D feel */}
            <path 
              d="M14.5 18.5L24 18.5"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;