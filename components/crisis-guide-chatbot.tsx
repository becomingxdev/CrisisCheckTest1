"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, MessageCircle, Bot, User, Phone, MapPin, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  quickActions?: QuickAction[]
}

interface QuickAction {
  label: string
  action: string
  urgent?: boolean
}

const emergencyResponses = [
  {
    keywords: ["earthquake", "tremor", "shaking"],
    response:
      "🚨 EARTHQUAKE SAFETY:\n\n1. DROP to hands and knees\n2. TAKE COVER under a desk/table\n3. HOLD ON until shaking stops\n4. If outdoors, move away from buildings\n5. After shaking stops, check for injuries\n\nDo NOT run outside during shaking!",
    quickActions: [
      { label: "Call Emergency: 112", action: "emergency", urgent: true },
      { label: "Find Shelter Locations", action: "shelter" },
      { label: "Medical Emergency", action: "medical", urgent: true },
    ],
  },
  {
    keywords: ["flood", "flooding", "water", "drowning"],
    response:
      "🌊 FLOOD SAFETY:\n\n1. Move to higher ground immediately\n2. Avoid walking/driving through flood water\n3. Stay away from electrical equipment\n4. Listen to emergency broadcasts\n5. If trapped, signal for help from rooftop\n\nRemember: Turn Around, Don't Drown!",
    quickActions: [
      { label: "Call Rescue: 112", action: "emergency", urgent: true },
      { label: "Find High Ground", action: "evacuation" },
      { label: "Report Location", action: "location" },
    ],
  },
  {
    keywords: ["cyclone", "hurricane", "storm", "wind"],
    response:
      "🌀 CYCLONE SAFETY:\n\n1. Stay indoors, away from windows\n2. Go to the lowest floor, interior room\n3. Keep emergency supplies ready\n4. Monitor weather updates\n5. Do NOT go outside during eye of storm\n\nWait for official all-clear before going out!",
    quickActions: [
      { label: "Emergency Services", action: "emergency", urgent: true },
      { label: "Evacuation Centers", action: "evacuation" },
      { label: "Weather Updates", action: "weather" },
    ],
  },
  {
    keywords: ["fire", "smoke", "burning", "evacuation"],
    response:
      "🔥 FIRE SAFETY:\n\n1. Get out immediately, stay low\n2. Feel doors before opening (heat check)\n3. Use stairs, never elevators\n4. Once out, stay out\n5. Call fire department\n\nIf trapped: Close doors, seal cracks, signal for help!",
    quickActions: [
      { label: "Fire Emergency: 101", action: "fire", urgent: true },
      { label: "Evacuation Route", action: "evacuation" },
      { label: "Medical Help", action: "medical" },
    ],
  },
  {
    keywords: ["medical", "injury", "hurt", "bleeding", "unconscious"],
    response:
      "🏥 MEDICAL EMERGENCY:\n\n1. Call emergency services immediately\n2. Check if person is responsive\n3. Control bleeding with direct pressure\n4. Keep person warm and comfortable\n5. Do NOT move if spinal injury suspected\n\nStay calm and provide clear location info!",
    quickActions: [
      { label: "Ambulance: 108", action: "medical", urgent: true },
      { label: "Nearest Hospital", action: "hospital" },
      { label: "First Aid Guide", action: "firstaid" },
    ],
  },
]

export function CrisisGuideChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "🚨 Crisis Guide Assistant\n\nI'm here to provide immediate emergency guidance powered by AI. What type of emergency are you facing?\n\nFor life-threatening situations, call 112 immediately!",
      timestamp: new Date(),
      quickActions: [
        { label: "Call 112 Now", action: "emergency", urgent: true },
        { label: "Find Shelter", action: "shelter" },
        { label: "Medical Help", action: "medical" },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

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
      const response = await fetch("/api/crisis-guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.response,
        timestamp: new Date(),
        quickActions: data.quickActions || [
          { label: "Emergency: 112", action: "emergency", urgent: true },
          { label: "Medical: 108", action: "medical", urgent: true },
        ],
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Crisis guide error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I'm experiencing technical difficulties. For immediate life-threatening emergencies, please call 112 right away.",
        timestamp: new Date(),
        quickActions: [
          { label: "Emergency: 112", action: "emergency", urgent: true },
          { label: "Medical: 108", action: "medical", urgent: true },
        ],
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickStart = (query: string) => {
    setInput(query)
    // Trigger form submission programmatically
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 100)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "emergency":
        window.open("tel:112", "_self")
        break
      case "police":
        window.open("tel:100", "_self")
        break
      case "fire":
        window.open("tel:101", "_self")
        break
      case "medical":
        window.open("tel:108", "_self")
        break
      default:
        // Handle other actions like finding shelters, hospitals, etc.
        console.log(`Action: ${action}`)
    }
  }

  const quickStartOptions = [
    { label: t.crisisGuide.earthquakeSafety, query: "What to do during earthquake?" },
    { label: t.crisisGuide.floodSafety, query: "Help with flooding situation" },
    { label: t.crisisGuide.cycloneSafety, query: "Cyclone safety measures" },
    { label: t.crisisGuide.fireSafety, query: "Fire safety and evacuation" },
    { label: t.crisisGuide.medicalEmergency, query: "Medical emergency help" },
    { label: t.crisisGuide.generalSafety, query: "General emergency safety tips" },
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-red-600 hover:bg-red-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-2 border-red-200">
        <CardHeader className="bg-red-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5" />
              {t.crisisGuide.title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-red-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Quick Start Options */}
          {messages.length === 1 && (
            <div className="p-4 border-b bg-muted/50">
              <p className="text-sm font-medium mb-3">{t.crisisGuide.emergencyHelp}</p>
              <div className="grid grid-cols-2 gap-2">
                {quickStartOptions.map((option) => (
                  <Button
                    key={option.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickStart(option.query)}
                    className="text-xs h-8"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user" ? "bg-primary text-primary-foreground" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted border border-red-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.quickActions && (
                        <div className="mt-3 space-y-2">
                          {message.quickActions.map((action, index) => (
                            <Button
                              key={index}
                              variant={action.urgent ? "destructive" : "outline"}
                              size="sm"
                              onClick={() => handleQuickAction(action.action)}
                              className="w-full text-xs"
                            >
                              {action.urgent && <Phone className="h-3 w-3 mr-1" />}
                              {action.action === "shelter" && <MapPin className="h-3 w-3 mr-1" />}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-60 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      <span className="text-sm">Getting emergency guidance...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your emergency..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              For life-threatening emergencies, call{" "}
              <button onClick={() => handleQuickAction("emergency")} className="text-red-600 font-bold underline">
                112
              </button>{" "}
              immediately
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
