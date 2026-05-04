import { DEFAULT_AVATAR } from "@/src/shared/constants/defaultAvatar";
import Image from "next/image";

export type AvatarType = "circle" | "rounded";

export interface AvatarProps {
  alt: string;
  src: string | null;
  view: AvatarType;
  width?: number;
  height?: number;
}

export function Avatar({ alt, src, view, width, height }: AvatarProps) {
  const circle = view === "circle";

  return (
    <div
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : undefined,
      }}
      className={`
        relative overflow-hidden
        ${!height && (circle ? "aspect-square" : "aspect-3/4")}
        ${circle ? "rounded-full" : "rounded-lg"}
      `}
    >
      <Image
        fill
        className="object-cover"
        alt={alt}
        src={src ?? DEFAULT_AVATAR}
        sizes="(min-width: 1024px) 100vw, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
    </div>
  );
}
