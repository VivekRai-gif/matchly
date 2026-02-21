import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const ContactSection = () => {
  const [budget, setBudget] = useState(5000);

  return (
    <section id="contact" className="relative py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-10 to-primary-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-10/20">
            <img 
              src="/matchly-logo.png" 
              alt="matchly" 
              className="h-12 w-auto brightness-200"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Thank you for your Interest in <span className="text-gradient">matchly</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We would love to hear from you and discuss how we can help bring your digital ideas to life. 
            Here are the different ways you can get in touch with us.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full glass focus:glass-strong rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-primary-10/60 focus:outline-none focus:glow-border smooth-transition"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="w-full glass focus:glass-strong rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-primary-10/60 focus:outline-none focus:glow-border smooth-transition"
              />
            </div>
          </div>

          {/* Why are you contacting us */}
          <div>
            <label className="block text-white font-medium mb-3">
              Why are you contacting us?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['Web Design', 'Collaboration', 'Mobile App Design', 'Others'].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-4 glass hover:glass-strong hover:border-primary-10/40 rounded-xl cursor-pointer smooth-transition hover:glow-border group"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-10 focus:ring-primary-10 focus:ring-offset-0"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <label className="block text-white font-medium mb-2">
              Your Budget
            </label>
            <p className="text-sm text-gray-400 mb-4">
              Slide to indicate your budget range
            </p>
            <div className="relative">
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-gradient-to-r from-white/10 to-white/5 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #5a72df 0%, #5a72df ${((budget - 100) / (10000 - 100)) * 100}%, rgba(255,255,255,0.1) ${((budget - 100) / (10000 - 100)) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>$100</span>
                <span className="text-primary-10 font-semibold">${budget}</span>
                <span>$10000</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white font-medium mb-2">
              Your Message
            </label>
            <textarea
              placeholder="Type here"
              rows={5}
              className="w-full glass focus:glass-strong rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-primary-10/60 focus:outline-none focus:glow-border smooth-transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group px-10 py-4 bg-gradient-to-r from-primary-10 to-primary-20 hover:from-primary-20 hover:to-primary-30 text-white font-bold rounded-xl smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/30 flex items-center gap-2 mx-auto text-lg"
          >
            Submit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};
