import { type NextRequest, NextResponse } from "next/server"

interface VolunteerData {
  name: string
  email: string
  phone: string
  skills: string[]
  location: string
  availability: string
}

// Mock database - in production, this would be a real database
const volunteers: Array<VolunteerData & { id: string; status: string; joinDate: string }> = [
  {
    id: "1",
    name: "Dr. Sarah Kumar",
    email: "sarah.kumar@email.com",
    phone: "+91 98765 43210",
    skills: ["Medical Aid", "Emergency Response"],
    location: "Mumbai, Maharashtra",
    availability: "Weekends",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Rajesh Patel",
    email: "rajesh.patel@email.com",
    phone: "+91 87654 32109",
    skills: ["Search & Rescue", "First Aid"],
    location: "Ahmedabad, Gujarat",
    availability: "Full-time",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 76543 21098",
    skills: ["Communication", "Coordination"],
    location: "Delhi, NCR",
    availability: "Evenings",
    status: "pending",
    joinDate: "2024-03-10",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")

    let filteredVolunteers = volunteers

    if (search) {
      filteredVolunteers = volunteers.filter(
        (volunteer) =>
          volunteer.name.toLowerCase().includes(search.toLowerCase()) ||
          volunteer.location.toLowerCase().includes(search.toLowerCase()) ||
          volunteer.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (status && status !== "all") {
      filteredVolunteers = filteredVolunteers.filter((volunteer) => volunteer.status === status)
    }

    return NextResponse.json({
      success: true,
      data: filteredVolunteers,
      total: filteredVolunteers.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch volunteers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, skills, location, availability } = body as VolunteerData

    // Validate required fields
    if (!name || !email || !phone || !skills || !location || !availability) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingVolunteer = volunteers.find((v) => v.email === email)
    if (existingVolunteer) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 })
    }

    // Create new volunteer
    const newVolunteer = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      skills: Array.isArray(skills) ? skills : [skills],
      location,
      availability,
      status: "pending",
      joinDate: new Date().toISOString().split("T")[0],
    }

    volunteers.push(newVolunteer)

    return NextResponse.json(
      {
        success: true,
        message: "Volunteer registered successfully",
        data: newVolunteer,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to register volunteer" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 })
    }

    const volunteerIndex = volunteers.findIndex((v) => v.id === id)
    if (volunteerIndex === -1) {
      return NextResponse.json({ success: false, error: "Volunteer not found" }, { status: 404 })
    }

    volunteers[volunteerIndex].status = status

    return NextResponse.json({
      success: true,
      message: "Volunteer status updated successfully",
      data: volunteers[volunteerIndex],
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update volunteer" }, { status: 500 })
  }
}
