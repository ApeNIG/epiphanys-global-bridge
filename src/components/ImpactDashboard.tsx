import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Briefcase, GraduationCap, DollarSign, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const impactMetrics = [
  {
    icon: DollarSign,
    title: "Funding Raised",
    value: "£12.5M",
    change: "+23%",
    description: "by diaspora startups this quarter",
    trend: "up"
  },
  {
    icon: Briefcase,
    title: "Jobs Created",
    value: "2,847",
    change: "+18%", 
    description: "new employment opportunities",
    trend: "up"
  },
  {
    icon: GraduationCap,
    title: "Skills Gained",
    value: "8,392",
    change: "+31%",
    description: "certifications & training completed",
    trend: "up"
  },
  {
    icon: Users,
    title: "Active Communities",
    value: "156",
    change: "+12%",
    description: "diaspora networks engaged",
    trend: "up"
  },
  {
    icon: MapPin,
    title: "Global Reach",
    value: "47",
    change: "+5",
    description: "countries connected",
    trend: "up"
  },
  {
    icon: TrendingUp,
    title: "Success Rate",
    value: "78%",
    change: "+4%",
    description: "opportunity conversion rate",
    trend: "up"
  }
];

const ImpactDashboard = () => {
  return (
    <section 
      className="py-16 relative bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url('https://media.licdn.com/dms/image/v2/D4E22AQGpRqJTZ5XNbw/feedshare-shrink_2048_1536/B4EZmq05PcGcAw-/0/1759507660171?e=1766016000&v=beta&t=0r8eAwlCl9zg1WFlQrpxC5oLi8w0zfxbHfZMSii5b28')` 
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal animation="fade">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              Real-Time Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Measuring Our 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Collective Impact
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature produces trackable outcomes. See how our community is driving 
              economic empowerment and inclusive growth globally.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactMetrics.map((metric, index) => (
            <ScrollReveal key={index} animation="scale" delay={index * 75}>
              <Card className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300 bg-card/60 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <metric.icon className="w-8 h-8 text-primary" />
                    <Badge 
                      variant="secondary" 
                      className={`${metric.trend === 'up' ? 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950/30 dark:text-green-400' : ''}`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </CardContent>
                
                {/* Gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade" delay={450}>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Data updated in real-time • Last refresh: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ImpactDashboard;
