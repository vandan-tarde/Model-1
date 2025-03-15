import { NextResponse } from "next/server"
import { login, generateToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { mobileNumber, password } = await request.json()

    // Validate input
    if (!mobileNumber || !password) {
      return NextResponse.json({ error: "Mobile number and password are required" }, { status: 400 })
    }

    // Attempt login
    const result = await login(mobileNumber, password)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Authentication failed" }, { status: 401 })
    }

    // Generate token
    const token = generateToken(result.user!)

    // Return success response with token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: result.user!.id,
        name: result.user!.name,
        email: result.user!.email,
        role: result.user!.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

