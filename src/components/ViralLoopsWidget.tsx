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
    const CAMPAIGN_ID = 'FAL62ijzCKp4PDGyRw6Daj1MG3w';
    console.log('[ViralLoopsWidget] Using Campaign ID: ' + CAMPAIGN_ID);

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