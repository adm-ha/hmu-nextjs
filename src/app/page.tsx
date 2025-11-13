// src/app/page.tsx (ADDING BG COLOR TO RIGHT COLUMN)
"use client";

import { motion } from 'framer-motion';
import { ViralLoopsWidget } from '@/components/ViralLoopsWidget';

export default function HomePage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-16 sm:gap-y-24">

        {/* Hero Section - Video (unchanged) */}
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
              <h2 className="text-center text-xl font-bold text-gray-300 sm:text-3xl">
                They said
              </h2>
              <span className="mt-2 text-4xl text-white sm:text-6xl">'Just apply online'</span>
            </div>
          </video>
        </motion.div>

        {/* Content Section - Image & Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          // Parent container has bg-black/30, which the left column will show through its overlay
          className="grid grid-cols-1 overflow-hidden bg-black/30 shadow-2xl md:grid-cols-2"
        >
          
          {/* Left Column as Background Image */}
          <div 
            className="relative flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden bg-cover bg-center rounded-l-[25px]"
            style={{ backgroundImage: `url('/my-app-image.png')` }}
          >
            {/* The overlay blends with the parent bg-black/30 */}
            <div className="absolute inset-0 bg-black opacity-40 rounded-l-[25px]"></div>
          </div>

          {/* Right Container - Viral Loops Form */}
          <div 
            // --- THIS IS THE CHANGE ---
            // Added bg-image-container to give this column its own background color
            className="flex flex-col items-start p-8 text-start md:p-12 rounded-r-[25px] bg-image-container"
          >
            <h3 className="text-3xl font-bold text-white">
              Invite friends to join HireMeUp
            </h3>
            <p className="mt-4 text-lg text-gray-300">
              Unlock exclusive benefits by sharing your referral link.
            </p>
            <div className="mt-8 w-full max-w-md">
              <ViralLoopsWidget />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}