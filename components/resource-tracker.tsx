"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Utensils, Users, Truck, Phone, Home } from "lucide-react"

interface Resource {
  id: string
  name: string
  icon: React.ReactNode
  available: number
  total: number
  status: "critical" | "low" | "adequate" | "good"
  unit: string
  lastUpdated: string
}

const resources: Resource[] = [
  {
    id: "1",
    name: "Medical Supplies",
    icon: <Heart className="h-5 w-5" />,
    available: 750,
    total: 1000,
    status: "adequate",
    unit: "units",
    lastUpdated: "5 min ago",
  },
  {
    id: "2",
    name: "Food & Water",
    icon: <Utensils className="h-5 w-5" />,
    available: 2500,
    total: 5000,
    status: "low",
    unit: "packages",
    lastUpdated: "10 min ago",
  },
  {
    id: "3",
    name: "Rescue Teams",
    icon: <Users className="h-5 w-5" />,
    available: 45,
    total: 50,
    status: "good",
    unit: "teams",
    lastUpdated: "2 min ago",
  },
  {
    id: "4",
    name: "Transport Vehicles",
    icon: <Truck className="h-5 w-5" />,
    available: 120,
    total: 200,
    status: "adequate",
    unit: "vehicles",
    lastUpdated: "15 min ago",
  },
  {
    id: "5",
    name: "Emergency Hotlines",
    icon: <Phone className="h-5 w-5" />,
    available: 18,
    total: 20,
    status: "good",
    unit: "lines",
    lastUpdated: "1 min ago",
  },
  {
    id: "6",
    name: "Shelter Capacity",
    icon: <Home className="h-5 w-5" />,
    available: 8500,
    total: 15000,
    status: "adequate",
    unit: "beds",
    lastUpdated: "30 min ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "text-red-600"
    case "low":
      return "text-orange-600"
    case "adequate":
      return "text-yellow-600"
    case "good":
      return "text-green-600"
    default:
      return "text-gray-600"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "critical":
      return <Badge variant="destructive">Critical</Badge>
    case "low":
      return <Badge className="bg-orange-600 hover:bg-orange-700">Low</Badge>
    case "adequate":
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">Adequate</Badge>
    case "good":
      return <Badge className="bg-green-600 hover:bg-green-700">Good</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

const getProgressColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-600"
    case "low":
      return "bg-orange-600"
    case "adequate":
      return "bg-yellow-600"
    case "good":
      return "bg-green-600"
    default:
      return "bg-gray-600"
  }
}

export function ResourceTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const percentage = (resource.available / resource.total) * 100
            return (
              <div key={resource.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={getStatusColor(resource.status)}>{resource.icon}</div>
                    <span className="font-medium">{resource.name}</span>
                  </div>
                  {getStatusBadge(resource.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {resource.available} / {resource.total} {resource.unit}
                    </span>
                    <span className="text-muted-foreground">{Math.round(percentage)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>

                <div className="text-xs text-muted-foreground">Last updated: {resource.lastUpdated}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
