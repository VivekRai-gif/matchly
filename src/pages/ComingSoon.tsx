import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComingSoon = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/10 to-black" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(132, 204, 22, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(132, 204, 22, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8 
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-lime-400 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-lime-400/30">
              <Clock className="w-16 h-16 text-black" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-8 h-8 text-lime-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-gradient">Coming Soon</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 mb-4 leading-relaxed"
        >
          We're working hard to bring you something amazing!
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-gray-500 mb-12 max-w-2xl mx-auto"
        >
          This page is currently under development. Stay tuned for exciting updates and new features that will revolutionize your hiring process.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/"
            className="group px-8 py-4 bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600 text-black font-bold rounded-xl smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/30 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 smooth-transition" />
            Back to Home
          </Link>
          
          <button className="px-8 py-4 glass hover:glass-strong hover:border-lime-400/30 text-white font-semibold rounded-xl smooth-transition hover:scale-105 hover:glow-border flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Notify Me
          </button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-sm text-gray-400 mb-4">Development Progress</p>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full"
              />
            </div>
            <p className="text-xs text-lime-400 mt-2 font-semibold">65% Complete</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
