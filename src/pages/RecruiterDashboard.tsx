import { motion } from 'framer-motion';
import { Users, TrendingUp, Filter, BarChart3, Award, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const RecruiterDashboard = () => {
  // Note: Component name kept as RecruiterDashboard for backward compatibility
  // But content is now job seeker focused (Application Tracker)
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Application Tracking',
      description: 'Track all your job applications with status updates, match scores, and application dates in one centralized dashboard.',
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: 'Smart Job Search',
      description: 'Filter jobs by skills match, location, salary range, and company with advanced search and recommendations.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Opportunity Management',
      description: 'Create, manage, and organize job opportunities. Save favorites and track your wishlist companies.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Progress Tracking',
      description: 'Track your applications through each stage from submission to offer with visual pipeline view.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Job Comparison',
      description: 'Side-by-side comparison of job opportunities to make informed decisions with match score breakdowns.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Activity Timeline',
      description: 'View complete application history including submissions, follow-ups, interviews, and status changes.',
    },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-primary-10/30 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary-20" />
              <span className="text-primary-20 font-semibold text-sm">Application Tracker</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Complete Job Search <span className="text-gradient">Management</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Unified dashboard for job seekers to track, manage, and optimize applications. Monitor progress, 
              compare opportunities, and make data-driven career decisions with powerful analytics and insights.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-10 to-primary-30 hover:from-primary-30 hover:to-primary-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/50">
                Start Tracking Applications
              </button>
              <button className="px-8 py-4 glass hover:glass-strong hover:border-primary-10/30 rounded-full font-semibold smooth-transition hover:scale-105">
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Everything You Need to Manage Candidates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-primary-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-10 to-primary-30 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Key Dashboard Features
            </h2>
            <div className="space-y-6">
              {[
                'Candidate ranking with percentage match scores',
                'Custom filters and saved searches',
                'Team collaboration and notes',
                'Export reports and analytics',
                'Integration with ATS systems',
                'Mobile-responsive interface',
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-success-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{item}</span>
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
