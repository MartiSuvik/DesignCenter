import { useState, useEffect, useRef } from 'react';
import Airtable from 'airtable';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottomSheetExpandedCard from './BottomSheetExpandedCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  room: string;
  style: string;
  imageUrl: string;
  styleName?: string;
  additionalImages?: string[];
}

const ITEMS_PER_PAGE = 2;
const ITEMS_PER_ROW = 2;

const styleNames = [
  'Eclipse',
  'Nova',
  'Zenith',
  'Vertex',
  'Prism',
  'Quantum',
  'Nebula',
  'Aurora',
  'Apex',
  'Horizon',
  'Celestial',
  'Cosmos',
  'Stellar',
  'Galaxy',
  'Orbit',
  'Solstice',
  'Equinox',
  'Spectrum',
  'Fusion',
  'Radiance',
  'Mirage',
  'Vortex',
  'Obsidian',
  'Infinity',
  'Eternity',
  'Momentum',
  'Pulse',
  'Essence',
  'Serenity',
  'Ethereal',
  'Luminous',
  'Vista',
  'Verve',
  'Synthesis',
  'Reverie',
  'Enigma',
  'Lumina',
  'Catalyst',
  'Reflection',
  'Empyrean',
];

const ProductGalleryContent: React.FC = () => {
  // Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs for categories & styles (still used for minor animations or references)
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const styleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Optional references if you keep them:
  // const projectRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const lightEffectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // **Card Refs** (for onLoad animation)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rooms = [
    'Kitchen',
    'Living',
    'Dining',
    'Bedroom',
    'Lighting',
    'Bath',
    'Outdoor',
  ];
  const kitchenStyles = ['Modern', 'Traditional', 'Art Deco'];

  // 1) Basic GSAP for categories (unchanged)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      categoryRefs.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoryRefs.current[0],
          start: 'top 80%',
        },
      }
    );

    if (selectedRoom === 'Kitchen') {
      gsap.fromTo(
        styleRefs.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [selectedRoom]);

  // 2) Fetch projects from Airtable
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const base = new Airtable({
          apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
        }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

        const records = await base('database').select().all();
        const fetchedProjects = records.map((record, index) => ({
          id: record.id,
          title: record.fields['Title'] as string,
          room: record.fields['Room'] as string,
          style: record.fields['Style'] as string,
          imageUrl: record.fields['Cloudinary URL'] as string,
          styleName: styleNames[index % styleNames.length],
        }));

        setProjects(fetchedProjects);
        setVisibleProjects(fetchedProjects.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch projects'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 3) Update visible projects on filter changes
  useEffect(() => {
    let filtered = [...projects];
    if (selectedRoom !== 'all') {
      filtered = filtered.filter((p) => p.room === selectedRoom);
    }
    if (selectedRoom === 'Kitchen' && selectedStyle !== 'all') {
      filtered = filtered.filter((p) => p.style === selectedStyle);
    }
    setVisibleProjects(filtered.slice(0, ITEMS_PER_PAGE));
    setExpandedProjectId(null);
  }, [projects, selectedRoom, selectedStyle]);

  // 4) handleCardLoad -> Animate card once image is loaded
  const handleCardLoad = (index: number) => {
    const cardEl = cardRefs.current[index];
    if (!cardEl) return;

    // GSAP fade/lift once image loaded
    gsap.fromTo(
      cardEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  };

  // 5) Load More
  const loadMore = () => {
    const currentLength = visibleProjects.length;
    let filtered = [...projects];

    if (selectedRoom !== 'all') {
      filtered = filtered.filter((p) => p.room === selectedRoom);
    }
    if (selectedRoom === 'Kitchen' && selectedStyle !== 'all') {
      filtered = filtered.filter((p) => p.style === selectedStyle);
    }

    setVisibleProjects(filtered.slice(0, currentLength + ITEMS_PER_PAGE));
  };

  const handleProjectClick = (projectId: string) => {
    setExpandedProjectId(projectId === expandedProjectId ? null : projectId);
  };

  // 6) renderProjectRows with cardRefs & onLoad
  const renderProjectRows = () => {
    const rows = [];
    for (let i = 0; i < visibleProjects.length; i += ITEMS_PER_ROW) {
      const rowProjects = visibleProjects.slice(i, i + ITEMS_PER_ROW);

      rows.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {rowProjects.map((project, index) => {
            const cardIndex = i + index;

            return (
              <div
                key={project.id}
                // Connect each card to our cardRefs array
                ref={(el) => (cardRefs.current[cardIndex] = el)}
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project.id);
                  }
                }}
                aria-expanded={expandedProjectId === project.id}
              >
                <div className="aspect-w-2 aspect-h-1 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    // Animate card after image is fully loaded
                    onLoad={() => handleCardLoad(cardIndex)}
                  />
                </div>

                {/* Title, style, etc. */}
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-serif text-black mb-2">
                      {project.styleName}
                    </h3>
                    <span className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
                      {project.style
                        ? `${project.room} / ${project.style}`
                        : project.room}
                    </span>
                    <h4 className="text-lg text-gray-800">{project.title}</h4>
                  </div>
                  <div className="text-[#B49157] transition-transform duration-300">
                    {expandedProjectId === project.id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const expandedProject = expandedProjectId
    ? projects.find((p) => p.id === expandedProjectId)
    : null;

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Selection */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">
              EXPLORE OUR PRODUCTS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              by Designers that move outside the traditional boundaries.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              ref={(el) => (categoryRefs.current[0] = el)}
              onClick={() => {
                setSelectedRoom('all');
                setSelectedStyle('all');
              }}
              className={`relative group px-8 py-4 text-lg transition-all duration-500 rounded-lg ${
                selectedRoom === 'all'
                  ? 'text-[#B49157]'
                  : 'bg-transparent text-gray-600 hover:text-[#B49157]'
              }`}
            >
              All Collections
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-500 ${
                  selectedRoom === 'all'
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>

            {rooms.map((room, index) => (
              <button
                key={room}
                ref={(el) => (categoryRefs.current[index + 1] = el)}
                onClick={() => {
                  setSelectedRoom(room);
                  setSelectedStyle('all');
                }}
                className={`relative group px-8 py-4 text-lg transition-all duration-500 rounded-lg ${
                  selectedRoom === room
                    ? 'text-[#B49157]'
                    : 'bg-transparent text-gray-600 hover:text-[#B49157]'
                }`}
              >
                {room}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-500 ${
                    selectedRoom === room
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Style Filter (only for Kitchen) */}
          {selectedRoom === 'Kitchen' && (
            <div className="mt-8 flex justify-center gap-6">
              <button
                ref={(el) => (styleRefs.current[0] = el)}
                onClick={() => setSelectedStyle('all')}
                className={`relative group px-6 py-3 text-md transition-all duration-500 ${
                  selectedStyle === 'all'
                    ? 'text-[#B49157]'
                    : 'text-gray-600 hover:text-[#B49157]'
                }`}
              >
                All Styles
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-500 ${
                    selectedStyle === 'all'
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>

              {kitchenStyles.map((style, idx) => (
                <button
                  key={style}
                  ref={(el) => (styleRefs.current[idx + 1] = el)}
                  onClick={() => setSelectedStyle(style)}
                  className={`relative group px-6 py-3 text-md transition-all duration-500 ${
                    selectedStyle === style
                      ? 'text-[#B49157]'
                      : 'text-gray-600 hover:text-[#B49157]'
                  }`}
                >
                  {style}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-500 ${
                      selectedStyle === style
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid or Loading Spinner */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B49157] border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Render the rows */}
            {renderProjectRows()}

            {/* Bottom Sheet Card for expanded project */}
            {expandedProjectId && (
              <BottomSheetExpandedCard
                project={projects.find((p) => p.id === expandedProjectId)!}
                onClose={() => setExpandedProjectId(null)}
              />
            )}

            {/* Load More Button */}
            {visibleProjects.length < projects.length && (
              <div className="mt-16 text-center">
                <button
                  onClick={loadMore}
                  className="
                    relative group
                    px-8 py-2
                    text-white text-l font-medium tracking-wider
                    transition-all duration-300
                    before:content-[''] before:absolute before:left-0 before:bottom-0 
                    before:h-[2px] before:w-full before:bg-[#B49157]
                    before:scale-x-0 before:origin-left before:transition-transform before:duration-300
                    hover:bg-[#A38047] group-hover:before:scale-x-100
                    bg-[#B49157]
                  "
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function ProductCollectionGallery() {
  return (
    <div className="min-h-screen">
      <ProductGalleryContent />
    </div>
  );
}
