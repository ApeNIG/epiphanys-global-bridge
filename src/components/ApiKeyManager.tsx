import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Server, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ApiKeyManager = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Secure API Key Management
          </CardTitle>
          <CardDescription>
            Your OpenAI API keys are managed securely on the server side. No action required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Server-Side Security Enabled</AlertTitle>
            <AlertDescription className="text-green-700">
              All API keys are stored as encrypted secrets on the server. Your AI features work automatically without exposing sensitive credentials to the browser.
            </AlertDescription>
          </Alert>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Encrypted Storage</h3>
                <p className="text-sm text-muted-foreground">
                  API keys are stored as Supabase secrets, encrypted at rest and never exposed to client-side code.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Server className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Server-Side Processing</h3>
                <p className="text-sm text-muted-foreground">
                  All OpenAI API calls are made through secure edge functions, preventing unauthorized access and key exposure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Protection Against Threats</h3>
                <p className="text-sm text-muted-foreground">
                  Your keys are protected from XSS attacks, malicious browser extensions, and unauthorized access.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Badge variant="secondary">Administrator</Badge>
              Configuration
            </h4>
            <p className="text-xs text-muted-foreground">
              API keys are configured by system administrators through the Supabase dashboard. If you need to update or configure API keys, please contact your platform administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyManager;
