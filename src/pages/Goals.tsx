import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Target, 
  Calendar as CalendarIcon, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Star,
  BarChart3,
  BookOpen,
  Users,
  Lightbulb
} from "lucide-react";
import { useTranslation } from "react-i18next";

const goalSchema = z.object({
  title: z.string().min(3, "Goal title must be at least 3 characters"),
  description: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
  target_date: z.date({
    required_error: "Please select a target date",
  }),
});

type GoalForm = z.infer<typeof goalSchema>;

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  target_date: string;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;
}

const goalCategories = [
  { value: "career", label: "Career Development", icon: TrendingUp },
  { value: "business", label: "Business Growth", icon: BarChart3 },
  { value: "education", label: "Education & Skills", icon: BookOpen },
  { value: "networking", label: "Networking", icon: Users },
  { value: "personal", label: "Personal Development", icon: Lightbulb },
];

const priorities = [
  { value: "low", label: "Low Priority", color: "bg-blue-500" },
  { value: "medium", label: "Medium Priority", color: "bg-yellow-500" },
  { value: "high", label: "High Priority", color: "bg-red-500" },
];

const supportResources = [
  {
    category: "career",
    resources: [
      "Professional mentorship programs",
      "CV review and optimization",
      "Interview preparation sessions",
      "LinkedIn profile enhancement",
      "Skill assessment and development plans"
    ]
  },
  {
    category: "business",
    resources: [
      "Business plan development",
      "Funding and investment guidance", 
      "Market research support",
      "Networking with investors",
      "Legal and compliance advice"
    ]
  },
  {
    category: "education",
    resources: [
      "Course recommendations",
      "Study group connections",
      "Certification pathways",
      "Online learning platforms",
      "Academic scholarship opportunities"
    ]
  },
  {
    category: "networking",
    resources: [
      "Industry event invitations",
      "Professional association memberships",
      "Diaspora community connections",
      "Virtual networking sessions",
      "Mentorship matching programs"
    ]
  },
  {
    category: "personal",
    resources: [
      "Personal development workshops",
      "Life coaching sessions",
      "Wellness and mindfulness programs",
      "Cultural identity exploration",
      "Work-life balance strategies"
    ]
  }
];

const Goals = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const form = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast({
        title: "Error",
        description: "Failed to load goals. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: GoalForm) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description || null,
          category: data.category,
          priority: data.priority,
          target_date: format(data.target_date, 'yyyy-MM-dd'),
          status: 'active',
          progress: 0
        });

      if (error) throw error;

      toast({
        title: "Goal Created!",
        description: "Your goal has been successfully created.",
      });

      form.reset();
      setShowForm(false);
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProgress = async (goalId: string, newProgress: number) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ 
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : 'active'
        })
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Progress Updated!",
        description: `Goal progress updated to ${newProgress}%.`,
      });

      fetchGoals();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = goalCategories.find(c => c.value === category);
    return cat ? cat.icon : Target;
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md mx-auto text-center p-8">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to access your goals and start your journey.
            </p>
            <Button asChild>
              <a href="/auth">Sign In</a>
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your goals...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Your Goals & Aspirations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Set meaningful goals, track your progress, and receive personalized support 
              to achieve your career and personal aspirations.
            </p>
            <Button onClick={() => setShowForm(!showForm)} size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              {showForm ? 'Cancel' : 'Set New Goal'}
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Goal Creation Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Set a New Goal
              </CardTitle>
              <CardDescription>
                Define your objective, timeline, and receive tailored support to achieve it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goal Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Secure a senior developer role" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {goalCategories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your goal in more detail..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {priorities.map((priority) => (
                                <SelectItem key={priority.value} value={priority.value}>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                                    {priority.label}
                                  </div>
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
                      name="target_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Target Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a target date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Goal"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Goals</h2>
              <Badge variant="outline" className="text-sm">
                {goals.length} {goals.length === 1 ? 'Goal' : 'Goals'}
              </Badge>
            </div>

            {goals.length === 0 ? (
              <Card className="text-center py-12">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Goals Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start your journey by setting your first goal.
                </p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Set Your First Goal
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => {
                  const CategoryIcon = getCategoryIcon(goal.category);
                  const daysUntil = getDaysUntilTarget(goal.target_date);
                  const priorityColor = priorities.find(p => p.value === goal.priority)?.color || 'bg-gray-500';

                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <CategoryIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-1">{goal.title}</CardTitle>
                              {goal.description && (
                                <CardDescription className="line-clamp-2">
                                  {goal.description}
                                </CardDescription>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${priorityColor}`} />
                            <Badge variant={goal.status === 'completed' ? 'default' : 'secondary'}>
                              {goal.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Progress */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>

                          {/* Timeline */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>Target: {format(new Date(goal.target_date), 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {daysUntil > 0 ? `${daysUntil} days left` : 
                                 daysUntil === 0 ? 'Due today' : 
                                 `${Math.abs(daysUntil)} days overdue`}
                              </span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateProgress(goal.id, Math.min(goal.progress + 25, 100))}
                              disabled={goal.progress >= 100}
                            >
                              +25% Progress
                            </Button>
                            {goal.progress < 100 && (
                              <Button 
                                size="sm" 
                                onClick={() => updateProgress(goal.id, 100)}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Support Resources Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Goal Support Resources
                </CardTitle>
                <CardDescription>
                  Get personalized support based on your goal categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportResources.map((resource) => {
                  const hasGoalsInCategory = goals.some(goal => goal.category === resource.category);
                  if (!hasGoalsInCategory) return null;

                  const categoryData = goalCategories.find(c => c.value === resource.category);
                  const CategoryIcon = categoryData?.icon || Target;

                  return (
                    <div key={resource.category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold">{categoryData?.label}</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {resource.resources.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Goal Achievement Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Break large goals into smaller, actionable milestones</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Review and update your progress weekly</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Connect with others who share similar goals</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Celebrate small wins along the way</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Goals;