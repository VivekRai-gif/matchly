import { motion } from 'framer-motion';
import { Mail, Users, FileCheck, Brain } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      iconColor: 'from-primary-10 to-primary-30',
      title: 'AI-Powered Matching',
      description: 'Advanced machine learning algorithms analyze resumes and job descriptions to find perfect matches with unparalleled accuracy.',
      features: ['Deep learning models', 'Semantic analysis', 'Skill mapping'],
    },
    {
      icon: <Mail className="w-8 h-8" />,
      iconColor: 'from-info-10 to-info-20',
      title: 'Automated Outreach',
      description: 'Smart email campaigns that engage candidates with personalized messages, automated follow-ups, and intelligent scheduling.',
      features: ['Email templates', 'Auto scheduling', 'Response tracking'],
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      iconColor: 'from-success-10 to-success-20',
      title: 'ATS Optimization',
      description: 'Ensure resumes pass through applicant tracking systems with our comprehensive compatibility checker and optimizer.',
      features: ['Format validation', 'Keyword optimization', 'ATS preview'],
    },
    {
      icon: <Users className="w-8 h-8" />,
      iconColor: 'from-warning-10 to-warning-20',
      title: 'Candidate Management',
      description: 'Complete dashboard for managing candidates, tracking pipeline stages, and collaborating with your hiring team.',
      features: ['Pipeline tracking', 'Team collaboration', 'Analytics'],
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-black via-blue-950/10 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-10/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-30/20 rounded-full blur-3xl" />
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
            <span className="px-4 py-2 glass border border-primary-10/30 rounded-full text-primary-20 font-semibold text-sm">
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
              <div className="glass hover:glass-strong hover:border-primary-10/30 rounded-3xl p-8 smooth-transition hover:shadow-2xl hover:shadow-primary-10/10 h-full flex flex-col group-hover:translate-y-[-8px]">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.iconColor} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-20 smooth-transition">
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
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-20" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
