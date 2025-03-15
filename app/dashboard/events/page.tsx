"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample data for events
const events = [
  {
    id: 1,
    name: "Annual Tech Fest",
    date: "May 15-17, 2023",
    location: "Main Auditorium",
    organizer: "Computer Science Department",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Cultural Night",
    date: "June 5, 2023",
    location: "Open Air Theatre",
    organizer: "Cultural Committee",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Workshop on AI & ML",
    date: "May 25, 2023",
    location: "Seminar Hall",
    organizer: "AI Research Club",
    status: "upcoming",
  },
  {
    id: 4,
    name: "Photography Exhibition",
    date: "April 10-20, 2023",
    location: "Art Gallery",
    organizer: "Photography Club",
    status: "ongoing",
  },
  {
    id: 5,
    name: "Sports Meet",
    date: "March 5-10, 2023",
    location: "Sports Complex",
    organizer: "Sports Department",
    status: "past",
  },
  {
    id: 6,
    name: "Hackathon 2023",
    date: "February 15-16, 2023",
    location: "Computer Labs",
    organizer: "Tech Club",
    status: "past",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  // Filter events based on search term and selected tab
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    return matchesSearch && event.status === selectedTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage all college events and programs</p>
        </div>
        <Link href="/dashboard/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by organizer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizers</SelectItem>
              <SelectItem value="cs">Computer Science Dept</SelectItem>
              <SelectItem value="cultural">Cultural Committee</SelectItem>
              <SelectItem value="sports">Sports Department</SelectItem>
              <SelectItem value="tech">Tech Club</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <EventsTable events={filteredEvents} />
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <EventsTable events={filteredEvents} />
        </TabsContent>
        <TabsContent value="ongoing" className="space-y-4">
          <EventsTable events={filteredEvents} />
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <EventsTable events={filteredEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EventsTable({ events }: { events: any[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Organizer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No events found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{event.organizer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.status === "upcoming" ? "default" : event.status === "ongoing" ? "secondary" : "outline"
                      }
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Event</DropdownMenuItem>
                        <DropdownMenuItem>Manage Resources</DropdownMenuItem>
                        <DropdownMenuItem>View Participants</DropdownMenuItem>
                        {event.status === "past" && <DropdownMenuItem>View Outcomes</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

