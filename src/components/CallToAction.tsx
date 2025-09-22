import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CallToAction = () => {
  const { t } = useTranslation();
  
  const benefits = [
    t('cta.benefits.access'),
    t('cta.benefits.connect'),
    t('cta.benefits.receive'),
    t('cta.benefits.join')
  ];
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title.part1')}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}{t('cta.title.part2')}
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-foreground justify-center md:justify-start">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Email Signup */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-semibold">{t('cta.earlyAccess')}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={t('cta.emailPlaceholder')} 
                className="flex-1"
              />
              <Button variant="hero" className="group">
                {t('cta.joinWaitlist')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              {t('cta.noSpam')}
            </p>
          </div>
          
          {/* Alternative CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation">
              <Button variant="glass" size="lg">
                {t('cta.bookDemo')}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="lg">
                {t('cta.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;