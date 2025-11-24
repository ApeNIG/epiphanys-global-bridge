import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxLayerProps {
  speed: number;
  children: ReactNode;
  className?: string;
}

const ParallaxLayer = ({ speed, children, className = '' }: ParallaxLayerProps) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!layerRef.current) return;
      
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      layerRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={layerRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxLayer;
