// src/components/Navbar.tsx (HOVER COLOR & TRANSITIONS)
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'My Status', href: '/status' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo - Far Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/HMU-Logo-Light.svg"
                alt="HireMeUp Logo"
                width={150}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Nav Links - Center (Desktop only) */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8 md:ml-auto md:mr-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                // --- THIS IS THE CHANGE ---
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 ease-in-out hover:text-primary-green"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Join Waitlist Button - Far Right (Desktop only) */}
          <div className="hidden md:flex md:items-center">
            {/* Framer Motion already handles the transition, so just updating hover styles */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700"
            >
              Join Waitlist
            </motion.button>
          </div>

          {/* Mobile Menu Button - Appears on small screens */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
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
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  // --- THIS IS THE CHANGE ---
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-primary-green"
                >
                  {link.name}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700"
              >
                Join Waitlist
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}