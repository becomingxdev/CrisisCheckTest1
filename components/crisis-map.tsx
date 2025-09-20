"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Home } from "lucide-react"

interface CrisisLocation {
  id: string
  name: string
  type: "flood" | "cyclone" | "earthquake" | "fire"
  severity: "low" | "medium" | "high" | "critical"
  affectedPopulation: number
  reliefCenters: number
  coordinates: { x: number; y: number }
  description: string
}

const crisisLocations: CrisisLocation[] = [
  {
    id: "1",
    name: "Chennai Flooding",
    type: "flood",
    severity: "high",
    affectedPopulation: 25000,
    reliefCenters: 8,
    coordinates: { x: 65, y: 70 },
    description: "Heavy rainfall causing severe flooding in residential areas",
  },
  {
    id: "2",
    name: "Odisha Cyclone",
    type: "cyclone",
    severity: "critical",
    affectedPopulation: 150000,
    reliefCenters: 25,
    coordinates: { x: 55, y: 45 },
    description: "Category 4 cyclone approaching coastal regions",
  },
  {
    id: "3",
    name: "Delhi Air Quality",
    type: "fire",
    severity: "medium",
    affectedPopulation: 5000000,
    reliefCenters: 15,
    coordinates: { x: 45, y: 25 },
    description: "Severe air pollution due to crop burning",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-green-500"
    case "medium":
      return "bg-yellow-500"
    case "high":
      return "bg-orange-500"
    case "critical":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flood":
      return "🌊"
    case "cyclone":
      return "🌀"
    case "earthquake":
      return "🏔️"
    case "fire":
      return "🔥"
    default:
      return "⚠️"
  }
}

export function CrisisMap() {
  const [selectedLocation, setSelectedLocation] = useState<CrisisLocation | null>(null)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Crisis Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map Container */}
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
            {/* Simplified India Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20" fill="currentColor">
                <path d="M20,20 Q50,10 80,20 Q85,50 80,80 Q50,90 20,80 Q15,50 20,20 Z" />
              </svg>
            </div>

            {/* Crisis Markers */}
            {crisisLocations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(location.severity)} animate-pulse`}>
                  <div
                    className={`w-8 h-8 rounded-full ${getSeverityColor(location.severity)} opacity-30 animate-ping absolute -top-2 -left-2`}
                  ></div>
                </div>
                <div className="text-xs mt-1 text-center font-medium">{getTypeIcon(location.type)}</div>
              </div>
            ))}

            {/* Hover Info */}
            {selectedLocation && (
              <div className="absolute top-4 right-4 bg-background border rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getTypeIcon(selectedLocation.type)}</span>
                  <h4 className="font-semibold">{selectedLocation.name}</h4>
                  <Badge variant={selectedLocation.severity === "critical" ? "destructive" : "secondary"}>
                    {selectedLocation.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selectedLocation.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Affected: {selectedLocation.affectedPopulation.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Relief Centers: {selectedLocation.reliefCenters}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
