// src/components/ViralLoopsWidget.tsx (SUPER SIMPLIFIED)
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ViralLoops: any;
  }
}

export function ViralLoopsWidget() {
  
  useEffect(() => {
    // --- Environment Settings ---
    const PROD_CAMPAIGN_ID = 'MMH9S7vPz7pWTE4HvM0ohBpAIYA';
    const STAGING_CAMPAIGN_ID = 'F2KeFLmT4nXJfYnzF1fNL7eMNS8';
    const PROD_HOSTNAME = 'www.hiremeup.com';
    // --- End of Settings ---

    let CAMPAIGN_ID: string;
    if (typeof window !== 'undefined' && window.location.hostname === PROD_HOSTNAME) {
      CAMPAIGN_ID = PROD_CAMPAIGN_ID;
    } else {
      CAMPAIGN_ID = STAGING_CAMPAIGN_ID;
    }

    // This function just injects the HTML
    const injectWidget = () => {
      const widgetContainer = document.getElementById('vl-form-widget-container');
      if (widgetContainer && widgetContainer.innerHTML.trim() === '') {
        widgetContainer.innerHTML = `<form-widget ucid="${CAMPAIGN_ID}"></form-widget>`;
        console.log('[ViralLoopsWidget] Widget HTML injected.');
      }
    };

    // We just inject the HTML. The loader script will find it.
    // The global script in layout.tsx will handle all data syncing.
    if (window.ViralLoops) {
      injectWidget();
    } else {
      document.getElementById('viral-loops-loader')?.addEventListener('load', () => {
        injectWidget();
      }, { once: true });
    }

  }, []); // No dependencies, just runs once

  return (
    <div id="vl-form-widget-container" className="w-full">
      {/* The script will inject the <form-widget> here */}
    </div>
  );
}