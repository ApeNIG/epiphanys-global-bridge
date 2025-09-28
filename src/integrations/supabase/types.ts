export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          business_model: string | null
          created_at: string
          id: string
          legal_structure: string | null
          location: string | null
          name: string
          sector: string | null
          stage: string | null
          updated_at: string
          user_id: string
          website: string | null
          year_founded: number | null
        }
        Insert: {
          business_model?: string | null
          created_at?: string
          id?: string
          legal_structure?: string | null
          location?: string | null
          name: string
          sector?: string | null
          stage?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
          year_founded?: number | null
        }
        Update: {
          business_model?: string | null
          created_at?: string
          id?: string
          legal_structure?: string | null
          location?: string | null
          name?: string
          sector?: string | null
          stage?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
          year_founded?: number | null
        }
        Relationships: []
      }
      company_funding: {
        Row: {
          company_id: string
          created_at: string
          current_funding_goal: string | null
          funding_type: string | null
          id: string
          previous_funding: string | null
          updated_at: string
          use_of_funds: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          current_funding_goal?: string | null
          funding_type?: string | null
          id?: string
          previous_funding?: string | null
          updated_at?: string
          use_of_funds?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          current_funding_goal?: string | null
          funding_type?: string | null
          id?: string
          previous_funding?: string | null
          updated_at?: string
          use_of_funds?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_funding_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_impact: {
        Row: {
          company_id: string
          created_at: string
          diversity_inclusion: string | null
          esg_alignment: string | null
          id: string
          mission_driven: boolean | null
          sdg_alignment: string[] | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          diversity_inclusion?: string | null
          esg_alignment?: string | null
          id?: string
          mission_driven?: boolean | null
          sdg_alignment?: string[] | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          diversity_inclusion?: string | null
          esg_alignment?: string | null
          id?: string
          mission_driven?: boolean | null
          sdg_alignment?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_impact_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_market: {
        Row: {
          company_id: string
          created_at: string
          current_markets: string[] | null
          desired_markets: string[] | null
          id: string
          problem_statement: string | null
          target_customers: string | null
          updated_at: string
          usp: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          current_markets?: string[] | null
          desired_markets?: string[] | null
          id?: string
          problem_statement?: string | null
          target_customers?: string | null
          updated_at?: string
          usp?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          current_markets?: string[] | null
          desired_markets?: string[] | null
          id?: string
          problem_statement?: string | null
          target_customers?: string | null
          updated_at?: string
          usp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_market_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_strategic_fit: {
        Row: {
          company_id: string
          created_at: string
          id: string
          investor_type: string[] | null
          partnership_interest: string | null
          preferred_investor_location: string[] | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          investor_type?: string[] | null
          partnership_interest?: string | null
          preferred_investor_location?: string[] | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          investor_type?: string[] | null
          partnership_interest?: string | null
          preferred_investor_location?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_strategic_fit_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_team: {
        Row: {
          advisors: string[] | null
          company_id: string
          created_at: string
          founder_name: string | null
          id: string
          role: string | null
          team_size: number | null
          updated_at: string
        }
        Insert: {
          advisors?: string[] | null
          company_id: string
          created_at?: string
          founder_name?: string | null
          id?: string
          role?: string | null
          team_size?: number | null
          updated_at?: string
        }
        Update: {
          advisors?: string[] | null
          company_id?: string
          created_at?: string
          founder_name?: string | null
          id?: string
          role?: string | null
          team_size?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_team_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_traction: {
        Row: {
          awards: string[] | null
          company_id: string
          created_at: string
          customers: number | null
          id: string
          key_metrics: Json | null
          revenue_model: string | null
          revenue_range: string | null
          updated_at: string
        }
        Insert: {
          awards?: string[] | null
          company_id: string
          created_at?: string
          customers?: number | null
          id?: string
          key_metrics?: Json | null
          revenue_model?: string | null
          revenue_range?: string | null
          updated_at?: string
        }
        Update: {
          awards?: string[] | null
          company_id?: string
          created_at?: string
          customers?: number | null
          id?: string
          key_metrics?: Json | null
          revenue_model?: string | null
          revenue_range?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_traction_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          receiver_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      connections: {
        Row: {
          connected_at: string
          connection_request_id: string | null
          created_at: string
          id: string
          updated_at: string
          user_id_1: string
          user_id_2: string
        }
        Insert: {
          connected_at?: string
          connection_request_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id_1: string
          user_id_2: string
        }
        Update: {
          connected_at?: string
          connection_request_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id_1?: string
          user_id_2?: string
        }
        Relationships: []
      }
      consultation_requests: {
        Row: {
          budget_range: string
          company: string
          consultation_goals: string
          created_at: string
          current_challenges: string
          email: string
          full_name: string
          hear_about_us: string | null
          id: string
          industry_focus: string
          organization_type: string
          phone: string
          position: string
          status: string
          timeframe: string
          updated_at: string
        }
        Insert: {
          budget_range: string
          company: string
          consultation_goals: string
          created_at?: string
          current_challenges: string
          email: string
          full_name: string
          hear_about_us?: string | null
          id?: string
          industry_focus: string
          organization_type: string
          phone: string
          position: string
          status?: string
          timeframe: string
          updated_at?: string
        }
        Update: {
          budget_range?: string
          company?: string
          consultation_goals?: string
          created_at?: string
          current_challenges?: string
          email?: string
          full_name?: string
          hear_about_us?: string | null
          id?: string
          industry_focus?: string
          organization_type?: string
          phone?: string
          position?: string
          status?: string
          timeframe?: string
          updated_at?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          milestones: Json | null
          priority: string
          progress: number | null
          resources: Json | null
          status: string
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          milestones?: Json | null
          priority?: string
          progress?: number | null
          resources?: Json | null
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          milestones?: Json | null
          priority?: string
          progress?: number | null
          resources?: Json | null
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          message_type: string
          receiver_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          message_type?: string
          receiver_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message_type?: string
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          business_sector: string | null
          category: string
          company_name: string
          contact_email: string | null
          created_at: string
          deadline: string | null
          description: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          location: string | null
          salary_range: string | null
          sector: string
          title: string
          updated_at: string
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          business_sector?: string | null
          category: string
          company_name: string
          contact_email?: string | null
          created_at?: string
          deadline?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          salary_range?: string | null
          sector: string
          title: string
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          business_sector?: string | null
          category?: string
          company_name?: string
          contact_email?: string | null
          created_at?: string
          deadline?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          salary_range?: string | null
          sector?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      professional_profiles: {
        Row: {
          accessibility_requirements: string | null
          availability: string | null
          certifications: string | null
          core_skills: string[] | null
          created_at: string
          current_employment_status: string | null
          diversity_background: string | null
          highest_qualification: string | null
          id: string
          industry_expertise: string[] | null
          interview_availability: string | null
          key_achievements: string | null
          languages_spoken: string[] | null
          linkedin_profile: string | null
          location_preference: string | null
          notice_period: string | null
          portfolio_website: string | null
          professional_memberships: string | null
          professional_summary: string | null
          professional_title: string | null
          references_available: boolean | null
          salary_expectation: string | null
          security_clearance: string | null
          start_date_availability: string | null
          university_institution: string | null
          updated_at: string
          user_id: string
          visa_status: string | null
          willing_to_relocate: boolean | null
          work_type_preference: string | null
          years_experience: string | null
        }
        Insert: {
          accessibility_requirements?: string | null
          availability?: string | null
          certifications?: string | null
          core_skills?: string[] | null
          created_at?: string
          current_employment_status?: string | null
          diversity_background?: string | null
          highest_qualification?: string | null
          id?: string
          industry_expertise?: string[] | null
          interview_availability?: string | null
          key_achievements?: string | null
          languages_spoken?: string[] | null
          linkedin_profile?: string | null
          location_preference?: string | null
          notice_period?: string | null
          portfolio_website?: string | null
          professional_memberships?: string | null
          professional_summary?: string | null
          professional_title?: string | null
          references_available?: boolean | null
          salary_expectation?: string | null
          security_clearance?: string | null
          start_date_availability?: string | null
          university_institution?: string | null
          updated_at?: string
          user_id: string
          visa_status?: string | null
          willing_to_relocate?: boolean | null
          work_type_preference?: string | null
          years_experience?: string | null
        }
        Update: {
          accessibility_requirements?: string | null
          availability?: string | null
          certifications?: string | null
          core_skills?: string[] | null
          created_at?: string
          current_employment_status?: string | null
          diversity_background?: string | null
          highest_qualification?: string | null
          id?: string
          industry_expertise?: string[] | null
          interview_availability?: string | null
          key_achievements?: string | null
          languages_spoken?: string[] | null
          linkedin_profile?: string | null
          location_preference?: string | null
          notice_period?: string | null
          portfolio_website?: string | null
          professional_memberships?: string | null
          professional_summary?: string | null
          professional_title?: string | null
          references_available?: boolean | null
          salary_expectation?: string | null
          security_clearance?: string | null
          start_date_availability?: string | null
          university_institution?: string | null
          updated_at?: string
          user_id?: string
          visa_status?: string | null
          willing_to_relocate?: boolean | null
          work_type_preference?: string | null
          years_experience?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          business_name: string | null
          business_sector: string | null
          company_size: string | null
          created_at: string | null
          full_name: string | null
          funding_raised: string | null
          id: string
          interests: string[] | null
          investment_stage: string | null
          location: string | null
          profile_image_url: string | null
          updated_at: string | null
          user_category: string | null
          username: string | null
          website: string | null
          years_of_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          business_name?: string | null
          business_sector?: string | null
          company_size?: string | null
          created_at?: string | null
          full_name?: string | null
          funding_raised?: string | null
          id: string
          interests?: string[] | null
          investment_stage?: string | null
          location?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_category?: string | null
          username?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          business_name?: string | null
          business_sector?: string | null
          company_size?: string | null
          created_at?: string | null
          full_name?: string | null
          funding_raised?: string | null
          id?: string
          interests?: string[] | null
          investment_stage?: string | null
          location?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_category?: string | null
          username?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_staff: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
