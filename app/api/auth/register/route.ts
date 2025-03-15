import { NextResponse } from "next/server"
import { register, generateToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { name, mobileNumber, email, password, role } = await request.json()

    // Validate input
    if (!name || !mobileNumber || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate mobile number format (should start with +91)
    if (!mobileNumber.startsWith("+91") && !mobileNumber.startsWith("91")) {
      return NextResponse.json({ error: "Mobile number must start with +91" }, { status: 400 })
    }

    // Attempt registration
    const result = await register(
      name,
      mobileNumber,
      email,
      password,
      role || "student", // Default to student role
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Registration failed" }, { status: 400 })
    }

    // Generate token
    const token = generateToken(result.user!)

    // Return success response with token
    return NextResponse.json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: result.user!.id,
        name: result.user!.name,
        email: result.user!.email,
        role: result.user!.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

