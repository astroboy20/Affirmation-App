"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/navigation"
import { User, Heart, Bookmark, Calendar, MapPin, Edit3, Save, Camera, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const userStats = [
  { label: "Posts Shared", value: 23, icon: User },
  { label: "Affirmations Liked", value: 156, icon: Heart },
  { label: "Resources Saved", value: 42, icon: Bookmark },
  { label: "Days Active", value: 89, icon: Calendar },
]

const userPosts = [
  {
    id: 1,
    content:
      "Today I looked in the mirror and celebrated my strength instead of criticizing my appearance. Small mindset shifts make the biggest difference! 💪✨",
    likes: 34,
    comments: 8,
    timeAgo: "2 days ago",
  },
  {
    id: 2,
    content:
      "Reminder: Your worth isn't measured by a number on a scale. You are valuable, loved, and enough exactly as you are. 🌟",
    likes: 67,
    comments: 12,
    timeAgo: "1 week ago",
  },
]

const savedAffirmations = [
  "I am worthy of love and respect exactly as I am.",
  "My body is my home, and I treat it with kindness.",
  "I celebrate my unique beauty and strength.",
  "Every part of me deserves love and acceptance.",
]

const achievements = [
  { name: "First Post", description: "Shared your first story with the community", earned: true },
  { name: "Week Warrior", description: "Active for 7 consecutive days", earned: true },
  { name: "Supporter", description: "Liked 50 affirmations", earned: true },
  { name: "Inspiration", description: "Received 100 likes on your posts", earned: false },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    bio: "On a journey of self-love and body positivity. Sharing my experiences to inspire others. 🌟",
    location: "San Francisco, CA",
    joinDate: "March 2024",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  })
  const { toast } = useToast()

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in">
          <div className="relative h-32 bg-gradient-to-r from-pink-500 to-purple-600">
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                  onClick={() =>
                    toast({ title: "Feature coming soon!", description: "Photo upload will be available soon." })
                  }
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    {isEditing ? (
                      <div className="space-y-2 mb-4">
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="text-2xl font-bold"
                        />
                        <Textarea
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          className="resize-none"
                        />
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          placeholder="Location"
                        />
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                        <p className="text-muted-foreground mb-3 max-w-md">{profile.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {profile.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Joined {profile.joinDate}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="text-center border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {userPosts.map((post, index) => (
              <Card
                key={post.id}
                className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes} likes
                      </span>
                      <span>{post.comments} comments</span>
                    </div>
                    <span>{post.timeAgo}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {savedAffirmations.map((affirmation, index) => (
                <Card
                  key={index}
                  className="border-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <blockquote className="text-lg font-medium leading-relaxed">"{affirmation}"</blockquote>
                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4 fill-current text-primary" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={achievement.name}
                  className={`border-0 backdrop-blur-sm animate-fade-in ${
                    achievement.earned
                      ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
                      : "bg-white/50 dark:bg-gray-800/50 opacity-60"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        <Award className={`w-6 h-6 ${achievement.earned ? "text-white" : "text-gray-400"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && (
                          <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
