import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReportForm } from "@/components/report-form"
import { CommunityForum } from "@/components/community-forum"
import { VolunteerRegistration } from "@/components/volunteer-registration"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, AlertTriangle, Heart } from "lucide-react"

const stats = [
  {
    title: "Active Volunteers",
    value: "2,847",
    change: "+156 this week",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Community Posts",
    value: "1,234",
    change: "+89 today",
    icon: MessageSquare,
    color: "text-green-600",
  },
  {
    title: "Reports Submitted",
    value: "456",
    change: "+23 today",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    title: "Lives Helped",
    value: "15,678",
    change: "+234 this week",
    icon: Heart,
    color: "text-red-600",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Community Resources & Engagement</h1>
            <p className="text-muted-foreground">
              Report incidents, connect with your community, and volunteer to help during crisis situations
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Report Form */}
            <ReportForm />

            {/* Community Forum and Volunteer Registration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CommunityForum />
              <VolunteerRegistration />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
