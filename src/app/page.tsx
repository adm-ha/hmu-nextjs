// src/app/page.tsx (BACKGROUND FIXED)
"use client";

import { motion } from 'framer-motion';
import { ViralLoopsWidget } from '@/components/ViralLoopsWidget';

export default function HomePage() {
  return (
    // --- THIS IS THE FIX ---
    // 1. This wrapper applies the background in BOTH light and dark mode
    <div
      className="min-h-full bg-cover bg-fixed bg-center bg-[url('/my-background.png')]"
    >
      {/* 2. This overlay applies ONLY in dark mode */}
      <div className="min-h-full dark:bg-black/40 dark:backdrop-blur-sm">
    {/* --- END OF FIX --- */}

        {/* --- YOUR PAGE CONTENT --- */}
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-16 sm:gap-y-24">

            {/* Hero Section - Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <video
                className="aspect-video w-full rounded-2xl bg-black/50 shadow-2xl"
                autoPlay
                loop
                muted
                playsInline
                src="/my-hero-video.mp4"
              >
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <h2 className="text-center text-xl font-bold text-gray-700 dark:text-gray-300 sm:text-3xl">
                    They said
                  </h2>
                  <span className="mt-2 text-4xl text-gray-900 dark:text-white sm:text-6xl">'Just apply online'</span>
                </div>
              </video>
            </motion.div>
            
            {/* Card Section (Image & Form) */}
            <motion.div
              id="waitlist-form-section" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="grid grid-cols-1 overflow-hidden bg-white/70 dark:bg-black/30 shadow-2xl md:grid-cols-2"
            >
              {/* Left Column */}
              <div 
                className="hidden md:relative md:flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden bg-cover bg-center rounded-l-[25px]"
                style={{ backgroundImage: `url('/my-app-image.png')` }}
              >
                <div className="absolute inset-0 bg-black opacity-0 dark:opacity-40 rounded-l-[25px] transition-opacity"></div>
              </div>

              {/* Right Column */}
              <div 
                className="flex flex-col items-start p-8 text-start md:p-12 rounded-[25px] md:rounded-l-none md:rounded-r-[25px] bg-white dark:bg-image-container"
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Invite friends to join HireMeUp
                </h3>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                  Unlock exclusive benefits by sharing your referral link.
                </p>
                <div className="mt-8 w-full max-w-md flex-grow">
                  <ViralLoopsWidget />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
        {/* --- END OF PAGE CONTENT --- */}
      </div>
    </div>
  );
}