import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Calendar, Zap, BarChart, Clock, ArrowLeft, CheckCircle, X, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useState } from 'react';

export const EmailCampaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Form states
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');

  const handleStartCampaign = async () => {
    if (!resumeFile || !jobDescription || !senderEmail || !receiverEmail) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    
    try {
      // Use backend proxy to avoid CORS issues
      const apiUrl = 'http://localhost:5000/api/campaign/start';
      
      // Read resume file as base64
      const reader = new FileReader();
      const resumeBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(resumeFile);
      });
      
      // Comprehensive campaign data to activate workflow
      const payload = {
        action: 'start_campaign',
        timestamp: new Date().toISOString(),
        source: 'scoutify-ai',
        campaign_type: 'email_automation',
        campaign_name: 'Recruitment Campaign - ' + new Date().toLocaleDateString(),
        template_id: 'candidate_outreach',
        subject: 'Exciting Opportunity - We Found Your Profile!',
        sender_name: 'Recruiter',
        sender_email: senderEmail,
        receiver_email: receiverEmail,
        personalization_enabled: true,
        send_immediately: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        resume: {
          filename: resumeFile.name,
          content: resumeBase64,
          type: resumeFile.type
        },
        job_description: jobDescription,
        recipients: [
          {
            email: receiverEmail,
            name: 'Candidate',
            job_title: 'Position',
            personalization_data: {
              job_description: jobDescription
            }
          }
        ]
      };

      console.log('Sending campaign request...', payload);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data);
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Campaign started successfully! ✓' });
        setShowModal(false);
        // Reset form
        setResumeFile(null);
        setJobDescription('');
        setSenderEmail('');
        setReceiverEmail('');
      } else {
        // More detailed error message
        let errorText = data.error || 'Failed to start campaign.';
        if (data.webhook_url) {
          errorText += ` (Webhook: ${data.webhook_url})`;
        }
        console.error('Campaign error details:', data);
        setMessage({ type: 'error', text: errorText });
      }
    } catch (error: any) {
      console.error('Error starting campaign:', error);
      
      let errorMessage = 'Error connecting to campaign service.';
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to backend server. Please ensure the server is running on port 5000.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  const features = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Smart Templates',
      description: 'Pre-built, customizable email templates for every stage of the hiring process.',
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: 'Bulk Personalization',
      description: 'Send personalized emails at scale with dynamic fields and custom variables.',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Auto Scheduling',
      description: 'Automated interview scheduling with calendar integration and timezone support.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Follow-up Automation',
      description: 'Set up automatic follow-up sequences based on candidate actions and timelines.',
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Email Analytics',
      description: 'Track open rates, click rates, and response metrics for all your campaigns.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Smart Timing',
      description: 'AI-powered send time optimization to maximize engagement and response rates.',
    },
  ];

  const capabilities = [
    'Customizable email templates',
    'Dynamic field insertion',
    'Automated follow-up sequences',
    'Interview scheduling links',
    'Calendar integration (Google, Outlook)',
    'Timezone detection',
    'Open and click tracking',
    'Response rate analytics',
    'A/B testing support',
    'Drip campaign builder',
    'Candidate engagement scoring',
    'Email delivery optimization',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-warning-10/30 rounded-full mb-6">
              <Mail className="w-4 h-4 text-warning-20" />
              <span className="text-warning-20 font-semibold text-sm">Email Automation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Smart Communication <span className="text-gradient">at Scale</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Streamline your candidate communication with intelligent automation. Send personalized emails, 
              schedule interviews, and keep candidates engaged throughout the hiring process.
            </p>

            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-300' : 'bg-red-500/20 border border-red-500/30 text-red-300'}`}>
                {message.text}
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowModal(true)}
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-warning-10 to-warning-20 hover:from-warning-20 hover:to-warning-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-warning-10/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Start Campaign
              </button>
              <button className="px-8 py-4 glass hover:glass-strong hover:border-warning-10/30 rounded-full font-semibold smooth-transition hover:scale-105">
                View Templates
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Powerful Email Automation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-warning-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-warning-10 to-warning-20 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-warning-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Complete Email Solution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-warning-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{capability}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Form Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white smooth-transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold mb-6 text-gradient">Start Email Campaign</h2>
              
              <div className="space-y-6">
                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Upload Resume (PDF) *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center gap-3 px-4 py-3 glass hover:glass-strong border border-warning-10/30 rounded-xl cursor-pointer smooth-transition"
                    >
                      <Upload className="w-5 h-5 text-warning-20" />
                      <span className="text-gray-300">
                        {resumeFile ? resumeFile.name : 'Choose PDF file...'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Enter the job description..."
                    rows={4}
                    className="w-full px-4 py-3 glass border border-warning-10/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-warning-20 smooth-transition resize-none"
                  />
                </div>

                {/* Sender Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Sender Email *
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="sender@company.com"
                    className="w-full px-4 py-3 glass border border-warning-10/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-warning-20 smooth-transition"
                  />
                </div>

                {/* Receiver Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Receiver Email *
                  </label>
                  <input
                    type="email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full px-4 py-3 glass border border-warning-10/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-warning-20 smooth-transition"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleStartCampaign}
                    disabled={isLoading || !resumeFile || !jobDescription || !senderEmail || !receiverEmail}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-warning-10 to-warning-20 hover:from-warning-20 hover:to-warning-10 rounded-xl font-semibold smooth-transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? 'Sending...' : 'Send Campaign'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isLoading}
                    className="px-6 py-3 glass hover:glass-strong border border-warning-10/30 rounded-xl font-semibold smooth-transition hover:scale-105 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
