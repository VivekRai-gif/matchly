import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileSearch, Zap, Target, CheckCircle, BarChart3, Lock } from 'lucide-react';
import { useRef, MouseEvent } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard = ({ icon, title, description, gradient }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      className="relative group cursor-pointer"
    >
      <div className="glass-strong rounded-2xl p-8 border-2 border-white/10 hover:border-blue-500/50 transition-all duration-300 h-full">
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"
          style={{
            transform: 'translateZ(50px)',
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(75px)' }}>
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const FeatureShowcase = () => {
  const features = [
    {
      icon: <FileSearch className="w-7 h-7 text-white" />,
      title: 'Intelligent Resume Parsing',
      description: 'Extracts skills, experience, and qualifications with context-aware AI. No manual tagging required.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Zap className="w-7 h-7 text-white" />,
      title: 'Semantic Skill Matching',
      description: 'Goes beyond keyword matching. Understands synonyms, related skills, and industry context.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Target className="w-7 h-7 text-white" />,
      title: 'Real-Time Bias Detection',
      description: 'Actively scans for discrimination patterns and flags potential issues before they impact decisions.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <CheckCircle className="w-7 h-7 text-white" />,
      title: 'Explainable Rankings',
      description: 'Every candidate score comes with clear reasoning. No black-box decisions.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-white" />,
      title: 'Fairness Analytics',
      description: 'Track diversity metrics, bias trends, and hiring patterns over time with interactive dashboards.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <Lock className="w-7 h-7 text-white" />,
      title: 'Privacy-Preserving Design',
      description: 'Your candidate data never leaves your infrastructure. Full control and compliance guaranteed.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
            Features
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Built for <span className="text-gradient">Precision & Trust</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every feature designed to eliminate bias and maximize fairness
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <button className="group px-8 py-4 glass-strong rounded-full font-semibold text-lg border-2 border-blue-500/30 hover:border-blue-500/60 transition-all hover:scale-105">
            <span className="text-gradient">Explore All Features →</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
