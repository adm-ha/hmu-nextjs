// src/app/page.tsx (REMOVING h-full)
// THIS IS A TEST COMMENT TO FORCE A CHANGE
"use client";

import { motion } from 'framer-motion';
import { ViralLoopsWidget } from '@/components/ViralLoopsWidget';

export default function HomePage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-16 sm:gap-y-24">

        {/* --- 1. HERO VIDEO SECTION --- */}
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
        
        {/* --- 2. CARD SECTION (IMAGE & FORM) --- */}
        <motion.div
          id="waitlist-form-section" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          // --- REMOVED h-full from here ---
          className="grid grid-cols-1 overflow-hidden bg-white/70 dark:bg-black/30 shadow-2xl md:grid-cols-2"
        >
          
          {/* Left Column as Background Image */}
          <div 
            // --- REMOVED h-full from here ---
            // md:flex will make it stretch to the grid cell height
            className="hidden md:relative md:flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden bg-cover bg-center rounded-l-[25px]"
            style={{ backgroundImage: `url('/my-app-image.png')` }}
          >
            <div className="absolute inset-0 bg-black opacity-0 dark:opacity-40 rounded-l-[25px] transition-opacity"></div>
          </div>

          {/* Right Container - Viral Loops Form */}
          <div 
            // --- REMOVED h-full from here ---
            // This column's natural height will now define the row height
            className="flex flex-col items-start p-8 text-start md:p-12 rounded-[25px] md:rounded-l-none md:rounded-r-[25px] bg-white dark:bg-image-container"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Invite friends to join HireMeUp
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Unlock exclusive benefits by sharing your referral link.
            </p>
            {/* --- ADDED flex-grow to make this div fill the space --- */}
            <div className="mt-8 w-full max-w-md flex-grow">
              <ViralLoopsWidget />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}