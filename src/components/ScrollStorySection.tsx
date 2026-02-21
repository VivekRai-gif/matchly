import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Brain, Eye, Shield } from 'lucide-react';
import { useRef } from 'react';

interface StoryCardProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  index: number;
}

const StoryCard = ({ icon, badge, title, description, stats, index }: StoryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -100 : 100, 0, 0]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, x }}
      className="relative"
    >
      <div className="glass-strong rounded-3xl p-8 md:p-12 border-2 border-white/10 hover:border-blue-500/30 transition-all duration-500 group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6"
          >
            {icon}
          </motion.div>

          {/* Badge */}
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
            {badge}
          </div>

          {/* Title */}
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            {description}
          </p>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ScrollStorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-white" />,
      badge: 'The Problem',
      title: 'Algorithmic Bias is Real',
      description:
        '78% of AI hiring systems show measurable bias based on name, gender, or background. Traditional ATS software rejects qualified candidates before a human ever sees them. The problem isn\'t automation—it\'s opacity.',
      stats: [
        { label: 'Biased Systems', value: '78%' },
        { label: 'Hidden Rejections', value: '60%' },
      ],
    },
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      badge: 'The Solution',
      title: 'Multi-Agent Intelligence',
      description:
        'Scoutify AI uses four specialized agents working together: Resume Parser extracts skills, Matcher finds relevance, Bias Detector audits decisions, and Synthesizer explains rankings. Every decision is traceable.',
      stats: [
        { label: 'AI Agents', value: '4' },
        { label: 'Decision Points', value: '100%' },
      ],
    },
    {
      icon: <Eye className="w-8 h-8 text-white" />,
      badge: 'Transparency',
      title: 'See Every Decision',
      description:
        'Unlike black-box systems, Scoutify shows you exactly why each candidate was ranked. Semantic matching goes beyond keywords. Every skill, experience, and qualification is mapped and explained in plain language.',
      stats: [
        { label: 'Transparency', value: '100%' },
        { label: 'Explainability', value: 'Full' },
      ],
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      badge: 'Privacy First',
      title: 'Ethical by Design',
      description:
        'Data never leaves your infrastructure. No vendor lock-in. No training on your candidates. The bias audit agent actively flags potential discrimination and suggests corrections. Fair hiring isn\'t optional.',
      stats: [
        { label: 'Data Privacy', value: '100%' },
        { label: 'Bias Detection', value: 'Active' },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            The Future of <span className="text-gradient">Ethical Hiring</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A new paradigm where AI doesn't replace human judgment—it empowers it.
          </p>
        </motion.div>

        {/* Story Cards */}
        <div className="space-y-32">
          {stories.map((story, index) => (
            <StoryCard key={index} {...story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
