import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FactCheckChatbot } from "@/components/fact-check-chatbot"
import { MythVsReality } from "@/components/myth-vs-reality"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Claims Verified Today",
    value: "1,247",
    change: "+156 from yesterday",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "False Information Detected",
    value: "89",
    change: "+12 from yesterday",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    title: "Misleading Content",
    value: "234",
    change: "+28 from yesterday",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    title: "Accuracy Rate",
    value: "94.2%",
    change: "+1.2% improvement",
    icon: TrendingUp,
    color: "text-blue-600",
  },
]

export default function FactCheckPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Fact Check & Information Verification</h1>
            <p className="text-muted-foreground">
              Combat misinformation with AI-powered fact-checking and verified information sources
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Fact-Check Chatbot */}
            <div>
              <FactCheckChatbot />
            </div>

            {/* Quick Tips */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>How to Verify Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Check the Source</h4>
                        <p className="text-sm text-muted-foreground">
                          Verify if the information comes from official government sources, reputable news outlets, or
                          verified social media accounts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Cross-Reference</h4>
                        <p className="text-sm text-muted-foreground">
                          Look for the same information from multiple reliable sources before believing or sharing it.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Use Our AI Assistant</h4>
                        <p className="text-sm text-muted-foreground">
                          Ask our fact-checking chatbot to analyze suspicious claims, links, or images for verification.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Report Misinformation</h4>
                        <p className="text-sm text-muted-foreground">
                          Help us combat false information by reporting suspicious content through our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Myth vs Reality Section */}
          <MythVsReality />
        </div>
      </main>

      <Footer />
    </div>
  )
}
