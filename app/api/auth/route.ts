import { type NextRequest, NextResponse } from "next/server"

interface LoginRequest {
  username: string
  password: string
}

interface User {
  id: string
  username: string
  role: "admin" | "volunteer" | "user"
  name: string
}

// Mock user database - in production, this would be a real database with hashed passwords
const users: Array<User & { password: string }> = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In production, this would be hashed
    role: "admin",
    name: "Administrator",
  },
  {
    id: "2",
    username: "volunteer",
    password: "volunteer123", // In production, this would be hashed
    role: "volunteer",
    name: "Volunteer User",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body as LoginRequest

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required" }, { status: 400 })
    }

    // Find user by username
    const user = users.find((u) => u.username === username)

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: userWithoutPassword,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}
