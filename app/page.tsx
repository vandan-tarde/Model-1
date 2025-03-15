import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, Award, Clock } from "lucide-react"
import React from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">College Event Manager</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">Manage College Events with Ease</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  A comprehensive platform for organizing, tracking, and managing college events and programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/events">
                    <Button size="lg" className="w-full sm:w-auto">
                      Explore Events
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Latest Announcements</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Annual Tech Fest Registration Open</p>
                    <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Cultural Night Volunteers Needed</p>
                    <p className="text-sm text-muted-foreground">Posted 5 days ago</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Workshop on AI & Machine Learning</p>
                    <p className="text-sm text-muted-foreground">Posted 1 week ago</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/announcements">
                    <Button variant="link">View all announcements →</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-primary">
                  <CalendarDays size={36} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Event Management</h3>
                <p className="text-muted-foreground">
                  Create, track, and manage past, current, and upcoming events with ease.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-primary">
                  <Users size={36} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Different access levels for organizers, contributors, and participants.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-primary">
                  <Award size={36} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Achievements</h3>
                <p className="text-muted-foreground">
                  Track and showcase achievements and outcomes from various events.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="mb-4 text-primary">
                  <Clock size={36} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resource Tracking</h3>
                <p className="text-muted-foreground">Monitor and manage time, budget, staff, and other resources.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Event Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border text-center">
                <p className="text-4xl font-bold text-primary mb-2">50+</p>
                <p className="text-muted-foreground">Events Organized</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border text-center">
                <p className="text-4xl font-bold text-primary mb-2">2,500+</p>
                <p className="text-muted-foreground">Student Participants</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border text-center">
                <p className="text-4xl font-bold text-primary mb-2">100+</p>
                <p className="text-muted-foreground">Organizers & Staff</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border text-center">
                <p className="text-4xl font-bold text-primary mb-2">25+</p>
                <p className="text-muted-foreground">Awards Received</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our platform to organize and participate in college events. Register now to get started.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg">Register Now</Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">College Event Manager</h3>
              <p className="text-primary-foreground/80">
                A comprehensive platform for managing college events and programs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/events" className="hover:underline">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/announcements" className="hover:underline">
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="hover:underline">
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:underline">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-primary-foreground/80">Email: info@collegeeventmanager.com</p>
              <p className="text-primary-foreground/80">Phone: +91 1234567890</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
              © {new Date().getFullYear()} College Event Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

