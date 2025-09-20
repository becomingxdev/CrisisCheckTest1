"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  username: string
  role: "admin" | "volunteer" | "user"
  name: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("crisisguard-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call - replace with actual authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    if (username === "admin" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        username: "admin",
        role: "admin",
        name: "Administrator",
      }
      setUser(adminUser)
      localStorage.setItem("crisisguard-user", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    } else if (username === "volunteer" && password === "volunteer123") {
      const volunteerUser: User = {
        id: "2",
        username: "volunteer",
        role: "volunteer",
        name: "Volunteer User",
      }
      setUser(volunteerUser)
      localStorage.setItem("crisisguard-user", JSON.stringify(volunteerUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("crisisguard-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
