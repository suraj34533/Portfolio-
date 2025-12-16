import React, { useState } from 'react';
import supabase from '../services/supabaseClient';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, MessageCircle, ArrowLeft, Home, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Error State
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Validation Logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setFormStatus('submitting');

      try {
        const { error } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message,
            },
          ]);

        if (error) throw error;

        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);

      } catch (err) {
        console.error('Error submitting form:', err);
        // We could handle error state specifically here, 
        // for now we'll just not show success and perhaps log/alert
        alert('Failed to send message. Please try again.');
        setFormStatus('idle');
      }
    }
  };

  // Social Media Configuration with Official Colors
  const socialLinks = [
    {
      Icon: Github,
      href: "https://github.com/suraj34533",
      className: "bg-[#181717] text-white hover:brightness-125 border-transparent"
    },
    {
      Icon: Linkedin,
      href: "https://linkedin.com/in/arunava6920",
      className: "bg-[#0077b5] text-white hover:brightness-110 border-transparent"
    },
    {
      Icon: MessageCircle,
      href: "https://wa.me/917304356686",
      className: "bg-[#25D366] text-white hover:brightness-110 border-transparent"
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/arunavalifts?igsh=MXcxaHlxMnV6OHFtOQ==",
      className: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:brightness-110 border-transparent"
    }
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-navy-900 dark:text-white">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400">Connect</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-12">
              Interested in collaborating on AI projects or need automation solutions?
              I'm always open to discussing new ideas and opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/10 transition-colors border border-slate-200 dark:border-white/5 group-hover:border-cyan-500/30">
                  <Mail className="text-cyan-600 dark:text-cyan-400" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-sm font-mono">EMAIL</h4>
                  <p className="text-navy-900 dark:text-white text-lg">sahap3264@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-gold-100 dark:group-hover:bg-gold-500/10 transition-colors border border-slate-200 dark:border-white/5 group-hover:border-gold-500/30">
                  <Phone className="text-gold-600 dark:text-gold-400" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-sm font-mono">PHONE</h4>
                  <p className="text-navy-900 dark:text-white text-lg">+91 7304356686</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/10 transition-colors border border-slate-200 dark:border-white/5 group-hover:border-purple-500/30">
                  <MapPin className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-sm font-mono">LOCATION</h4>
                  <p className="text-navy-900 dark:text-white text-lg">Maharashtra, Navi Mumbai</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {socialLinks.map(({ Icon, href, className }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-full border shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${className}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
            {formStatus === 'success' && (
              <div className="absolute inset-0 z-20 bg-white/90 dark:bg-navy-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out]">
                <div className="p-4 bg-green-500/10 rounded-full mb-4">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500 dark:text-slate-400">I'll get back to you as soon as possible.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-mono">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/50 dark:bg-navy-950/50 border rounded-lg p-3 text-navy-900 dark:text-white focus:outline-none transition-colors ${errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-200 dark:border-white/10 focus:border-cyan-400'
                      }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-[fadeIn_0.3s_ease-out]">
                      <AlertCircle size={10} /> <span>{errors.name}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-mono">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/50 dark:bg-navy-950/50 border rounded-lg p-3 text-navy-900 dark:text-white focus:outline-none transition-colors ${errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-200 dark:border-white/10 focus:border-cyan-400'
                      }`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-[fadeIn_0.3s_ease-out]">
                      <AlertCircle size={10} /> <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-mono">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-white/50 dark:bg-navy-950/50 border rounded-lg p-3 text-navy-900 dark:text-white focus:outline-none transition-colors ${errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-200 dark:border-white/10 focus:border-cyan-400'
                    }`}
                />
                {errors.subject && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-[fadeIn_0.3s_ease-out]">
                    <AlertCircle size={10} /> <span>{errors.subject}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-mono">MESSAGE</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-white/50 dark:bg-navy-950/50 border rounded-lg p-3 text-navy-900 dark:text-white focus:outline-none transition-colors ${errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-200 dark:border-white/10 focus:border-cyan-400'
                    }`}
                ></textarea>
                {errors.message && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-[fadeIn_0.3s_ease-out]">
                    <AlertCircle size={10} /> <span>{errors.message}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {formStatus === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "SEND MESSAGE"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Navigation / Footer */}
        <div className="flex flex-col items-center mt-12 pt-8 border-t border-slate-200 dark:border-white/5 text-center">
          <div className="w-full flex justify-start mb-8">
            <button
              onClick={() => navigate('/experience')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300"
            >
              <ArrowLeft size={20} /> Previous
            </button>
            <div className="flex-grow"></div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors text-navy-900 dark:text-white font-medium"
            >
              <Home size={18} /> Back to Home
            </button>
          </div>

          <div className="text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Arunava Saha. All rights reserved.</p>
            <p className="mt-2">Designed with Luxury & Intelligence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;