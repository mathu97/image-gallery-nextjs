// import { Suspense } from "react";
import { ImageGallery } from "@/components/image-gallery";
// import { PerformanceMetrics } from "@/components/performance-metrics";
// import { headers } from "next/headers";

export default async function Home() {
  // const allHeaders = JSON.parse(JSON.stringify(await headers())).headers;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>
      <div>
        env var test - server: "{process.env.TEST_ENV}", client: "
        {process.env.NEXT_PUBLIC_TEST_ENV}"
      </div>
      <ImageGallery />
    </div>
  );
}
