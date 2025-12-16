
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Float, Stars } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "framer-motion";
import * as THREE from "three";
import { Terminal, Globe, Database, Layers, Brain, Users, CheckCircle2 } from 'lucide-react';

// Define the Skill interface
interface Skill {
  title: string;
  img: string;
  invert?: boolean;
}

function FloatingSkills({ skills }: { skills: Skill[] }) {
  const { viewport } = useThree();
  
  // Responsive Grid Logic
  // Viewport width roughly correlates to: <11 (Mobile), 11-16 (Tablet), >16 (Desktop)
  let columns = 2;
  if (viewport.width >= 16) columns = 6;       // Desktop: 6 cols
  else if (viewport.width >= 10) columns = 3;  // Tablet: 3 cols
  else columns = 2;                            // Mobile: 2 cols

  // Spacing
  const xGap = 2.5; 
  const yGap = 3.0;
  
  const totalRows = Math.ceil(skills.length / columns);
  
  // Center the grid perfectly horizontally based on column count
  const xOffset = ((columns - 1) / 2) * xGap;
  const yOffset = ((totalRows - 1) / 2) * yGap;

  return (
    // Moved group lower (y: -2.5) to sit clearly under the heading
    <group position={[0, -2.5, 0]}>
      {skills.map((skill, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const x = col * xGap - xOffset;
        const y = -row * yGap + yOffset;
        
        return (
          <Float 
            speed={2} 
            rotationIntensity={0.1} 
            floatIntensity={0.3} 
            key={i}
          >
            <mesh position={[x, y, 0]}>
              <planeGeometry args={[1.8, 2.2]} />
              <meshStandardMaterial
                color="#0f172a" 
                transparent
                opacity={0} // Invisible mesh, HTML handles visual
              />
              <Html 
                center 
                transform 
                distanceFactor={10}
                style={{ pointerEvents: 'none' }} // Let orbit controls work through it
              >
                {/* Card Styles: w-28 h-36 (approx 112px x 144px) */}
                <div className="w-28 h-36 p-4 rounded-xl backdrop-blur-md bg-navy-900/60 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,217,255,0.1)] flex flex-col items-center justify-center gap-3 hover:bg-navy-800/80 hover:border-cyan-400 hover:scale-105 transition-all duration-300 group select-none relative overflow-hidden">
                  
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon Container: Reduced size (w-10 h-10) */}
                  <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10">
                    <img 
                      src={skill.img} 
                      alt={skill.title} 
                      className={`w-full h-full object-contain filter drop-shadow-md ${skill.invert ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                  
                  {/* Text: Smaller font size */}
                  <h3 className="text-white text-[10px] uppercase font-bold text-center tracking-widest group-hover:text-cyan-400 transition-colors z-10 leading-tight">
                    {skill.title}
                  </h3>
                </div>
              </Html>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function InteractiveBackground({ mouse }: { mouse: any }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (!sphereRef.current) return;
    
    // Mouse following effect for the sphere
    sphereRef.current.position.x = THREE.MathUtils.lerp(
      sphereRef.current.position.x,
      mouse.x.get() * viewport.width / 4,
      0.1
    );
    sphereRef.current.position.y = THREE.MathUtils.lerp(
      sphereRef.current.position.y,
      mouse.y.get() * viewport.height / 4,
      0.1
    );
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d9ff" />
      <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffd700" />

      {/* Background Sphere tracking mouse */}
      <mesh ref={sphereRef} position={[0,0,-5]}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial 
          color="#00d9ff"
          transparent
          opacity={0.05}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </>
  );
}

// ----------------------------------------------------------------------
// NEW COMPONENT: Detailed Skill Categories
// ----------------------------------------------------------------------
const SkillCategories = () => {
  const categories = [
    {
      title: "Programming Languages",
      icon: <Terminal size={24} className="text-cyan-400" />,
      skills: ["Python", "C", "C++", "Java"],
      borderColor: "group-hover:border-cyan-500/50",
      glowColor: "group-hover:shadow-cyan-500/20"
    },
    {
      title: "Web Technologies",
      icon: <Globe size={24} className="text-purple-400" />,
      skills: ["HTML", "CSS", "JavaScript", "React"],
      borderColor: "group-hover:border-purple-500/50",
      glowColor: "group-hover:shadow-purple-500/20"
    },
    {
      title: "Databases & Tools",
      icon: <Database size={24} className="text-emerald-400" />,
      skills: ["MySQL", "Supabase", "Git"],
      borderColor: "group-hover:border-emerald-500/50",
      glowColor: "group-hover:shadow-emerald-500/20"
    },
    {
      title: "Frameworks & Libraries",
      icon: <Layers size={24} className="text-amber-400" />,
      skills: ["TensorFlow", "PyTorch", "OpenCV"],
      borderColor: "group-hover:border-amber-500/50",
      glowColor: "group-hover:shadow-amber-500/20"
    },
    {
      title: "Core Concepts",
      icon: <Brain size={24} className="text-pink-400" />,
      skills: ["Data Structures & Algorithms", "Machine Learning", "Deep Learning", "YOLO Object Detection", "Explainable AI (XAI)"],
      borderColor: "group-hover:border-pink-500/50",
      glowColor: "group-hover:shadow-pink-500/20"
    },
    {
      title: "Soft Skills",
      icon: <Users size={24} className="text-blue-400" />,
      skills: ["Teamwork", "Problem Solving", "Creativity", "Adaptability", "Communication"],
      borderColor: "group-hover:border-blue-500/50",
      glowColor: "group-hover:shadow-blue-500/20"
    }
  ];

  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className={`group relative p-6 rounded-2xl bg-navy-900/40 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:bg-navy-800/60 shadow-lg hover:shadow-2xl ${cat.borderColor} ${cat.glowColor}`}
          >
            {/* 3D Glass Highlight */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors tracking-wide">
                {cat.title}
              </h3>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

            {/* Skills List */}
            <ul className="space-y-3 relative z-10">
              {cat.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center gap-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                  <CheckCircle2 size={14} className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-sm font-medium tracking-wide">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  const skills: Skill[] = [
    { title: "Supabase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { title: "Express.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
    { title: "React.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { title: "Automation", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
    { title: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { title: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { title: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { title: "AWS", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", invert: true },
    { title: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { title: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { title: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { title: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  ];

  const mouse = {
    x: useSpring(useMotionValue(0), { stiffness: 100, damping: 20 }),
    y: useSpring(useMotionValue(0), { damping: 20 })
  };

  return (
    <div className="relative min-h-screen w-full bg-navy-950 overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      {/* 
        SECTION 1: 3D TECH ARSENAL
      */}
      <section 
        className="relative h-screen w-full"
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouse.x.set((e.clientX - rect.width/2) / rect.width * 2);
          mouse.y.set((rect.height/2 - e.clientY) / rect.height * 2);
        }}
      >
        <Canvas camera={{ position: [0, 0, 18], fov: 40 }} dpr={[1, 2]}>
          <InteractiveBackground mouse={mouse} />
          <FloatingSkills skills={skills} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>

        {/* Title Overlay */}
        <motion.div 
          className="absolute top-14 left-4 md:top-16 md:left-10 z-50 pointer-events-none"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(0,217,255,0.5)] tracking-tighter">
            TECH ARSENAL
          </h2>
          <div className="h-1.5 w-24 md:w-32 bg-gradient-to-r from-gold-400 to-gold-600 mt-3 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.6)]"></div>
        </motion.div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 pointer-events-none">
          <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll Down</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </div>
      </section>

      {/* 
        SECTION 2: SKILL CATEGORIES
      */}
      <section className="relative z-10 -mt-20 pt-20">
         <SkillCategories />
      </section>
    </div>
  );
}
