"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, AlertTriangle, MapPin, Calendar } from "lucide-react"

interface CrisisReport {
  id: string
  type: "crisis" | "disinformation"
  title: string
  description: string
  location: string
  reportedBy: string
  reportedAt: string
  status: "pending" | "verified" | "dismissed"
  severity: "low" | "medium" | "high" | "critical"
  category: string
}

const mockReports: CrisisReport[] = [
  {
    id: "1",
    type: "crisis",
    title: "Flooding in Coastal Areas",
    description:
      "Heavy rainfall causing severe flooding in multiple coastal districts. Roads blocked, power outages reported.",
    location: "Chennai, Tamil Nadu",
    reportedBy: "Local Resident",
    reportedAt: "2024-03-15T10:30:00Z",
    status: "pending",
    severity: "high",
    category: "Natural Disaster",
  },
  {
    id: "2",
    type: "disinformation",
    title: "False Vaccine Information",
    description: "Viral social media post spreading false information about vaccine side effects.",
    location: "Mumbai, Maharashtra",
    reportedBy: "Health Worker",
    reportedAt: "2024-03-14T15:45:00Z",
    status: "verified",
    severity: "medium",
    category: "Health Misinformation",
  },
  {
    id: "3",
    type: "crisis",
    title: "Building Collapse",
    description: "Old residential building collapsed due to structural failure. Rescue operations ongoing.",
    location: "Delhi, NCR",
    reportedBy: "Emergency Services",
    reportedAt: "2024-03-13T08:20:00Z",
    status: "verified",
    severity: "critical",
    category: "Infrastructure",
  },
]

export function CrisisReports() {
  const [reports] = useState<CrisisReport[]>(mockReports)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "dismissed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "dismissed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "crisis" ? (
      <AlertTriangle className="h-4 w-4 text-red-600" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-blue-600" />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crisis Reports</CardTitle>
        <CardDescription>Review and manage submitted crisis and disinformation reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(report.type)}
                    <h3 className="font-semibold text-lg">{report.title}</h3>
                    <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{report.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(report.reportedAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Reported by:</strong> {report.reportedBy}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.category}</Badge>
                  <Badge variant="outline">{report.type}</Badge>
                </div>

                {report.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark as Verified
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
