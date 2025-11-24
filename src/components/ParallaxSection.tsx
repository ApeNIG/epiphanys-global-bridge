import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  backgroundImage: string;
  speed?: number;
  children: ReactNode;
  className?: string;
  overlay?: boolean;
}

const ParallaxSection = ({ 
  backgroundImage, 
  speed = 0.5, 
  children, 
  className = '',
  overlay = true 
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bgRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={`parallax-section ${className}`}>
      <div 
        ref={bgRef}
        className="parallax-bg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {overlay && <div className="parallax-overlay" />}
      </div>
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
