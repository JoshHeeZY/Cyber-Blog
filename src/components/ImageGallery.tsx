'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    caption?: string
  }[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            {image.caption && (
              <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal for full-size image */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
            >
              ×
            </button>
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="rounded-lg"
            />
            {images[selectedImage].caption && (
              <p className="text-white mt-4 text-center">
                {images[selectedImage].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

