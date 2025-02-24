'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollArrow from '../components/ScrollArrow';

const ProductCollectionHero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split "PROJECTS" into letters for individual animation
    const titleLetters = titleRef.current?.querySelectorAll('span');

    // Set initial styles
    gsap.set(titleLetters, {
      opacity: 0,
      rotateX: -90,
      transformOrigin: 'top center',
    });

    // Reveal animation sequence
    tl.fromTo(
      imageRef.current,
      { scale: 1.1, filter: 'brightness(0)' },
      { scale: 1, filter: 'brightness(1)', duration: 2.4, ease: 'power2.inOut' }
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        '-=2'
      )
      .to(
        titleLetters,
        {
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        },
        '-=1'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 },
        '-=1.4'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="relume"
      className="relative px-[5%] overflow-hidden perspective-1000"
    >
      {/* Hero Background */}
      <div className="absolute inset-0 -z-[1]">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dnddesigncenter/image/upload/Kitchen_Traditional_6.avif"
          alt="Hero background"
          className="size-full object-cover transform-gpu"
        />
        <span
          ref={overlayRef}
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-black/80"
        />
      </div>

      {/* Content */}
      <div className="flex min-h-svh items-center justify-center">
        <div
          ref={contentRef}
          className="container text-center mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 items-start gap-12 py-16 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              {/* PROJECTS with Blinders Effect */}
              <h1
                ref={titleRef}
                className="mb-5 text-8xl text-text-alternative md:mb-6 md:text-9xl lg:text-10xl transform-gpu uppercase flex justify-center space-x-2"
                style={{ perspective: '800px' }}
              >
                {'PRODUCT  COLLECTION'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transform-gpu"
                    style={{
                      display: 'inline-block',
                      perspective: '800px',
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-text-alternative md:text-md transform-gpu"
                style={{
                  willChange: 'transform, opacity, filter',
                }}
              >
                The contemporaneity and internationality of being “Made in Italy”
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </section>
  );
};

export default ProductCollectionHero;
