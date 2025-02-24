import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollManager } from '../hooks/useScrollManager';
import ImageGallery from './ImageGallery';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface ProjectOption {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hasContent: boolean;
}

const projectOptions: ProjectOption[] = [
  {
    id: 1,
    title: 'KITCHEN',
    subtitle: 'Culinary Excellence',
    description: 'Luxury kitchens designed for functionality and aesthetics.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/1_converted_abtrac.avif',
    hasContent: true,
  },
  {
    id: 2,
    title: 'LIVING',
    subtitle: 'Elegant Comfort',
    description: 'Experience perfect blend of luxury living and comfort.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/2_converted_dvxxxk.avif',
    hasContent: true,
  },
  {
    id: 3,
    title: 'DINING',
    subtitle: 'Sophisticated Dining',
    description: 'Memorable moments in elegantly designed dining spaces.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/3_converted_uc7sxw.avif',
    hasContent: true,
  },
  {
    id: 4,
    title: 'BED',
    subtitle: 'Luxury Designs',
    description: 'Bedrooms designed into a personal sanctuary.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/4_converted_z4arig.avif',
    hasContent: true,
  },
  {
    id: 5,
    title: 'LIGHT',
    subtitle: 'Outshine the standard',
    description: 'Illuminate your space with carefully curated lighting.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/5_converted_d2v3em.avif',
    hasContent: true,
  },
  {
    id: 6,
    title: 'BATH',
    subtitle: 'Inner peace of Italy',
    description: 'Luxurious bathrooms with spa-like tranquility.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/6_converted_r36ncb.avif',
    hasContent: true,
  },
  {
    id: 7,
    title: 'OUTDOOR',
    subtitle: 'Outdoor Elegance',
    description: 'Designed outdoor spaces for relaxation and entertainment.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/7_converted_e3j2zg.avif',
    hasContent: true,
  },
  {
    id: 8,
    title: 'OFFICE',
    subtitle: 'Calming Office',
    description: 'Designed office spaces for undisturbed focus.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/v1739789546/Untitled_design_wvbz0p.avif',
    hasContent: true,
  },
];

const HomeProjectsCards = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<ProjectOption | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollManager = useScrollManager();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Initialize card positions
      gsap.set(cardRefs.current.slice(1), {
        x: '-100%',
        opacity: 0,
        scale: 0.95,
      });

      // Create the scroll-triggered animation sequence
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: 'top 80%', // Trigger when 20% of the section is visible
        onEnter: () => {
          // Animate each card after the first one
          cardRefs.current.slice(1).forEach((card, index) => {
            gsap.to(card, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: (index + 1) * 0.2, // Staggered delay
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              clearProps: 'transform', // Clean up transform after animation
            });
          });
        },
        once: true, // Only trigger once
      });
    });

    return () => ctx.revert();
  }, []);

  const handleOptionClick = (option: ProjectOption) => {
    if (option.hasContent) {
      if (activeId === option.id) {
        setSelectedOption(option);
      } else {
        setActiveId(option.id);
        setSelectedOption(null);
      }
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    scrollManager.unlockScroll();
  };

  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });

      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <section id="HomeProjectsCards" className="relative min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 mb-2">
        <h1 className="text-8xl font-serif text-center">PRODUCT COLLECTION</h1>
      </div>

      <div
        ref={cardsContainerRef}
        className="flex gap-4 p-8 w-full max-w-6xl mx-auto h-[550px]"
      >
        {projectOptions.map((project, index) => (
          <div
            key={project.id}
            ref={el => cardRefs.current[index] = el}
            className={`relative flex-1 min-w-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-1000 ease-out will-change-transform ${
              activeId === project.id ? 'flex-[2.5]' : 'flex-[0.5]'
            }`}
            onClick={() => handleOptionClick(project)}
          >
            <div className="absolute inset-0">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500"
                style={{
                  backgroundImage: `url(${project.image})`,
                  transform: activeId === project.id ? 'scale(1)' : 'scale(1.2)',
                }}
              />
            </div>

            <div className="absolute inset-0 bg-black/10" />

            {activeId === project.id && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                <div className="w-full h-full rounded-full bg-white/80 pointer-events-none z-10 opacity-30 animate-pulse-slow transition-opacity duration-300" />
              </div>
            )}

            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-l from-transparent via-black/10 to-black/90">
              {activeId !== project.id && (
                <div className="absolute inset-0 flex items-center justify-center p-0.5">
                  <h3 className="text-white text-center text-lg font-serif leading-tight line-clamp-2">
                    {project.title}
                  </h3>
                </div>
              )}

              {activeId === project.id && (
                <div>
                  <h3 className="text-white/90 text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedOption && (
        <ImageGallery
          category={selectedOption.title}
          style="Modern"
          onClose={handleClose}
        />
      )}

      <div className="mt-12 flex justify-center space-x-4">
        <Link to="/HomeProjectsCards">
          <button className="px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200">
            View all
          </button>
        </Link>

        <button
          onClick={triggerFooterContact}
          className="px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200"
        >
          Contact us
        </button>
      </div>
    </section>
  );
};

export default HomeProjectsCards;