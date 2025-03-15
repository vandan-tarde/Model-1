// This is a mock database service for demonstration purposes
// In a real application, you would use a real database like MySQL

// Define types for our database models
export interface User {
    id: number
    name: string
    email: string
    mobileNumber: string
    role: "admin" | "teacher" | "student"
    createdAt: Date
  }
  
  export interface Event {
    id: number
    name: string
    description: string
    startDate: Date
    endDate: Date
    location: string
    category: string
    status: "upcoming" | "ongoing" | "past"
    createdBy: number // User ID
    createdAt: Date
  }
  
  export interface Announcement {
    id: number
    title: string
    content: string
    category: string
    postedBy: number // User ID
    postedDate: Date
    isPinned: boolean
    visibility: "all" | "students" | "staff" | "organizers"
  }
  
  export interface Resource {
    id: number
    eventId: number
    type: string
    description: string
    quantity: string
    cost: number
  }
  
  export interface Remark {
    id: number
    eventId: number
    userId: number
    content: string
    rating: number
    createdAt: Date
  }
  
  export interface Achievement {
    id: number
    eventId: number
    title: string
    description: string
    achievedBy: string
    achievedDate: Date
  }
  
  export interface EventOutcome {
    id: number
    eventId: number
    description: string
    metrics: string
    createdBy: number // User ID
    createdAt: Date
  }
  
  export interface EventOrganizer {
    id: number
    eventId: number
    userId: number
    role: string
  }
  
  // Mock database service
  class Database {
    private users: User[] = []
    private events: Event[] = []
    private announcements: Announcement[] = []
    private resources: Resource[] = []
    private remarks: Remark[] = []
    private achievements: Achievement[] = []
    private eventOutcomes: EventOutcome[] = []
    private eventOrganizers: EventOrganizer[] = []
  
    // User methods
    async createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
      const newUser = {
        ...user,
        id: this.users.length + 1,
        createdAt: new Date(),
      }
      this.users.push(newUser)
      return newUser
    }
  
    async getUserByMobile(mobileNumber: string): Promise<User | null> {
      return this.users.find((user) => user.mobileNumber === mobileNumber) || null
    }
  
    async getUserById(id: number): Promise<User | null> {
      return this.users.find((user) => user.id === id) || null
    }
  
    // Event methods
    async createEvent(event: Omit<Event, "id" | "createdAt">): Promise<Event> {
      const newEvent = {
        ...event,
        id: this.events.length + 1,
        createdAt: new Date(),
      }
      this.events.push(newEvent)
      return newEvent
    }
  
    async getEvents(status?: "upcoming" | "ongoing" | "past"): Promise<Event[]> {
      if (status) {
        return this.events.filter((event) => event.status === status)
      }
      return this.events
    }
  
    async getEventById(id: number): Promise<Event | null> {
      return this.events.find((event) => event.id === id) || null
    }
  
    // Announcement methods
    async createAnnouncement(announcement: Omit<Announcement, "id">): Promise<Announcement> {
      const newAnnouncement = {
        ...announcement,
        id: this.announcements.length + 1,
      }
      this.announcements.push(newAnnouncement)
      return newAnnouncement
    }
  
    async getAnnouncements(): Promise<Announcement[]> {
      return this.announcements
    }
  
    // Resource methods
    async createResource(resource: Omit<Resource, "id">): Promise<Resource> {
      const newResource = {
        ...resource,
        id: this.resources.length + 1,
      }
      this.resources.push(newResource)
      return newResource
    }
  
    async getResourcesByEventId(eventId: number): Promise<Resource[]> {
      return this.resources.filter((resource) => resource.eventId === eventId)
    }
  
    // Remark methods
    async createRemark(remark: Omit<Remark, "id" | "createdAt">): Promise<Remark> {
      const newRemark = {
        ...remark,
        id: this.remarks.length + 1,
        createdAt: new Date(),
      }
      this.remarks.push(newRemark)
      return newRemark
    }
  
    async getRemarksByEventId(eventId: number): Promise<Remark[]> {
      return this.remarks.filter((remark) => remark.eventId === eventId)
    }
  
    // Achievement methods
    async createAchievement(achievement: Omit<Achievement, "id">): Promise<Achievement> {
      const newAchievement = {
        ...achievement,
        id: this.achievements.length + 1,
      }
      this.achievements.push(newAchievement)
      return newAchievement
    }
  
    async getAchievementsByEventId(eventId: number): Promise<Achievement[]> {
      return this.achievements.filter((achievement) => achievement.eventId === eventId)
    }
  
    // Event Outcome methods
    async createEventOutcome(outcome: Omit<EventOutcome, "id" | "createdAt">): Promise<EventOutcome> {
      const newOutcome = {
        ...outcome,
        id: this.eventOutcomes.length + 1,
        createdAt: new Date(),
      }
      this.eventOutcomes.push(newOutcome)
      return newOutcome
    }
  
    async getEventOutcomeByEventId(eventId: number): Promise<EventOutcome | null> {
      return this.eventOutcomes.find((outcome) => outcome.eventId === eventId) || null
    }
  
    // Event Organizer methods
    async createEventOrganizer(organizer: Omit<EventOrganizer, "id">): Promise<EventOrganizer> {
      const newOrganizer = {
        ...organizer,
        id: this.eventOrganizers.length + 1,
      }
      this.eventOrganizers.push(newOrganizer)
      return newOrganizer
    }
  
    async getOrganizersByEventId(eventId: number): Promise<EventOrganizer[]> {
      return this.eventOrganizers.filter((organizer) => organizer.eventId === eventId)
    }
  }
  
  // Export a singleton instance
  export const db = new Database()
  
  