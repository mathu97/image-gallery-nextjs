"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeadersDialog } from "./headers-dialog";

export function PerformanceMetrics({
  headers,
}: {
  headers: Record<string, string>;
}) {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    isCached: false,
  });

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries[entries.length - 1];
      setMetrics((prev) => ({
        ...prev,
        largestContentfulPaint: lcpEntry.startTime,
      }));
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        console.log(JSON.stringify(performance));
        const navTiming = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        const paintTiming = performance.getEntriesByType("paint");
        const firstContentfulPaint = paintTiming.find(
          (entry) => entry.name === "first-contentful-paint"
        );

        setMetrics({
          loadTime: navTiming.loadEventEnd - navTiming.loadEventStart,
          domContentLoaded:
            navTiming.domContentLoadedEventEnd -
            navTiming.domContentLoadedEventStart,
          firstContentfulPaint: firstContentfulPaint
            ? firstContentfulPaint.startTime
            : 0,
          largestContentfulPaint: metrics.largestContentfulPaint,
          isCached: navTiming.transferSize === 0,
        });
      }, 0);
    });
  }, [metrics.largestContentfulPaint]);

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Performance Metrics</CardTitle>
        <HeadersDialog headers={headers} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Load Time</p>
            <p className="text-2xl font-bold">
              {metrics.loadTime.toFixed(2)} ms
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">DOM Content Loaded</p>
            <p className="text-2xl font-bold">
              {metrics.domContentLoaded.toFixed(2)} ms
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">First Contentful Paint</p>
            <p className="text-2xl font-bold">
              {metrics.firstContentfulPaint.toFixed(2)} ms
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Largest Contentful Paint</p>
            <p className="text-2xl font-bold">
              {metrics.largestContentfulPaint.toFixed(2)} ms
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium">Cached</p>
            <p className="text-2xl font-bold">
              {metrics.isCached ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
