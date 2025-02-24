'use client';

import React, { useEffect, useRef } from 'react';
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProductCollectionInfo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(itemRefs.current, {
        opacity: 0,
        y: 30
      });
      
      gsap.set(iconRefs.current, {
        scale: 0.8,
        opacity: 0
      });

      // Create staggered animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Animate icons first
          gsap.to(iconRefs.current, {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: 'back.out(1.7)',
          });

          // Then animate content with slight delay
          gsap.to(itemRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            delay: 0.3,
            ease: 'power3.out'
          });
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div ref={containerRef} className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3 md:gap-y-16">
          {/* Contact Card */}
          <div 
            ref={el => itemRefs.current[0] = el}
            className="group relative p-8 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm"
          >
            <div 
              ref={el => iconRefs.current[0] = el}
              className="mb-5 lg:mb-6 relative"
            >
              <div className="absolute inset-0 blur-xl transform group-hover:scale-110 transition-transform duration-200" />
              <BiEnvelope className="size-12 text-[#C5A267] relative z-10 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-3 text-2xl font leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl text-gray-900">
              Contact
            </h3>
            <p className="mb-5 md:mb-6 text-gray-600">We'd love to hear your ideas.</p>
            <a className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300">
              info@dnddesigncenter.com
            </a>
          </div>

          {/* Phone Card */}
          <div 
            ref={el => itemRefs.current[1] = el}
            className="group relative p-8 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm"
          >
            <div 
              ref={el => iconRefs.current[1] = el}
              className="mb-5 lg:mb-6 relative"
            >
              <div className="absolute inset-0 blur-xl transform group-hover:scale-110 transition-transform duration-200" />
              <BiPhone className="size-12 text-[#C5A267] relative z-10 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-3 text-2xl font leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl text-gray-900">
              Phone
            </h3>
            <p className="mb-5 md:mb-6 text-gray-600">
              Call us for inquiries for instant service.
            </p>
            <a className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300">
              +1 (718) 934-7100
            </a>
          </div>

          {/* Office Card */}
          <div 
            ref={el => itemRefs.current[2] = el}
            className="group relative p-8 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm"
          >
            <div 
              ref={el => iconRefs.current[2] = el}
              className="mb-5 lg:mb-6 relative"
            >
              <div className="absolute inset-0 blur-xl transform group-hover:scale-110 transition-transform duration-200" />
              <BiMap className="size-12 text-[#C5A267] relative z-10 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-3 text-2xl leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl text-gray-900">
              Office
            </h3>
            <p className="mb-5 md:mb-6 text-gray-600">
              See our latest designs and collections on spot.
            </p>
            <a className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300">
              2615 East 17th Street Brooklyn, New York 11235, USA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollectionInfo;