import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({ end, duration = 2000, start = 0, suffix = '', prefix = '' }: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(start); // Reset count when entering
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCount(start); // Reset when leaving
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [start]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const range = end - start;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + range * easeOut);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, start, duration]);

  const formattedValue = `${prefix}${count.toLocaleString()}${suffix}`;

  return { ref, formattedValue, count };
};

// Helper to parse stat values like "15,000+" into { number: 15000, suffix: "+" }
/**
 * Split a display stat like "£74bn", "17%" or "£18.5bn" into its parts.
 *
 * The decimal point used to be stripped along with every other non-digit, so
 * "£18.5bn" parsed to 185 and the hero rendered "£185bn": an order of magnitude
 * out, and a claim the source does not make. Decimals and thousands separators
 * are now preserved.
 */
export const parseStatValue = (value: string): { number: number; suffix: string; prefix: string } => {
  const match = value.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return { number: 0, suffix: '', prefix: value };
  const numberStr = match[0];
  const at = match.index ?? 0;
  return {
    number: parseFloat(numberStr.replace(/,/g, '')) || 0,
    prefix: value.slice(0, at),
    suffix: value.slice(at + numberStr.length),
  };
};
