// src/components/ViralLoopsWidget.tsx (NEW FILE)
"use client";

import { useEffect } from 'react';
import { useWaitlistUser } from '@/hooks/use-waitlist-user';

// Extend the Window interface to tell TypeScript about ViralLoops
declare global {
  interface Window {
    ViralLoops: any;
  }
}

export function ViralLoopsWidget() {
  const { saveUser } = useWaitlistUser();

  useEffect(() => {
    // --- Environment Settings from your original script ---
    const PROD_CAMPAIGN_ID = 'MMH9S7vPz7pWTE4HvM0ohBpAIYA';
    const STAGING_CAMPAIGN_ID = 'F2KeFLmT4nXJfYnzF1fNL7eMNS8';
    const PROD_HOSTNAME = 'www.hiremeup.com'; // TODO: Confirm this is your prod domain
    // --- End of Settings ---

    let CAMPAIGN_ID: string;
    if (typeof window !== 'undefined' && window.location.hostname === PROD_HOSTNAME) {
      CAMPAIGN_ID = PROD_CAMPAIGN_ID;
    } else {
      CAMPAIGN_ID = STAGING_CAMPAIGN_ID;
    }
    console.log('[ViralLoopsWidget] Using Campaign ID: ' + CAMPAIGN_ID);

    // This function injects the widget and adds the event listener
    function loadViralLoopsWidget() {
      const widgetContainer = document.getElementById('vl-form-widget-container');

      if (widgetContainer) {
        // 1. Inject the widget HTML
        widgetContainer.innerHTML = `<form-widget ucid="${CAMPAIGN_ID}"></form-widget>`;
        console.log('[ViralLoopsWidget] Widget injected.');

        // 2. Add a listener for the global 'vl:ready' event
        window.addEventListener('vl:ready', (event: any) => {
          // Check if the ready event is for our campaign
          if (event.detail.campaignId === CAMPAIGN_ID) {
            const widget = event.detail.widget;
            
            // 3. Listen for the 'join' event *from that widget*
            widget.on('join', (joinEvent: any) => {
              try {
                const { email, referralCode, referralsCount } = joinEvent.detail.data.user;
                console.log('[ViralLoopsWidget] User joined event fired:', joinEvent.detail.data.user);
                
                // 4. Save the user to localStorage using our hook!
                saveUser(email, referralCode, referralsCount);

              } catch (e) {
                console.error("Error processing VL 'join' event", e);
              }
            });
          }
        }, { once: true }); // Use { once: true } so this listener only fires once

      } else {
        console.error('[ViralLoopsWidget] Could not find [vl-form-widget-container]');
      }
    }

    // Check if the VL loader script is finished (window.ViralLoops exists)
    if (window.ViralLoops) {
      loadViralLoopsWidget();
    } else {
      // If not, wait for the script (which is in layout.tsx) to load
      document.getElementById('viral-loops-loader')?.addEventListener('load', () => {
        loadViralLoopsWidget();
      }, { once: true });
    }

  }, [saveUser]); // The hook dependency

  return (
    // This is the target container. We remove the placeholder styles.
    <div id="vl-form-widget-container" className="w-full">
      {/* The script will inject the <form-widget> here */}
    </div>
  );
}