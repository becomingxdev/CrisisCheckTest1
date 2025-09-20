import { type NextRequest, NextResponse } from "next/server"

interface QuickLink {
  id: string
  title: string
  url: string
}

interface SiteSettings {
  bannerText: string
  quickLinks: QuickLink[]
}

// Mock database - in production, this would be a real database
const siteSettings: SiteSettings = {
  bannerText: "🚨 Emergency Alert: Stay informed with verified updates",
  quickLinks: [
    { id: "1", title: "Emergency Contacts", url: "/emergency-contacts" },
    { id: "2", title: "Evacuation Routes", url: "/evacuation-routes" },
    { id: "3", title: "Safety Guidelines", url: "/safety-guidelines" },
  ],
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: siteSettings,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch site settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { bannerText, quickLinks } = body

    if (bannerText !== undefined) {
      siteSettings.bannerText = bannerText
    }

    if (quickLinks !== undefined) {
      // Validate quick links structure
      if (!Array.isArray(quickLinks)) {
        return NextResponse.json({ success: false, error: "Quick links must be an array" }, { status: 400 })
      }

      // Validate each quick link
      for (const link of quickLinks) {
        if (!link.id || !link.title || !link.url) {
          return NextResponse.json(
            { success: false, error: "Each quick link must have id, title, and url" },
            { status: 400 },
          )
        }
      }

      siteSettings.quickLinks = quickLinks
    }

    return NextResponse.json({
      success: true,
      message: "Site settings updated successfully",
      data: siteSettings,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update site settings" }, { status: 500 })
  }
}
