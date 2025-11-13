// src/components/Navbar.tsx (MOBILE SCROLL FIX)
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle'; 
import { useRouter } from 'next/navigation'; // <-- 1. NEW IMPORT

const NAV_LINKS = [
  { name: 'My Status', href: '/status' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =useState(false);
  const router = useRouter(); // <-- 2. INITIALIZE ROUTER

  // --- 3. NEW HANDLER FUNCTION FOR MOBILE SCROLL ---
  const handleScrollToWaitlist = () => {
    setIsMenuOpen(false); // Close the menu immediately
    // Use router.push to force navigation/scroll after state is updated
    router.push('/#waitlist-form-section'); 
  };
  // ----------------------------------------------------

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/30 dark:border-white/10 dark:bg-black/30 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo (Left) */}
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

          {/* Nav Links (Center) */}
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

          {/* Right Side: Waitlist Button & Theme Toggle (Desktop) */}
          <div className="hidden md:flex md:items-center space-x-2">
            <motion.a
              href="/#waitlist-form-section" // Desktop link is fine as anchor scroll
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700"
            >
              Join Waitlist
            </motion.a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Toggle */}
          <div className="flex items-center justify-end md:hidden">
            <ThemeToggle />
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden border-t border-black/10 dark:border-white/10"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200 ease-in-out hover:bg-black/10 dark:hover:bg-white/10 hover:text-primary-green"
                >
                  {link.name}
                </Link>
              ))}
              <motion.a
                // --- 4. USE THE HANDLER ---
                onClick={handleScrollToWaitlist} // Call our function instead of direct click
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full block text-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700 cursor-pointer"
              >
                Join Waitlist
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}