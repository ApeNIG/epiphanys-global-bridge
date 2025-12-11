import { useCountUp, parseStatValue } from "@/hooks/useCountUp";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnimatedStatProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

const AnimatedStat = ({ label, value, icon: Icon }: AnimatedStatProps) => {
  const { number, suffix, prefix } = parseStatValue(value);
  const { ref, formattedValue } = useCountUp({ 
    end: number, 
    duration: 2000,
    suffix,
    prefix
  });

  return (
    <Card className="text-center hover:shadow-elegant transition-all duration-300 transform hover:scale-105 bg-background/80 backdrop-blur-sm">
      <CardContent className="pt-8 pb-6">
        <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center bg-gradient-primary shadow-elegant">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div ref={ref} className="text-4xl font-bold text-foreground mb-3">
          {formattedValue}
        </div>
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedStat;
