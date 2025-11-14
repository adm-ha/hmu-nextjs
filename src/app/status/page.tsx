// src/app/status/page.tsx (UPDATED CAMPAIGN ID)
"use client";

import { PageContent } from "@/components/PageContent";
import { useWaitlistUser, WaitlistUserStatus } from "@/hooks/use-waitlist-user";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import { STATUS_LEVELS } from "@/lib/status-data";
import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";

// --- VlHtmlWidget Component ---
const VlHtmlWidget: React.FC<{ htmlString: string }> = ({ htmlString }) => {
  useEffect(() => {
    if (window.ViralLoops) {
      window.ViralLoops.createWidget();
    }
  }, [htmlString]);

  return <div className="w-full" dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

// --- BenefitList Component ---
const BenefitList: React.FC<{ benefits: string[] }> = ({ benefits }) => (
  <ul className="mt-4 text-left text-sm space-y-2 list-none p-0">
    {benefits.map((benefit, index) => (
      <motion.li 
        key={index} 
        initial={{ opacity: 0, x: -10 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: index * 0.05 }}
        className="flex items-start text-gray-700 dark:text-gray-300"
      >
        <CheckCircle className="h-4 w-4 text-primary-green flex-shrink-0 mt-0.5 mr-2" />
        <span>{benefit}</span>
      </motion.li>
    ))}
  </ul>
);

// --- Main Status Page Component ---
export default function MyStatusPage() {
  const { user, clearUser } = useWaitlistUser();
  const router = useRouter();

  // 1. Show loading state
  if (!user) {
    return (
      <div className="bg-cover bg-fixed bg-center dark:bg-[url('/hero-bg-mock-guy.png')]">
        <div className="dark:bg-black/40 dark:backdrop-blur-sm">
          <PageContent title="Loading Status..." />
        </div>
      </div>
    );
  }

  // 2. Determine logged-in state
  const isLoggedIn = user.statusLevel !== 'Join the Movement';
  const username = user.email ? user.email.split('@')[0].replace(/[\.\_]/g, ' ') : 'Waitlist Member';
  const dynamicUsername = username.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');

  return (
    <div
      className="min-h-full bg-cover bg-fixed bg-center dark:bg-[url('/hero-bg-mock-guy.png')]"
    >
      <div className="min-h-full dark:bg-black/40 dark:backdrop-blur-sm">
    
        <motion.div 
          className="py-16 sm:py-24"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-16 sm:gap-y-24">

            {/* --- "LOGGED OUT" VIEW --- */}
            {!isLoggedIn && (
              <div className="text-center rounded-[25px] bg-white/70 dark:bg-black/30 shadow-2xl p-8 md:p-12">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  Secure Your Spot
                </h2>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                  You're not on the waitlist yet. Click below to join and get your referral code!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/#waitlist-form-section')}
                  className="mt-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all"
                >
                  Join the Waitlist Now
                </motion.button>
              </div>
            )}
            
            {/* --- "LOGGED IN" VIEW --- */}
            {isLoggedIn && (
              <>
                {/* --- WELCOME BANNER --- */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    Welcome, <span className="text-gray-900 dark:text-white font-bold">{dynamicUsername}</span>
                  </h3>
                  <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
                    Invite Your Friends, Earn Incentives
                  </h1>
                </div>

                {/* --- MAIN WIDGET CARD --- */}
                <motion.div
                  id="waitlist-form-section" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-1 overflow-hidden rounded-[25px] bg-white/70 dark:bg-black/30 shadow-2xl md:grid-cols-2"
                >
                  {/* Left Column: Widgets (Stacked & Centered) */}
                  <div className="flex flex-col items-center justify-center p-8 md:p-12 space-y-8 rounded-l-[25px] bg-white dark:bg-image-container">
                    
                    {/* --- THIS IS THE FIX --- */}
                    <VlHtmlWidget 
                      htmlString={`<referral-url-widget ucid='FAL62ijzCKp4PDGyRw6Daj1MG3w'></referral-url-widget>`}
                    />
                    <hr className="w-full border-gray-300 dark:border-gray-600" />
                    <VlHtmlWidget 
                      htmlString={`<progress-tracking-widget ucid='FAL62ijzCKp4PDGyRw6Daj1MG3w'></progress-tracking-widget>`}
                    />
                    {/* --- END OF FIX --- */}
                  </div>

                  {/* Right Column: Image */}
                  <div 
                    className="hidden md:relative md:flex flex-col items-center justify-center overflow-hidden rounded-r-[25px]"
                  >
                    <img
                      src="/my-mystatus-image.png"
                      alt="App Screenshot"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
              </>
            )}

            {/* --- REFERRAL STATUS LEVELS SECTION (ALWAYS VISIBLE) --- */}
            <div className="pt-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Referral Status Levels
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                    Refer friends to level up your status and unlock exclusive benefits!
                  </p>
                </div>
                {isLoggedIn && (
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 md:text-right">
                    Current Status: 
                    <span className="block text-2xl font-bold text-primary-green">{user.statusLevel}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {STATUS_LEVELS.map((status, index) => {
                  const isActive = isLoggedIn && user.referralCount >= status.minReferrals;
                  const isCurrent = isLoggedIn && user.statusLevel === status.id;
                  const glowColor = status.shadowColor;

                  return (
                    <motion.div
                      key={status.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`p-6 rounded-2xl shadow-xl transition-all duration-300 border-2
                        ${isCurrent 
                          ? `bg-purple-100 dark:bg-purple-900/50 border-primary-green shadow-primary-green/50` 
                          : isActive 
                            ? 'bg-white dark:bg-gray-800/30 border-gray-300 dark:border-gray-700' 
                            : 'bg-white dark:bg-gray-900/10 border-gray-200 dark:border-gray-800/50 opacity-70'
                        }
                        hover:shadow-[0_0_30px_10px_var(--hover-shadow-color)]
                      `}
                      style={{ '--hover-shadow-color': `${glowColor}40` } as React.CSSProperties}
                    >
                      <img 
                        src={status.logo} 
                        alt={`${status.title} Badge`} 
                        className="mx-auto mb-4 w-full max-w-[150px] h-auto"
                      />
                      
                      <div className="flex items-center justify-center gap-2">
                        <img 
                          src={status.icon} 
                          alt={`${status.title} icon`} 
                          className="h-8 w-auto"
                        />
                        <h3 className={`text-2xl font-bold ${isCurrent ? `text-${status.color}` : 'text-gray-900 dark:text-white'}`}>
                          {status.title}
                        </h3>
                      </div>
                      
                      <hr className="border-gray-300 dark:border-gray-700/50 my-4" />

                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
                        Benefits:
                      </h4>

                      <BenefitList benefits={status.benefits} />
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                        Requires: {status.minReferrals} referral{status.minReferrals > 1 ? 's' : ''}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* --- Log Out Button (LOGGED IN) --- */}
            {isLoggedIn && (
              <div className="text-center mt-10">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out and clear your local status?")) {
                      clearUser(); 
                      router.refresh(); 
                    }
                  }}
                  className="text-sm font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                >
                  Clear My Status / Log Out (Local Only)
                </button>
              </div>
            )}
            
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}