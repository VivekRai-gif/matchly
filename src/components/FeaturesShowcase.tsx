import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Check, ArrowRight, Sparkles, FileCheck, Award, Shield, Eye } from 'lucide-react';

export const FeaturesShowcase = () => {
  const features = [
    {
      icon: <Mail className="w-10 h-10" />,
      iconColor: 'from-primary-10 to-primary-20',
      title: 'Automated Email Campaigns',
      subtitle: 'Smart Communication at Scale',
      description: 'Streamline your candidate communication with intelligent automation. Send personalized emails, schedule interviews, and keep candidates engaged throughout the hiring process.',
      benefits: [
        'Customizable email templates',
        'Automated follow-ups & reminders',
        'Interview scheduling integration',
        'Bulk actions with personalization',
        'Real-time delivery tracking',
        'Response analytics dashboard',
      ],
      image: '📧',
      route: '/features/email-campaigns',
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      iconColor: 'from-info-10 to-info-20',
      title: 'ATS Compatibility Check',
      subtitle: 'Resume Optimization Scanner',
      description: 'Ensure resumes are ATS-friendly and optimized for automated screening systems. Detect formatting issues, keyword mismatches, and compatibility problems before submission.',
      benefits: [
        'Format compatibility analysis',
        'Keyword optimization score',
        'Section structure validation',
        'File type recommendations',
        'ATS parsing preview',
        'Improvement suggestions',
      ],
      image: '✅',
      route: '/features/ats-compatibility',
    },
    {
      icon: <Award className="w-10 h-10" />,
      iconColor: 'from-blue-500 to-purple-500',
      title: 'Verifiable Skill Credentials',
      subtitle: 'AI-Powered Skill Verification',
      description: 'Extract and verify candidate skills using advanced AI. Get evidence-based skill validation, cross-verification with job requirements, and blockchain-style credential hashing for trust and transparency.',
      benefits: [
        'AI skill extraction from resumes',
        'Evidence-based verification',
        'Cross-verify against job needs',
        'Proficiency level assessment',
        'Credential hash generation',
        'Project-skill alignment check',
      ],
      image: '🎖️',
      route: '/features/ai-features',
    },
    {
      icon: <Shield className="w-10 h-10" />,
      iconColor: 'from-purple-500 to-pink-500',
      title: 'Bias Detection Algorithms',
      subtitle: 'Fair & Merit-Based Evaluation',
      description: 'Remove unconscious bias from hiring with AI-powered fairness checks. Automatically mask personal attributes and ensure candidates are evaluated purely on skills, experience, and qualifications.',
      benefits: [
        'Automatic PII masking',
        'Merit-only evaluation',
        'Bias signal detection',
        'Fairness score reporting',
        'Demographic-blind screening',
        'Equal opportunity compliance',
      ],
      image: '🛡️',
      route: '/features/ai-features',
    },
    {
      icon: <Eye className="w-10 h-10" />,
      iconColor: 'from-green-500 to-teal-500',
      title: 'Transparent Matching Process',
      subtitle: 'Explainable AI Decisions',
      description: 'Get complete transparency in every hiring decision. Our AI provides detailed reasoning, component-wise score breakdowns, and human-readable explanations for all match recommendations.',
      benefits: [
        'Detailed match explanations',
        'Score component breakdown',
        'Decision reasoning provided',
        'Skill-by-skill analysis',
        'Transparent recommendations',
        'Audit-ready documentation',
      ],
      image: '👁️',
      route: '/features/ai-features',
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-primary-10/5 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary-10" />
            <span className="text-sm text-primary-10 font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Everything You Need to <span className="text-gradient">Hire Better</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive recruitment tools powered by AI to streamline your hiring workflow from start to finish
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                {/* Icon & Title */}
                <div className="space-y-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.iconColor} rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-10/20`}>
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-primary-10 font-semibold mb-2 text-sm uppercase tracking-wider">
                      {feature.subtitle}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary-10/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-10" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link 
                  to={feature.route}
                  className="group mt-6 px-6 py-3 glass hover:glass-strong hover:border-primary-10/40 hover:glow-border rounded-xl smooth-transition flex items-center gap-2 text-white font-semibold w-fit"
                >
                  Explore Feature
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 smooth-transition" />
                </Link>
              </div>

              {/* Visual Side */}
              <div className="flex-1">
                <div className="glass-strong rounded-3xl p-12 hover:glow-border smooth-transition group">
                  <div className="text-center">
                    <div className="text-9xl mb-6 group-hover:scale-110 smooth-transition">
                      {feature.image}
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 bg-gradient-to-r from-primary-10/30 to-transparent rounded-full"></div>
                      <div className="h-3 bg-gradient-to-r from-primary-20/30 to-transparent rounded-full w-4/5 mx-auto"></div>
                      <div className="h-3 bg-gradient-to-r from-primary-10/30 to-transparent rounded-full w-3/5 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-24"
        >
          <div className="glass-strong rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Hiring?
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Join hundreds of companies using matchly to find the perfect candidates faster
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary-10 to-primary-20 hover:from-primary-20 hover:to-primary-30 text-white font-bold rounded-xl smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/30 text-lg">
              Start Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
