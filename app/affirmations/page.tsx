"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navigation from "@/components/navigation"
import { Heart, Share2, Bookmark, RefreshCw, Calendar, Sparkles, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAffirmations } from "@/hooks/use-affirmations"
import { useAuth } from "@/contexts/auth-context"

const affirmationCategories = [
  { id: "all", name: "All", color: "bg-gray-100 text-gray-800" },
  { id: "body", name: "Body Love", color: "bg-pink-100 text-pink-800" },
  { id: "confidence", name: "Confidence", color: "bg-purple-100 text-purple-800" },
  { id: "self-worth", name: "Self-Worth", color: "bg-blue-100 text-blue-800" },
  { id: "healing", name: "Healing", color: "bg-green-100 text-green-800" },
]

export default function AffirmationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dailyAffirmationIndex, setDailyAffirmationIndex] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newAffirmation, setNewAffirmation] = useState("")
  const [newCategory, setNewCategory] = useState("self-worth")
  const { toast } = useToast()
  const { user } = useAuth()
  const { affirmations, loading, toggleLike, toggleSave, createAffirmation } = useAffirmations()

  const filteredAffirmations =
    selectedCategory === "all" ? affirmations : affirmations.filter((a) => a.category === selectedCategory)

  const featuredAffirmations = affirmations.filter((a) => a.is_featured)
  const dailyAffirmation = featuredAffirmations[dailyAffirmationIndex] || affirmations[0]

  const handleShare = (affirmation: any) => {
    if (navigator.share) {
      navigator.share({
        title: "Body Positive Affirmation",
        text: affirmation.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(affirmation.content)
      toast({
        title: "Copied to clipboard!",
        description: "Affirmation copied to your clipboard",
      })
    }
  }

  const getNewDailyAffirmation = () => {
    const maxIndex = featuredAffirmations.length > 0 ? featuredAffirmations.length - 1 : affirmations.length - 1
    setDailyAffirmationIndex((prev) => (prev + 1) % (maxIndex + 1))
  }

  const handleCreateAffirmation = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to create affirmations",
        variant: "destructive",
      })
      return
    }

    if (!newAffirmation.trim()) return

    const result = await createAffirmation(newAffirmation, newCategory)

    if (result?.error) {
      toast({
        title: "Error",
        description: "Failed to create affirmation",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Affirmation created!",
        description: "Your affirmation has been shared with the community",
      })
      setNewAffirmation("")
      setShowCreateModal(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold gradient-text">Daily Affirmations</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover powerful affirmations to boost your self-love and confidence every day
          </p>

          {user && (
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Affirmation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Affirmation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write your affirmation..."
                    value={newAffirmation}
                    onChange={(e) => setNewAffirmation(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {affirmationCategories.slice(1).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAffirmation} disabled={!newAffirmation.trim()}>
                      Create
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Daily Featured Affirmation */}
        {dailyAffirmation && (
          <Card className="mb-12 overflow-hidden shadow-xl border-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 animate-slide-up">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={dailyAffirmation.image_url || "/placeholder.svg"}
                    alt="Daily affirmation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">Today's Featured</span>
                  </div>
                  <blockquote className="text-2xl font-medium leading-relaxed mb-6">
                    "{dailyAffirmation.content}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(dailyAffirmation.id)}
                        className={dailyAffirmation.is_liked ? "text-red-500" : ""}
                        disabled={!user}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${dailyAffirmation.is_liked ? "fill-current" : ""}`} />
                        {dailyAffirmation.likes_count}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShare(dailyAffirmation)}>
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    <Button onClick={getNewDailyAffirmation} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Daily
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {affirmationCategories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.id ? "bg-primary text-primary-foreground" : category.color
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Affirmations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAffirmations.map((affirmation, index) => (
            <Card
              key={affirmation.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={affirmation.image_url || "/placeholder.svg"}
                    alt="Affirmation background"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSave(affirmation.id)}
                      className={`bg-white/20 backdrop-blur-sm hover:bg-white/30 ${
                        affirmation.is_saved ? "text-yellow-400" : "text-white"
                      }`}
                      disabled={!user}
                    >
                      <Bookmark className={`w-4 h-4 ${affirmation.is_saved ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-lg font-medium leading-relaxed mb-4">"{affirmation.content}"</blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(affirmation.id)}
                        className={affirmation.is_liked ? "text-red-500" : ""}
                        disabled={!user}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${affirmation.is_liked ? "fill-current" : ""}`} />
                        {affirmation.likes_count}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShare(affirmation)}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {affirmationCategories.find((c) => c.id === affirmation.category)?.name}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAffirmations.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No affirmations found</h3>
            <p className="text-muted-foreground">Try selecting a different category or create your own!</p>
          </div>
        )}
      </div>
    </div>
  )
}
