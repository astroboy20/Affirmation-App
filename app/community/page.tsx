"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/navigation"
import { Heart, MessageCircle, Share2, Plus, Users, TrendingUp, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const communityPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content:
      "Today I looked in the mirror and instead of focusing on what I wanted to change, I celebrated what my body has accomplished. It carried me through a 5K run, gave the best hugs, and danced until midnight last weekend. Our bodies are incredible! 💪✨",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    likes: 127,
    comments: 23,
    timeAgo: "2 hours ago",
    tags: ["body-love", "self-acceptance"],
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      verified: false,
    },
    content:
      "Reminder: You don't owe anyone a certain body type, size, or appearance. Your worth isn't measured by how you look, but by who you are as a person. You are enough, exactly as you are. 🌟",
    likes: 89,
    comments: 15,
    timeAgo: "4 hours ago",
    tags: ["self-worth", "reminder"],
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content:
      "Started my morning with positive affirmations and it completely changed my day. Sometimes the smallest acts of self-love create the biggest shifts in our mindset. What's your favorite morning ritual for self-care?",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 156,
    comments: 31,
    timeAgo: "6 hours ago",
    tags: ["morning-routine", "self-care"],
    isLiked: false,
  },
]

const trendingTopics = [
  { name: "Body Neutrality", posts: 234 },
  { name: "Self-Care Sunday", posts: 189 },
  { name: "Confidence Building", posts: 156 },
  { name: "Mental Health", posts: 143 },
  { name: "Positive Mindset", posts: 98 },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts)
  const [newPost, setNewPost] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const { toast } = useToast()

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleShare = (post: (typeof communityPosts)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(post.content)
      toast({
        title: "Copied to clipboard!",
        description: "Post content copied to your clipboard",
      })
    }
  }

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          verified: false,
        },
        content: newPost,
        likes: 0,
        comments: 0,
        timeAgo: "Just now",
        tags: ["new-post"],
        isLiked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
      setShowNewPost(false)
      toast({
        title: "Post shared!",
        description: "Your post has been shared with the community",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-primary mr-3" />
                  <h1 className="text-4xl font-bold gradient-text">Community</h1>
                </div>
                <Button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Share Story
                </Button>
              </div>
              <p className="text-xl text-muted-foreground">
                Connect with others on their journey to self-love and body positivity
              </p>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <Card className="mb-6 animate-slide-up border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Share Your Story</h3>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Share something positive about your journey..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-4 min-h-[100px]"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                      Share Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            {post.author.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.timeAgo}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-lg leading-relaxed mb-4">{post.content}</p>

                    {/* Post Image */}
                    {post.image && (
                      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                        <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? "text-red-500" : ""}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleShare(post)}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Community Stats */}
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Community Stats
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Members</span>
                      <span className="font-semibold">12,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Posts Today</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Stories Shared</span>
                      <span className="font-semibold">8,923</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="font-semibold">Trending Topics</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={topic.name} className="flex justify-between items-center">
                        <span className="text-sm font-medium">#{topic.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {topic.posts}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Guidelines */}
              <Card className="border-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10">
                <CardHeader>
                  <h3 className="font-semibold">Community Guidelines</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Be kind and supportive</li>
                    <li>• Respect everyone's journey</li>
                    <li>• No body shaming or negativity</li>
                    <li>• Share authentic experiences</li>
                    <li>• Celebrate diversity and inclusion</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
