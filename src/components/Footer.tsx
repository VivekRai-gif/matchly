import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Mail, Phone, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  AI Resume Matching
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Skill Verification
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Email Automation
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  ATS Optimization
                </a>
              </li>
            </ul>
          </motion.div>

          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Company
                </a>
              </li>
              <li>
                <a href="#about" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#careers" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Matchly</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Transform your career journey with AI-powered intelligence. We help job seekers understand their strengths, bridge skill gaps, and find the perfect opportunities faster and more effectively.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:+919354632327" 
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 9354632327
              </a>
              <a 
                href="mailto:vivekrai2416@gmail.com" 
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                vivekrai2416@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4 py-8 border-t border-neutral-800"
        >
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 border border-neutral-700 hover:border-primary-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 border border-neutral-700 hover:border-primary-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 border border-neutral-700 hover:border-primary-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 border border-neutral-700 hover:border-primary-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300"
          >
            <Github className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-neutral-500 text-sm pt-4">
          <p>Matchly © 2024</p>
        </div>
      </div>
    </footer>
  );
};
