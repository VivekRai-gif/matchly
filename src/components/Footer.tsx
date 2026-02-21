import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const links = {
    main: [
      { label: 'Home', href: '#' },
      { label: 'Services', href: '#services' },
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
    ],
  };

  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <img 
              src="/matchly-logo.png" 
              alt="matchly" 
              className="h-8 w-auto brightness-200"
            />
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {links.main.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {[
              { icon: <Facebook className="w-5 h-5" />, href: '#' },
              { icon: <Twitter className="w-5 h-5" />, href: '#' },
              { icon: <Linkedin className="w-5 h-5" />, href: '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-11 h-11 rounded-xl glass hover:glass-strong hover:border-lime-400/50 flex items-center justify-center text-gray-400 hover:text-lime-400 smooth-transition hover:scale-110 hover:glow-border"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>📧 hello@matchly.com</span>
            <span>📞 +91 (810) 22-2268</span>
          </div>
          <div className="flex gap-4">
            <span>Somewhere in the World</span>
          </div>
          <div>
            <span>© 2024 matchly. All rights reserved.</span>
          </div>
        </div>

        {/* Stay Connected */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a href="#" className="text-lime-400 hover:text-lime-300 transition-colors font-medium">
            Stay Connected
          </a>
        </motion.div>
      </div>
    </footer>
  );
};
