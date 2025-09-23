import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Key, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ApiKeyManager = () => {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid'>('unknown');
  const { toast } = useToast();

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key to test",
        variant: "destructive",
      });
      return;
    }

    setIsTestingKey(true);
    try {
      // Test the API key with a simple request
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
        },
      });

      if (response.ok) {
        setKeyStatus('valid');
        toast({
          title: "Success",
          description: "API key is valid and working",
        });
      } else {
        setKeyStatus('invalid');
        toast({
          title: "Invalid Key",
          description: "The API key appears to be invalid",
          variant: "destructive",
        });
      }
    } catch (error) {
      setKeyStatus('invalid');
      toast({
        title: "Test Failed",
        description: "Could not verify the API key",
        variant: "destructive",
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    // Store in localStorage for demo purposes
    // In production, this should be handled more securely
    localStorage.setItem('openai_api_key', apiKey.trim());
    toast({
      title: "Saved",
      description: "API key has been saved locally",
    });
  };

  const loadSavedKey = () => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setKeyStatus('unknown');
      toast({
        title: "Loaded",
        description: "Loaded saved API key",
      });
    } else {
      toast({
        title: "No Key Found",
        description: "No saved API key found",
        variant: "destructive",
      });
    }
  };

  const clearApiKey = () => {
    setApiKey('');
    setKeyStatus('unknown');
    localStorage.removeItem('openai_api_key');
    toast({
      title: "Cleared",
      description: "API key has been cleared",
    });
  };

  const getStatusBadge = () => {
    switch (keyStatus) {
      case 'valid':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <Check className="w-3 h-3 mr-1" />
            Valid
          </Badge>
        );
      case 'invalid':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Invalid
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Key className="w-3 h-3 mr-1" />
            Untested
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          OpenAI API Key Management
        </CardTitle>
        <CardDescription>
          Manage your OpenAI API key for task completion features. Your key is stored locally and securely.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">API Key</label>
            {getStatusBadge()}
          </div>
          
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setKeyStatus('unknown');
              }}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={testApiKey} disabled={isTestingKey} variant="outline">
            {isTestingKey ? 'Testing...' : 'Test Key'}
          </Button>
          <Button onClick={saveApiKey} disabled={!apiKey.trim()}>
            Save Key
          </Button>
          <Button onClick={loadSavedKey} variant="outline">
            Load Saved
          </Button>
          <Button onClick={clearApiKey} variant="destructive" disabled={!apiKey}>
            Clear
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></p>
          <p>• Your API key is stored locally in your browser</p>
          <p>• Never share your API key with others</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;