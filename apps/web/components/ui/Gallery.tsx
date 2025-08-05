/// MAIN
"use client";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { ImageCard, TImage } from "@/components/ui/ImageCard";
import { ImageCardSkeleton } from "@/components/ui/ImageCard";

export function Gallery() {
  const [images, setImages] = useState<TImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data.images);
      setImagesLoading(false);
    })();
  }, []);

  return (
    // <div className="flex gap-4 flex-wrap">
    <div className="grid md:grid-cols-4 gap-4 p-4 grids-cols-1">
      {/* this one, md:grid-cols 3 or 4  */}
      {images.map((image) => (
        <ImageCard key={image.id} {...image} />
      ))}
      {imagesLoading && <ImageCardSkeleton></ImageCardSkeleton>}
    </div>
  );
}
