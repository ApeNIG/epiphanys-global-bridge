import { useAuth } from '@/hooks/useAuth';

// Define what fields are considered sensitive and should be filtered
export const SENSITIVE_PROFILE_FIELDS = [
  'salary_expectation',
  'visa_status', 
  'security_clearance',
  'accessibility_requirements',
  'diversity_background'
];

export const SENSITIVE_PROFESSIONAL_FIELDS = [
  'salary_expectation',
  'visa_status',
  'security_clearance', 
  'notice_period',
  'interview_availability',
  'accessibility_requirements'
];

export const SENSITIVE_OPPORTUNITY_FIELDS = [
  'contact_email',
  'website_url'
];

// Filter sensitive data based on user permissions
export const filterProfileData = (profile: any, isOwnProfile: boolean, privacySettings?: any) => {
  if (isOwnProfile) {
    return profile; // User can see their own full profile
  }

  const filtered = { ...profile };
  
  // Remove sensitive fields for other users
  SENSITIVE_PROFILE_FIELDS.forEach(field => {
    if (privacySettings?.professional_details_visible !== true) {
      delete filtered[field];
    }
  });

  // Always filter out extremely sensitive info unless explicitly shared
  if (privacySettings?.contact_info_visible !== true) {
    delete filtered.email;
    delete filtered.phone;
  }

  return filtered;
};

export const filterProfessionalProfileData = (profile: any, isOwnProfile: boolean, privacySettings?: any) => {
  if (isOwnProfile) {
    return profile; // User can see their own full profile
  }

  const filtered = { ...profile };
  
  // Only show basic professional info to others
  const allowedFields = [
    'id', 'user_id', 'professional_title', 'years_experience', 
    'core_skills', 'industry_expertise', 'location_preference',
    'created_at', 'updated_at'
  ];

  // Remove sensitive professional fields
  Object.keys(filtered).forEach(key => {
    if (!allowedFields.includes(key) && privacySettings?.professional_details_visible !== true) {
      delete filtered[key];
    }
  });

  return filtered;
};

export const filterOpportunityData = (opportunity: any, isOwner: boolean) => {
  if (isOwner) {
    return opportunity; // Opportunity owner can see full details
  }

  const filtered = { ...opportunity };
  
  // Remove contact information for non-owners
  SENSITIVE_OPPORTUNITY_FIELDS.forEach(field => {
    delete filtered[field];
  });

  return filtered;
};

// Privacy settings management
export const getDefaultPrivacySettings = () => ({
  profile_visibility: 'limited',
  contact_info_visible: false,
  professional_details_visible: false
});

export const PRIVACY_VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public - Visible to everyone' },
  { value: 'limited', label: 'Limited - Only basic info visible' },
  { value: 'private', label: 'Private - Only visible to connections' }
];