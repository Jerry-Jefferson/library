import Image from "next/image";

export type AvatarType = "circle" | "rounded";

export interface AvatarProps {
  alt: string;
  src: string;
  view: AvatarType;
}

export function Avatar({ alt, src, view }: AvatarProps) {
  const circle = view === "circle";
  return (
    <div
      className={`relative overflow-hidden w-full ${circle ? "aspect-square rounded-full" : "aspect-3/4 rounded-lg"}`}
    >
      <Image
        fill
        className="object-cover"
        alt={alt}
        src={src}
        sizes="(min-width: 1024px) 100vw, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
    </div>
  );
}
