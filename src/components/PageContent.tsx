// src/components/PageContent.tsx (NEW FILE)
import React from 'react';

export function PageContent({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl p-8 py-16">
      <h1 className="mb-8 text-center text-4xl font-bold">{title}</h1>
      <div className="space-y-4 text-center text-gray-300">
        {children || <p>This page is under construction. Check back soon!</p>}
      </div>
    </div>
  );
}