import Image, { StaticImageData } from "next/image";

export type AvatarType = "circle" | "rounded";

export interface AvatarProps {
  alt: string;
  src: StaticImageData;
  view: AvatarType;
}

export function Avatar({ alt, src, view }: AvatarProps) {
  const circle = view === "circle";
  return (
    <div
      className={`relative overflow-hidden w-full ${circle ? "aspect-square rounded-full" : "aspect-3/4 rounded-lg"}`}
    >
      <Image fill className="object-cover" alt={alt} src={src} />
    </div>
  );
}
