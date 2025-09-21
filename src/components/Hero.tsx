import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const Hero = () => {
  const { t } = useTranslation();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Geometric decorative elements */}
      <div className="flow-geometric-shape w-32 h-32 rotate-45 top-20 left-10 opacity-30" />
      <div className="flow-geometric-shape w-24 h-24 rotate-12 top-40 right-20 opacity-20" />
      <div className="flow-geometric-shape w-40 h-40 -rotate-12 bottom-32 left-20 opacity-15" />
      <div className="flow-geometric-shape w-28 h-28 rotate-45 bottom-20 right-32 opacity-25" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <span className="block text-flow-dark mb-4">
          </span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent">GROW  SCALE  BOOST</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-flow-grey max-w-3xl mx-auto leading-relaxed font-medium">{t('hero.subtitle')}</p>
          
          {/* CTA Button */}
          <div className="pt-8">
            <Button asChild variant="hero" size="xl" className="text-lg px-12 py-6 rounded-xl font-bold shadow-glow">
              <Link to="/auth">{t('hero.cta')}</Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-flow-teal mb-2">250M+</div>
              <div className="text-flow-grey font-medium">{t('hero.stats.population').replace('60M+ UK', '250M+')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-flow-purple mb-2">£685B</div>
              <div className="text-flow-grey font-medium">{t('hero.stats.impact').replace('£150B+', '£685B')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-flow-teal mb-2">190+</div>
              <div className="text-flow-grey font-medium">{t('hero.stats.network').replace('200+', '190+')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;