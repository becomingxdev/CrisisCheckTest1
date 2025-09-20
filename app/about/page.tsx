"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, Users, Globe, CheckCircle, Award, TrendingUp, Clock, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef } from "react"

const features = [
  {
    icon: Shield,
    titleKey: "Real-Time Crisis Monitoring",
    descriptionKey:
      "Advanced monitoring systems track crisis situations across the country with live updates and verified information.",
  },
  {
    icon: CheckCircle,
    titleKey: "AI-Powered Fact Checking",
    descriptionKey:
      "Combat misinformation with our intelligent fact-checking system that verifies claims and identifies false information.",
  },
  {
    icon: Users,
    titleKey: "Community Engagement",
    descriptionKey:
      "Connect citizens, volunteers, and officials through our community platform for coordinated crisis response.",
  },
  {
    icon: Globe,
    titleKey: "Multilingual Support",
    descriptionKey:
      "Accessible in multiple languages including English, Hindi, and Tamil to serve diverse communities.",
  },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: "Lives Protected", value: "2.5M+", icon: Shield, color: "text-blue-600" },
    { label: "Crisis Responses", value: "15K+", icon: Target, color: "text-green-600" },
    { label: "Active Volunteers", value: "50K+", icon: Users, color: "text-purple-600" },
    { label: "Verified Reports", value: "100K+", icon: CheckCircle, color: "text-red-600" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20 relative overflow-hidden"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-100 text-red-800 border-red-200" variant="outline">
                {t.nav.about} CrisisGuard
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                {t.about.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 text-balance mb-12 leading-relaxed">
                {t.about.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Monitoring
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Pan-India Coverage
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Real-time Updates
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white" ref={(el) => (sectionsRef.current[1] = el)}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">{t.about.mission}</h2>
              <p className="text-xl text-slate-600 leading-relaxed">{t.about.missionDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={stat.label}
                    className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="pt-8 pb-6">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6`}
                      >
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                      <div className="text-4xl font-bold mb-3 text-slate-900">{stat.value}</div>
                      <p className="text-slate-600 font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-24 bg-gradient-to-br from-slate-50 to-blue-50"
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">{t.about.features}</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.about.featuresDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.titleKey}
                    className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-red-100">
                          <Icon className="h-7 w-7 text-red-600" />
                        </div>
                        <CardTitle className="text-xl text-slate-900">{feature.titleKey}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">{feature.descriptionKey}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-24 bg-white" ref={(el) => (sectionsRef.current[3] = el)}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">{t.about.technology}</h2>
                <p className="text-xl text-slate-600 leading-relaxed">{t.about.technologyDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Award,
                    title: "AI-Powered Verification",
                    description:
                      "Advanced machine learning algorithms analyze and verify information in real-time to combat misinformation.",
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: Shield,
                    title: "Secure Infrastructure",
                    description:
                      "Enterprise-grade security ensures platform availability and data protection during high-traffic crisis periods.",
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    icon: Globe,
                    title: "Scalable Architecture",
                    description:
                      "Cloud-native design scales automatically to handle millions of users during emergency situations.",
                    color: "bg-purple-100 text-purple-600",
                  },
                ].map((tech, index) => {
                  const Icon = tech.icon
                  return (
                    <Card
                      key={tech.title}
                      className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tech.color} mb-4`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg text-slate-900">{tech.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 leading-relaxed">{tech.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section
          className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden"
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.about.getInvolved}</h2>
            <p className="text-xl mb-16 opacity-90 max-w-3xl mx-auto leading-relaxed">
              {t.about.getInvolvedDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Users,
                  title: t.about.volunteer,
                  description: "Join our volunteer network and help during crisis situations.",
                },
                {
                  icon: Shield,
                  title: t.about.report,
                  description: "Help us maintain accurate information by reporting incidents.",
                },
                {
                  icon: CheckCircle,
                  title: t.about.verify,
                  description: "Use our fact-checking tools to combat misinformation.",
                },
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <Card
                    key={action.title}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-8 text-center">
                      <Icon className="h-12 w-12 mx-auto mb-6 opacity-90" />
                      <h3 className="font-bold text-xl mb-4">{action.title}</h3>
                      <p className="opacity-90 leading-relaxed">{action.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  )
}
