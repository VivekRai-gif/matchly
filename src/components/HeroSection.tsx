import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { FloatingOrb, ParticleField } from './Effects';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <ParticleField />
        <FloatingOrb delay={0} color="from-blue-500 to-cyan-500" size={600} />
        <FloatingOrb delay={2} color="from-purple-500 to-pink-500" size={400} blur={120} />
        <FloatingOrb delay={4} color="from-cyan-500 to-blue-500" size={500} blur={100} />
      </div>

      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300 font-medium">Multi-Agent AI System</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
        >
          <span className="block">Hiring,</span>
          <span className="block text-gradient glow-text">Reimagined</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The world's first multi-agent ethical hiring engine.
          <br />
          Transparent matching. Zero bias. Pure intelligence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
            <span className="relative z-10 flex items-center gap-2">
              Experience Fair Hiring
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="px-8 py-4 glass-strong rounded-full font-semibold text-lg transition-all hover:scale-105 hover:border-blue-400/50">
            Watch Demo
          </button>
        </motion.div>

        {/* Floating UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-20 perspective-1000"
        >
          <div className="relative max-w-5xl mx-auto">
            <div className="glass-strong rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border-2 border-blue-500/30">
              <div className="space-y-4">
                {/* Mock Terminal Header */}
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-gray-400 ml-4">scoutify-ai-engine</span>
                </div>
                
                {/* Mock Content */}
                <div className="space-y-3 font-mono text-sm text-left">
                  <div className="text-green-400">✓ Resume Parser Agent: Active</div>
                  <div className="text-green-400">✓ Skill Matcher Agent: Analyzing...</div>
                  <div className="text-blue-400">⟳ Bias Detector Agent: Scanning</div>
                  <div className="text-purple-400">◆ Synthesizer Agent: Ranking candidates</div>
                  <div className="mt-4 p-4 bg-blue-500/10 rounded border border-blue-500/30">
                    <span className="text-blue-300">Fairness Score: </span>
                    <span className="text-white font-bold">98.7%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-8 top-1/4 w-48 p-4 glass rounded-xl border border-cyan-500/30"
            >
              <div className="text-xs text-cyan-400">Transparency</div>
              <div className="text-2xl font-bold mt-1">100%</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -left-8 top-1/3 w-48 p-4 glass rounded-xl border border-purple-500/30"
            >
              <div className="text-xs text-purple-400">Bias Detected</div>
              <div className="text-2xl font-bold mt-1">0.3%</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-blue-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
