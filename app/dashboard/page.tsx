import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Users, Award, Clock, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of all college events.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/events/new">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
          <Link href="/dashboard/announcements/new">
            <Button variant="outline">Create Announcement</Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Allocated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Annual Tech Fest</CardTitle>
                <CardDescription>May 15-17, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Location: Main Auditorium</p>
                  <p>Organizer: Computer Science Department</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Register</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cultural Night</CardTitle>
                <CardDescription>June 5, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Location: Open Air Theatre</p>
                  <p>Organizer: Cultural Committee</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Register</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Workshop on AI & ML</CardTitle>
                <CardDescription>May 25, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Location: Seminar Hall</p>
                  <p>Organizer: AI Research Club</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Register</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Link href="/dashboard/events">
              <Button variant="link" className="gap-1">
                View all events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="ongoing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Photography Exhibition</CardTitle>
                <CardDescription>April 10-20, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Location: Art Gallery</p>
                  <p>Organizer: Photography Club</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Visit Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Link href="/dashboard/events">
              <Button variant="link" className="gap-1">
                View all events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sports Meet</CardTitle>
                <CardDescription>March 5-10, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Location: Sports Complex</p>
                  <p>Organizer: Sports Department</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    View Outcomes
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Hackathon 2023</CardTitle>
                <CardDescription>February 15-16, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Location: Computer Labs</p>
                  <p>Organizer: Tech Club</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    View Outcomes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Link href="/dashboard/events">
              <Button variant="link" className="gap-1">
                View all events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Announcements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Announcements</h2>
          <Link href="/dashboard/announcements">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Annual Tech Fest Registration Open</CardTitle>
              <CardDescription>Posted 2 days ago by Admin</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Registration for the Annual Tech Fest is now open. All students are encouraged to participate in various
                events and competitions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Cultural Night Volunteers Needed</CardTitle>
              <CardDescription>Posted 5 days ago by Cultural Committee</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We are looking for volunteers to help organize the upcoming Cultural Night. Interested students can
                register at the Student Affairs Office.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

