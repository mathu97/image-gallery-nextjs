"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

interface ImageData {
  id: number;
  url: string;
  title: string;
}

export function ImageGallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const imagesPerPage = 66; // Number of images to load per "page"

  const fetchImages = useCallback(async () => {
    // Instead of API fetch, we'll simulate pagination with local images
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;

    // Using the image_<number>.png naming format
    const newImages: ImageData[] = [];
    for (let i = startIndex + 1; i <= endIndex; i++) {
      // Stop adding images if we've reached a reasonable limit
      // You'll need to adjust this based on how many images you actually have
      if (i > 66) break;

      newImages.push({
        id: i,
        url: `/images/image_${i}.png`, // Using the correct naming format
        title: `Image ${i}`,
      });
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
    setIsFetching(false);
  }, [page]);

  const { isFetching, setIsFetching } = useInfiniteScroll(fetchImages);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-square">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {isFetching && (
        <div className="text-center mt-4">
          <p className="text-gray-500">Loading more images...</p>
        </div>
      )}
    </div>
  );
}
