"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Calendar,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Award,
  Users,
  Clock,
  Settings,
  Bell,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
    { name: "Resources", href: "/dashboard/resources", icon: Clock },
    { name: "Remarks", href: "/dashboard/remarks", icon: MessageSquare },
    { name: "Achievements", href: "/dashboard/achievements", icon: Award },
    { name: "Organizers", href: "/dashboard/organizers", icon: Users },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-background border-r">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <Calendar className="h-6 w-6 text-primary" />
            <span>Event Manager</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                item.href === "/dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden absolute left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Event Manager</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  item.href === "/dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-background flex items-center justify-end px-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

