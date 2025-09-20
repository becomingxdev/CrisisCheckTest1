"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface Update {
  id: string
  type: "alert" | "info" | "resolved"
  title: string
  description: string
  timestamp: string
  location: string
  verified: boolean
}

const updates: Update[] = [
  {
    id: "1",
    type: "alert",
    title: "Cyclone Warning Issued",
    description: "Severe cyclonic storm approaching Odisha coast. Evacuation orders in effect for coastal districts.",
    timestamp: "2 minutes ago",
    location: "Odisha",
    verified: true,
  },
  {
    id: "2",
    type: "info",
    title: "Relief Operations Underway",
    description: "Emergency response teams deployed to flood-affected areas in Chennai. 15 rescue boats operational.",
    timestamp: "15 minutes ago",
    location: "Chennai",
    verified: true,
  },
  {
    id: "3",
    type: "resolved",
    title: "Road Blockage Cleared",
    description: "NH-44 reopened after landslide clearance. Traffic movement restored to normal.",
    timestamp: "1 hour ago",
    location: "Kerala",
    verified: true,
  },
  {
    id: "4",
    type: "alert",
    title: "Air Quality Alert",
    description: "AQI levels reaching hazardous levels in Delhi NCR. Residents advised to stay indoors.",
    timestamp: "2 hours ago",
    location: "Delhi",
    verified: true,
  },
  {
    id: "5",
    type: "info",
    title: "Vaccination Drive Extended",
    description: "COVID-19 vaccination centers will remain open until 8 PM today due to high demand.",
    timestamp: "3 hours ago",
    location: "Mumbai",
    verified: true,
  },
]

const getUpdateIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    case "resolved":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "info":
      return <Info className="h-4 w-4 text-blue-600" />
    default:
      return <Info className="h-4 w-4" />
  }
}

const getUpdateBadge = (type: string) => {
  switch (type) {
    case "alert":
      return <Badge variant="destructive">Alert</Badge>
    case "resolved":
      return <Badge className="bg-green-600 hover:bg-green-700">Resolved</Badge>
    case "info":
      return <Badge variant="secondary">Info</Badge>
    default:
      return <Badge variant="secondary">Update</Badge>
  }
}

export function LiveUpdates() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Live Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="border-l-2 border-muted pl-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getUpdateIcon(update.type)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm">{update.title}</h4>
                      {getUpdateBadge(update.type)}
                      {update.verified && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {update.timestamp}
                      </span>
                      <span>{update.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
