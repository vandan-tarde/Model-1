"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function NewEventPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [resources, setResources] = useState([{ type: "", description: "", quantity: "", cost: "" }])

  const addResource = () => {
    setResources([...resources, { type: "", description: "", quantity: "", cost: "" }])
  }

  const removeResource = (index: number) => {
    const newResources = [...resources]
    newResources.splice(index, 1)
    setResources(newResources)
  }

  const updateResource = (index: number, field: string, value: string) => {
    const newResources = [...resources]
    newResources[index] = { ...newResources[index], [field]: value }
    setResources(newResources)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to your API
    // For demo purposes, we'll just navigate back to the events page
    router.push("/dashboard/events")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
        <p className="text-muted-foreground">Fill in the details to create a new college event</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="organizers">Organizers</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details about the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name</Label>
                  <Input id="name" placeholder="Enter event name" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter event location" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter event description" className="min-h-32" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Management</CardTitle>
                <CardDescription>Add resources required for the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Resource {index + 1}</h4>
                      {resources.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeResource(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Resource Type</Label>
                        <Select value={resource.type} onValueChange={(value) => updateResource(index, "type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="venue">Venue</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="staff">Staff/Volunteers</SelectItem>
                            <SelectItem value="financial">Financial</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Quantity/Amount</Label>
                        <Input
                          placeholder="Enter quantity"
                          value={resource.quantity}
                          onChange={(e) => updateResource(index, "quantity", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe the resource"
                        value={resource.description}
                        onChange={(e) => updateResource(index, "description", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Estimated Cost (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Enter cost"
                        value={resource.cost}
                        onChange={(e) => updateResource(index, "cost", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addResource} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Resource
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizers">
            <Card>
              <CardHeader>
                <CardTitle>Organizers & Contributors</CardTitle>
                <CardDescription>Add organizers and contributors for the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Organizer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department/club" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science Department</SelectItem>
                      <SelectItem value="cultural">Cultural Committee</SelectItem>
                      <SelectItem value="sports">Sports Department</SelectItem>
                      <SelectItem value="tech">Tech Club</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Coordinator</Label>
                  <Input placeholder="Enter coordinator name" />
                </div>

                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input type="email" placeholder="Enter contact email" />
                </div>

                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input type="tel" placeholder="Enter contact phone" />
                </div>

                <div className="space-y-2">
                  <Label>Co-organizers/Contributors</Label>
                  <Textarea placeholder="List any co-organizers or contributors" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/events")}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </Tabs>
      </form>
    </div>
  )
}

