import { motion } from 'framer-motion';
import { GitBranch, Target, Scale, Lock } from 'lucide-react';

export const WhyChoose = () => {
  const features = [
    {
      icon: <GitBranch className="w-6 h-6" />,
      iconColor: 'from-primary-10 to-primary-20',
      title: 'Multi-Agent Architecture',
      description: 'Independent AI agents collaborate to ensure balanced career evaluation and eliminate single-point bias in your favor.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      iconColor: 'from-success-10 to-success-20',
      title: 'Skill-First Evaluation',
      description: 'We prioritize your actual skills and achievements, ensuring accurate matching. No keyword gaming or fuzzy matching.',
    },
    {
      icon: <Scale className="w-6 h-6" />,
      iconColor: 'from-warning-10 to-warning-20',
      title: 'Bias-Aware Scoring',
      description: 'Our bias detection AI analyzes job descriptions in real-time, flagging potential discrimination and ensuring you\'re evaluated fairly.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      iconColor: 'from-info-10 to-info-20',
      title: 'Privacy-Preserving Analysis',
      description: 'We value your privacy. Your data stays secure with you. Our AI provides insights about your job readiness without compromising your information.',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-primary-10/5 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Why Choose <span className="text-gradient">matchly</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            AI-powered career intelligence that's explainable, accountable, and designed to amplify your success
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass hover:glass-strong hover:border-primary-10/30 rounded-3xl p-7 smooth-transition hover:glow-border h-full group-hover:translate-y-[-4px]">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.iconColor} rounded-2xl flex items-center justify-center mb-5 text-white group-hover:scale-110 smooth-transition shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-10 smooth-transition">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[15px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
