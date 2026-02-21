import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export const ModernHero = () => {
  const tags = [
    'For Startups',
    'Enterprise solutions',
    'Media & Publishers',
    'SaaS / Cloud',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-10/10 to-black" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(90, 114, 223, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(90, 114, 223, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Tag Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-5 py-2.5 glass hover:glass-strong hover:border-primary-10/40 rounded-full text-sm text-gray-300 hover:text-primary-10 smooth-transition cursor-pointer hover:glow-border font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
        >
          <span className="text-gradient">A Fair Hiring Network</span>
          <br />
          <span className="text-white">that Works Without Bias</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Multi-agent AI that verifies skills, detects bias, and ensures 
          transparent matching for ethical recruitment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-primary-10 to-primary-20 hover:from-primary-20 hover:to-primary-30 text-white font-bold rounded-xl smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/30 flex items-center gap-2">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
          </button>
          
          <button className="px-8 py-4 glass hover:glass-strong hover:border-primary-10/30 text-white font-semibold rounded-xl smooth-transition hover:scale-105 hover:glow-border flex items-center gap-2">
            <Play className="w-5 h-5" />
            See Demo
          </button>
        </motion.div>

        {/* Trusted By - Logo Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-6"
        >
          <p className="text-sm text-gray-500">Trusted by 200+ Companies</p>
          
          {/* Scrolling Logos - No Background */}
          <div className="relative max-w-5xl mx-auto overflow-hidden py-8">
            <div className="logo-marquee group">
              <div className="logo-marquee-content">
                {/* First set of logos */}
                <div className="flex items-center justify-center gap-20 px-12">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png" 
                      alt="OpenAI" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://asset.brandfetch.io/idFdo8ulhr/idzj34qGQv.png" 
                      alt="LangChain" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://n8n.io/favicon.svg" 
                      alt="n8n" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/faiss.svg" 
                      alt="FAISS" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://streamlit.io/images/brand/streamlit-mark-color.png" 
                      alt="Streamlit" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                </div>
                {/* Second set (duplicate for seamless loop) */}
                <div className="flex items-center justify-center gap-20 px-12">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png" 
                      alt="OpenAI" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://asset.brandfetch.io/idFdo8ulhr/idzj34qGQv.png" 
                      alt="LangChain" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://n8n.io/favicon.svg" 
                      alt="n8n" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/faiss.svg" 
                      alt="FAISS" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://streamlit.io/images/brand/streamlit-mark-color.png" 
                      alt="Streamlit" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                </div>
                {/* Third set (duplicate for seamless loop) */}
                <div className="flex items-center justify-center gap-20 px-12">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png" 
                      alt="OpenAI" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://asset.brandfetch.io/idFdo8ulhr/idzj34qGQv.png" 
                      alt="LangChain" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://n8n.io/favicon.svg" 
                      alt="n8n" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/faiss.svg" 
                      alt="FAISS" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://streamlit.io/images/brand/streamlit-mark-color.png" 
                      alt="Streamlit" 
                      className="h-10 w-auto opacity-60 group-hover:opacity-90 smooth-transition brightness-0 invert"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
