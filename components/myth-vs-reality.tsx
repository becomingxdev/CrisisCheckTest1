"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MythFact {
  id: string
  category: "health" | "disaster" | "security" | "general"
  myth: string
  reality: string
  sources: string[]
  severity: "high" | "medium" | "low"
  lastUpdated: string
}

const mythFacts: MythFact[] = [
  {
    id: "1",
    category: "health",
    myth: "COVID-19 vaccines contain microchips for tracking people",
    reality:
      "COVID-19 vaccines do not contain microchips, tracking devices, or any electronic components. They contain mRNA or viral proteins that help your immune system recognize and fight the virus. This has been verified by multiple health organizations worldwide.",
    sources: [
      "World Health Organization (WHO)",
      "Centers for Disease Control and Prevention (CDC)",
      "Indian Council of Medical Research (ICMR)",
      "Reuters Fact Check",
    ],
    severity: "high",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    category: "disaster",
    myth: "Animals can predict earthquakes days in advance",
    reality:
      "While animals may exhibit unusual behavior before earthquakes, there is no scientific evidence that they can reliably predict earthquakes days in advance. Seismologists use scientific instruments and data analysis for earthquake monitoring and early warning systems.",
    sources: [
      "United States Geological Survey (USGS)",
      "National Center for Seismology, India",
      "Journal of Seismology Research",
      "International Association of Seismology",
    ],
    severity: "medium",
    lastUpdated: "2024-01-10",
  },
  {
    id: "3",
    category: "disaster",
    myth: "Opening windows during a cyclone reduces structural damage",
    reality:
      "Opening windows during a cyclone is dangerous and does NOT reduce structural damage. It can actually increase damage by allowing wind and debris to enter your home. The safest approach is to stay in an interior room away from windows and doors.",
    sources: [
      "National Hurricane Center",
      "India Meteorological Department",
      "National Disaster Management Authority",
      "Emergency Management Guidelines",
    ],
    severity: "high",
    lastUpdated: "2024-01-12",
  },
  {
    id: "4",
    category: "security",
    myth: "5G networks cause health problems and weaken immunity",
    reality:
      "There is no scientific evidence that 5G networks cause health problems or weaken immunity. 5G uses radio frequencies that are non-ionizing and operate within safety limits established by international health organizations.",
    sources: [
      "World Health Organization (WHO)",
      "International Commission on Non-Ionizing Radiation Protection",
      "Telecom Regulatory Authority of India",
      "Scientific Committee on Health, Environmental and Emerging Risks",
    ],
    severity: "medium",
    lastUpdated: "2024-01-08",
  },
  {
    id: "5",
    category: "general",
    myth: "Drinking hot water kills coronavirus in your throat",
    reality:
      "Drinking hot water does not kill coronavirus. While staying hydrated is important for overall health, the virus can infect cells throughout your respiratory system, not just your throat. Vaccination, masking, and hygiene practices are the proven methods of prevention.",
    sources: [
      "World Health Organization (WHO)",
      "All India Institute of Medical Sciences (AIIMS)",
      "Indian Medical Association",
      "Fact-checking organizations",
    ],
    severity: "medium",
    lastUpdated: "2024-01-05",
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "health":
      return "bg-blue-100 text-blue-800"
    case "disaster":
      return "bg-red-100 text-red-800"
    case "security":
      return "bg-purple-100 text-purple-800"
    case "general":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-600 hover:bg-red-700"
    case "medium":
      return "bg-orange-600 hover:bg-orange-700"
    case "low":
      return "bg-yellow-600 hover:bg-yellow-700"
    default:
      return "bg-gray-600 hover:bg-gray-700"
  }
}

export function MythVsReality() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredMyths =
    selectedCategory === "all" ? mythFacts : mythFacts.filter((myth) => myth.category === selectedCategory)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "health", label: "Health" },
    { value: "disaster", label: "Disaster" },
    { value: "security", label: "Security" },
    { value: "general", label: "General" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Myth vs. Reality</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredMyths.map((item) => (
            <Collapsible key={item.id} open={openItems.includes(item.id)} onOpenChange={() => toggleItem(item.id)}>
              <Card className="border-l-4 border-l-red-500">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-600">MYTH</span>
                          <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                          <Badge className={getSeverityColor(item.severity)}>{item.severity} priority</Badge>
                        </div>
                        <p className="text-sm font-medium text-left">{item.myth}</p>
                      </div>
                      {openItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="border-l-4 border-l-green-500 pl-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">REALITY</span>
                      </div>
                      <p className="text-sm">{item.reality}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Verified Sources:</h4>
                        <ul className="space-y-1">
                          {item.sources.map((source, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ExternalLink className="h-3 w-3" />
                              {source}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
