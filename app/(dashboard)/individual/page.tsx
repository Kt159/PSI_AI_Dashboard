'use client'
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PageContent = dynamic(() => import('./PageContent'), {
  suspense: true,
});

const Loading = () => (
  <div>Loading...</div>
);

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PageContent />
    </Suspense>
  );
}
