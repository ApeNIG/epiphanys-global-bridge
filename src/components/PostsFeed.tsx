import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send, ImageIcon, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  likes_count: number;
  comments_count: number;
  profile?: {
    full_name: string | null;
    profile_image_url: string | null;
    business_name: string | null;
  };
  liked_by_user?: boolean;
}

interface PostsFeedProps {
  userId?: string;
  showCreatePost?: boolean;
}

const PostsFeed = ({ userId, showCreatePost = true }: PostsFeedProps) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data: postsData, error: postsError } = await query;

      if (postsError) throw postsError;

      // Fetch profiles separately
      const userIds = [...new Set(postsData?.map(p => p.user_id) || [])];
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, profile_image_url, business_name")
          .in("id", userIds);

        const postsWithProfiles: Post[] = postsData?.map(post => ({
          ...post,
          profile: profiles?.find(p => p.id === post.user_id) || undefined
        })) || [];

        setPosts(postsWithProfiles);
      } else {
        setPosts([]);
      }

      // Check which posts user has liked
      if (user) {
        const { data: likes } = await supabase
          .from("post_likes")
          .select("post_id")
          .eq("user_id", user.id);

        if (likes) {
          const likedPostIds = new Set(likes.map(l => l.post_id));
          setPosts(prev => prev.map(post => ({
            ...post,
            liked_by_user: likedPostIds.has(post.id)
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId, user]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return;

    setIsPosting(true);
    try {
      const { error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content: newPostContent.trim()
        });

      if (error) throw error;

      setNewPostContent("");
      toast.success("Post created successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId: string, isLiked: boolean) => {
    if (!user) {
      toast.error("Please sign in to like posts");
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("post_likes")
          .insert({ post_id: postId, user_id: user.id });
      }

      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes_count: isLiked ? post.likes_count - 1 : post.likes_count + 1,
            liked_by_user: !isLiked
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-3 bg-muted rounded w-1/6" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Create Post */}
      {showCreatePost && user && (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share an update with your network..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[80px] resize-none border-0 bg-muted/50 focus-visible:ring-1"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Photo
                    </Button>
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim() || isPosting}
                    size="sm"
                    className="gap-1"
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
          </CardContent>
        </Card>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.profile?.profile_image_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      {post.profile?.full_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {post.profile?.full_name || "Anonymous User"}
                    </h4>
                    {post.profile?.business_name && (
                      <p className="text-sm text-muted-foreground">{post.profile.business_name}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="mt-4">
                <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="Post image"
                    className="mt-3 rounded-lg max-h-96 object-cover w-full"
                  />
                )}
              </div>

              {/* Post Stats */}
              {(post.likes_count > 0 || post.comments_count > 0) && (
                <div className="flex items-center gap-4 mt-4 pt-2 border-t border-border text-sm text-muted-foreground">
                  {post.likes_count > 0 && (
                    <span>{post.likes_count} {post.likes_count === 1 ? "like" : "likes"}</span>
                  )}
                  {post.comments_count > 0 && (
                    <span>{post.comments_count} {post.comments_count === 1 ? "comment" : "comments"}</span>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 gap-2 ${post.liked_by_user ? "text-primary" : "text-muted-foreground"}`}
                  onClick={() => handleLike(post.id, post.liked_by_user || false)}
                >
                  <Heart className={`w-4 h-4 ${post.liked_by_user ? "fill-current" : ""}`} />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PostsFeed;
