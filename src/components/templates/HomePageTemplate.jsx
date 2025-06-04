import React from 'react';
import AppHeader from '../organisms/AppHeader';
import HeroSection from '../organisms/HeroSection';
import DashboardOverview from '../organisms/DashboardOverview';
import MainFeatureSection from '../organisms/MainFeatureSection';
import RecentActivitySection from '../organisms/RecentActivitySection';
import AppFooter from '../organisms/AppFooter';

const HomePageTemplate = ({ trips, loading, error }) =&gt; {
  const upcomingTrips = trips?.filter(trip =&gt; new Date(trip.startDate) &gt; new Date()) || [];
  const recentTrips = trips?.filter(trip =&gt; new Date(trip.startDate) &lt;= new Date()).slice(0, 3) || [];

  return (
    &lt;div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50"&gt;
      &lt;AppHeader /&gt;
      &lt;HeroSection /&gt;
      &lt;DashboardOverview upcomingTrips={upcomingTrips} loading={loading} /&gt;
      &lt;MainFeatureSection /&gt;
      &lt;RecentActivitySection recentTrips={recentTrips} loading={loading} /&gt;
      &lt;AppFooter /&gt;
    &lt;/div&gt;
  );
};

export default HomePageTemplate;