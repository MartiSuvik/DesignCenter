import AnimatedSection from './AnimatedSection';

const HomeCollections = () => {
  return (
    <section id="HomeCollections" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Section with animation */}
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
                src="https://res.cloudinary.com/dnddesigncenter/video/upload/ludyp8ynilk1t02z9f3s.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </AnimatedSection>

          {/* Content Section with staggered animations */}
          <div className="space-y-8">
            <AnimatedSection>
              <div className="space-y-2">
                <h2 className="text-6xl font-serif">LUXURY HOME COLLECTION</h2>
                <p className="text-[#B49157] uppercase tracking-wider">
                  Our Designers have the tacit permission to play outside the
                  box
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover our exclusive curated collections, designed for those
                who appreciate sophisticated aesthetics, superior craftsmanship,
                and lasting quality.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <button className="px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200">
                Explore the Art of Fine Living
              </button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCollections;
