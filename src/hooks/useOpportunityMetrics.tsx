import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  sector: string;
  business_sector: string | null;
  location: string;
  company_name: string;
  contact_email: string;
  website_url: string;
  salary_range: string;
  deadline: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface OpportunityMetrics {
  totalOpportunities: number;
  activeOpportunities: number;
  featuredOpportunities: number;
  expiringSoon: number;
  categoriesBreakdown: { [key: string]: number };
  sectorsBreakdown: { [key: string]: number };
  valueRangesBreakdown: { [key: string]: number };
  recentActivity: Array<{
    id: string;
    title: string;
    action: string;
    date: string;
  }>;
  opportunities: Opportunity[];
}

export const useOpportunityMetrics = (refreshKey?: number) => {
  const [metrics, setMetrics] = useState<OpportunityMetrics>({
    totalOpportunities: 0,
    activeOpportunities: 0,
    featuredOpportunities: 0,
    expiringSoon: 0,
    categoriesBreakdown: {},
    sectorsBreakdown: {},
    valueRangesBreakdown: {},
    recentActivity: [],
    opportunities: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchOpportunityMetrics = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const opps = opportunities || [];
      
      // Calculate metrics
      const totalOpportunities = opps.length;
      const activeOpportunities = opps.filter(opp => opp.is_active).length;
      const featuredOpportunities = opps.filter(opp => opp.is_featured).length;
      
      // Calculate expiring soon (within 7 days)
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expiringSoon = opps.filter(opp => {
        if (!opp.deadline) return false;
        const deadline = new Date(opp.deadline);
        return deadline >= now && deadline <= sevenDaysFromNow;
      }).length;

      // Categories breakdown
      const categoriesBreakdown: { [key: string]: number } = {};
      opps.forEach(opp => {
        categoriesBreakdown[opp.category] = (categoriesBreakdown[opp.category] || 0) + 1;
      });

      // Sectors breakdown
      const sectorsBreakdown: { [key: string]: number } = {};
      opps.forEach(opp => {
        sectorsBreakdown[opp.sector] = (sectorsBreakdown[opp.sector] || 0) + 1;
      });

      // Value ranges breakdown
      const valueRangesBreakdown: { [key: string]: number } = {};
      opps.forEach(opp => {
        if (opp.salary_range) {
          valueRangesBreakdown[opp.salary_range] = (valueRangesBreakdown[opp.salary_range] || 0) + 1;
        }
      });

      // Recent activity (last 10 opportunities)
      const recentActivity = opps.slice(0, 10).map(opp => ({
        id: opp.id,
        title: opp.title,
        action: opp.is_active ? 'Published' : 'Draft',
        date: opp.created_at
      }));

      setMetrics({
        totalOpportunities,
        activeOpportunities,
        featuredOpportunities,
        expiringSoon,
        categoriesBreakdown,
        sectorsBreakdown,
        valueRangesBreakdown,
        recentActivity,
        opportunities: opps
      });

    } catch (error) {
      console.error('Error fetching opportunity metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOpportunityMetrics();
    }
  }, [user, refreshKey]);

  return { metrics, loading, refetch: fetchOpportunityMetrics };
};