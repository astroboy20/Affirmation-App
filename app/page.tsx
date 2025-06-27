"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { Heart, Sparkles, Users, BookOpen, ArrowRight, RefreshCw } from "lucide-react"

const affirmations = [
  "I am worthy of love and respect exactly as I am.",
  "My body is my home, and I treat it with kindness.",
  "I celebrate my unique beauty and strength.",
  "I am more than my appearance - I am whole and complete.",
  "Every part of me deserves love and acceptance.",
  "I choose to speak to myself with compassion.",
  "My worth is not determined by my size or shape.",
  "I am grateful for all the amazing things my body does for me.",
]

const features = [
  {
    icon: Heart,
    title: "Daily Affirmations",
    description: "Start each day with powerful, personalized affirmations that boost your self-love and confidence.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "Connect with like-minded individuals on a journey of self-acceptance and body positivity.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: BookOpen,
    title: "Expert Resources",
    description: "Access articles, videos, and podcasts from body positivity experts and mental health professionals.",
    color: "from-blue-500 to-cyan-500",
  },
]

export default function HomePage() {
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const refreshAffirmation = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAffirmation()
    }, 10000) // Change affirmation every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Embrace Your
                <span className="gradient-text block">Beautiful Self</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join a supportive community dedicated to body positivity, self-love, and personal growth. Start your
                journey to self-acceptance today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=500&fit=crop&crop=face"
                  alt="Confident woman embracing self-love"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float opacity-80" />
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-float opacity-60"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Daily Affirmation Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Today's Affirmation</h2>
            <p className="text-muted-foreground">A daily reminder of your worth and beauty</p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10">
            <CardContent className="p-8">
              <div
                className={`transition-all duration-300 ${isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"}`}
              >
                <blockquote className="text-2xl font-medium leading-relaxed text-center mb-6">
                  "{affirmations[currentAffirmation]}"
                </blockquote>
              </div>
              <Button onClick={refreshAffirmation} variant="ghost" size="sm" className="mt-4" disabled={isAnimating}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
                New Affirmation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need for Your Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover tools and resources designed to support your path to self-love and body acceptance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have transformed their relationship with their body and themselves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Join Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              Browse Resources
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
