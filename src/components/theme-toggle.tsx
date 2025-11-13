// src/components/theme-toggle.tsx (NEW SIMPLER VERSION)
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button" // We still use the shadcn button

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // This function simply toggles between 'dark' and 'light'
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-gray-300 hover:text-primary-green hover:bg-white/10"
    >
      {/* Sun icon shown by default (when dark theme is active) */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      {/* Moon icon shown when dark theme is NOT active (i.e., light theme) */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}