"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save } from "lucide-react"

interface QuickLink {
  id: string
  title: string
  url: string
}

export function SiteSettings() {
  const [bannerText, setBannerText] = useState("🚨 Emergency Alert: Stay informed with verified updates")
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([
    { id: "1", title: "Emergency Contacts", url: "/emergency-contacts" },
    { id: "2", title: "Evacuation Routes", url: "/evacuation-routes" },
    { id: "3", title: "Safety Guidelines", url: "/safety-guidelines" },
  ])

  const addQuickLink = () => {
    const newLink: QuickLink = {
      id: Date.now().toString(),
      title: "",
      url: "",
    }
    setQuickLinks([...quickLinks, newLink])
  }

  const updateQuickLink = (id: string, field: "title" | "url", value: string) => {
    setQuickLinks(quickLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const removeQuickLink = (id: string) => {
    setQuickLinks(quickLinks.filter((link) => link.id !== id))
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", { bannerText, quickLinks })
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Homepage Banner Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage Banner</CardTitle>
          <CardDescription>Manage the emergency banner text displayed on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="banner-text">Banner Text</Label>
              <Textarea
                id="banner-text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Enter emergency banner text..."
                className="mt-1"
              />
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                <strong>Preview:</strong> {bannerText}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links Management */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Manage the quick links displayed in the footer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quickLinks.map((link, index) => (
              <div key={link.id} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor={`title-${link.id}`}>Title</Label>
                  <Input
                    id={`title-${link.id}`}
                    value={link.title}
                    onChange={(e) => updateQuickLink(link.id, "title", e.target.value)}
                    placeholder="Link title"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`url-${link.id}`}>URL</Label>
                  <Input
                    id={`url-${link.id}`}
                    value={link.url}
                    onChange={(e) => updateQuickLink(link.id, "url", e.target.value)}
                    placeholder="/page-url"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeQuickLink(link.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addQuickLink} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Quick Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
