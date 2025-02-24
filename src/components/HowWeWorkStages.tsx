import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Pencil, PenTool as Tool, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: 1,
    title: 'Consultation',
    description:
      'Visit our **New York** showroom or connect via our website\nfor a **personalized consultation**.',
    icon: <MapPin className="w-8 h-8 text-white" />,
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop',
    details: [
      'Personal design consultation',
      'Space assessment',
      'Style preferences discussion',
      'Budget planning',
    ],
  },
  {
    id: 2,
    title: 'Concept',
    description:
      'Receive **tailored sketches** that bring your **vision to life**.',
    icon: <Pencil className="w-8 h-8 text-white" />,
    image:
      'https://images.unsplash.com/photo-1600428610161-e98636332e98?q=80&w=2940&auto=format&fit=crop',
    details: [
      'Detailed sketches',
      '3D visualizations',
      'Material selections',
      'Color palette development',
    ],
  },
  {
    id: 3,
    title: 'Craftsmanship',
    description:
      '**Experience** exquisite Italian craftsmanship where every detail is meticulously **executed to perfection**.',
    icon: <Tool className="w-8 h-8 text-white" />,
    image:
      'https://images.unsplash.com/photo-1553051021-9f94520a6cad?q=80&w=2940&auto=format&fit=crop',
    details: [
      'Master artisan selection',
      'Premium material sourcing',
      'Handcrafted excellence',
      'Quality assurance',
    ],
  },
  {
    id: 4,
    title: 'Delivery',
    description:
      'Your bespoke order is prepared and delivered with flawless precision, **ensuring your space** is transformed **effortlessly**.',
    icon: <Compass className="w-8 h-8 text-white" />,
    image:
      'https://images.unsplash.com/photo-1464029902023-f42eba355bde?q=80&w=2940&auto=format&fit=crop',
    details: [
      'White glove delivery',
      'Professional installation',
      'Final inspection',
      'Client walkthrough',
    ],
  },
];

const HowWeWorkStages: React.FC = () => {
  // References for pinned scroll
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!wrapperRef.current || !lineRef.current || !containerRef.current)
      return;

    const ctx = gsap.context(() => {
      const stageSections = gsap.utils.toArray<HTMLElement>('.stage-section');

      // Make sure the wrapper is visible for the horizontal scroll
      gsap.set(wrapperRef.current, { opacity: 1, overflow: 'visible' });

      // Simple fade-in for the first stage
      if (stageSections.length > 0) {
        gsap.fromTo(
          stageSections[0],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stageSections[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Calculate total width for horizontal scroll
      const totalWidth =
        stageSections.reduce(
          (acc, section) => acc + section.offsetWidth * 0.8,
          0
        ) +
        (stageSections.length - 1) * 20;

      // Reset line position
      gsap.set(lineRef.current, { x: 0 });

      // Horizontal scroll pinned
      const horizontalTween = gsap.to(stageSections, {
        xPercent: -100 * (stageSections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (stageSections.length - 1), // Snap to each stage
          start: 'top top',
          end: () => `+=${totalWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Move the line as we scroll horizontally
            gsap.to(lineRef.current, {
              x: self.progress * (totalWidth - window.innerWidth) * 0.2,
              ease: 'none',
              duration: 0.3,
            });
          },
        },
      });

      // Animate text on each stage as it scrolls horizontally
      stageSections.forEach((section) => {
        const text = section.querySelector('.stage-text') as HTMLElement | null;
        if (text) {
          gsap.fromTo(
            text,
            { x: '100%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalTween, // Key for horizontal triggers
                start: 'left center',
                end: 'right center+=200',
                scrub: true,
              },
            }
          );
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative h-screen overflow-hidden bg-[#1A1A1A]"
    >
      {/* The moving line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 w-[200vw] h-1 bg-[#C5A267] opacity-80"
      />

      {/* Horizontal container */}
      <div
        ref={containerRef}
        className="absolute h-full flex w-full"
        style={{ willChange: 'transform' }}
      >
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="stage-section w-[80vw] h-full flex-shrink-0 flex justify-center items-center"
          >
            <div className="relative w-full max-w-4xl px-4 h-full flex flex-col justify-center">
              {/* Stage Number */}
              <div className="text-center mb-3">
                <span className="text-[#C5A267] text-sm tracking-widest uppercase">
                  Stage {stage.id}
                </span>
              </div>
              {/* Stage Title */}
              <h2 className="text-4xl font-serif text-white text-center mb-3">
                {stage.title}
              </h2>

              {/* Stage Content */}
              <div className="relative w-full max-w-2xl mx-auto mb-3 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    {stage.icon}
                  </div>
                </div>
                {/* The text that slides in horizontally */}
                <div className="stage-text absolute top-0 right-0 h-full w-1/2 p-4 flex flex-col justify-center text-left">
                  <p className="text-white/80 text-lg mb-6 leading-loose whitespace-pre-line break-words">
                    {stage.description
                      .split(/(\*\*.*?\*\*)/g)
                      .map((part, index) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                          <strong key={index} className="text-white font-bold">
                            {part.replace(/\*\*/g, '')}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                  </p>
                  <div className="grid grid-cols-1 gap-y-3">
                    {stage.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 text-white/90"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#C5A267] flex-shrink-0" />
                        <span className="text-base">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWorkStages;
