"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const resolvedImages = images.length > 0 ? images : ["/placeholder.svg"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = resolvedImages[selectedIndex] ?? resolvedImages[0];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-4xl border border-gray-200 bg-stone-50">
        {resolvedImages.length > 1 ? (
          <div className="absolute right-4 top-4 z-10 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-medium text-gray-500 backdrop-blur-sm">
            {selectedIndex + 1} / {resolvedImages.length}
          </div>
        ) : null}

        <div className="aspect-square">
          <Image
            src={selectedImage}
            alt={productName}
            width={1000}
            height={1000}
            priority
            className="h-full w-full object-contain p-8 sm:p-12"
          />
        </div>
      </div>

      {resolvedImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {resolvedImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "overflow-hidden rounded-3xl border p-1 transition-colors",
                selectedIndex === index
                  ? "border-gray-900 bg-white"
                  : "border-gray-200 bg-white hover:border-gray-300",
              )}
              aria-label={`Show ${productName} image ${index + 1}`}
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-stone-50">
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={240}
                  height={240}
                  className="h-full w-full object-contain p-3"
                />
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
