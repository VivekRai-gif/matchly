import { motion } from 'framer-motion';
import { Upload, Brain, Users, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      icon: <Upload className="w-8 h-8" />,
      title: 'Upload Resume & Job',
      description: 'Upload your resume and paste the job description. Our AI instantly analyzes both to identify your strengths and match potential.',
      details: [
        'Upload your resume',
        'Paste job description',
        'AI extracts your skills',
        'Identifies requirements',
      ],
      color: 'from-info-10 to-info-20',
    },
    {
      number: '02',
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Analysis',
      description: 'Our multi-agent AI system analyzes your resume, running skill matching, gap identification, and bias detection in seconds.',
      details: [
        'Skill extraction',
        'Experience mapping',
        'Job compatibility',
        'Semantic matching',
      ],
      color: 'from-primary-10 to-primary-30',
    },
    {
      number: '03',
      icon: <Users className="w-8 h-8" />,
      title: 'Get Match Score',
      description: 'Receive your detailed match score showing exactly where you excel and which skills you need to strengthen.',
      details: [
        'Match percentage',
        'Matched skills list',
        'Skill gap analysis',
        'Improvement recommendations',
      ],
      color: 'from-success-10 to-success-20',
    },
    {
      number: '04',
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Apply & Track',
      description: 'Generate personalized application emails, verify job authenticity, and track your applications with complete insights.',
      details: [
        'Email generation',
        'Job safety check',
        'Application tracking',
        'Progress dashboard',
      ],
      color: 'from-warning-10 to-warning-20',
    },
  ];

  return (
    <section id="process" className="relative py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-10/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-info-10/30 rounded-full blur-3xl" />
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
            <div className="flex items-center gap-2 px-4 py-2 glass border border-success-10/30 rounded-full">
              <Sparkles className="w-4 h-4 text-success-20" />
              <span className="text-success-20 font-semibold text-sm">How It Works</span>
            </div>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Simple Process, <span className="text-gradient">Powerful Results</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            From resume upload to job application success in four intelligent steps
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}>
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <div className={`text-7xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-50`}>
                      {step.number}
                    </div>
                    
                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="grid grid-cols-2 gap-3">
                        {step.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-center gap-2"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="lg:w-96">
                  <div className={`glass-strong hover:glass rounded-3xl p-10 smooth-transition hover:border-opacity-50 hover:shadow-2xl group-hover:scale-105`}
                    style={{
                      borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1`,
                      borderImageSlice: 1,
                    }}
                  >
                    <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 smooth-transition`}>
                      {step.icon}
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white mb-2">
                        {step.number}
                      </div>
                      <div className={`text-lg font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex justify-center my-8">
                  <div className="w-px h-20 bg-gradient-to-b from-gray-700 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-success-10 to-success-20 hover:from-success-20 hover:to-success-10 rounded-full font-semibold text-lg smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-success-10/50 flex items-center gap-2 mx-auto">
            Start Your Career Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
