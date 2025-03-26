"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  routes: { href: string; label: string }[]
}

export function MobileNav({ routes }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close the mobile menu when the route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when the mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden h-10 w-10 rounded-full"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-sm pt-16"
          >
            <nav className="container h-full flex flex-col p-6">
              <div className="flex-1 flex flex-col gap-4 pt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center py-4 text-lg font-medium border-b border-border transition-colors",
                      pathname === route.href
                        ? "text-primary border-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Typography variant="mutedText" className="text-center">
                  &copy; {new Date().getFullYear()} Rajan Prajapati
                </Typography>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

