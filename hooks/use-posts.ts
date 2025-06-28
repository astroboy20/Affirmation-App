"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

export interface Post {
  id: string
  content: string
  image_url?: string
  likes_count: number
  comments_count: number
  tags: string[]
  created_at: string
  user_id: string
  profiles: {
    full_name: string
    avatar_url?: string
  }
  is_liked?: boolean
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      // If user is logged in, check likes
      if (user && data) {
        const postIds = data.map((p) => p.id)

        const { data: likesData } = await supabase
          .from("likes")
          .select("post_id")
          .eq("user_id", user.id)
          .in("post_id", postIds)

        const likedIds = new Set(likesData?.map((l) => l.post_id) || [])

        const enrichedData = data.map((post) => ({
          ...post,
          is_liked: likedIds.has(post.id),
        }))

        setPosts(enrichedData)
      } else {
        setPosts(data || [])
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleLike = async (postId: string) => {
    if (!user) return

    const post = posts.find((p) => p.id === postId)
    if (!post) return

    try {
      if (post.is_liked) {
        await supabase.from("likes").delete().eq("user_id", user.id).eq("post_id", postId)

        await supabase
          .from("posts")
          .update({ likes_count: post.likes_count - 1 })
          .eq("id", postId)
      } else {
        await supabase.from("likes").insert({ user_id: user.id, post_id: postId })

        await supabase
          .from("posts")
          .update({ likes_count: post.likes_count + 1 })
          .eq("id", postId)
      }

      // Update local state
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                is_liked: !p.is_liked,
                likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1,
              }
            : p,
        ),
      )
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const createPost = async (content: string, imageUrl?: string, tags: string[] = []) => {
    if (!user) return { error: "Not authenticated" }

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          content,
          image_url: imageUrl,
          tags,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Refresh posts
      fetchPosts()

      return { data, error: null }
    } catch (error) {
      console.error("Error creating post:", error)
      return { error }
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [user])

  return {
    posts,
    loading,
    toggleLike,
    createPost,
    refetch: fetchPosts,
  }
}
