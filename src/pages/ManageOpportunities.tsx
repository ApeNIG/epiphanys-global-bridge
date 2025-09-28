import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpportunityUploadForm } from '@/components/OpportunityUploadForm';
import { UserOpportunities } from '@/components/UserOpportunities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Upload, Eye, TrendingUp, Calendar, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOpportunityMetrics } from '@/hooks/useOpportunityMetrics';
import { format } from 'date-fns';

const ManageOpportunities = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const { metrics, loading } = useOpportunityMetrics(refreshKey);

  const handleOpportunityChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <h1 className="text-4xl font-bold mb-4">Manage Opportunities</h1>
          <p className="text-muted-foreground text-lg">
            Upload new opportunities and track the performance of your existing listings.
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : metrics.totalOpportunities}</div>
              <p className="text-xs text-muted-foreground">
                opportunities uploaded
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : metrics.activeOpportunities}</div>
              <p className="text-xs text-muted-foreground">
                currently active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : metrics.featuredOpportunities}</div>
              <p className="text-xs text-muted-foreground">
                featured listings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : metrics.expiringSoon}</div>
              <p className="text-xs text-muted-foreground">
                within 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Manage & Track
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload New
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-6">
            <UserOpportunities 
              key={refreshKey} 
              onOpportunityChange={handleOpportunityChange} 
            />
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <OpportunityUploadForm onOpportunityCreated={handleOpportunityChange} />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Opportunity Analytics
                </CardTitle>
                <CardDescription>
                  Track the performance and engagement of your opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : `${metrics.totalOpportunities} opps`}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          across all categories
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Success Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : `${metrics.totalOpportunities > 0 ? Math.round((metrics.activeOpportunities / metrics.totalOpportunities) * 100) : 0}%`}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          opportunities published
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Average per Month</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : Math.round(metrics.totalOpportunities / Math.max(1, new Date().getMonth() + 1))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          opportunities uploaded
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Category Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loading ? (
                          <div className="text-center py-8 text-muted-foreground">
                            Loading analytics data...
                          </div>
                        ) : Object.keys(metrics.categoriesBreakdown).length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            Upload some opportunities to see analytics data here.
                          </div>
                        ) : (
                          Object.entries(metrics.categoriesBreakdown).map(([category, count]) => (
                            <div key={category} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{category}</Badge>
                                <span className="text-sm font-medium">{count} opportunities</span>
                              </div>
                              <div className="flex items-center gap-2 min-w-[100px]">
                                <Progress 
                                  value={(count / metrics.totalOpportunities) * 100} 
                                  className="w-[60px]" 
                                />
                                <span className="text-xs text-muted-foreground w-[30px]">
                                  {Math.round((count / metrics.totalOpportunities) * 100)}%
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sector & Value Range Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">By Sector</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {loading ? (
                            <div className="text-center py-4 text-muted-foreground">Loading...</div>
                          ) : Object.keys(metrics.sectorsBreakdown).length === 0 ? (
                            <div className="text-center py-4 text-muted-foreground">No data available</div>
                          ) : (
                            Object.entries(metrics.sectorsBreakdown).map(([sector, count]) => (
                              <div key={sector} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{sector} Sector</span>
                                <Badge variant="secondary">{count}</Badge>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">By Value Range</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {loading ? (
                            <div className="text-center py-4 text-muted-foreground">Loading...</div>
                          ) : Object.keys(metrics.valueRangesBreakdown).length === 0 ? (
                            <div className="text-center py-4 text-muted-foreground">No data available</div>
                          ) : (
                            Object.entries(metrics.valueRangesBreakdown).map(([range, count]) => (
                              <div key={range} className="flex items-center justify-between">
                                <span className="text-sm">{range}</span>
                                <Badge variant="secondary">{count}</Badge>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loading ? (
                          <div className="text-center py-8 text-muted-foreground">
                            Loading recent activity...
                          </div>
                        ) : metrics.recentActivity.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            No recent activity to display.
                          </div>
                        ) : (
                          metrics.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{activity.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {activity.action} • {format(new Date(activity.date), 'MMM dd, yyyy')}
                                </p>
                              </div>
                              <Badge variant={activity.action === 'Published' ? 'default' : 'secondary'}>
                                {activity.action}
                              </Badge>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageOpportunities;