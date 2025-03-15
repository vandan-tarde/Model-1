import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const announcements = await db.getAnnouncements()

    return NextResponse.json({ announcements })
  } catch (error) {
    console.error("Error fetching announcements:", error)
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
      return NextResponse.json(
        { error: "Forbidden: Only admins and teachers can create announcements" },
        { status: 403 },
      )
    }

    // Parse request body
    const announcementData = await request.json()

    // Validate required fields
    if (!announcementData.title || !announcementData.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Create announcement
    const announcement = await db.createAnnouncement({
      ...announcementData,
      postedBy: user.id,
      postedDate: new Date(),
    })

    return NextResponse.json({ success: true, announcement })
  } catch (error) {
    console.error("Error creating announcement:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

