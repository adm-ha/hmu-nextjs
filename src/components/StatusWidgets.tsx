// src/components/StatusWidgets.tsx (NEW FILE)
"use client";

import React, { useEffect, useRef, useCallback } from 'react';

// Extend the Window interface to tell TypeScript about ViralLoops
declare global {
  interface Window {
    ViralLoops: any;
  }
}

// Function to determine the correct Campaign ID
const getCampaignId = () => {
  const PROD_CAMPAIGN_ID = 'MMH9S7vPz7pWTE4HvM0ohBpAIYA';
  const STAGING_CAMPAIGN_ID = 'F2KeFLmT4nXJfYnzF1fNL7eMNS8';
  const PROD_HOSTNAME = 'www.hiremeup.com'; // Your production domain

  return typeof window !== 'undefined' && window.location.hostname === PROD_HOSTNAME
    ? PROD_CAMPAIGN_ID
    : STAGING_CAMPAIGN_ID;
};

// This component will render the correct VL widget
const StatusWidgetWrapper: React.FC<{ 
  widgetType: 'share' | 'milestone'; // 'share' = share buttons, 'milestone' = progress bar
  referralCode: string; 
  email: string;
}> = ({ widgetType, referralCode, email }) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const campaignId = getCampaignId();

  // This function injects the widget
  const renderWidget = useCallback(() => {
    if (!containerRef.current || typeof window.ViralLoops === 'undefined' || !referralCode) {
      return;
    }

    let widgetHtml = '';
    if (widgetType === 'share') {
      // This is the "Copy and share your referral link" widget
      widgetHtml = `<share-widget ucid="${campaignId}" user-email="${email}" user-referral-code="${referralCode}"></share-widget>`;
    } else {
      // This is the "Referral Progress" (milestone) widget
      widgetHtml = `<milestone-widget ucid="${campaignId}" user-email="${email}" user-referral-code="${referralCode}"></milestone-widget>`;
    }

    if (containerRef.current.innerHTML.trim() === '') {
      containerRef.current.innerHTML = widgetHtml;
      window.ViralLoops.createWidget();
    }
    
  }, [widgetType, referralCode, email, campaignId]);

  // Load the widget when the component mounts or when VL is ready
  useEffect(() => {
    if (typeof window.ViralLoops === 'undefined') {
      document.getElementById('viral-loops-loader')?.addEventListener('load', renderWidget, { once: true });
    } else {
      renderWidget();
    }
  }, [renderWidget]);

  // key={referralCode} ensures the widget re-renders if the user logs out/in
  return <div ref={containerRef} key={referralCode} className='w-full' />;
};

// Export the two specific widgets for our page
export const ViralLoopsShareWidget: React.FC<{ referralCode: string, email: string }> = 
  ({ referralCode, email }) => (
    <StatusWidgetWrapper widgetType="share" referralCode={referralCode} email={email} />
);

export const ViralLoopsProgressWidget: React.FC<{ referralCode: string, email: string }> = 
  ({ referralCode, email }) => (
    <StatusWidgetWrapper widgetType="milestone" referralCode={referralCode} email={email} />
);