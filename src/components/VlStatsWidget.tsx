// src/components/VlStatsWidget.tsx (TRANSPARENT BACKGROUNDS)
"use client";

import React, { useEffect, useRef } from 'react';

// Extend the Window interface to tell TypeScript about ViralLoops
declare global {
  interface Window {
    ViralLoops: any;
  }
}

interface VlStatsWidgetProps {
  type: 'rank' | 'referrals' | 'pending' | 'leaderboard';
  userId?: string; 
}

const WIDGET_MAP = {
  rank: { tag: 'stat-widget', stat: 'rank', title: 'Your Waitlist Position' },
  referrals: { tag: 'stat-widget', stat: 'referrals', title: 'Referrals' },
  pending: { tag: 'stat-widget', stat: 'pendingReferrals', title: 'Pending Referrals' },
  leaderboard: { tag: 'leaderboard-widget', stat: null, title: 'HireMeUp Referral Leaderboard' },
};

export const VlStatsWidget: React.FC<VlStatsWidgetProps> = ({ type, userId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tag, stat, title } = WIDGET_MAP[type];
  const CAMPAIGN_ID = 'FAL62ijzCKp4PDGyRw6Daj1MG3w';

  const injectWidget = () => {
    if (!containerRef.current || typeof window.ViralLoops === 'undefined' || containerRef.current.innerHTML.trim() !== '') {
      return;
    }

    let htmlString = `<${tag} ucid='${CAMPAIGN_ID}'`;
    
    if (stat) {
      htmlString += ` stat='${stat}'`;
    }

    htmlString += `></${tag}>`;
    
    containerRef.current.innerHTML = htmlString;
    
    // We must call this for stat/leaderboard widgets
    if (window.ViralLoops.createWidget) {
      window.ViralLoops.createWidget();
    }
  };

  useEffect(() => {
    if (window.ViralLoops) {
      injectWidget();
    } else {
      document.getElementById('viral-loops-loader')?.addEventListener('load', injectWidget, { once: true });
    }
  }, [type]); // Re-run if type changes

  // Render placeholders for the stats section
  if (type !== 'leaderboard') {
    return (
      // --- THIS IS THE CHANGE ---
      // Removed bg-white/10 dark:bg-black/40
      <div className="flex flex-col items-center justify-center p-4 rounded-xl h-24">
        <div ref={containerRef} className="w-full">
          {/* Placeholder for stat widget injection */}
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{title}</div>
      </div>
    );
  }

  // Render the final container for the leaderboard widget
  return (
    <div className="w-full mt-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
      {/* --- THIS IS THE CHANGE --- */}
      {/* Removed bg-black/40 from the inner div */}
      <div ref={containerRef} className="w-full min-h-64 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700/50">
        {/* Widget content loads here */}
      </div>
    </div>
  );
};