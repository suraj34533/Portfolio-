import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
type FontSize = 'small' | 'medium' | 'large';

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setThemeState(savedTheme);
    
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    if (savedFontSize) setFontSize(savedFontSize);
    
    const savedMotion = localStorage.getItem('reducedMotion');
    if (savedMotion) setReducedMotion(JSON.parse(savedMotion));
    
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound) setSoundEnabled(JSON.parse(savedSound));
  }, []);

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply Font Size
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (fontSize) {
      case 'small': root.classList.add('text-sm'); break;
      case 'medium': root.classList.add('text-base'); break;
      case 'large': root.classList.add('text-lg'); break;
    }
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Persist other settings
  useEffect(() => {
    localStorage.setItem('reducedMotion', JSON.stringify(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return (
    <SettingsContext.Provider value={{
      theme,
      toggleTheme,
      setTheme,
      fontSize,
      setFontSize,
      reducedMotion,
      setReducedMotion,
      soundEnabled,
      setSoundEnabled,
      isSettingsOpen,
      setIsSettingsOpen
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
