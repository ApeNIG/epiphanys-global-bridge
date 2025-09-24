import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, FileText, Download, Copy, CheckCircle, BookOpen, Target, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FrameworkResult {
  framework: string;
  sections: Array<{
    title: string;
    content: string;
    type: 'text' | 'checklist' | 'table' | 'template';
  }>;
  framework_type: string;
  metadata: {
    estimated_completion_time: string;
    difficulty_level: string;
    key_deliverables: string[];
  };
}

const FrameworkGenerator = () => {
  const [frameworkType, setFrameworkType] = useState('business_plan');
  const [businessInfo, setBusinessInfo] = useState({
    industry: '',
    stage: '',
    target_market: '',
    objectives: ''
  });
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FrameworkResult | null>(null);
  const { toast } = useToast();

  const frameworkTypes = [
    { 
      value: 'business_plan', 
      label: 'Business Plan Framework',
      icon: FileText,
      description: 'Comprehensive business plan with financial projections'
    },
    { 
      value: 'content_strategy', 
      label: 'Content Strategy Framework',
      icon: BookOpen,
      description: 'Complete content marketing and creation strategy'
    },
    { 
      value: 'investment_proposal', 
      label: 'Investment Proposal',
      icon: TrendingUp,
      description: 'Professional investment deck and financial model'
    },
    { 
      value: 'marketing_plan', 
      label: 'Marketing Plan',
      icon: Target,
      description: 'Strategic marketing roadmap with campaigns'
    },
    { 
      value: 'team_structure', 
      label: 'Team & Operations',
      icon: Users,
      description: 'Organizational structure and operational workflows'
    }
  ];

  const handleGenerateFramework = async () => {
    if (!businessInfo.industry && !customPrompt) {
      toast({
        title: "Missing Information",
        description: "Please provide either business details or a custom description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const contextPrompt = customPrompt || 
        `Industry: ${businessInfo.industry}, Stage: ${businessInfo.stage}, Target Market: ${businessInfo.target_market}, Objectives: ${businessInfo.objectives}`;

      const { data, error } = await supabase.functions.invoke('framework-generator', {
        body: {
          framework_type: frameworkType,
          business_context: contextPrompt,
          business_info: businessInfo,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: "Framework Generated",
        description: "Your business framework has been created successfully",
      });
    } catch (error) {
      console.error('Framework generation error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to generate framework',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Framework copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadFramework = () => {
    if (!result) return;
    
    let content = result.framework + '\n\n';
    result.sections.forEach(section => {
      content += `## ${section.title}\n\n${section.content}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${frameworkType}-framework-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedFramework = frameworkTypes.find(f => f.value === frameworkType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {selectedFramework?.icon && <selectedFramework.icon className="h-5 w-5" />}
            Business Framework Generator
          </CardTitle>
          <CardDescription>
            Generate comprehensive business frameworks, plans, and strategies tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Framework Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {frameworkTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    frameworkType === type.value ? 'ring-2 ring-primary border-primary' : ''
                  }`}
                  onClick={() => setFrameworkType(type.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <type.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{type.label}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Tabs defaultValue="guided" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guided">Guided Setup</TabsTrigger>
              <TabsTrigger value="custom">Custom Description</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guided" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry/Sector</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Fintech, Healthcare, E-commerce"
                    value={businessInfo.industry}
                    onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="stage">Business Stage</Label>
                  <Select value={businessInfo.stage} onValueChange={(value) => setBusinessInfo({...businessInfo, stage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea Stage</SelectItem>
                      <SelectItem value="startup">Early Startup</SelectItem>
                      <SelectItem value="growth">Growth Stage</SelectItem>
                      <SelectItem value="established">Established Business</SelectItem>
                      <SelectItem value="expansion">Expansion/Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="target_market">Target Market</Label>
                <Input
                  id="target_market"
                  placeholder="Describe your target customers and market"
                  value={businessInfo.target_market}
                  onChange={(e) => setBusinessInfo({...businessInfo, target_market: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="objectives">Key Objectives</Label>
                <Textarea
                  id="objectives"
                  placeholder="What are your main business goals and objectives?"
                  value={businessInfo.objectives}
                  onChange={(e) => setBusinessInfo({...businessInfo, objectives: e.target.value})}
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="custom_prompt">Custom Framework Description</Label>
                <Textarea
                  id="custom_prompt"
                  placeholder="Describe exactly what kind of framework you need, including specific requirements, industry context, and desired outcomes..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={6}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            onClick={handleGenerateFramework}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Framework...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Generate {selectedFramework?.label}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Framework</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(result.framework)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadFramework}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{result.framework_type}</Badge>
                <Badge variant="outline">{result.metadata.difficulty_level}</Badge>
                <Badge variant="outline">Est. {result.metadata.estimated_completion_time}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <pre className="whitespace-pre-wrap text-sm">{result.framework}</pre>
              </div>
              
              {result.metadata.key_deliverables.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Deliverables:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.metadata.key_deliverables.map((deliverable, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{deliverable}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {result.sections.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Framework Sections</CardTitle>
                <CardDescription>Detailed breakdown of each section in your framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {result.sections.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{section.title}</h4>
                        <Badge variant="outline">{section.type}</Badge>
                      </div>
                      <div className="bg-muted/50 p-3 rounded">
                        <pre className="whitespace-pre-wrap text-sm">{section.content}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default FrameworkGenerator;