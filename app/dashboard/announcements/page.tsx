"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample data for announcements
const announcements = [
  {
    id: 1,
    title: "Annual Tech Fest Registration Open",
    content:
      "Registration for the Annual Tech Fest is now open. All students are encouraged to participate in various events and competitions.",
    postedBy: "Admin",
    postedDate: "2 days ago",
    category: "event",
  },
  {
    id: 2,
    title: "Cultural Night Volunteers Needed",
    content:
      "We are looking for volunteers to help organize the upcoming Cultural Night. Interested students can register at the Student Affairs Office.",
    postedBy: "Cultural Committee",
    postedDate: "5 days ago",
    category: "volunteer",
  },
  {
    id: 3,
    title: "Workshop on AI & Machine Learning",
    content:
      "A workshop on AI & Machine Learning will be conducted on May 25, 2023. All interested students can register online.",
    postedBy: "AI Research Club",
    postedDate: "1 week ago",
    category: "workshop",
  },
  {
    id: 4,
    title: "Library Timings Extended During Exams",
    content: "The college library will remain open until 10 PM during the examination period from May 1 to May 15.",
    postedBy: "Library Department",
    postedDate: "2 weeks ago",
    category: "general",
  },
  {
    id: 5,
    title: "Campus Recruitment Drive",
    content:
      "A campus recruitment drive will be held on June 10, 2023. All final year students are eligible to participate.",
    postedBy: "Placement Cell",
    postedDate: "3 weeks ago",
    category: "placement",
  },
]

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter announcements based on search term
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.postedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Manage and view all college announcements</p>
        </div>
        <Link href="/dashboard/announcements/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Announcement
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search announcements..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Posted By</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No announcements found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{announcement.postedBy}</TableCell>
                    <TableCell className="hidden md:table-cell">{announcement.postedDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          announcement.category === "event"
                            ? "default"
                            : announcement.category === "workshop"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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
    </div>
  )
}

