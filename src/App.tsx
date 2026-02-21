import { motion, useScroll } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ModernHero } from './components/ModernHero';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative bg-black text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <div id="home">
          <ModernHero />
        </div>
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Work/Portfolio Section */}
        <WorkSection />
        
        {/* Process Section */}
        <ProcessSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Additional Feature Sections */}
        <FeaturesShowcase />
        <Testimonials />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
