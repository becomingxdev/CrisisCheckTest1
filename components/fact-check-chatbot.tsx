"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Upload, CheckCircle, XCircle, AlertTriangle, Bot, User } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  verdict?: "true" | "false" | "misleading" | "unverified"
  confidence?: number
  sources?: string[]
  keyPoints?: string[]
}

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case "true":
      return "bg-green-600 hover:bg-green-700"
    case "false":
      return "bg-red-600 hover:bg-red-700"
    case "misleading":
      return "bg-orange-600 hover:bg-orange-700"
    case "unverified":
      return "bg-gray-600 hover:bg-gray-700"
    default:
      return "bg-gray-600 hover:bg-gray-700"
  }
}

const getVerdictIcon = (verdict: string) => {
  switch (verdict) {
    case "true":
      return <CheckCircle className="h-4 w-4" />
    case "false":
      return <XCircle className="h-4 w-4" />
    case "misleading":
      return <AlertTriangle className="h-4 w-4" />
    case "unverified":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

export function FactCheckChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI-powered fact-checking assistant. You can ask me to verify information by typing a question, pasting a link, or uploading an image. I'll analyze the content and provide a detailed fact-check with sources.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/fact-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput, type: "text" }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.explanation,
        timestamp: new Date(),
        verdict: data.verdict,
        confidence: data.confidence,
        sources: data.sources,
        keyPoints: data.keyPoints,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Fact-check error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I encountered an error while analyzing this information. Please try again or verify with official sources.",
        timestamp: new Date(),
        verdict: "unverified",
        sources: ["Official Government Sources", "Verified News Outlets"],
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Uploaded image: ${file.name}`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const reader = new FileReader()
        reader.onload = async () => {
          const base64 = reader.result as string

          const response = await fetch("/api/fact-check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Image analysis requested for file: ${file.name}. Base64: ${base64}`,
              type: "image",
            }),
          })

          const data = await response.json()

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: data.explanation,
            timestamp: new Date(),
            verdict: data.verdict,
            confidence: data.confidence,
            sources: data.sources,
            keyPoints: data.keyPoints,
          }

          setMessages((prev) => [...prev, botMessage])
          setIsLoading(false)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error("Image analysis error:", error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "I couldn't analyze the uploaded image. Please try again or verify the content manually.",
          timestamp: new Date(),
          verdict: "unverified",
          sources: ["Manual Verification Required"],
        }
        setMessages((prev) => [...prev, errorMessage])
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Fact-Check Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 h-96 mb-4" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.verdict && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getVerdictColor(message.verdict)}>
                            {getVerdictIcon(message.verdict)}
                            <span className="ml-1 capitalize">{message.verdict}</span>
                          </Badge>
                          {message.confidence !== undefined && (
                            <span className="text-xs opacity-75">Confidence: {message.confidence}%</span>
                          )}
                        </div>
                        {message.keyPoints && message.keyPoints.length > 0 && (
                          <div className="text-xs opacity-75">
                            <p className="font-medium mb-1">Key Analysis Points:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {message.keyPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {message.sources && (
                          <div className="text-xs opacity-75">
                            <p className="font-medium mb-1">Sources:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {message.sources.map((source, index) => (
                                <li key={index}>{source}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-xs opacity-60 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm">Analyzing with AI...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question, paste a link, or upload an image..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="button" variant="outline" size="icon" onClick={handleFileUpload} disabled={isLoading}>
            <Upload className="h-4 w-4" />
          </Button>
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </CardContent>
    </Card>
  )
}
