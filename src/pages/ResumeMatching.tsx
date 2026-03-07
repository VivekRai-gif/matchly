import { motion } from 'framer-motion';
import { FileSearch, Target, Zap, Brain, Award, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ResumeMatching = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Deep Learning Analysis',
      description: 'Advanced NLP algorithms analyze resumes to understand context, skills, and experience beyond keywords.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Percentage Matching',
      description: 'Get precise 0-100% match scores based on job requirements, skills, experience, and qualifications.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Results',
      description: 'Process hundreds of resumes in seconds with real-time matching and instant candidate rankings.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills and experience gaps to make informed career development decisions and training plans.',
    },
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: 'Semantic Understanding',
      description: 'AI understands synonyms, related skills, and industry-specific terminology for accurate matching.',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Multi-factor Scoring',
      description: 'Weighted scoring based on must-have vs nice-to-have requirements for precise candidate evaluation.',
    },
  ];

  const benefits = [
    'Skills extraction and mapping',
    'Experience level validation',
    'Education requirement matching',
    'Keyword density analysis',
    'Industry-specific matching',
    'Custom scoring weights',
    'Detailed match reports',
    'Similarity scoring',
  ];

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-primary-20 hover:text-primary-30 mb-8 smooth-transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-success-10/30 rounded-full mb-6">
              <FileSearch className="w-4 h-4 text-success-20" />
              <span className="text-success-20 font-semibold text-sm">AI Resume Matching</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Precision Job Fit <span className="text-gradient">Analysis</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Our advanced AI analyzes every resume against your job description, providing detailed 
              compatibility scores, skill gap analysis, and instant insights to find the perfect candidates faster.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-success-10 to-success-20 hover:from-success-20 hover:to-success-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-success-10/50">
                Try It Free
              </button>
              <button className="px-8 py-4 glass hover:glass-strong hover:border-success-10/30 rounded-full font-semibold smooth-transition hover:scale-105">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Intelligent Resume Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-success-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-success-10 to-success-20 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-success-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What You Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-success-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
