import React from 'react';
import { X, Moon, Sun, Monitor, Type, Volume2, Eye, Shield, Trash2, Globe, Check } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsPanel: React.FC = () => {
  const {
    theme, toggleTheme, setTheme,
    fontSize, setFontSize,
    reducedMotion, setReducedMotion,
    soundEnabled, setSoundEnabled,
    isSettingsOpen, setIsSettingsOpen
  } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <>
      {/* Backdrop - Z-index 190 to cover Navbar (100) and Chat (150) */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[190] transition-opacity"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* Panel - Z-index 200 */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white dark:bg-navy-900 border-l border-slate-200 dark:border-white/10 shadow-2xl z-[200] transform transition-transform duration-300 ease-in-out ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
            Settings
          </h2>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-3 text-slate-500 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
            aria-label="Close Settings"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-80px)] space-y-8">

          {/* Appearance Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Monitor size={14} /> Appearance
            </h3>

            <div className="bg-slate-50 dark:bg-navy-950/50 rounded-xl p-4 border border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400 text-center">
              Dark Mode is permanently enabled for the best experience.
            </div>
          </section>

          {/* Typography Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Type size={14} /> Typography
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setFontSize('small')}>
                <span className="text-sm text-navy-900 dark:text-slate-200">Small</span>
                {fontSize === 'small' && <Check size={18} className="text-cyan-500" />}
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setFontSize('medium')}>
                <span className="text-base text-navy-900 dark:text-slate-200">Default</span>
                {fontSize === 'medium' && <Check size={18} className="text-cyan-500" />}
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setFontSize('large')}>
                <span className="text-lg text-navy-900 dark:text-slate-200">Large</span>
                {fontSize === 'large' && <Check size={18} className="text-cyan-500" />}
              </div>
            </div>
          </section>

          {/* Accessibility Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Eye size={14} /> Accessibility
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg text-navy-900 dark:text-slate-300">
                    <Monitor size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy-900 dark:text-white">Minimal Cursor Mode</div>
                    <div className="text-xs text-slate-500">Minimize animations</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-navy-950 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg text-navy-900 dark:text-slate-300">
                    <Volume2 size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy-900 dark:text-white">Sound Effects</div>
                    <div className="text-xs text-slate-500">Enable UI sounds</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-navy-950 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Data Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield size={14} /> Data & Privacy
            </h3>

            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-200 dark:hover:border-red-900/30 group transition-all">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-red-600 dark:group-hover:text-red-400">Clear Chat History</span>
              <Trash2 size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
            </button>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Globe size={16} />
                <span>Language</span>
              </div>
              <span className="text-xs font-mono bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-navy-900 dark:text-slate-200">
                English (US)
              </span>
            </div>
            <p className="text-xs text-center text-slate-400 mt-8">
              Settings are automatically saved to this device.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;