import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const goToAIFeatures = () => {
    navigate('/features/ai-features');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-3 left-3 right-3 md:top-6 md:left-6 md:right-6 z-50">
      <div className="glass-strong border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/20 hover:border-white/15 smooth-transition">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img 
              src="/matchlylogo.png" 
              alt="matchly" 
              className="h-8 w-auto brightness-200"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300 hover:text-primary-10 smooth-transition text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-primary-10 to-primary-20 group-hover:w-full smooth-transition"></span>
              </motion.button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={goToAIFeatures}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg smooth-transition hover:scale-105 hover:shadow-lg hover:shadow-purple-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI Features
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-10 to-primary-20 hover:from-primary-20 hover:to-primary-30 text-white font-bold rounded-lg smooth-transition hover:scale-105 hover:shadow-lg hover:shadow-primary-10/30"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2 px-2"
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-primary-10 smooth-transition py-2 px-3 rounded-lg hover:bg-white/5 font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={goToAIFeatures}
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg smooth-transition text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Features
              </button>
              <button 
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-10 to-primary-20 hover:from-primary-20 hover:to-primary-30 text-white font-bold rounded-lg smooth-transition text-center"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </nav>
  );
};
