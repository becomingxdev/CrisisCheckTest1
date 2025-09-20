import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Your Trusted Source for Crisis Information
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-8">
                Real-time updates, verified facts, and essential resources to keep you safe and informed during
                emergencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/dashboard">
                    View Live Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/fact-check">Check Information</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Crisis Management</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides everything you need to stay informed and safe during crisis situations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Real-Time Alerts</CardTitle>
                  <CardDescription>
                    Get instant notifications about developing crisis situations in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Fact Verification</CardTitle>
                  <CardDescription>
                    Verify information and combat misinformation with our AI-powered fact-checker
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/fact-check">Check Facts</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Community Resources</CardTitle>
                  <CardDescription>
                    Access essential resources and connect with your community during emergencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/resources">View Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Emergency Situation?</h3>
                <p className="text-primary-foreground/90">
                  For immediate assistance, contact emergency services or use our crisis guide.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" size="lg">
                  Call Emergency: 112
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Crisis Guide
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function HomePage() {
  return <HomeContent />
}
