'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@relume_io/relume-ui';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// AnimatedHeader component with its own fromTo animation.
const AnimatedHeader: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    if (titleRef.current) {
      const textParts = ['Recognized by ', 'Visionnaire', ' for Elevated Style'];
      const wrappedText = textParts
        .map((part, index) => {
          if (index === 1) {
            // Keep Visionnaire as a single unit with its gradient
            return `<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">${part}</span>`;
          }
          // Split other parts into individual letters
          return part
            .split('')
            .map(letter =>
              letter === ' ' ? ' ' : `<span class="inline-block">${letter}</span>`
            )
            .join('');
        })
        .join('');

      titleRef.current.innerHTML = wrappedText;

      const letterElements = titleRef.current.querySelectorAll(
        'span:not(.text-transparent)'
      );
      const visionnaireElement = titleRef.current.querySelector('.text-transparent');

      gsap.set(letterElements, {
        opacity: 0,
        rotateX: -90,
        transformOrigin: 'top center',
        display: 'inline-block',
        perspective: '1000px',
      });

      gsap.set(visionnaireElement, {
        opacity: 0,
        y: 30,
        rotateX: -90,
      });

      tl.to(letterElements, {
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out',
      })
        .to(
          visionnaireElement,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.5,
            ease: 'power4.out',
          },
          '-=1'
        )
        .fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(5px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
          },
          '-=1'
        );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={headerRef} className="mb-8">
      <p ref={subtitleRef} className="mb-3 font-semibold md:mb-4 opacity-0">
        Honored by the world-renowned authority in luxury home décor and design.
      </p>
      <h1
        ref={titleRef}
        className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl perspective-1000"
        style={{ perspective: '1000px' }}
      >
        Recognized by{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
          Visionnaire
        </span>{' '}
        for Elevated Style
      </h1>
    </div>
  );
};

const ProductCollectionVisionnaire: React.FC = () => {
  const otherTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // shortened to 0.5s
    return () => clearTimeout(timer);
  }, []);

  // Refresh triggers after loading
  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (otherTextRef.current) {
        gsap.fromTo(
          otherTextRef.current,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 2.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: otherTextRef.current,
              start: 'top bottom',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 2.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoRef.current,
              start: 'top bottom',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-[5%] py-16 md:py-12 lg:py-14 bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        {loading && <div className="text-center py-10">Loading gallery...</div>}

        {!loading && (
          <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            {/* Text Column */}
            <div>
              <AnimatedHeader />
              <div ref={otherTextRef}>
                <p className="mb-6 md:mb-8 md:text-md text-gray-700">
                  Our commitment to unparalleled craftsmanship, refined aesthetics, and
                  enduring quality has earned us the admiration of Visionnaire—where only
                  the most distinguished names in home décor are featured.
                </p>
                <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                  <div>
                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
                      Quality Assurance
                    </h6>
                    <p className="text-gray-600">
                      Premium materials and meticulous detailing ensure longevity.
                    </p>
                  </div>
                  <div>
                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
                      Personalized Service
                    </h6>
                    <p className="text-gray-600">
                      Tailored solutions that reflect your unique style and preferences.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Link to="/visionnaire">
                  <Button
                    title="Learn More"
                    className="bg-gradient-to-r from-[#b49157] to-[#c9a671] text-white border-none hover:from-[#c9a671] hover:to-[#b49157]"
                  >
                    Learn More From Visionnaire
                  </Button>
                </Link>
              </div>
              </div>
            </div>

            {/* Video Column */}
            <div ref={videoRef}>
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="https://res.cloudinary.com/dnddesigncenter/video/upload/v1739792372/f34jybj7vutohmwo9ryf.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCollectionVisionnaire;