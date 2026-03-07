import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Check, ArrowRight, Sparkles, FileCheck, Award, Shield, Eye } from 'lucide-react';
import { useRef } from 'react';

export const FeaturesShowcase = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const features = [
    {
      icon: <Mail className="w-10 h-10" />,
      iconColor: 'from-primary-600 to-primary-500',
      title: 'Automated Email Campaigns',
      subtitle: 'Smart Application Communication',
      description: 'Streamline your job applications with intelligent automation. Send personalized emails, follow up effectively, and stay engaged with employers throughout your application process.',
      benefits: [
        'Customizable email templates',
        'Automated follow-ups & reminders',
        'Interview thank-you automation',
        'Bulk applications with personalization',
        'Real-time delivery tracking',
        'Response analytics dashboard',
      ],
      image: '📧',
      route: '/features/email-campaigns',
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      iconColor: 'from-blue-600 to-blue-500',
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
      description: 'Extract and verify your skills using advanced AI. Get evidence-based skill validation, cross-verification with job requirements, and credential documentation for trust and credibility with employers.',
      benefits: [
        'AI skill extraction from your resume',
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
      description: 'Identify unconscious bias in job descriptions with AI-powered fairness checks. Ensure you\'re evaluated purely on skills, experience, and qualifications, not personal attributes.',
      benefits: [
        'Job description bias detection',
        'Merit-only evaluation tracking',
        'Bias signal identification',
        'Fairness score reporting',
        'Discrimination pattern alerts',
        'Equal opportunity guidance',
      ],
      image: '🛡️',
      route: '/features/ai-features',
    },
    {
      icon: <Eye className="w-10 h-10" />,
      iconColor: 'from-green-500 to-teal-500',
      title: 'Transparent Matching Process',
      subtitle: 'Explainable AI Decisions',
      description: 'Get complete transparency in every match decision. Our AI provides detailed reasoning, component-wise score breakdowns, and human-readable explanations for all match recommendations.',
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
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-primary-500 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-semibold">Powerful Features</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
          >
            Everything You Need to <span className="text-gradient">Land Your Dream Job</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-neutral-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive career tools powered by AI to streamline your job search from start to finish
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ 
                duration: 1, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                {/* Icon & Title */}
                <div className="space-y-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.iconColor} rounded-3xl flex items-center justify-center text-white shadow-large`}>
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-primary-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                      {feature.subtitle}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Benefits List */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.08
                      }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary-900 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-400" />
                      </div>
                      <span className="text-neutral-300 text-sm leading-relaxed">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <Link 
                  to={feature.route}
                  className="group mt-6 px-6 py-3 bg-neutral-900 border-2 border-primary-500 text-primary-400 hover:bg-primary-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold w-fit"
                >
                  Explore Feature
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Visual Side */}
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="card hover:shadow-medium transition-all duration-300 group">
                  <div className="text-center">
                    <motion.div 
                      className="text-9xl mb-6"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.image}
                    </motion.div>
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-3 bg-gradient-to-r from-primary-200 to-transparent rounded-full"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-3 bg-gradient-to-r from-primary-300 to-transparent rounded-full mx-auto"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="h-3 bg-gradient-to-r from-primary-200 to-transparent rounded-full mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
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
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              Ready to Accelerate Your Job Search?
            </h3>
            <p className="text-neutral-600 text-lg mb-8">
              Join thousands of job seekers using matchly to find the perfect opportunities faster
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-primary text-lg">
              Analyze Your Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
