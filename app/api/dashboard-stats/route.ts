import { NextResponse } from "next/server"

// Mock dashboard statistics - in production, this would query a real database
const dashboardStats = {
  activeIncidents: 23,
  peopleAffected: 15420,
  reliefCenters: 45,
  responseRate: 94.2,
  totalVolunteers: 247,
  activeReports: 23,
  verifiedFacts: 1429,
  systemStatus: "online",
  recentUpdates: [
    {
      id: "1",
      type: "crisis",
      title: "Flooding in Chennai - Relief Operations Ongoing",
      timestamp: "2024-03-15T14:30:00Z",
      severity: "high",
    },
    {
      id: "2",
      type: "verification",
      title: "False Information About Vaccine Side Effects - Debunked",
      timestamp: "2024-03-15T13:45:00Z",
      severity: "medium",
    },
    {
      id: "3",
      type: "resource",
      title: "New Relief Center Established in Delhi",
      timestamp: "2024-03-15T12:20:00Z",
      severity: "low",
    },
  ],
  crisisMap: {
    activeZones: [
      { id: "1", location: "Chennai, Tamil Nadu", type: "flood", severity: "high" },
      { id: "2", location: "Mumbai, Maharashtra", type: "misinformation", severity: "medium" },
      { id: "3", location: "Delhi, NCR", type: "infrastructure", severity: "critical" },
    ],
  },
}

export async function GET() {
  try {
    // Simulate some real-time variation in stats
    const stats = {
      ...dashboardStats,
      activeIncidents: dashboardStats.activeIncidents + Math.floor(Math.random() * 3) - 1,
      peopleAffected: dashboardStats.peopleAffected + Math.floor(Math.random() * 100) - 50,
      responseRate: Math.round((dashboardStats.responseRate + (Math.random() * 2 - 1)) * 10) / 10,
    }

    return NextResponse.json({
      success: true,
      data: stats,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}
