import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2010',
    title: 'Foundation',
    description: 'D&D Design Center was established in Milan, Italy.',
    image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    year: '2015',
    title: 'International Expansion',
    description: 'Opened our first international showroom.',
    image: 'https://images.unsplash.com/photo-1625732867209-7c8afdb21d10?q=80&w=3094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    year: '2020',
    title: 'Design Excellence Award',
    description: 'Received prestigious recognition for innovative design solutions.',
    image: 'https://images.unsplash.com/photo-1609403074955-6aba37dabed2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    year: '2025',
    title: 'Sustainable Initiative',
    description: 'Launched our commitment to sustainable luxury design.',
    image: 'https://www.visionnaire-home.com/sites/default/files/styles/side_by_side/public/stories/images/2017b_1.jpg?itok=bjLfHccr',
  },
];

const HomeHistorySection = () => {
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addToMilestoneRefs = (el: HTMLDivElement | null, index: number) => {
    milestoneRefs.current[index] = el;
  };
  const addToImageRefs = (el: HTMLDivElement | null, index: number) => {
    imageRefs.current[index] = el;
  };

  useEffect(() => {
    milestoneRefs.current.forEach((milestoneEl, i) => {
      const imgContainer = imageRefs.current[i];
      if (!milestoneEl || !imgContainer) return;

      gsap.fromTo(
        imgContainer,
        {
          // Start smaller and transparent
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: milestoneEl,
            // Start earlier so the animation is visible
            start: 'top 90%',
            // End earlier so it completes while in view
            end: 'bottom 10%',
            scrub: 0.5,
          },
        }
      );
    });
  }, []);

  return (
    <section id="HomeHistorySection" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-8xl font-serif text-center mb-16">OUR HISTORY</h1>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#C5A267]" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                ref={(el) => addToMilestoneRefs(el, index)}
              >
                {/* The timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C5A267] rounded-full z-10" />

                {/* Text Section */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div
                    className={`bg-white p-6 rounded-lg shadow-lg relative z-20 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span className="text-[#C5A267] text-xl font-bold">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-serif mt-2 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

{/* Artistic Image Container */}
<div
  className={`absolute top-1/2 transform -translate-y-1/2 ${
    index % 2 === 0 ? 'left-[55%]' : 'right-[55%]'
  } z-30`}
  ref={(el) => addToImageRefs(el, index)}
>
  <div className="relative w-32 h-32">
    {/* Tilted background "frame" */}
    <div className="absolute inset-0 bg-white rounded-full shadow-lg rotate-6 -z-10" />

    {/* Actual Image */}
    <img
      src={milestone.image}
      alt={`${milestone.title} thumbnail`}
      className="w-full h-full object-cover rounded-full shadow-md"
    />
  </div>
</div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHistorySection;
