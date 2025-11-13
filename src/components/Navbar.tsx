// src/components/Navbar.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle'; // Make sure this is imported

const NAV_LINKS = [
  { name: 'My Status', href: '/status' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/30 dark:border-white/10 dark:bg-black/30 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/hmu-logo-dark.svg"
                alt="HireMeUp Logo"
                className="h-9 w-auto dark:hidden"
              />
              <img
                src="/HMU-Logo-Light.svg"
                alt="HireMeUp Logo"
                className="h-9 w-auto hidden dark:block"
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8 md:ml-auto md:mr-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200 ease-in-out hover:text-primary-green"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center space-x-2">
            <motion.a
              href="/#waitlist-form-section"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700"
            >
              Join Waitlist
            </motion.a>
            <ThemeToggle /> {/* Ensure this is here */}
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle /> {/* And ensure this is here */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {/* ... (mobile menu code) ... */}
      </AnimatePresence>
    </nav>
  );
}