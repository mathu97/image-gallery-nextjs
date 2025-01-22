"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

interface ImageData {
  id: number;
  url: string;
  title: string;
}

export default function ImageGallery() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Minimalistic Image Gallery
      </h1>
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
