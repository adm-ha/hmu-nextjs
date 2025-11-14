// src/app/leaderboard/page.tsx (UPDATED LAYOUT)
"use client";

import { PageContent } from "@/components/PageContent";
import { VlStatsWidget } from "@/components/VlStatsWidget";
import { VlHtmlWidget } from "@/components/VlHtmlWidget"; 
import { useWaitlistUser } from "@/hooks/use-waitlist-user";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect } from 'react';

const CAMPAIGN_ID = 'FAL62ijzCKp4PDGyRw6Daj1MG3w'; // Consistent ID

// Main Leaderboard Component
export default function LeaderboardPage() {
    const { user } = useWaitlistUser();
    
    const isLoggedIn = user?.statusLevel && user.statusLevel !== 'Join the Movement';
    const username = isLoggedIn ? user.email.split('@')[0].replace(/[\.\_]/g, ' ') : 'Waitlist Member';
    const dynamicUsername = username.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');

    const HMR_KEY = Date.now();

    const StatCards = (
        <div className="grid grid-cols-3 gap-4">
            <VlStatsWidget key={`rank-${HMR_KEY}`} type="rank" userId={user?.referralCode} />
            <VlStatsWidget key={`ref-${HMR_KEY}`} type="referrals" userId={user?.referralCode} />
            <VlStatsWidget key={`pen-${HMR_KEY}`} type="pending" userId={user?.referralCode} />
        </div>
    );
    
    // Block A: Logged Out CTA
    const LoggedOutCTA = (
        <div className="text-center w-full max-w-xl mx-auto rounded-[25px] bg-white/70 dark:bg-black/30 shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Join the Waitlist to See Your Rank
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
                Sign up now to get your unique referral link and start climbing the leaderboard!
            </p>
            <motion.a
                href="/#waitlist-form-section"
                whileHover={{ scale: 1.05 }}
                className="mt-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all inline-block cursor-pointer"
            >
                Join the Waitlist Now
            </motion.a>
        </div>
    );

    // Block B: Logged In Leaderboard & Widgets
    const LeaderboardContent = (
        <motion.div
            key={`leaderboard-content-${HMR_KEY}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 overflow-hidden rounded-[25px] bg-white/70 dark:bg-black/30 shadow-2xl md:grid-cols-2 h-full"
        >
            
            {/* Left Column: Stats & Leaderboard Widget */}
            {/* --- THIS IS THE FIX (Removed dark:bg-image-container) --- */}
            <div className="flex flex-col p-8 md:p-12 rounded-l-[25px]">
                {StatCards}
                <VlStatsWidget key={`leaderboard-widget-${HMR_KEY}`} type="leaderboard" />
            </div>

            {/* Right Column: Image */}
            <div className="hidden md:relative md:flex flex-col items-center justify-center overflow-hidden rounded-r-[25px] h-full">
                <Image
                    src="/my-app-image.png" 
                    alt="App Screenshot"
                    fill
                    className="object-cover"
                />
            </div>
        </motion.div>
    );

    // --- FINAL RENDER ---
    
    if (user === null) {
        return (
            <div className="bg-cover bg-fixed bg-center dark:bg-[url('/hero-bg-mock-guy.png')]">
                <div className="dark:bg-black/40 dark:backdrop-blur-sm">
                    <PageContent title="Loading..." />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cover bg-fixed bg-center dark:bg-[url('/hero-bg-mock-guy.png')]">
            <div className="dark:bg-black/40 dark:backdrop-blur-sm">
                <motion.div 
                    key={`page-wrapper-${HMR_KEY}`}
                    className="py-16 sm:py-24" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-16 sm:gap-y-24">

                        {/* Top Headers */}
                        <div className="text-center">
                          {/* ... (Welcome text) ... */}
                        </div>

                        {/* Main Content: Conditional based on Login Status */}
                        {isLoggedIn ? LeaderboardContent : LoggedOutCTA}

                        {/* Bottom Share Widget (Always Visible) */}
                        {/* --- THIS IS THE FIX (Constrained width) --- */}
                        <div className="pt-10">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                                Share with Your Friends
                            </h2>
                            <div className="w-full max-w-md mx-auto">
                              <VlHtmlWidget 
                                  htmlString={`<referral-url-widget ucid='${CAMPAIGN_ID}'></referral-url-widget>`}
                                  key={`share-bottom-${HMR_KEY}`} 
                              />
                            </div>
                        </div>
                        {/* --- END OF FIX --- */}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}