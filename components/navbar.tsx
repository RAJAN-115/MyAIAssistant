"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/education", label: "Education" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled && "shadow-sm",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Typography variant="h6" className="font-bold">
              Rajan
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </Typography>
            <Typography variant="mutedText" className="hidden sm:block">
              AI-Powered Portfolio
            </Typography>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === route.href
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              <Link href={route.href}>{route.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileNav routes={routes} />
        </div>
      </div>
    </header>
  )
}

