import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import ScrollArrow from '../components/ScrollArrow';

interface HeroProps {
  scrollToTimeline: () => void;
}

const HowWeWorkHero: React.FC<HeroProps> = ({ scrollToTimeline }) => {
  const heroArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(heroArrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-[1.1] transition-transform duration-1000"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dnddesigncenter/image/upload/Untitled_design_5_rnem1n.avif')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
      <div className="relative z-10 text-center px-4 hero-content">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
          How We Work
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Experience our meticulous process of transforming spaces through Italian craftsmanship and design excellence.
        </p>
      </div>
      <div
        ref={heroArrowRef}
        onClick={scrollToTimeline}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-10 transition-transform duration-300 hover:scale-110"
      >
        <ChevronDown className="w-12 h-12 text-white" />
      </div>
    </section>
  );
};

export default HowWeWorkHero;
