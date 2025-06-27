"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import { BookOpen, Play, Headphones, Search, ExternalLink, Clock, Star } from "lucide-react"

const resourceCategories = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "articles", name: "Articles", icon: BookOpen },
  { id: "videos", name: "Videos", icon: Play },
  { id: "podcasts", name: "Podcasts", icon: Headphones },
]

const resourcesData = [
  {
    id: 1,
    title: "The Science of Body Positivity: How Self-Acceptance Improves Mental Health",
    description:
      "Explore the psychological research behind body positivity and its impact on overall well-being and mental health.",
    type: "articles",
    author: "Dr. Sarah Williams",
    readTime: "8 min read",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    url: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Body Neutrality vs Body Positivity: Finding Your Path",
    description:
      "Understanding the difference between body neutrality and body positivity, and how to choose the approach that works for you.",
    type: "videos",
    author: "Maya Johnson",
    readTime: "12 min watch",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    url: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Mindful Eating and Body Acceptance",
    description:
      "Learn how mindful eating practices can help you develop a healthier relationship with food and your body.",
    type: "podcasts",
    author: "The Body Love Podcast",
    readTime: "45 min listen",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    url: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Overcoming Negative Self-Talk: A Practical Guide",
    description:
      "Practical strategies and techniques to identify, challenge, and replace negative self-talk with compassionate inner dialogue.",
    type: "articles",
    author: "Dr. Michael Chen",
    readTime: "6 min read",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop",
    url: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Building Confidence Through Movement",
    description:
      "Discover how different forms of movement and exercise can boost your confidence and improve your relationship with your body.",
    type: "videos",
    author: "FitJoy Movement",
    readTime: "15 min watch",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=250&fit=crop",
    url: "#",
    featured: true,
  },
  {
    id: 6,
    title: "The Role of Social Media in Body Image",
    description:
      "An in-depth discussion about how social media affects body image and strategies for creating a positive online environment.",
    type: "podcasts",
    author: "Digital Wellness Show",
    readTime: "38 min listen",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    url: "#",
    featured: false,
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [resources] = useState(resourcesData)

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredResources = resources.filter((resource) => resource.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "articles":
        return BookOpen
      case "videos":
        return Play
      case "podcasts":
        return Headphones
      default:
        return BookOpen
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "articles":
        return "bg-blue-100 text-blue-800"
      case "videos":
        return "bg-red-100 text-red-800"
      case "podcasts":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold gradient-text">Resources</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert-curated articles, videos, and podcasts to support your body positivity journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredResources.map((resource, index) => {
                const TypeIcon = getTypeIcon(resource.type)
                return (
                  <Card
                    key={resource.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={resource.image || "/placeholder.svg"}
                          alt={resource.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className={getTypeColor(resource.type)}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {resource.type}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{resource.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{resource.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{resource.author}</span>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {resource.readTime}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        <Button asChild className="w-full">
                          <Link href={resource.url}>
                            Read More
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === "all"
              ? "All Resources"
              : resourceCategories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type)
              return (
                <Card
                  key={resource.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge className={getTypeColor(resource.type)} variant="secondary">
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm">{resource.title}</h3>
                      <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{resource.author}</span>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.readTime}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-xs font-medium">{resource.rating}</span>
                        </div>
                      </div>
                      <Button asChild size="sm" className="w-full">
                        <Link href={resource.url}>
                          View Resource
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
