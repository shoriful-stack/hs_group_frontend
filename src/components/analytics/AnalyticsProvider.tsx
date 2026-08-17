"use client";

import { Suspense } from "react";
import GtmRouteTracker from "./GtmRouteTracker";

export default function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <GtmRouteTracker />
    </Suspense>
  );
}
