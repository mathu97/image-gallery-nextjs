import { Suspense } from "react";
import { ImageGallery } from "@/components/image-gallery-static";
import { PerformanceMetrics } from "@/components/performance-metrics";
import { headers } from "next/headers";

export const metadata = {
  title: "Static Image Gallery with Performance Metrics",
  description:
    "A pre-rendered gallery showcasing images with performance metrics",
};

export default async function StaticPage() {
  const allHeaders = JSON.parse(JSON.stringify(await headers())).headers;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Static Image Gallery with Performance Metrics
      </h1>
      <Suspense fallback={<div>Loading performance metrics...</div>}>
        <PerformanceMetrics headers={allHeaders} />
      </Suspense>
      <ImageGallery />
    </div>
  );
}
