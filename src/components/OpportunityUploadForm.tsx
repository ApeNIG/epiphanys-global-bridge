import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface OpportunityFormData {
  title: string;
  description: string;
  category: string;
  sector: string;
  location: string;
  company_name: string;
  contact_email: string;
  website_url: string;
  salary_range: string;
  deadline: string;
}

interface OpportunityUploadFormProps {
  onOpportunityCreated?: () => void;
}

const categories = [
  'Business',
  'Career', 
  'Investment',
  'Funding',
  'Grant',
  'Partnership',
  'Collaboration'
];

const sectors = [
  'Technology',
  'Healthcare', 
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Energy',
  'Agriculture',
  'Non-Profit',
  'Government',
  'Other'
];

const valueRanges = [
  'Under £1,000',
  '£1,000 - £5,000',
  '£5,000 - £10,000',
  '£10,000 - £25,000',
  '£25,000 - £50,000',
  '£50,000 - £100,000',
  '£100,000 - £250,000',
  '£250,000 - £500,000',
  '£500,000 - £1,000,000',
  'Over £1,000,000',
  'Not specified'
];

export const OpportunityUploadForm = ({ onOpportunityCreated }: OpportunityUploadFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<OpportunityFormData>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      sector: '',
      location: '',
      company_name: '',
      contact_email: '',
      website_url: '',
      salary_range: '',
      deadline: ''
    }
  });

  const onSubmit = async (data: OpportunityFormData) => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to upload opportunities.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('opportunities')
        .insert({
          ...data,
          user_id: user.id,
          is_active: true,
          is_featured: false
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your opportunity has been uploaded successfully.",
      });
      
      form.reset();
      
      // Trigger refresh of opportunities list
      if (onOpportunityCreated) {
        onOpportunityCreated();
      }
    } catch (error) {
      console.error('Error uploading opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to upload opportunity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload New Opportunity
        </CardTitle>
        <CardDescription>
          Share grants, funding opportunities, or other business opportunities with the community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunity Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Small Business Innovation Grant 2024" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the opportunity, requirements, and benefits..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sector"
                rules={{ required: "Sector is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company_name"
                rules={{ required: "Organisation name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organisation/Company</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Organisation offering the opportunity" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., London, UK or Remote" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="contact@organisation.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value/Amount</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select value range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {valueRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Opportunity
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};