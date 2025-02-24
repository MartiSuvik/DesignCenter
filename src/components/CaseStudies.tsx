import React, { useRef } from "react";

const caseStudies = [
  {
    id: 1,
    title: "Bright Contemporary Living Room Renovation – Warm and Inviting Space",
    description:
      "Transform your living area with cozy furniture, wood flooring, and modern lighting to create a contemporary, welcoming atmosphere.",
    beforeImage:
      "https://res.cloudinary.com/dnddesigncenter/image/upload/1_a1zewm.avif",
    afterImage:
      "https://res.cloudinary.com/dnddesigncenter/image/upload/2_llvjjf.avif",
    results: [
      "Handcrafted Italian furnishings & statement lighting",
      "Premium wood flooring with exquisite finishes",
      "Enhanced natural light and refined ambiance",
    ],
  },
  {
    id: 2,
    title: "Cozy and Stylish Bedroom Makeover – Elegant Modern Home Design",
    description:
      "Upgrade your bedroom with warm lighting, custom-built storage, and a contemporary aesthetic for a cozy yet modern living space.",
    beforeImage:
      "https://res.cloudinary.com/dnddesigncenter/image/upload/5_rmtmur.avif",
    afterImage:
      "https://res.cloudinary.com/dnddesigncenter/image/upload/6_i7srhj.avif",
    results: [
      "Custom-designed storage maximizing space & style",
      "Soft ambient lighting for a serene, luxurious feel",
      "Sophisticated modern design with timeless appeal",
    ],
  },
  {
    id: 3,
    title: "Modern Bathroom Makeover – Sleek and Stylish Home Renovation",
    description:
      "Discover a luxurious modern bathroom transformation featuring a walk-in shower, elegant fixtures, and contemporary tiles for a sleek finish.",
    beforeImage:
      "https://res.cloudinary.com/dnddesigncenter/image/upload/3_gmlal0.avif",
    afterImage:
      "https://res.cloudinary.com/dnddesigncenter/image/upload/4_mh2y7y.avif",
    results: [
      "Spa-inspired fixtures for a high-end retreat",
      "Intelligent space planning for seamless functionality",
      "Masterfully crafted finishes ensuring lasting elegance",
    ],
  },
];

const CaseStudies: React.FC = () => {
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to handle slider movement
  const handleSliderInteraction = (index: number, clientX: number) => {
    if (!sliderRefs.current[index]) return;
    const rect = sliderRefs.current[index]!.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    sliderRefs.current[index]!.querySelector(".after-image")!.style.clipPath =
      `inset(0 ${100 - percentage}% 0 0)`;
  };

  return (
    <section ref={caseStudiesRef} className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-white text-center mb-16">
          Featured Transformations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="bg-[#262626] rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Before / After Image Slider */}
              <div
                ref={(el) => (sliderRefs.current[index] = el!)}
                className="relative aspect-[4/3] cursor-ew-resize group"
                onMouseMove={(e) => handleSliderInteraction(index, e.clientX)}
                onTouchMove={(e) =>
                  handleSliderInteraction(index, e.touches[0].clientX)
                }
              >
                {/* After Image */}
                <img
                  src={study.afterImage}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Before Image (Revealed by Slider) */}
                <div
                  className="after-image absolute inset-0 w-full h-full"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                >
                  <img
                    src={study.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Slider Instruction */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-sm bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    Slide to compare
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-2xl font-serif text-white mb-3">
                  {study.title}
                </h3>
                <p className="text-white/60 mb-6 text-sm leading-relaxed">
                  {study.description}
                </p>

                {/* Results List */}
                <div className="space-y-3 mb-6">
                  {study.results.map((result, i) => (
                    <div
                      key={i}
                      className="flex items-center text-[#C4A661] text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C4A661] mr-3 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
