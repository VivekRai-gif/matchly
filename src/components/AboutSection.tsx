import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';

export const AboutSection = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Ethical AI',
      description: 'Committed to bias-free, transparent hiring that gives every candidate a fair chance.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & Privacy',
      description: 'Your data is encrypted and protected. We never compromise on security or privacy.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Constantly evolving our AI to stay ahead of hiring challenges and industry needs.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Human-Centered',
      description: 'Technology that empowers people, not replaces them. AI that enhances human judgment.',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { icon: <Globe className="w-8 h-8" />, value: '50+', label: 'Countries Served' },
    { icon: <Users className="w-8 h-8" />, value: '500+', label: 'Enterprise Clients' },
    { icon: <Award className="w-8 h-8" />, value: '10M+', label: 'Resumes Processed' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '98%', label: 'Success Rate' },
  ];

  const team = [
    {
      role: 'Engineering',
      members: '50+',
      description: 'World-class AI engineers and data scientists',
    },
    {
      role: 'Product',
      members: '20+',
      description: 'Experts in HR tech and user experience',
    },
    {
      role: 'Support',
      members: '30+',
      description: 'Dedicated customer success team',
    },
  ];

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-black via-indigo-950/10 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
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
            <span className="px-4 py-2 glass border border-indigo-500/30 rounded-full text-indigo-400 font-semibold text-sm">
              About Us
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Transforming Hiring with <span className="text-gradient">Ethical AI</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-4xl mx-auto leading-relaxed">
            We're on a mission to make hiring fair, fast, and intelligent. Scoutify AI combines cutting-edge artificial intelligence with a commitment to ethical recruitment, helping companies find the right talent while eliminating bias and inefficiency.
          </p>
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
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To revolutionize the recruitment industry by leveraging multi-agent AI systems that eliminate bias, reduce time-to-hire, and ensure every candidate gets a fair opportunity based on their skills and qualifications. We believe in transparent, ethical hiring that benefits both employers and job seekers equally.
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
              className="glass hover:glass-strong rounded-2xl p-8 text-center group hover:border-indigo-500/30 smooth-transition"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 smooth-transition">
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
                <div className="glass hover:glass-strong rounded-2xl p-8 h-full smooth-transition hover:border-indigo-500/30 group-hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-indigo-500/10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition shadow-lg`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 smooth-transition">
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
                className="glass-strong rounded-2xl p-8 text-center hover:border-purple-500/30 smooth-transition"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
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
            Join the Hiring Revolution
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a movement that's making recruitment fairer, faster, and smarter for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 rounded-full font-semibold text-lg smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50">
              Get Started Today
            </button>
            <button className="px-8 py-4 glass hover:glass-strong hover:border-indigo-500/40 rounded-full font-semibold text-lg smooth-transition hover:scale-105">
              Schedule a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
