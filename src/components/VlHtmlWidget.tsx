// src/components/VlHtmlWidget.tsx (FINAL UTILITY)
"use client";

import React, { useEffect } from 'react';

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    ViralLoops: any;
  }
}

interface VlHtmlWidgetProps {
    htmlString: string;
}

export const VlHtmlWidget: React.FC<VlHtmlWidgetProps> = ({ htmlString }) => {
    // We keep this minimal and passive to avoid crashing the VL script.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.ViralLoops) {
            // No action needed here; the script finds the injected tag.
        }
    }, [htmlString]);
  
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: htmlString }} />
    );
};