import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, DollarSign, Building2, TrendingUp, Users, Clock, MapPin } from "lucide-react";

interface InvestmentExplorerProps {
  category: string;
  description: string;
  examples: string[];
}

const InvestmentExplorer: React.FC<InvestmentExplorerProps> = ({ category, description, examples }) => {
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("");

  const vcBreakdown = {
    "Pre-Seed": {
      range: "£50K - £500K",
      investors: [
        { name: "Connect Ventures", focus: "B2B SaaS, Fintech", timeline: "2-4 weeks", location: "London" },
        { name: "Passion Capital", focus: "Consumer, Enterprise", timeline: "3-6 weeks", location: "London" },
        { name: "Entrepreneur First", focus: "Deep tech, AI", timeline: "1-2 weeks", location: "London, Singapore" }
      ]
    },
    "Seed": {
      range: "£500K - £3M",
      investors: [
        { name: "Forward Partners", focus: "E-commerce, SaaS", timeline: "4-8 weeks", location: "London" },
        { name: "Seedcamp", focus: "Enterprise, Consumer", timeline: "6-10 weeks", location: "London" },
        { name: "Episode 1 Ventures", focus: "Deep tech, Climate", timeline: "8-12 weeks", location: "London" }
      ]
    },
    "Series A": {
      range: "£3M - £15M",
      investors: [
        { name: "Index Ventures", focus: "Fintech, Enterprise", timeline: "8-16 weeks", location: "London, Geneva" },
        { name: "Balderton Capital", focus: "B2B, Consumer", timeline: "10-14 weeks", location: "London" },
        { name: "Notion Capital", focus: "B2B SaaS, Cloud", timeline: "12-16 weeks", location: "London" }
      ]
    },
    "Series B+": {
      range: "£15M - £100M+",
      investors: [
        { name: "Accel Partners", focus: "Scale-ups, Global expansion", timeline: "12-20 weeks", location: "London, Palo Alto" },
        { name: "Atomico", focus: "European tech, Global scaling", timeline: "16-24 weeks", location: "London" },
        { name: "General Atlantic", focus: "Growth equity, Tech", timeline: "20-32 weeks", location: "London, New York" }
      ]
    }
  };

  const fundingStages = Object.keys(vcBreakdown);
  const amountRanges = ["£50K - £250K", "£250K - £1M", "£1M - £5M", "£5M - £15M", "£15M - £50M", "£50M+"];
  const sectors = ["Fintech", "B2B SaaS", "E-commerce", "Deep Tech", "Healthcare", "Climate Tech", "Consumer", "Enterprise"];

  const getFilteredInvestors = () => {
    if (category !== "Venture Capital" || !selectedStage) return [];
    return vcBreakdown[selectedStage as keyof typeof vcBreakdown]?.investors || [];
  };

  const renderVCExplorer = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Funding Stage</label>
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {fundingStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Funding Amount</label>
          <Select value={selectedAmount} onValueChange={setSelectedAmount}>
            <SelectTrigger>
              <SelectValue placeholder="Select amount" />
            </SelectTrigger>
            <SelectContent>
              {amountRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Sector Focus</label>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedStage && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">{selectedStage} Stage Overview</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Typical Range: <span className="font-medium">{vcBreakdown[selectedStage as keyof typeof vcBreakdown]?.range}</span>
            </p>
          </div>

          <div className="grid gap-4">
            {getFilteredInvestors().map((investor, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{investor.name}</CardTitle>
                      <CardDescription className="mt-1">{investor.focus}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {selectedStage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{investor.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{investor.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderGenericExplorer = () => (
    <div className="space-y-4">
      <div className="grid gap-3">
        {examples.map((example, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">{example}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="w-full">
        Get Connected
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full group-hover:bg-gradient-to-r group-hover:from-emerald-50 group-hover:to-violet-50">
          Explore Options
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{category} Options</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        {category === "Venture Capital" ? renderVCExplorer() : renderGenericExplorer()}
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentExplorer;