import { motion } from 'framer-motion';
import { Mail, FileSearch, Users, FileCheck, Brain, Shield, Zap, Target } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      iconColor: 'from-purple-500 to-pink-500',
      title: 'AI-Powered Matching',
      description: 'Advanced machine learning algorithms analyze resumes and job descriptions to find perfect matches with unparalleled accuracy.',
      features: ['Deep learning models', 'Semantic analysis', 'Skill mapping'],
    },
    {
      icon: <Mail className="w-8 h-8" />,
      iconColor: 'from-blue-500 to-cyan-500',
      title: 'Automated Outreach',
      description: 'Smart email campaigns that engage candidates with personalized messages, automated follow-ups, and intelligent scheduling.',
      features: ['Email templates', 'Auto scheduling', 'Response tracking'],
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      iconColor: 'from-green-500 to-emerald-500',
      title: 'ATS Optimization',
      description: 'Ensure resumes pass through applicant tracking systems with our comprehensive compatibility checker and optimizer.',
      features: ['Format validation', 'Keyword optimization', 'ATS preview'],
    },
    {
      icon: <Users className="w-8 h-8" />,
      iconColor: 'from-orange-500 to-red-500',
      title: 'Candidate Management',
      description: 'Complete dashboard for managing candidates, tracking pipeline stages, and collaborating with your hiring team.',
      features: ['Pipeline tracking', 'Team collaboration', 'Analytics'],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      iconColor: 'from-indigo-500 to-purple-500',
      title: 'Bias-Free Hiring',
      description: 'Our ethical AI eliminates unconscious bias, ensuring fair and equal opportunity for all candidates in the hiring process.',
      features: ['Blind screening', 'Fair evaluation', 'Diversity insights'],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      iconColor: 'from-yellow-500 to-orange-500',
      title: 'Instant Insights',
      description: 'Real-time analytics and reporting give you instant visibility into your hiring metrics and candidate quality.',
      features: ['Live dashboards', 'Custom reports', 'Predictive analytics'],
    },
    {
      icon: <Target className="w-8 h-8" />,
      iconColor: 'from-pink-500 to-rose-500',
      title: 'Precision Ranking',
      description: 'Advanced ranking algorithms score and rank candidates based on multiple factors for confident hiring decisions.',
      features: ['Multi-factor scoring', 'Custom weights', 'Smart filtering'],
    },
    {
      icon: <FileSearch className="w-8 h-8" />,
      iconColor: 'from-cyan-500 to-blue-500',
      title: 'Resume Intelligence',
      description: 'Deep resume analysis extracting skills, experience, education, and more with AI-powered parsing and understanding.',
      features: ['Smart parsing', 'Skill extraction', 'Experience mapping'],
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-black via-blue-950/10 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass border border-blue-500/30 rounded-full text-blue-400 font-semibold text-sm">
              Our Services
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Comprehensive Hiring <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Everything you need to transform your recruitment process with AI-powered intelligence
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass hover:glass-strong hover:border-blue-500/30 rounded-3xl p-8 smooth-transition hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col group-hover:translate-y-[-8px]">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.iconColor} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 smooth-transition">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 flex-grow leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 rounded-full font-semibold text-lg smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
            Explore All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};
