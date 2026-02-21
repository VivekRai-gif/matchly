import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { FloatingOrb } from './Effects';

export const CTASection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <FloatingOrb delay={0} color="from-blue-600 to-cyan-600" size={800} blur={150} />
        <FloatingOrb delay={1} color="from-purple-600 to-pink-600" size={600} blur={120} />
        <FloatingOrb delay={2} color="from-cyan-600 to-blue-600" size={700} blur={140} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-blue-300 font-medium">Join the Ethical AI Revolution</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          Ready to Hire
          <br />
          <span className="text-gradient glow-text">Without Bias?</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your hiring process with multi-agent AI that's transparent,
          fair, and built for the future of work.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-bold text-xl overflow-hidden shadow-2xl shadow-blue-500/50"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Free Trial
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 glass-strong rounded-full font-bold text-xl border-2 border-white/20 hover:border-blue-400/50 transition-all"
          >
            Schedule Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20"
        >
          {[
            { value: '98.7%', label: 'Fairness Score' },
            { value: '0.3%', label: 'Bias Detection' },
            { value: '100%', label: 'Transparency' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="border-t border-white/10 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Copyright */}
            <div className="text-left">
              <div className="text-2xl font-bold text-gradient mb-2">Scoutify AI</div>
              <div className="text-sm text-gray-500">
                © 2026 Team Zygo. All rights reserved.
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:border-blue-400/50 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </section>
  );
};
