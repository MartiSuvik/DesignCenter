import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import CaseStudies from '../components/CaseStudies';
import HowWeWorkHero from '../components/HowWeWorkHero';
import HowWeWorkStages from '../components/HowWeWorkStages';
import HowWeWorkCallToAction from '../components/HowWeWorkCallToAction';
import ScrollArrow from '../components/ScrollArrow';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  rating: number;
}

const HowWeWork = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Define your testimonials array
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Nataliya Narizhna',
      position: 'Customer',
      quote:
        'Beautiful store with great selection of unique and high quality furniture. Very happy with the service, Dmitriy is an amazing sales person, we have been ordering with him for years. Good prices as opposed to other high end furniture stores. Highly recommend.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Anna Ka',
      position: 'Customer',
      quote:
        'Its truly a place with a big selection of designs and designers for kitchen, dining room, and bathrooms. Some items are very expensive, some reasonably priced. For me, it was better to see it in the showroom and not in the catalog.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Felix Z',
      position: 'Customer',
      quote: 'Nice selection and good quality furniture',
      rating: 5,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function triggerFooterContact(): void {
    const footerElement = document.getElementById('footer'); // Make sure your Footer has id="footer"
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
      // Optionally, if you need to trigger a button inside the footer after scrolling:
      setTimeout(() => {
        const footerContactBtn = footerElement.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement | null;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 500); // Adjust delay as needed
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />
      <HowWeWorkHero scrollToTimeline={() => {}} />
      <HowWeWorkStages />
      <CaseStudies />
      {/* Pass the required props to TestimonialsSection */}
      <TestimonialsSection
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />
      <HowWeWorkCallToAction
        triggerFooterContact={() => {}}
        scrollToProjects={() => {}}
      />
      <Footer />
    </div>
  );
};

export default HowWeWork;
