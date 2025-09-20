"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Heart, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const skillOptions = [
  "Medical/First Aid",
  "Search and Rescue",
  "Food Distribution",
  "Transportation",
  "Communication/Translation",
  "Technical Support",
  "Counseling/Mental Health",
  "Administrative Support",
  "Construction/Repair",
  "Animal Rescue",
]

const availabilityOptions = [
  "Immediate (24/7)",
  "Weekdays only",
  "Weekends only",
  "Evenings after work",
  "Emergency situations only",
  "Flexible schedule",
]

export function VolunteerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    availability: "",
    skills: [] as string[],
    hasTransport: false,
    emergencyContact: "",
    emergencyPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description:
          "Thank you for volunteering. We'll contact you when opportunities match your skills and availability.",
      })

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        availability: "",
        skills: [],
        hasTransport: false,
        emergencyContact: "",
        emergencyPhone: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const isFormValid =
    formData.fullName && formData.email && formData.phone && formData.location && formData.availability

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Volunteer Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, District, State"
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills and Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills & Experience</h3>

            <div className="space-y-2">
              <Label>Skills (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Previous Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe any relevant volunteer experience, training, or certifications"
                rows={3}
              />
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Availability</h3>

            <div className="space-y-2">
              <Label htmlFor="availability">When are you available? *</Label>
              <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasTransport"
                checked={formData.hasTransport}
                onCheckedChange={(checked) => handleInputChange("hasTransport", checked as boolean)}
              />
              <Label htmlFor="hasTransport" className="text-sm">
                I have my own transportation
              </Label>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Name of emergency contact"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="Emergency contact phone number"
                />
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Volunteer Guidelines:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• All volunteers must complete a brief orientation before deployment</li>
                  <li>• Safety training will be provided for specific roles</li>
                  <li>• Volunteers must follow all safety protocols and instructions</li>
                  <li>• Background verification may be required for certain positions</li>
                </ul>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? "Registering..." : "Register as Volunteer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
