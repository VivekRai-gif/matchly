import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';

export const WorkSection = () => {
  const projects = [
    {
      company: 'TechCorp Global',
      industry: 'Technology',
      challenge: 'Reducing time-to-hire for 500+ engineering positions',
      solution: 'Implemented AI-powered resume matching and automated screening',
      results: [
        { metric: '70%', label: 'Faster Hiring' },
        { metric: '500+', label: 'Positions Filled' },
        { metric: '95%', label: 'Candidate Satisfaction' },
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      company: 'FinanceHub Inc',
      industry: 'Financial Services',
      challenge: 'Eliminating bias in senior leadership recruitment',
      solution: 'Deployed blind screening and bias-free evaluation system',
      results: [
        { metric: '85%', label: 'Bias Reduction' },
        { metric: '40%', label: 'More Diverse Hires' },
        { metric: '92%', label: 'Retention Rate' },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      company: 'HealthCare Plus',
      industry: 'Healthcare',
      challenge: 'Scaling recruitment for 200+ medical professionals',
      solution: 'Automated outreach campaigns and intelligent candidate ranking',
      results: [
        { metric: '60%', label: 'Time Saved' },
        { metric: '250+', label: 'Hires Made' },
        { metric: '88%', label: 'Quality Match' },
      ],
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '10,000+', label: 'Candidates Placed' },
    { icon: <TrendingUp className="w-6 h-6" />, value: '85%', label: 'Faster Hiring' },
    { icon: <Clock className="w-6 h-6" />, value: '24hrs', label: 'Average Response' },
    { icon: <CheckCircle className="w-6 h-6" />, value: '96%', label: 'Client Satisfaction' },
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
            <span className="px-4 py-2 glass border border-purple-500/30 rounded-full text-purple-400 font-semibold text-sm">
              Case Studies
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Real Results for <span className="text-gradient">Real Companies</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            See how leading organizations transformed their hiring with Scoutify AI
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
              className="glass hover:glass-strong rounded-2xl p-6 text-center group hover:border-blue-500/30 smooth-transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 smooth-transition">
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
              <div className="glass hover:glass-strong rounded-3xl p-8 md:p-10 smooth-transition hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10">
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
                        <h4 className="text-blue-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                          Challenge
                        </h4>
                        <p className="text-gray-300 text-lg">
                          {project.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-purple-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-gray-300 text-lg">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <button className="group/btn flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold smooth-transition">
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 smooth-transition" />
                    </button>
                  </div>

                  {/* Right Results */}
                  <div className="lg:w-80">
                    <div className="glass-strong rounded-2xl p-6 space-y-4">
                      <h4 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-wider">
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
          <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 rounded-full font-semibold text-lg smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center gap-2 mx-auto">
            View All Success Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
