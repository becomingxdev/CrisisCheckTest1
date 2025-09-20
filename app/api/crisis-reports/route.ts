import { type NextRequest, NextResponse } from "next/server"

interface CrisisReportData {
  type: "crisis" | "disinformation"
  title: string
  description: string
  location: string
  reportedBy: string
  category: string
  severity: "low" | "medium" | "high" | "critical"
}

// Mock database - in production, this would be a real database
const crisisReports: Array<CrisisReportData & { id: string; status: string; reportedAt: string }> = [
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const severity = searchParams.get("severity")

    let filteredReports = crisisReports

    if (type && type !== "all") {
      filteredReports = filteredReports.filter((report) => report.type === type)
    }

    if (status && status !== "all") {
      filteredReports = filteredReports.filter((report) => report.status === status)
    }

    if (severity && severity !== "all") {
      filteredReports = filteredReports.filter((report) => report.severity === severity)
    }

    // Sort by most recent first
    filteredReports.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())

    return NextResponse.json({
      success: true,
      data: filteredReports,
      total: filteredReports.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch crisis reports" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, title, description, location, reportedBy, category, severity } = body as CrisisReportData

    // Validate required fields
    if (!type || !title || !description || !location || !reportedBy || !category || !severity) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Create new crisis report
    const newReport = {
      id: Date.now().toString(),
      type,
      title,
      description,
      location,
      reportedBy,
      category,
      severity,
      status: "pending",
      reportedAt: new Date().toISOString(),
    }

    crisisReports.push(newReport)

    return NextResponse.json(
      {
        success: true,
        message: "Crisis report submitted successfully",
        data: newReport,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit crisis report" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 })
    }

    const reportIndex = crisisReports.findIndex((r) => r.id === id)
    if (reportIndex === -1) {
      return NextResponse.json({ success: false, error: "Crisis report not found" }, { status: 404 })
    }

    crisisReports[reportIndex].status = status

    return NextResponse.json({
      success: true,
      message: "Crisis report status updated successfully",
      data: crisisReports[reportIndex],
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update crisis report" }, { status: 500 })
  }
}
