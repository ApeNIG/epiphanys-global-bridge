import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, TrendingUp, Globe } from "lucide-react";

const categories = [
  {
    title: "Business Opportunities",
    description: "Access curated business opportunities from public and private sectors. Find partnerships, contracts, and growth initiatives.",
    icon: Briefcase,
    count: "1,250+",
    color: "from-primary to-blue-600"
  },
  {
    title: "Career Development",
    description: "Discover career opportunities that value cultural diversity and global perspectives. Build your professional network.",
    icon: Users,
    count: "850+",
    color: "from-purple-500 to-purple-700"
  },
  {
    title: "Investment Platforms",
    description: "Connect with investment opportunities and funding sources that understand diaspora markets and cultural capital.",
    icon: TrendingUp,
    count: "420+",
    color: "from-accent to-orange-500"
  },
  {
    title: "Global Collaboration",
    description: "Partner with organizations worldwide. Leverage diaspora networks for international business and cultural exchange.",
    icon: Globe,
    count: "680+",
    color: "from-green-500 to-emerald-600"
  }
];

const OpportunityCategories = () => {
  return (
    <section id="opportunities" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Opportunities
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore curated opportunities designed to unlock your potential and connect you with global networks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30"
              >
                <div className="p-6">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                      <IconComponent 
                        className="w-10 h-10 text-white"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                      {category.count}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                  >
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OpportunityCategories;