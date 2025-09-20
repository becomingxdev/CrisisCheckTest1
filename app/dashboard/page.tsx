import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CrisisMap } from "@/components/crisis-map"
import { LiveUpdates } from "@/components/live-updates"
import { ResourceTracker } from "@/components/resource-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Users, MapPin } from "lucide-react"

const stats = [
  {
    title: "Active Incidents",
    value: "12",
    change: "+3 from yesterday",
    trend: "up",
    icon: AlertTriangle,
  },
  {
    title: "People Affected",
    value: "180K",
    change: "+15K from yesterday",
    trend: "up",
    icon: Users,
  },
  {
    title: "Relief Centers",
    value: "48",
    change: "+5 new centers",
    trend: "up",
    icon: MapPin,
  },
  {
    title: "Response Rate",
    value: "94%",
    change: "+2% improvement",
    trend: "up",
    icon: TrendingUp,
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Crisis Management Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time monitoring of crisis situations and emergency response operations
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
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={stat.trend === "up" ? "destructive" : "secondary"} className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Crisis Map - Takes 2 columns */}
            <div className="lg:col-span-2">
              <CrisisMap />
            </div>

            {/* Live Updates - Takes 1 column */}
            <div className="lg:col-span-1">
              <LiveUpdates />
            </div>
          </div>

          {/* Resource Tracker - Full width */}
          <ResourceTracker />
        </div>
      </main>

      <Footer />
    </div>
  )
}
