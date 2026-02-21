import { ModernHero } from '../components/ModernHero';
import { ServicesSection } from '../components/ServicesSection';
import { WorkSection } from '../components/WorkSection';
import { ProcessSection } from '../components/ProcessSection';
import { AboutSection } from '../components/AboutSection';
import { FeaturesShowcase } from '../components/FeaturesShowcase';
import { Testimonials } from '../components/Testimonials';
import { ContactSection } from '../components/ContactSection';

export const Home = () => {
  return (
    <main>
      <div id="home">
        <ModernHero />
      </div>
      <FeaturesShowcase />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <AboutSection />
      <Testimonials />
      <ContactSection />
    </main>
  );
};
