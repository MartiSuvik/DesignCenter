import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const HomeHowWeWork = () => {
  return (
    <section id="italian-craftsmanship" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section with staggered animations */}
          <div className="space-y-8">
            <AnimatedSection>
              <div className="space-y-2">
                <h2 className="text-6xl font-serif">
                  DESIGN SHAPES THE FUTURE
                </h2>
                <p className="text-[#B49157] uppercase tracking-wider">
                  How We Transform your Home From Vision to Reality
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-gray-600 text-lg leading-relaxed">
                At <i>D&D Design Center</i>, we blend craftsmanship with
                innovation to bring your vision to life. From personalized
                consultations to precision execution.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Link
                to="/how-we-work"
                className="inline-block px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200"
              >
                See how we work
              </Link>
            </AnimatedSection>
          </div>

          {/* Video Section with animation (Right Side) */}
          <AnimatedSection
            delay={200}
            className="relative aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://res.cloudinary.com/dnddesigncenter/video/upload/wittyqg0juxstnsaepl0.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HomeHowWeWork;
