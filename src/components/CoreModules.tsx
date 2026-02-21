import { motion } from 'framer-motion';
import { Mail, FileSearch, Users, FileCheck } from 'lucide-react';

export const CoreModules = () => {
  const modules = [
    {
      icon: <Mail className="w-8 h-8" />,
      iconColor: 'from-primary-10 to-primary-20',
      title: 'Mail Automation',
      description: 'Automated email campaigns for candidate outreach, interview scheduling, and status updates. Send personalized messages at scale with smart templates.',
      buttonText: 'Learn More',
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      iconColor: 'from-info-10 to-info-20',
      title: 'ATS Compatibility Check',
      description: 'Ensure resumes pass ATS systems. Analyze format, keywords, and structure to optimize for automated tracking systems and increase success rates.',
      buttonText: 'Learn More',
    },
    {
      icon: <FileSearch className="w-8 h-8" />,
      iconColor: 'from-success-10 to-success-20',
      title: 'Resume Fit as per Job Description',
      description: 'AI matches candidate resumes against job requirements with precision scoring. Get percentage match, skill gaps, and compatibility insights instantly.',
      buttonText: 'Learn More',
    },
    {
      icon: <Users className="w-8 h-8" />,
      iconColor: 'from-warning-10 to-warning-20',
      title: 'Recruiter Ranking & Shortlisted List',
      description: 'Intelligent ranking dashboard for recruiters. View top candidates, manage shortlists, and track hiring pipeline with real-time analytics.',
      buttonText: 'Learn More',
    },
  ];

  return (
    <section className="relative py-24 bg-black">
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
            Core Intelligence <span className="text-gradient">Modules</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Built for precision, trust, and ethical hiring
          </p>
        </motion.div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass hover:glass-strong hover:border-primary-10/30 rounded-3xl p-8 smooth-transition hover:glow-border h-full flex flex-col group-hover:translate-y-[-4px]">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${module.iconColor} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition shadow-lg`}>
                  {module.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-10 smooth-transition">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-8 flex-grow leading-relaxed text-[15px]">
                  {module.description}
                </p>

                {/* Button */}
                <button className="w-full py-3.5 glass hover:glass-strong hover:border-primary-10/40 hover:glow-border text-white rounded-xl smooth-transition font-semibold">
                  {module.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
