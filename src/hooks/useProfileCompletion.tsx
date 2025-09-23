import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfileData {
  profile_image_url?: string;
  business_name?: string;
  user_category?: string;
  business_sector?: string;
  investment_stage?: string;
  company_size?: string;
  years_of_experience?: number;
  location?: string;
  interests?: string[];
  bio?: string;
}

interface ProfileField {
  key: keyof ProfileData;
  label: string;
  weight: number;
}

const PROFILE_FIELDS: ProfileField[] = [
  { key: 'profile_image_url', label: 'Profile Picture', weight: 10 },
  { key: 'business_name', label: 'Business/Organisation Name', weight: 15 },
  { key: 'user_category', label: 'Organisation Type', weight: 10 },
  { key: 'business_sector', label: 'Business Sector', weight: 10 },
  { key: 'investment_stage', label: 'Investment Stage', weight: 10 },
  { key: 'company_size', label: 'Company Size', weight: 10 },
  { key: 'years_of_experience', label: 'Years of Experience', weight: 10 },
  { key: 'location', label: 'Location', weight: 10 },
  { key: 'interests', label: 'Areas of Interest', weight: 10 },
  { key: 'bio', label: 'Bio/Description', weight: 15 },
];

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
      return;
    }

    if (data) {
      setProfileData({
        profile_image_url: data.profile_image_url || '',
        business_name: data.business_name || '',
        user_category: data.user_category || '',
        business_sector: data.business_sector || '',
        investment_stage: data.investment_stage || '',
        company_size: data.company_size || '',
        years_of_experience: data.years_of_experience || 0,
        location: data.location || '',
        interests: data.interests || [],
        bio: data.bio || '',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  // Set up real-time subscription for profile changes
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        () => {
          fetchProfile();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const calculateCompletion = () => {
    let completedWeight = 0;
    const totalWeight = PROFILE_FIELDS.reduce((sum, field) => sum + field.weight, 0);

    const missingFields: ProfileField[] = [];

    PROFILE_FIELDS.forEach((field) => {
      const value = profileData[field.key];
      let isCompleted = false;

      switch (field.key) {
        case 'profile_image_url':
          isCompleted = Boolean(value && typeof value === 'string' && value.trim() !== '');
          break;
        case 'years_of_experience':
          isCompleted = Boolean(value && Number(value) > 0);
          break;
        case 'interests':
          isCompleted = Boolean(Array.isArray(value) && value.length > 0);
          break;
        default:
          isCompleted = Boolean(value && typeof value === 'string' && value.trim() !== '');
          break;
      }

      if (isCompleted) {
        completedWeight += field.weight;
      } else {
        missingFields.push(field);
      }
    });

    const percentage = Math.round((completedWeight / totalWeight) * 100);
    
    return {
      percentage,
      missingFields,
      profileData,
      loading,
      refetch: fetchProfile,
    };
  };

  return calculateCompletion();
};