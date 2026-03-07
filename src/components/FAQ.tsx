import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services does matchly provide?',
      answer: 'matchly offers a comprehensive suite of AI-powered career services including resume analysis, job matching, skill gap identification, application email generation, and job authenticity verification. We help job seekers maximize their chances of landing their dream job.',
    },
    {
      question: 'How can matchly help me in my job search?',
      answer: 'matchly provides intelligent career insights by analyzing your resume against job descriptions, identifying skill gaps, generating personalized application emails, and verifying job authenticity - all powered by advanced AI to accelerate your job search success.',
    },
    {
      question: 'What types of job seekers does matchly work with?',
      answer: 'We work with job seekers across all industries and experience levels including recent graduates, career switchers, experienced professionals, and executives. Our AI adapts to your unique background and career goals.',
    },
    {
      question: 'How long does it take to analyze my resume?',
      answer: 'Resume analysis is instant! Our AI provides comprehensive insights including skill matching, gap analysis, and improvement suggestions within seconds. You can start applying to jobs with confidence immediately.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes! We take privacy seriously. Your resume and personal data are encrypted and protected. We never share your information with third parties, and you maintain full control over your data at all times.',
    },
    {
      question: 'Can matchly work with different resume formats?',
      answer: 'Absolutely! Our AI can analyze resumes in multiple formats including PDF, DOC, DOCX, and TXT. We extract and understand your experience regardless of format or template.',
    },
    {
      question: 'How accurate is the job matching?',
      answer: 'Our multi-agent AI system provides highly accurate matching by analyzing skills, experience, qualifications, and job requirements. We provide transparent scoring with detailed explanations so you understand exactly why a job is a good fit.',
    },
    {
      question: 'Do you offer ongoing career support?',
      answer: 'Yes! Beyond one-time analysis, we provide continuous career intelligence including market insights, skill trend analysis, and personalized recommendations to help you stay competitive throughout your career journey.',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-primary-10/5 to-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Still you have any questions? Contact our Team via <span className="text-primary-10 font-semibold">hello@matchly.com</span>
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass hover:glass-strong hover:border-primary-10/30 rounded-2xl p-6 smooth-transition hover:glow-border text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <span className="text-primary-10 font-bold text-xl flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {faq.question}
                        </h3>
                        <AnimatePresence>
                          {openIndex === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-gray-400 leading-relaxed mt-3"
                            >
                              {faq.answer}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <div className="text-primary-10 group-hover:text-primary-20 transition-colors">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
