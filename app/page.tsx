"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card as UiCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Sparkles,
  Lightbulb,
  Wrench,
  Rocket,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react"
import Spline from "@splinetool/react-spline" // Add this import
import dynamic from "next/dynamic" // Add dynamic import
// Dynamically import the Card component with SSR disabled
import ImpactSection from "@/components/ImpactSection"; // Adjust the path based on where you save ImpactSection.tsx
const Card = dynamic(() => import("@/components/Card"), { ssr: false })

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const processStepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible")
            }, index * 100)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".fade-in-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll(".process-step")
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add("step-visible")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (processStepsRef.current) {
      stepObserver.observe(processStepsRef.current)
    }

    const horizontalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const content = entry.target.querySelector(".horizontal-scroll-content") as HTMLElement
          if (entry.isIntersecting && content) {
            content.style.animationPlayState = "running"
          }
        })
      },
      { threshold: 0.3 },
    )

    if (horizontalScrollRef.current) {
      horizontalObserver.observe(horizontalScrollRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
      horizontalObserver.disconnect()
      stepObserver.disconnect()
    }
  }, [])

  const processSteps = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Discovery & Strategy",
      description: "We begin by understanding your goals and pain points. Many SMEs feel overwhelmed by manual tasks and costly, complex tools we’re here to change that.",
      step: "01",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Development & Selection",
      description: "Choose from our ready-to-use AI apps, request a custom ERP/CRM, or explore innovative options like our TV-in-a-Card campaigns.",
      step: "02",
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Integration & Testing",
      description: "We connect your new solution with existing systems, ensure seamless automation, and fully test video brochure deployments.",
      step: "03",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch & Measure",
      description: "Once live, you’ll track ROI through an intuitive dashboard. Most clients see time savings and revenue gains that quickly pay back their initial investment.",
      step: "04",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold neon-text tracking-tight">AibotAutomation</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
              >
                Services
              </a>
              <a
                href="#process"
                className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
              >
                Process
              </a>
              <a
                href="#pricing"
                className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
              >
                Pricing
              </a>
              <Button variant="outline" size="sm" className="neon-glow bg-transparent">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent z-0"></div>
        <Spline
          scene="https://prod.spline.design/WX8HB1dYT-gLx021/scene.splinecode"
          className="absolute inset-0 w-full h-full z-0"
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="fade-in-scroll">
            <Badge className="mb-8 neon-glow text-base px-4 py-2" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Business Automation
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 neon-text text-balance leading-tight">
              Make Technology Simple & Powerful
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
              Explain that technology should make life easier, not harder, and that your
              company’s mission is to democratize AI and marketing so anyone can succeed. Mention that
              every purchase also gives back to vulnerable communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="neon-glow text-lg px-10 py-7 font-semibold">
                Start for Free
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 font-semibold glass-effect bg-transparent"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-scroll">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 neon-text">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              We provide smart, custom solutions that permanently fix business challenges—so you save time, reduce costs, and scale with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <UiCard className="fade-in-scroll neon-glow hover:scale-105 transition-all duration-500 glass-effect">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">AI Chatbots</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                 Our AI chatbots deliver instant, human-like conversations, helping businesses provide 24/7 support and improve customer engagement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Saves time with automated responses</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Enhances customer satisfaction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Reduces support team workload</span>
                  </li>
                </ul>
              </CardContent>
            </UiCard>

            <UiCard className="fade-in-scroll neon-glow hover:scale-105 transition-all duration-500 glass-effect">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">Predictive Analytics</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                 We use predictive analytics to forecast trends, customer behavior, and business outcomes, enabling smarter decision-making.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Identifies future opportunities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Minimizes risks with data-driven insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Improves business efficiency</span>
                  </li>
                </ul>
              </CardContent>
            </UiCard>

            <UiCard className="fade-in-scroll neon-glow hover:scale-105 transition-all duration-500 glass-effect">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">Computer Vision</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Our computer vision solutions analyze and interpret images and videos, enabling automation, quality control, and enhanced security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Automates repetitive visual tasks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Boosts monitoring precision</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">Enhances safety and surveillance</span>
                  </li>
                </ul>
              </CardContent>
            </UiCard>
          </div>
        </div>
      </section>

      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-scroll">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 neon-text">Launch in 4 Simple Steps</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our process is designed to simplify digital transformation—helping you move from challenges to lasting solutions with clarity and confidence.
            </p>
          </div>

          <div className="relative" ref={processStepsRef}>
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary hidden md:block -translate-x-1/2"
              aria-hidden="true"
            ></div>

            <div className="space-y-16 md:space-y-24">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`process-step opacity-0 translate-y-8 transition-all duration-700 ease-out md:grid md:grid-cols-2 md:gap-x-16 items-center ${index % 2 !== 0 ? "md:text-right" : ""
                    }`}
                >
                  <div className={`${index % 2 !== 0 ? "md:col-start-2" : ""}`}>
                    <UiCard className="neon-glow glass-effect hover:scale-105 transition-all duration-500 relative">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black font-bold text-lg neon-glow">
                        {step.step}
                      </div>

                      <CardHeader className="pb-6">
                        <div className={`flex items-center gap-4 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                            {step.icon}
                          </div>
                          <div className={`${index % 2 !== 0 ? "md:text-right" : "md:text-left"}`}>
                            <CardTitle className="text-2xl font-bold mb-3">{step.title}</CardTitle>
                            <CardDescription className="text-lg leading-relaxed">{step.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </UiCard>
                  </div>

                  <div
                    className="hidden md:block absolute left-1/2 w-6 h-6 bg-primary rounded-full -translate-x-1/2 neon-glow"
                    style={{ top: `${index * 24 + 12}rem` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
  <div className="absolute inset-0 graph-paper-bg z-0 opacity-10"></div>
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-20 fade-in-scroll">
      <h2 className="text-4xl md:text-6xl font-bold mb-8 neon-text">Our Impact</h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
        Discover the measurable results of our AI automation solutions, trusted by businesses worldwide.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { icon: Users, title: "500+ Clients", description: "Businesses transformed" },
        { icon: TrendingUp, title: "300% ROI", description: "Average return on investment" },
        { icon: Clock, title: "24/7 Support", description: "Round-the-clock assistance" },
        { icon: Star, title: "4.9/5 Rating", description: "Client satisfaction score" },
        { icon: Bot, title: "1000+ Agents", description: "AI agents deployed" },
        { icon: Zap, title: "99.9% Uptime", description: "Reliable performance" },
      ].map((stat, index) => (
        <UiCard
          key={index}
          className="fade-in-scroll neon-glow glass-effect hover:scale-105 transition-all duration-500 relative"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <CardHeader className="text-center py-10">
            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
              <stat.icon className="h-12 w-12 text-primary group-hover:animate-pulse transition-all duration-300" />
            </div>
            <CardTitle className="text-3xl font-bold neon-text mb-3">{stat.title}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground leading-relaxed">
              {stat.description}
            </CardDescription>
          </CardHeader>
        </UiCard>
      ))}
    </div>
  </div>
</section> */}
      <ImpactSection />

      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-scroll">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 neon-text">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to suit businesses of all sizes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
    name: "Starter Plan",
    price: "300–500 TND",
    period: "/month",
    description: "Designed for small businesses; includes access to one AI module and basic CRM features.",
    features: [
      "1 AI Module",
      "Basic CRM features",
    ],
  },
  {
    name: "Professional Plan",
    price: "600–900 TND",
    period: "/month",
    description: "For growing businesses; includes multiple AI apps, ERP modules & a TV-in-a-Card package. One-time setup fee: 1 500–5 000 TND.",
    features: [
      "Multiple AI apps",
      "ERP modules",
      "TV-in-a-Card package",
    ],
    popular: true, 
  },
  {
    name: "Enterprise Plan",
    price: "Custom Pricing",
    period: "",
    description: "Custom solutions for larger organizations; unlimited users, AI development, dedicated support. Contact us for a tailored quote.",
    features: [
      "Unlimited AI apps",
      "Bespoke AI development",
      "Dedicated support",
    ],
  },
            ].map((plan, index) => (
              <UiCard
                key={index}
                className={`fade-in-scroll relative ${plan.popular ? "neon-glow border-primary" : "neon-glow"} hover:scale-105 transition-transform duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6 h-24">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </UiCard>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-scroll">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 neon-text">Showcase</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Explore our interactive demo showcasing the power of our AI-driven interface
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Card (no wrapper) */}
            <div className="order-1">
              <Card />
            </div>

            {/* Right: Spline (no wrapper; explicit responsive height) */}
            <div className="order-2">
              <Spline
                scene="https://prod.spline.design/qNQ8Wc0EXTHcP7Eb/scene.splinecode"
                className="w-full h-[420px] sm:h-[520px] md:h-[520px] lg:h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>


   <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10">
  <div className="max-w-4xl mx-auto text-center fade-in-scroll">
    <h2 className="text-3xl md:text-5xl font-bold mb-6 neon-text">
      Schedule a Demo or Start a Free Trial
    </h2>
    <p className="text-xl text-muted-foreground mb-8">
      We’re eager to learn about your business challenges and show you how AI can streamline your operations. 
      Share your biggest manual task and let us demonstrate a tailored solution.
    </p>

    <form className="grid grid-cols-1 gap-4 mb-8">
      <input 
        type="text" 
        placeholder="Your Name" 
        className="p-3 rounded-lg w-full bg-white/10 text-white"
      />
      <input 
        type="email" 
        placeholder="Your Email" 
        className="p-3 rounded-lg w-full bg-white/10 text-white"
      />
      <textarea 
        placeholder="What’s one manual task you would love to never do again?" 
        className="p-3 rounded-lg w-full bg-white/10 text-white"
      ></textarea>
      <Button 
        type="submit" 
        className="neon-glow text-lg px-10 py-7 font-semibold"
      >
        Submit
      </Button>
    </form>

    <p className="text-sm text-neutral-400">
      When you book a demo, you’re taking the first step toward saving time and growing your business. You’re also helping fund treatment for cancer patients and provide support for individuals with Down syndrome.
    </p>
  </div>
</section>


      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Bot className="h-8 w-8 text-primary" />
                  <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="text-xl font-bold neon-text tracking-tight">AibotAutomation</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                AIBots Automations × TV in a Card transforms businesses through intuitive AI and memorable video marketing and we donate 10% of profits to cancer patients, people with Down syndrome, and families in crisis.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    AI Agent Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    24/7 Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Process Automation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Custom Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Analytics & Insights
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:hello@aibotautomation.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Marwan Belhadj, CEO –
                    marwan@aibotsautomations.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    00216 425 55552
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    0090 506 041 6462
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    123 AI Street
                    <br />
                    Tech City, TC 12345
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">&copy; 2024 AibotAutomation. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}