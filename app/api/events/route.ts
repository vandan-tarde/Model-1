import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "upcoming" | "ongoing" | "past" | null

    const events = await db.getEvents(status || undefined)

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const token = authHeader.split(" ")[1]
    const tokenVerification = verifyToken(token)

    if (!tokenVerification.valid || !tokenVerification.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user
    const user = await db.getUserById(tokenVerification.userId)

    if (!user || (user.role !== "admin" && user.role !== "teacher")) {
      return NextResponse.json({ error: "Forbidden: Only admins and teachers can create events" }, { status: 403 })
    }

    // Parse request body
    const eventData = await request.json()

    // Validate required fields
    if (!eventData.name || !eventData.startDate || !eventData.endDate) {
      return NextResponse.json({ error: "Name, start date, and end date are required" }, { status: 400 })
    }

    // Create event
    const event = await db.createEvent({
      ...eventData,
      createdBy: user.id,
      status: "upcoming", // Default status for new events
    })

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

