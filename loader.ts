"use client";

import type { ImageLoaderProps } from "next/image";

export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const operations = [
    {
      operation: "input",
      type: "url",
      url: src,
    },
    { operation: "resize", width: width },
    { operation: "output", format: "webp", quality: quality || 75 },
  ];

  const encodedOperations = encodeURIComponent(JSON.stringify(operations));

  return `/_fah/images/process?operations=${encodedOperations}`;
}
