"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import { Heart, Share2, Bookmark, RefreshCw, Calendar, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const affirmationCategories = [
  { id: "all", name: "All", color: "bg-gray-100 text-gray-800" },
  { id: "body", name: "Body Love", color: "bg-pink-100 text-pink-800" },
  { id: "confidence", name: "Confidence", color: "bg-purple-100 text-purple-800" },
  { id: "self-worth", name: "Self-Worth", color: "bg-blue-100 text-blue-800" },
  { id: "healing", name: "Healing", color: "bg-green-100 text-green-800" },
]

const affirmationsData = [
  {
    id: 1,
    text: "I am worthy of love and respect exactly as I am.",
    category: "self-worth",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    likes: 234,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    text: "My body is my home, and I treat it with kindness and compassion.",
    category: "body",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    likes: 189,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 3,
    text: "I celebrate my unique beauty and embrace what makes me different.",
    category: "confidence",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    likes: 156,
    isLiked: false,
    isSaved: true,
  },
  {
    id: 4,
    text: "I am healing and growing stronger every day.",
    category: "healing",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    likes: 298,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 5,
    text: "My worth is not determined by my appearance - I am valuable beyond measure.",
    category: "self-worth",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    likes: 267,
    isLiked: true,
    isSaved: true,
  },
  {
    id: 6,
    text: "I choose to speak to myself with the same kindness I show my best friend.",
    category: "healing",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
    likes: 178,
    isLiked: false,
    isSaved: false,
  },
]

export default function AffirmationsPage() {
  const [affirmations, setAffirmations] = useState(affirmationsData)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmationsData[0])
  const { toast } = useToast()

  const filteredAffirmations =
    selectedCategory === "all" ? affirmations : affirmations.filter((a) => a.category === selectedCategory)

  const handleLike = (id: number) => {
    setAffirmations((prev) =>
      prev.map((affirmation) =>
        affirmation.id === id
          ? {
              ...affirmation,
              isLiked: !affirmation.isLiked,
              likes: affirmation.isLiked ? affirmation.likes - 1 : affirmation.likes + 1,
            }
          : affirmation,
      ),
    )
  }

  const handleSave = (id: number) => {
    setAffirmations((prev) =>
      prev.map((affirmation) =>
        affirmation.id === id ? { ...affirmation, isSaved: !affirmation.isSaved } : affirmation,
      ),
    )

    const affirmation = affirmations.find((a) => a.id === id)
    toast({
      title: affirmation?.isSaved ? "Removed from saved" : "Saved!",
      description: affirmation?.isSaved
        ? "Affirmation removed from your collection"
        : "Affirmation added to your collection",
    })
  }

  const handleShare = (affirmation: (typeof affirmationsData)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: "Body Positive Affirmation",
        text: affirmation.text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(affirmation.text)
      toast({
        title: "Copied to clipboard!",
        description: "Affirmation copied to your clipboard",
      })
    }
  }

  const getNewDailyAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmationsData.length)
    setDailyAffirmation(affirmationsData[randomIndex])
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
        </div>

        {/* Daily Featured Affirmation */}
        <Card className="mb-12 overflow-hidden shadow-xl border-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 animate-slide-up">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={dailyAffirmation.image || "/placeholder.svg"}
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
                <blockquote className="text-2xl font-medium leading-relaxed mb-6">"{dailyAffirmation.text}"</blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(dailyAffirmation.id)}
                      className={dailyAffirmation.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${dailyAffirmation.isLiked ? "fill-current" : ""}`} />
                      {dailyAffirmation.likes}
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
                    src={affirmation.image || "/placeholder.svg"}
                    alt="Affirmation background"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(affirmation.id)}
                      className={`bg-white/20 backdrop-blur-sm hover:bg-white/30 ${
                        affirmation.isSaved ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${affirmation.isSaved ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-lg font-medium leading-relaxed mb-4">"{affirmation.text}"</blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(affirmation.id)}
                        className={affirmation.isLiked ? "text-red-500" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${affirmation.isLiked ? "fill-current" : ""}`} />
                        {affirmation.likes}
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
      </div>
    </div>
  )
}
