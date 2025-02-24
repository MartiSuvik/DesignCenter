import { useState, useEffect, useRef } from 'react';
import ProductCollectionHero from '../components/ProductCollectionHero';
import ProductCollectionVisionnaire from '../components/ProductCollectionVisionnaire';
import ProductCollectionInfo from '../components/ProductCollectionInfo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCollectionGallery from '../components/ProductGalleryContent'; // New component
// ...other imports

export default function Projects() {
  // ... state and hooks for Navbar & Footer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerFooterContact = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const footerContactBtn = footerRef.current!.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement | null;
        if (footerContactBtn) footerContactBtn.click();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />
      <ProductCollectionHero />
      <ProductCollectionGallery />{' '}
      {/* New component encapsulating gallery logic */}
      <ProductCollectionVisionnaire />
      <ProductCollectionInfo />
      <Footer ref={footerRef} id="footer" />
    </div>
  );
}
