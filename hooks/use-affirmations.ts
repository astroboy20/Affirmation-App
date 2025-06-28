"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

export interface Affirmation {
  id: string
  content: string
  category: string
  image_url?: string
  is_featured: boolean
  likes_count: number
  created_at: string
  user_id?: string
  profiles?: {
    full_name: string
    avatar_url?: string
  }
  is_liked?: boolean
  is_saved?: boolean
}

export function useAffirmations() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchAffirmations = async () => {
    try {
      const query = supabase
        .from("affirmations")
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .order("created_at", { ascending: false })

      const { data, error } = await query

      if (error) throw error

      // If user is logged in, check likes and saves
      if (user && data) {
        const affirmationIds = data.map((a) => a.id)

        const [likesResult, savesResult] = await Promise.all([
          supabase.from("likes").select("affirmation_id").eq("user_id", user.id).in("affirmation_id", affirmationIds),
          supabase
            .from("saved_affirmations")
            .select("affirmation_id")
            .eq("user_id", user.id)
            .in("affirmation_id", affirmationIds),
        ])

        const likedIds = new Set(likesResult.data?.map((l) => l.affirmation_id) || [])
        const savedIds = new Set(savesResult.data?.map((s) => s.affirmation_id) || [])

        const enrichedData = data.map((affirmation) => ({
          ...affirmation,
          is_liked: likedIds.has(affirmation.id),
          is_saved: savedIds.has(affirmation.id),
        }))

        setAffirmations(enrichedData)
      } else {
        setAffirmations(data || [])
      }
    } catch (error) {
      console.error("Error fetching affirmations:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleLike = async (affirmationId: string) => {
    if (!user) return

    const affirmation = affirmations.find((a) => a.id === affirmationId)
    if (!affirmation) return

    try {
      if (affirmation.is_liked) {
        await supabase.from("likes").delete().eq("user_id", user.id).eq("affirmation_id", affirmationId)

        await supabase
          .from("affirmations")
          .update({ likes_count: affirmation.likes_count - 1 })
          .eq("id", affirmationId)
      } else {
        await supabase.from("likes").insert({ user_id: user.id, affirmation_id: affirmationId })

        await supabase
          .from("affirmations")
          .update({ likes_count: affirmation.likes_count + 1 })
          .eq("id", affirmationId)
      }

      // Update local state
      setAffirmations((prev) =>
        prev.map((a) =>
          a.id === affirmationId
            ? {
                ...a,
                is_liked: !a.is_liked,
                likes_count: a.is_liked ? a.likes_count - 1 : a.likes_count + 1,
              }
            : a,
        ),
      )
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const toggleSave = async (affirmationId: string) => {
    if (!user) return

    const affirmation = affirmations.find((a) => a.id === affirmationId)
    if (!affirmation) return

    try {
      if (affirmation.is_saved) {
        await supabase.from("saved_affirmations").delete().eq("user_id", user.id).eq("affirmation_id", affirmationId)
      } else {
        await supabase.from("saved_affirmations").insert({ user_id: user.id, affirmation_id: affirmationId })
      }

      // Update local state
      setAffirmations((prev) => prev.map((a) => (a.id === affirmationId ? { ...a, is_saved: !a.is_saved } : a)))
    } catch (error) {
      console.error("Error toggling save:", error)
    }
  }

  const createAffirmation = async (content: string, category: string, imageUrl?: string) => {
    if (!user) return { error: "Not authenticated" }

    try {
      const { data, error } = await supabase
        .from("affirmations")
        .insert({
          content,
          category,
          image_url: imageUrl,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Refresh affirmations
      fetchAffirmations()

      return { data, error: null }
    } catch (error) {
      console.error("Error creating affirmation:", error)
      return { error }
    }
  }

  useEffect(() => {
    fetchAffirmations()
  }, [user])

  return {
    affirmations,
    loading,
    toggleLike,
    toggleSave,
    createAffirmation,
    refetch: fetchAffirmations,
  }
}
