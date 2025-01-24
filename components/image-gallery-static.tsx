import Image from "next/image";
import path from "path";
import fs from "fs/promises";

interface ImageData {
  id: number;
  url: string;
  title: string;
}

async function getLocalImages(): Promise<ImageData[]> {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const imageFiles = await fs.readdir(imagesDirectory);

  return imageFiles
    .filter((file) => file.endsWith(".jpg") || file.endsWith(".png"))
    .map((file, index) => ({
      id: index + 1,
      url: `/images/${file}`,
      title: `Image ${index + 1}`,
    }));
}

export async function ImageGallery() {
  const images = await getLocalImages();

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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
