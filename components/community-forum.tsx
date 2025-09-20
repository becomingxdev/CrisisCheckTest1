"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, ThumbsUp, Clock, Shield, AlertTriangle } from "lucide-react"

interface ForumPost {
  id: string
  author: string
  title: string
  content: string
  timestamp: string
  likes: number
  replies: number
  category: "general" | "emergency" | "resources" | "safety"
  verified: boolean
}

const forumPosts: ForumPost[] = [
  {
    id: "1",
    author: "Dr. Sarah Kumar",
    title: "Updated Safety Guidelines for Cyclone Preparedness",
    content:
      "Based on the latest meteorological data, here are the essential steps everyone should take to prepare for the approaching cyclone. Please share this information with your neighbors and community members.",
    timestamp: "2 hours ago",
    likes: 45,
    replies: 12,
    category: "safety",
    verified: true,
  },
  {
    id: "2",
    author: "Volunteer Team Chennai",
    title: "Relief Supplies Distribution Points - Updated List",
    content:
      "We've set up additional distribution points for food, water, and medical supplies. Here's the complete list with timings and contact information for each location.",
    timestamp: "4 hours ago",
    likes: 78,
    replies: 23,
    category: "resources",
    verified: true,
  },
  {
    id: "3",
    author: "Local Resident",
    title: "Road Conditions Update - NH-44 Sector",
    content:
      "Traveled through NH-44 this morning. The road is clear but there's waterlogging near the bridge. Alternative routes are available via the bypass road.",
    timestamp: "6 hours ago",
    likes: 23,
    replies: 8,
    category: "general",
    verified: false,
  },
  {
    id: "4",
    author: "Emergency Response Team",
    title: "URGENT: Evacuation Notice for Coastal Areas",
    content:
      "Immediate evacuation required for residents in zones A, B, and C. Transportation has been arranged. Please report to the nearest collection point with essential items only.",
    timestamp: "8 hours ago",
    likes: 156,
    replies: 34,
    category: "emergency",
    verified: true,
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "emergency":
      return "bg-red-100 text-red-800"
    case "safety":
      return "bg-orange-100 text-orange-800"
    case "resources":
      return "bg-blue-100 text-blue-800"
    case "general":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function CommunityForum() {
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" })
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPosts =
    selectedCategory === "all" ? forumPosts : forumPosts.filter((post) => post.category === selectedCategory)

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission
    console.log("New post:", newPost)
    setNewPost({ title: "", content: "", category: "general" })
  }

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "emergency", label: "Emergency" },
    { value: "safety", label: "Safety" },
    { value: "resources", label: "Resources" },
    { value: "general", label: "General" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Community Forum
        </CardTitle>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Moderation Notice</p>
              <p className="text-yellow-700">
                Please only share verified information. Misinformation can be harmful during crisis situations.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* New Post Form */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Share Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <Input
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Share verified information, updates, or ask questions..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={3}
              />
              <div className="flex justify-between items-center">
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="general">General</option>
                  <option value="emergency">Emergency</option>
                  <option value="safety">Safety</option>
                  <option value="resources">Resources</option>
                </select>
                <Button type="submit">Post</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Forum Posts */}
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{post.author}</span>
                        {post.verified && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.timestamp}
                        </span>
                      </div>
                      <h4 className="font-semibold">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">{post.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {post.replies} replies
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
