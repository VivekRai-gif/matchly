import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services does Scoutify provide?',
      answer: 'Scoutify offers a game of services, including web design, development, and digital marketing. We specialize in creating visually stunning and functional websites, developing custom web applications, and providing comprehensive digital marketing strategies to help businesses thrive online.',
    },
    {
      question: 'How can Scoutify help my business?',
      answer: 'Scoutify can help your business by creating a strong online presence through professional web design, custom development solutions, and targeted digital marketing strategies that drive growth and engagement.',
    },
    {
      question: 'What industries does Scoutify work with?',
      answer: 'We work with businesses across all industries including startups, SaaS companies, e-commerce, healthcare, finance, education, and more. Our solutions are tailored to meet the unique needs of each sector.',
    },
    {
      question: 'How long does it take to complete a project with Scoutify?',
      answer: 'Project timelines vary based on scope and complexity. A typical website project takes 4-8 weeks, while more complex applications may take 2-4 months. We provide detailed timelines during our initial consultation.',
    },
    {
      question: 'Do you offer ongoing support and maintenance after the project is complete?',
      answer: 'Yes! We offer comprehensive support and maintenance packages to ensure your website or application continues to perform optimally. This includes security updates, bug fixes, and feature enhancements.',
    },
    {
      question: 'Can you work with existing design or development frameworks?',
      answer: 'Absolutely! We are experienced in working with various frameworks and can integrate with your existing systems, or help you migrate to modern technologies for better performance.',
    },
    {
      question: 'How involved will I be in the project development process?',
      answer: 'We believe in collaborative development. You will be involved in key milestones including discovery, design reviews, development checkpoints, and testing phases. We maintain transparent communication throughout.',
    },
    {
      question: 'Can you help with website or app maintenance and updates?',
      answer: 'Yes, we provide ongoing maintenance services including content updates, security patches, performance optimization, and feature additions to keep your digital products running smoothly.',
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
