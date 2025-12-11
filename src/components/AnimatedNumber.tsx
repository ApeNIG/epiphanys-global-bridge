import { useCountUp, parseStatValue } from "@/hooks/useCountUp";

interface AnimatedNumberProps {
  value: string;
  className?: string;
}

const AnimatedNumber = ({ value, className = "" }: AnimatedNumberProps) => {
  const { number, suffix, prefix } = parseStatValue(value);
  const { ref, formattedValue } = useCountUp({ 
    end: number, 
    duration: 2000,
    suffix,
    prefix
  });

  return (
    <div ref={ref} className={className}>
      {formattedValue}
    </div>
  );
};

export default AnimatedNumber;
