import { db, type User } from "./db"

// Mock authentication service
export async function login(
  mobileNumber: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // In a real app, you would hash the password and compare it with the stored hash
    // For demo purposes, we're just checking if the user exists
    const user = await db.getUserByMobile(mobileNumber)

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    // In a real app, you would verify the password here
    // For demo purposes, we're just returning success
    return { success: true, user }
  } catch (error) {
    return { success: false, error: "Authentication failed" }
  }
}

export async function register(
  name: string,
  mobileNumber: string,
  email: string,
  password: string,
  role: "admin" | "teacher" | "student",
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Check if user already exists
    const existingUser = await db.getUserByMobile(mobileNumber)

    if (existingUser) {
      return { success: false, error: "User with this mobile number already exists" }
    }

    // In a real app, you would hash the password before storing it
    // Create new user
    const user = await db.createUser({
      name,
      mobileNumber,
      email,
      role,
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error: "Registration failed" }
  }
}

// Mock JWT token generation
export function generateToken(user: User): string {
  // In a real app, you would use a JWT library to generate a token
  // For demo purposes, we're just returning a mock token
  return `mock_token_${user.id}_${Date.now()}`
}

// Mock token verification
export function verifyToken(token: string): { valid: boolean; userId?: number } {
  // In a real app, you would verify the JWT token
  // For demo purposes, we're just checking if the token starts with "mock_token"
  if (token.startsWith("mock_token_")) {
    const parts = token.split("_")
    if (parts.length >= 3) {
      const userId = Number.parseInt(parts[2])
      return { valid: true, userId }
    }
  }

  return { valid: false }
}

