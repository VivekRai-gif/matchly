import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, FileCheck, Brain } from 'lucide-react';
import { FeatureModal } from './FeatureModals';

export const ServicesSection = () => {
  const [openModal, setOpenModal] = useState<'resume' | 'match' | 'job-safety' | 'email' | null>(null);

  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      iconColor: 'from-primary-10 to-primary-30',
      title: 'Skill Match & Gap Analysis',
      description: 'Advanced AI analyzes your resume against job descriptions to calculate match scores and identify skill gaps, helping you focus on what matters.',
      features: ['Match scoring', 'Skill gap analysis', 'Transparent results'],
      modalType: 'match' as const,
    },
    {
      icon: <Mail className="w-8 h-8" />,
      iconColor: 'from-info-10 to-info-20',
      title: 'AI Email Crafting',
      description: 'Generate personalized application emails tailored to specific jobs and companies. Stand out with professionally crafted messages.',
      features: ['Personalized emails', 'Company-specific', 'Instant generation'],
      modalType: 'email' as const,
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      iconColor: 'from-success-10 to-success-20',
      title: 'Resume Intelligence',
      description: 'Optimize your resume with AI-powered analysis. Extract skills, highlight strengths, and ensure your experience shines through.',
      features: ['Skill extraction', 'Experience parsing', 'Structured output'],
      modalType: 'resume' as const,
    },
    {
      icon: <Users className="w-8 h-8" />,
      iconColor: 'from-warning-10 to-warning-20',
      title: 'Job Authenticity Check',
      description: 'Verify job postings for authenticity before applying. Detect scams and suspicious listings to protect your job search.',
      features: ['Scam detection', 'Safety verification', 'Risk assessment'],
      modalType: 'job-safety' as const,
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
            Your Complete Career <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Everything you need to accelerate your job search with AI-powered career intelligence
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
              onClick={() => setOpenModal(service.modalType)}
            >
              <div className="relative glass hover:glass-strong border border-white/5 hover:border-primary-10/50 rounded-3xl p-8 smooth-transition hover:shadow-2xl hover:shadow-primary-10/20 h-full flex flex-col overflow-hidden group-hover:translate-y-[-8px]">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-10/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.iconColor} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-3 smooth-transition shadow-lg`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-20 smooth-transition leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 group-hover:text-gray-300 mb-6 flex-grow leading-relaxed text-base smooth-transition">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 smooth-transition">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-20 to-primary-10 group-hover:scale-125 smooth-transition" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Try It Button */}
                  <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-primary-10/30 smooth-transition">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-20 font-bold text-sm group-hover:text-primary-10 smooth-transition">
                        Try it now
                      </span>
                      <svg 
                        className="w-5 h-5 text-primary-20 group-hover:text-primary-10 group-hover:translate-x-1 smooth-transition" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      {openModal && (
        <FeatureModal
          isOpen={!!openModal}
          onClose={() => setOpenModal(null)}
          featureType={openModal}
        />
      )}
    </section>
  );
};
