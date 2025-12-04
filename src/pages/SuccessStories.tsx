import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Quote, TrendingUp, Users, Globe, Award, MapPin, Calendar, Building2 } from "lucide-react";
import successStory1 from "@/assets/success-story-1.jpg";
import successStory2 from "@/assets/success-story-2.jpg";
import successStory3 from "@/assets/success-story-3.jpg";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Amara Okafor",
      title: "Founder & CEO, DiasporaPay",
      image: successStory1,
      origin: "Nigeria",
      destination: "London, UK",
      industry: "Fintech",
      year: "2023",
      fundingRaised: "£2.5M",
      employeesCreated: 45,
      quote: "Epiphiny Flow connected me with investors who truly understood the diaspora remittance market. Within 6 months, I had closed my Series A and expanded to three new markets.",
      story: `Amara arrived in the UK in 2015 with a vision to transform how African diaspora communities send money home. After years of experiencing the frustrations of high fees and slow transfers, she decided to build a solution.

Through Epiphiny Flow's investment network, Amara connected with angel investors from the Nigerian and Ghanaian diaspora who immediately understood the pain points she was solving. The platform's matching algorithm paired her with mentors who had successfully scaled fintech startups in emerging markets.

Today, DiasporaPay processes over £50 million in remittances monthly, with transfer fees 70% lower than traditional providers. The company employs 45 people across London and Lagos, with plans to expand to Kenya and Ghana by 2025.`,
      impact: [
        "£50M+ monthly remittances processed",
        "70% lower fees than traditional providers",
        "45 jobs created across UK and Nigeria",
        "Serving 25,000+ active customers"
      ],
      tags: ["Fintech", "Series A", "Remittances", "Africa"]
    },
    {
      id: 2,
      name: "Raj Mehta",
      title: "Co-founder, EduBridge Academy",
      image: successStory2,
      origin: "India",
      destination: "Manchester, UK",
      industry: "EdTech",
      year: "2022",
      fundingRaised: "£750K",
      employeesCreated: 28,
      quote: "The mentorship I received through Epiphiny Flow was invaluable. Experienced entrepreneurs from the South Asian community guided me through every challenge of scaling an education business.",
      story: `Raj spent 15 years in the UK education sector before identifying a critical gap: second-generation South Asian students often struggled to connect their cultural heritage with their career aspirations.

Using Epiphiny Flow's community features, Raj connected with successful South Asian professionals across various industries who became volunteer mentors for his platform. The network also introduced him to grant opportunities specifically designed for diversity-focused education initiatives.

EduBridge Academy now partners with 50+ schools across Greater Manchester, providing culturally-responsive career guidance and STEM education to over 10,000 students annually. The platform has achieved a 40% improvement in university application success rates among participating students.`,
      impact: [
        "10,000+ students reached annually",
        "50+ school partnerships established",
        "40% improvement in university applications",
        "£500K in scholarship connections"
      ],
      tags: ["EdTech", "Social Enterprise", "Diversity", "STEM"]
    },
    {
      id: 3,
      name: "Dr. Fatima Hassan",
      title: "Founder, CareConnect Health",
      image: successStory3,
      origin: "Egypt",
      destination: "Birmingham, UK",
      industry: "HealthTech",
      year: "2023",
      fundingRaised: "£1.2M",
      employeesCreated: 32,
      quote: "Epiphiny Flow helped me find NHS partnership opportunities I never knew existed. The platform's government tender alerts were a game-changer for our business development.",
      story: `Dr. Fatima Hassan noticed that many patients from Middle Eastern and North African communities struggled to access healthcare services due to language barriers and cultural sensitivities. As a practicing GP with 12 years of NHS experience, she knew she could build something better.

Through Epiphiny Flow's opportunity hub, Fatima discovered a pilot programme from NHS England seeking innovative solutions for underserved communities. The platform connected her with other healthcare entrepreneurs who had successfully navigated the NHS procurement process.

CareConnect Health now provides multilingual telemedicine services to over 5,000 patients monthly, with support in Arabic, Urdu, and Bengali. The company has secured contracts with three NHS trusts and recently expanded to provide mental health services tailored to diaspora communities.`,
      impact: [
        "5,000+ patients served monthly",
        "3 NHS trust contracts secured",
        "15 languages supported",
        "85% patient satisfaction rating"
      ],
      tags: ["HealthTech", "NHS Partnership", "Telemedicine", "MENA"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cool-grey/80 via-royal-blue/5 to-emerald-green/5 dark:from-deep-navy/90 dark:via-royal-blue/20 dark:to-emerald-green/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative container mx-auto z-10">
          <Link to="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>

          <Badge className="mb-6 bg-gradient-to-r from-cool-grey to-royal-blue/10 text-deep-navy border-0 shadow-elegant px-6 py-2">
            <Award className="w-4 h-4 mr-2 text-gold-amber" />
            Real Stories, Real Impact
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Success Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Discover how diaspora entrepreneurs and professionals have transformed their visions into reality through the Epiphiny Flow community.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-green">£150M+</div>
              <div className="text-sm text-muted-foreground">Funding Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sunset-orange">5,000+</div>
              <div className="text-sm text-muted-foreground">Jobs Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-royal-blue">47</div>
              <div className="text-sm text-muted-foreground">Countries Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto space-y-16">
          {stories.map((story, index) => (
            <Card key={story.id} className="overflow-hidden border-2 hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-0">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image Side */}
                  <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full min-h-[400px] object-cover object-center scale-[0.65] origin-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                      <p className="text-white/80">{story.title}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          <MapPin className="w-3 h-3 mr-1" />
                          {story.origin} → {story.destination}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          <Building2 className="w-3 h-3 mr-1" />
                          {story.industry}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`p-8 md:p-10 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    {/* Quote */}
                    <div className="mb-8 relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                      <p className="text-lg italic text-muted-foreground pl-6 border-l-4 border-primary/30">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Story */}
                    <div className="prose prose-sm max-w-none mb-8">
                      {story.story.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Impact Metrics */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-green" />
                        Key Impact
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {story.impact.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-green mt-2" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-xl font-bold text-primary">{story.fundingRaised}</div>
                        <div className="text-xs text-muted-foreground">Funding Raised</div>
                      </div>
                      <div className="text-center p-4 bg-emerald-green/10 rounded-lg">
                        <div className="text-xl font-bold text-emerald-green">{story.employeesCreated}</div>
                        <div className="text-xs text-muted-foreground">Jobs Created</div>
                      </div>
                      <div className="text-center p-4 bg-sunset-orange/10 rounded-lg">
                        <div className="text-xl font-bold text-sunset-orange">{story.year}</div>
                        <div className="text-xs text-muted-foreground">Year Joined</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of diaspora entrepreneurs who have found their community, funding, and path to success through Epiphiny Flow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="hero" className="px-8">
                <Users className="mr-2 h-5 w-5" />
                Join the Community
              </Button>
            </Link>
            <Link to="/community">
              <Button size="lg" variant="outline" className="px-8">
                <Globe className="mr-2 h-5 w-5" />
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;
