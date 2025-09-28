import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff, Users, Lock } from 'lucide-react';
import { PRIVACY_VISIBILITY_OPTIONS, getDefaultPrivacySettings } from '@/utils/dataPrivacy';

interface PrivacySettingsData {
  profile_visibility: string;
  contact_info_visible: boolean;
  professional_details_visible: boolean;
}

export const PrivacySettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<PrivacySettingsData>(getDefaultPrivacySettings());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPrivacySettings();
    }
  }, [user]);

  const fetchPrivacySettings = async () => {
    try {
      const { data, error } = await supabase
        .from('privacy_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error is okay
        throw error;
      }

      if (data) {
        setSettings({
          profile_visibility: data.profile_visibility,
          contact_info_visible: data.contact_info_visible,
          professional_details_visible: data.professional_details_visible
        });
      }
    } catch (error: any) {
      console.error('Error fetching privacy settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load privacy settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const savePrivacySettings = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('privacy_settings')
        .upsert({
          user_id: user.id,
          ...settings
        });

      if (error) throw error;

      toast({
        title: 'Privacy settings updated',
        description: 'Your privacy preferences have been saved successfully'
      });
    } catch (error: any) {
      console.error('Error saving privacy settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save privacy settings',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof PrivacySettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy Settings
        </CardTitle>
        <CardDescription>
          Control how your information is shared with other users on the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Visibility */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Profile Visibility</Label>
          <Select 
            value={settings.profile_visibility} 
            onValueChange={(value) => updateSetting('profile_visibility', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRIVACY_VISIBILITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.value === 'public' && <Eye className="w-4 h-4" />}
                    {option.value === 'limited' && <EyeOff className="w-4 h-4" />}
                    {option.value === 'private' && <Lock className="w-4 h-4" />}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Info Visibility */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-semibold">Contact Information</Label>
            <p className="text-sm text-muted-foreground">
              Allow other users to see your email and phone number
            </p>
          </div>
          <Switch
            checked={settings.contact_info_visible}
            onCheckedChange={(checked) => updateSetting('contact_info_visible', checked)}
          />
        </div>

        {/* Professional Details Visibility */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-semibold">Professional Details</Label>
            <p className="text-sm text-muted-foreground">
              Show salary expectations, visa status, and other sensitive professional information
            </p>
          </div>
          <Switch
            checked={settings.professional_details_visible}
            onCheckedChange={(checked) => updateSetting('professional_details_visible', checked)}
          />
        </div>

        {/* Privacy Notice */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-sm">Privacy Notice</p>
              <p className="text-sm text-muted-foreground">
                Your privacy settings control what information other users can see about you. 
                Admin users may still access certain information for platform security and moderation purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={savePrivacySettings} 
          disabled={saving}
          className="w-full"
        >
          {saving ? 'Saving...' : 'Save Privacy Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};