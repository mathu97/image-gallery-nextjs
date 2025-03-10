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

  const fetchImages = useCallback(async () => {
    const res = await fetch(`/api/images?page=${page}`);
    const newImages = await res.json();
    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
    setIsFetching(false);
  }, [page]);

  const { isFetching, setIsFetching } = useInfiniteScroll(fetchImages);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {images.map((image) => (
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              height={300}
              width={300}
              className="rounded-lg object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      {isFetching && (
        <div className="text-center mt-4">
          <p className="text-gray-500">Loading more images...</p>
        </div>
      )}
    </div>
  );
}
