import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ScrollArrow from '../components/ScrollArrow';

gsap.registerPlugin(ScrollTrigger);

const Visionnaire = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(heroTextRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      });

      // Ken Burns effect on hero video
      gsap.to(videoRef.current, {
        scale: 1.1,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Section animations
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index)
          });

          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Horizontal scroll for showcase
      if (horizontalRef.current && sectionsRef.current) {
        const sections = gsap.utils.toArray('.showcase-item');
        const totalWidth = sections.length * window.innerWidth;

        gsap.to(sectionsRef.current, {
          x: -totalWidth + window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1
          }
        });
      }

      // Magnetic button effect
      document.querySelectorAll('.magnetic-button').forEach((button) => {
        button.addEventListener('mousemove', (e: any) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          gsap.to(button, {
            x: (x - rect.width / 2) / rect.width * 20,
            y: (y - rect.height / 2) / rect.height * 20,
            duration: 0.3,
            ease: "power3.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power3.out"
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const triggerFooterContact = () => {
    setTimeout(() => {
      const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
      if (footerContactBtn) footerContactBtn.click();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />

      {/* Hero Section */}
      <section ref={el => sectionRefs.current[0] = el} className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="https://res.cloudinary.com/dnddesigncenter/video/upload/v1739792372/f34jybj7vutohmwo9ryf.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div ref={heroTextRef} className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-serif text-white mb-8">
              VISION<span className="text-[#C0A960]">NAIRE</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
              Where Art Meets Design: A Visionnaire Collaboration
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Announcement */}
      <section ref={el => sectionRefs.current[1] = el} className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            We are thrilled to unveil an exclusive collaboration between D&D Design Center and Visionnaire, the ultimate name in luxury home design. Renowned for its unparalleled craftsmanship and visionary aesthetics, Visionnaire has long been the epitome of bespoke Italian elegance, gracing the most prestigious residences, yachts, and private estates worldwide.
          </p>
        </div>
      </section>

      {/* Italian Craftsmanship */}
      <section ref={el => sectionRefs.current[2] = el} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80"
                alt="Italian Craftsmanship"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-serif">
                Italian <span className="text-[#C0A960]">Excellence</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Each Visionnaire piece embodies generations of Italian craftsmanship, where artisanal expertise meets contemporary vision. Our master artisans meticulously craft each element, ensuring unparalleled quality and attention to detail that defines true luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Collection */}
      <div ref={horizontalRef} className="relative bg-white h-screen">
        <div ref={sectionsRef} className="flex">
          {[
            {
              title: "Living Room Collection",
              description: "Timeless elegance for contemporary living spaces",
              image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
            },
            {
              title: "Dining Collection",
              description: "Sophisticated dining experiences reimagined",
              image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
            },
            {
              title: "Bedroom Collection",
              description: "Luxurious comfort meets artistic expression",
              image: "https://images.unsplash.com/photo-1600607687644-c7171b46864f?auto=format&fit=crop&q=80"
            }
          ].map((item, index) => (
            <div key={index} className="showcase-item min-w-screen h-screen flex items-center px-20">
              <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-5xl font-serif">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Philosophy */}
      <section ref={el => sectionRefs.current[3] = el} className="py-32 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-8">Design Philosophy</h2>
          <p className="text-gray-600 leading-relaxed">
            Visionnaire's design philosophy transcends mere aesthetics, embracing a holistic approach where form and function achieve perfect harmony. Each piece is a testament to our commitment to creating spaces that inspire and elevate the art of living.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={el => sectionRefs.current[4] = el} className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-6xl font-serif mb-8">
            Experience <span className="text-[#C0A960]">Luxury</span>
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Discover our curated collection of Visionnaire pieces
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.visionnaire-home.com"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button px-8 py-4 bg-[#C0A960] text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              Discover Visionnaire
            </a>
            <Link
              to="/projects"
              className="magnetic-button px-8 py-4 bg-white text-black hover:bg-[#C0A960] hover:text-white transition-all duration-500"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Teaser */}
      <section ref={el => sectionRefs.current[5] = el} className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 italic">
            Stay tuned as we unveil more details, including a behind-the-scenes look at the exquisite craftsmanship behind each piece.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visionnaire;