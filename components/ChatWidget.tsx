import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Mic, MicOff, Volume2, VolumeX, Square, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatMessage } from '../types';
import { useSettings } from '../contexts/SettingsContext';

// Web Speech API Types
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Aura. I can guide you through Arunava's portfolio. Try saying 'Take me to projects' or 'Switch to light mode'.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Navigation State
  const [showControls, setShowControls] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Settings Integration
  const { setTheme, setReducedMotion, setFontSize } = useSettings();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const iWindow = window as unknown as IWindow;
    const SpeechRecognition = iWindow.SpeechRecognition || iWindow.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speak = (text: string) => {
    if (!voiceEnabled || !synthRef.current) return;

    synthRef.current.cancel(); // Stop previous speech

    // Strip markdown chars for smoother speech
    const cleanText = text.replace(/[*#_`]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.volume = volume;

    // Try to select a female/friendly voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      stopSpeaking();
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleVoiceCommand = (text: string) => {
    const lowerText = text.toLowerCase();

    // Theme Commands
    if (lowerText.includes('dark mode') || lowerText.includes('dark theme')) {
      setTheme('dark');
      submitMessage(text, "Switching to Dark Mode.");
      return;
    }
    if (lowerText.includes('light mode') || lowerText.includes('light theme')) {
      setTheme('light');
      submitMessage(text, "Switching to Light Mode. It looks brilliant!");
      return;
    }

    // Accessibility Commands
    if (lowerText.includes('reduce motion') || lowerText.includes('stop animation')) {
      setReducedMotion(true);
      submitMessage(text, "I've enabled reduced motion for better accessibility.");
      return;
    }
    if (lowerText.includes('increase font') || lowerText.includes('bigger text')) {
      setFontSize('large');
      submitMessage(text, "Increasing text size for better readability.");
      return;
    }

    // Navigation Commands
    const sections = [
      { key: 'home', path: '/' },
      { key: 'about', path: '/about' },
      { key: 'project', path: '/projects' },
      { key: 'skill', path: '/skills' },
      { key: 'experience', path: '/experience' },
      { key: 'contact', path: '/contact' }
    ];

    for (const section of sections) {
      if (lowerText.includes(`go to ${section.key}`) || lowerText.includes(`scroll to ${section.key}`) || lowerText.includes(`show ${section.key}`)) {
        navigate(section.path);
        submitMessage(text, `Navigating to ${section.key.charAt(0).toUpperCase() + section.key.slice(1)} page.`);
        return;
      }
    }

    // Tour Command
    if (lowerText.includes('start tour') || lowerText.includes('guide me')) {
      startTour();
      return;
    }

    // Default submit
    submitMessage(text);
  };

  const startTour = async () => {
    const tourSteps = [
      { path: '/', text: "Welcome to Arunava's portfolio. This is the Hero section, featuring a 3D introduction." },
      { path: '/about', text: "Here in the About section, you can see Arunava's focus on AI, Automation, and Full Stack development." },
      { path: '/projects', text: "These are the featured projects. Hover over them to see details about the tech stack." },
      { path: '/skills', text: "Arunava has high proficiency in Python, React, and Cloud Architecture." },
      { path: '/experience', text: "Here is the professional timeline, showcasing experience at InnovateTech and DataFlow Systems." },
      { path: '/contact', text: "Finally, feel free to reach out using this contact form." }
    ];

    setIsOpen(true);

    // Helper for delay
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const step of tourSteps) {
      navigate(step.path);
      // Add message locally without API call for tour
      const msg: ChatMessage = { id: Date.now().toString(), role: 'model', text: step.text, timestamp: Date.now() };
      setMessages(prev => [...prev, msg]);
      speak(step.text);

      // Wait for speech duration approx (word count * avg time) + pause
      await wait(step.text.split(' ').length * 350 + 2000);
    }
  };

  // Replaces frontend Gemini logic with backend Fetch logic
  const submitMessage = async (text: string, overrideResponse?: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (overrideResponse) {
      setIsTyping(false);
      const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: overrideResponse, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMessage]);
      speak(overrideResponse);
      return;
    }

    const aiMessageId = (Date.now() + 1).toString();

    try {
      // Add artificial delay for better UX and WebView stability (300ms as requested)
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Backend Error (${response.status}):`, errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (!data.reply) {
        throw new Error('Invalid response format: Missing reply field');
      }

      setMessages(prev => [...prev, {
        id: aiMessageId,
        role: 'model',
        text: data.reply,
        timestamp: Date.now()
      }]);

      setIsTyping(false);
      speak(data.reply);

    } catch (error) {
      console.error("Chat Request Failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setMessages(prev => [...prev, {
        id: aiMessageId,
        role: 'model',
        text: `Error: ${errorMessage}. Please check your connection or API Key.`,
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    submitMessage(input);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'projects':
        navigate('/projects');
        submitMessage("Show me the projects", "Navigating to the Projects page.");
        break;
      case 'contact':
        navigate('/contact');
        submitMessage("I want to contact him", "Taking you to the contact form.");
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end font-sans">
      {/* Chat Window */}
      <div
        className={`transition-all duration-300 ease-out transform origin-bottom-right ${isOpen
          ? 'w-[90vw] md:w-[400px] h-[600px] opacity-100 scale-100'
          : 'w-0 h-0 opacity-0 scale-0 overflow-hidden'
          } bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col mb-4`}
      >
        {/* Header */}
        <div className="flex-none p-4 bg-gradient-to-r from-cyan-600/20 to-slate-100 dark:from-cyan-900/50 dark:to-navy-900 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-cyan-500/20 rounded-full">
              <Bot className="text-cyan-600 dark:text-cyan-400" size={24} />
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white dark:border-navy-900"></span>
              )}
            </div>
            <div>
              <h3 className="text-navy-900 dark:text-white font-bold flex items-center gap-2">
                Aura AI
                <span className="text-[10px] bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">BETA</span>
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={10} />
                <span className="uppercase">{location.pathname === '/' ? 'HOME' : location.pathname.substring(1).toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition-colors ${voiceEnabled ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg cursor-pointer"
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex-none px-4 py-2 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-navy-950/30 overflow-x-auto no-scrollbar flex gap-2">
          <button onClick={() => startTour()} className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 rounded-full hover:bg-gold-500/20 transition-colors">
            Start Tour
          </button>
          <button onClick={() => handleQuickAction('projects')} className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
            View Projects
          </button>
          <button onClick={() => handleQuickAction('contact')} className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
            Contact
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-md ${msg.role === 'user'
                ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none'
                : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-white/5 backdrop-blur-md'
                }`}>
                {msg.text}
                {msg.isLoading && (
                  <div className="flex gap-1 mt-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Feedback & Controls */}
        {showControls && (
          <div className="flex-none px-4 py-2 bg-slate-50 dark:bg-navy-950/50 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <div className="flex items-center gap-1 h-4">
                  <div className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite] h-2"></div>
                  <div className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite_0.1s] h-4"></div>
                  <div className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-3"></div>
                  <div className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite_0.3s] h-4"></div>
                </div>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono tracking-wider">VOICE READY</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isSpeaking && (
                <button onClick={stopSpeaking} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                  <Square size={14} fill="currentColor" />
                </button>
              )}
              <button
                onClick={() => setSpeechRate(r => r === 2 ? 1 : r + 0.5)}
                className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-500/20"
              >
                {speechRate}x
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex-none p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 relative">
          <div className="relative flex items-end gap-2">
            <div className="relative flex-1 bg-slate-50 dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-white/10 focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={isListening ? "Listening..." : "Ask Aura or say 'Switch to light mode'..."}
                className="w-full bg-transparent text-navy-900 dark:text-white pl-4 pr-10 py-3 focus:outline-none text-sm resize-none max-h-24 min-h-[44px]"
                rows={1}
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-all ${isListening
                  ? 'text-red-500 bg-red-500/10 animate-pulse ring-2 ring-red-500/20'
                  : 'text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
            >
              {isTyping ? <Sparkles size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </form>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center p-4 rounded-full shadow-[0_0_30px_rgba(0,217,255,0.3)] bg-gradient-to-r from-cyan-600 to-blue-600 text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(0,217,255,0.5)] border border-cyan-400/30"
        >
          {/* Animated rings */}
          <span className="absolute inset-0 rounded-full border border-white/20 animate-[ping_2s_linear_infinite]"></span>
          <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-[ping_2s_linear_infinite_0.5s]"></span>

          <MessageSquare size={28} className="relative z-10" />

          <div className="absolute right-full mr-4 px-4 py-2 bg-white/90 dark:bg-navy-900/90 backdrop-blur text-sm text-cyan-600 dark:text-cyan-400 rounded-xl border border-slate-200 dark:border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 pointer-events-none">
            Voice Assistant Online
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;