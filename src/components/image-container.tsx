import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ImageContainerProps {
  src?: string | StaticImageData;
  alt?: string;
  className?: string;
}

export default function ImageContainer({
  src,
  alt = "image",
  className = "",
}: ImageContainerProps) {
  if (!src) {
    return (
      <div
        className={`bg-zinc-800 flex items-center justify-center rounded-lg ${className}`}
      >
        <span className="text-zinc-600 text-sm">No Image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
