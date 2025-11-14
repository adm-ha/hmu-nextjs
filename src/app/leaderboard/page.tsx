// src/app/leaderboard/page.tsx (BACKGROUND REMOVED)
"use client";

import { PageContent } from "@/components/PageContent";

export default function LeaderboardPage() {
  return (
    // Removed the background wrapper divs
    // PageContent provides its own padding
    <PageContent title="Leaderboard">
      <p className="text-xl text-gray-500 dark:text-gray-300">
        This page is under construction. Check back soon to see who's on top!
      </p>
    </PageContent>
  );
}