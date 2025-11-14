// src/app/leaderboard/page.tsx (THEME-AWARE BACKGROUND)
"use client";

import { PageContent } from "@/components/PageContent";

export default function LeaderboardPage() {
  return (
    // --- THIS IS THE FIX ---
    // Added `dark:` prefix.
    <div
      className="min-h-full bg-cover bg-fixed bg-center dark:bg-[url('/hero-bg-mock-guy.png')]"
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