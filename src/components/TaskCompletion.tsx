import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Download, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TaskResult {
  completion: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  task_type: string;
}

const TaskCompletion = () => {
  const [prompt, setPrompt] = useState('');
  const [taskType, setTaskType] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TaskResult | null>(null);
  const { toast } = useToast();

  const taskTypes = [
    { value: 'general', label: 'General Task' },
    { value: 'business_plan', label: 'Business Plan' },
    { value: 'content_creation', label: 'Content Creation' },
    { value: 'data_analysis', label: 'Data Analysis' },
    { value: 'proposal_writing', label: 'Proposal Writing' },
    { value: 'market_research', label: 'Market Research' },
  ];

  const handleTaskCompletion = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('openai-task-completion', {
        body: {
          prompt: prompt.trim(),
          task_type: taskType,
          max_tokens: 2000,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: "Task Completed",
        description: "Your task has been completed successfully",
      });
    } catch (error) {
      console.error('Task completion error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to complete task',
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
        description: "Result copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadResult = () => {
    if (!result) return;
    
    const blob = new Blob([result.completion], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-result-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Task Completion
          </CardTitle>
          <CardDescription>
            Use OpenAI to complete various business and professional tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Task Type</label>
            <Select value={taskType} onValueChange={setTaskType}>
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Task Description</label>
            <Textarea
              placeholder="Describe the task you want AI to complete..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleTaskCompletion}
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Task'
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Task Result</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.completion)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadResult}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{result.task_type}</Badge>
              {result.usage && (
                <Badge variant="outline">
                  {result.usage.total_tokens} tokens
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{result.completion}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskCompletion;