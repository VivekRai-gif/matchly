import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';

export const AboutSection = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Ethical AI',
      description: 'Committed to bias-free, transparent job matching that gives you a fair chance at every opportunity.',
      color: 'from-danger-10 to-danger-20',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & Privacy',
      description: 'Your data is encrypted and protected. We never compromise on security or privacy.',
      color: 'from-info-10 to-info-20',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Constantly evolving our AI to stay ahead of job market challenges and career development needs.',
      color: 'from-warning-10 to-warning-20',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Human-Centered',
      description: 'Technology that empowers your career journey, not replaces your unique value. AI that enhances your strengths.',
      color: 'from-primary-10 to-primary-30',
    },
  ];

  const stats = [
    { icon: <Globe className="w-8 h-8" />, value: '150+', label: 'Countries Served' },
    { icon: <Users className="w-8 h-8" />, value: '50K+', label: 'Job Seekers Helped' },
    { icon: <Award className="w-8 h-8" />, value: '500K+', label: 'Resumes Analyzed' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '92%', label: 'Success Rate' },
  ];

  const team = [
    {
      role: 'AI Engineering',
      members: '25+',
      description: 'World-class AI engineers and data scientists',
    },
    {
      role: 'Product & UX',
      members: '12+',
      description: 'Experts in career tech and user experience',
    },
    {
      role: 'Career Success',
      members: '15+',
      description: 'Dedicated career advisors and job search experts',
    },
  ];

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-black via-indigo-950/10 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-20/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-30/30 rounded-full blur-3xl" />
      </div>

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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass border border-primary-20/30 rounded-full text-primary-30 font-semibold text-sm">
              About Us
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
          >
            Empowering Job Seekers with <span className="text-gradient">Ethical AI</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-xl max-w-4xl mx-auto leading-relaxed"
          >
            We're on a mission to empower job seekers with AI-powered career intelligence. matchly combines cutting-edge artificial intelligence with a commitment to transparency, helping you understand your strengths, bridge skill gaps, and navigate the job market with confidence.
          </motion.p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-12 mb-20"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-10 to-primary-30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To revolutionize job seeking by leveraging multi-agent AI systems that provide complete transparency, eliminate uncertainty, and ensure every job seeker gets clear insights into their match with opportunities. We believe in empowering individuals with the intelligence and tools they need to compete fairly in the modern job market.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass hover:glass-strong rounded-2xl p-8 text-center group hover:border-primary-10/30 smooth-transition"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-10/20 rounded-xl flex items-center justify-center text-primary-20 group-hover:scale-110 smooth-transition">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass hover:glass-strong rounded-2xl p-8 h-full smooth-transition hover:border-primary-10/30 group-hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-primary-10/10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition shadow-lg`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-20 smooth-transition">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 text-center hover:border-primary-20/30 smooth-transition"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-20 to-primary-40 bg-clip-text text-transparent mb-2">
                  {dept.members}
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{dept.role}</h4>
                <p className="text-gray-400 text-sm">{dept.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Career Revolution
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a movement that's making job search smarter, fairer, and more transparent for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-primary-10 to-primary-30 hover:from-primary-30 hover:to-primary-10 rounded-full font-semibold text-lg smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/50">
              Analyze Your Resume
            </button>
            <button className="px-8 py-4 glass hover:glass-strong hover:border-primary-10/40 rounded-full font-semibold text-lg smooth-transition hover:scale-105">
              See How It Works
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
