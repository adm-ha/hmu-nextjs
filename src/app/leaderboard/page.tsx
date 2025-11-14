// src/app/leaderboard/page.tsx
"use client";

import { PageContent } from "@/components/PageContent";

export default function LeaderboardPage() {
  return (
    // --- THIS IS THE FIX ---
    // Added the background wrapper divs
    // Note: URL-encoding the spaces in the filename
    <div
      className="min-h-full bg-cover bg-fixed bg-center bg-[url('/Hero-BG-Mock%20Guy%20(Large).png')]"
    >
      <div className="min-h-full dark:bg-black/40 dark:backdrop-blur-sm">
    {/* --- END OF FIX --- */}
    
        <PageContent title="Leaderboard">
          <p className="text-xl text-gray-500 dark:text-gray-300">
            This page is under construction. Check back soon to see who's on top!
          </p>
        </PageContent>
        
      </div>
    </div>
  );
}