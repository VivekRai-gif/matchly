import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';

export const WorkSection = () => {
  const projects = [
    {
      company: 'Sarah M., Software Engineer',
      industry: 'Technology Transition',
      challenge: 'Transitioning from QA to Software Development role',
      solution: 'Used matchly to identify transferable skills and bridge knowledge gaps',
      results: [
        { metric: '85%', label: 'Match Score Achieved' },
        { metric: '3', label: 'Interviews Landed' },
        { metric: '2 weeks', label: 'Job Offer Received' },
      ],
      gradient: 'from-info-10 to-info-20',
    },
    {
      company: 'James K., Data Analyst',
      industry: 'Career Reentry',
      challenge: 'Returning to workforce after 2-year gap',
      solution: 'Leveraged AI skill verification and personalized application emails',
      results: [
        { metric: '92%', label: 'Profile Strength' },
        { metric: '5', label: 'Job Offers' },
        { metric: '30%', label: 'Salary Increase' },
      ],
      gradient: 'from-primary-10 to-primary-30',
    },
    {
      company: 'Priya S., Product Manager',
      industry: 'Industry Switch',
      challenge: 'Moving from retail to tech product management',
      solution: 'Used transparent matching to highlight transferable skills',
      results: [
        { metric: '78%', label: 'Match Score' },
        { metric: '8', label: 'Applications Sent' },
        { metric: '3', label: 'Final Round Interviews' },
      ],
      gradient: 'from-success-10 to-success-20',
    },
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '50,000+', label: 'Job Seekers Helped' },
    { icon: <TrendingUp className="w-6 h-6" />, value: '85%', label: 'Match Score Average' },
    { icon: <Clock className="w-6 h-6" />, value: '<5min', label: 'Analysis Time' },
    { icon: <CheckCircle className="w-6 h-6" />, value: '94%', label: 'User Satisfaction' },
  ];

  return (
    <section id="work" className="relative py-32 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
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
            <span className="px-4 py-2 glass border border-primary-20/30 rounded-full text-primary-30 font-semibold text-sm">
              Case Studies
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Real Results for <span className="text-gradient">Real Job Seekers</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            See how job seekers transformed their careers with matchly AI
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass hover:glass-strong rounded-2xl p-6 text-center group hover:border-primary-10/30 smooth-transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-10/20 rounded-xl flex items-center justify-center text-primary-20 group-hover:scale-110 smooth-transition">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="glass hover:glass-strong rounded-3xl p-8 md:p-10 smooth-transition hover:border-primary-20/30 hover:shadow-2xl hover:shadow-primary-10/10">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Content */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className={`inline-block px-4 py-1.5 bg-gradient-to-r ${project.gradient} rounded-full text-white text-xs font-semibold mb-4`}>
                        {project.industry}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {project.company}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-primary-20 font-semibold mb-2 text-sm uppercase tracking-wider">
                          Challenge
                        </h4>
                        <p className="text-gray-300 text-lg">
                          {project.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-primary-30 font-semibold mb-2 text-sm uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-gray-300 text-lg">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <button className="group/btn flex items-center gap-2 text-primary-20 hover:text-primary-30 font-semibold smooth-transition">
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 smooth-transition" />
                    </button>
                  </div>

                  {/* Right Results */}
                  <div className="lg:w-80">
                    <div className="glass-strong rounded-2xl p-6 space-y-4">
                      <h4 className="text-success-20 font-semibold mb-4 text-sm uppercase tracking-wider">
                        Results Achieved
                      </h4>
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 glass rounded-xl">
                          <span className="text-gray-400 text-sm">{result.label}</span>
                          <span className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                            {result.metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-primary-10 to-primary-30 hover:from-primary-30 hover:to-primary-10 rounded-full font-semibold text-lg smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/50 flex items-center gap-2 mx-auto">
            View All Success Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
