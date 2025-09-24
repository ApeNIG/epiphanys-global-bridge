import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCompletion from '@/components/TaskCompletion';
import FrameworkGenerator from '@/components/FrameworkGenerator';
import ApiKeyManager from '@/components/ApiKeyManager';
import { Brain, Settings, Sparkles, FileText } from 'lucide-react';

const AITasks = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Task Completion
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate comprehensive business frameworks, complete tasks, and create professional content with AI
          </p>
        </div>

        <Tabs defaultValue="frameworks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="frameworks" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Framework Generator
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Task Completion
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              API Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frameworks">
            <FrameworkGenerator />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskCompletion />
          </TabsContent>

          <TabsContent value="settings">
            <ApiKeyManager />
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Example Use Cases</CardTitle>
            <CardDescription>
              Here are some ways you can use AI task completion for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Business Frameworks</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Generate complete business plans</li>
                  <li>• Create investment proposals</li>
                  <li>• Develop marketing strategies</li>
                  <li>• Build operational frameworks</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Content & Communication</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Write professional proposals</li>
                  <li>• Create marketing content</li>
                  <li>• Draft investor pitches</li>
                  <li>• Generate social media posts</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Analysis & Research</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Analyze customer data</li>
                  <li>• Research market trends</li>
                  <li>• Evaluate business metrics</li>
                  <li>• Generate insights from data</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Planning & Operations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create project timelines</li>
                  <li>• Generate task lists</li>
                  <li>• Plan resource allocation</li>
                  <li>• Develop process workflows</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITasks;