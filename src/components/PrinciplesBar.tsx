import { Shield, Users, TrendingUp, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';

const principles = [
  {
    icon: Users,
    title: "Inclusivity",
    description: "Diaspora & underrepresented founders at the centre",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "KYC verification & community credibility",
  },
  {
    icon: Globe,
    title: "Accessibility", 
    description: "Mobile-first, low-barrier access",
  },
  {
    icon: TrendingUp,
    title: "Impact",
    description: "Trackable outcomes & measurable growth",
  },
];

const PrinciplesBar = () => {
  const { t } = useTranslation();
  
  const translatedPrinciples = [
    {
      icon: Users,
      title: t('principles.inclusivity.title'),
      description: t('principles.inclusivity.description'),
    },
    {
      icon: Shield,
      title: t('principles.trust.title'),
      description: t('principles.trust.description'),
    },
    {
      icon: Globe,
      title: t('principles.accessibility.title'), 
      description: t('principles.accessibility.description'),
    },
    {
      icon: TrendingUp,
      title: t('principles.impact.title'),
      description: t('principles.impact.description'),
    },
  ];
  return (
    <section className="py-8 bg-card/50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {t('principles.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {translatedPrinciples.map((principle, index) => (
            <Card key={index} className="p-4 hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesBar;