'use client';

import React from 'react';
import { DashboardHomepage } from '@/features/analytics';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-white text-xl font-semibold">Analytics (Home)</h1>
      <DashboardHomepage />
    </div>
  );
}



