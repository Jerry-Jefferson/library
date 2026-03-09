import Image, { StaticImageData } from "next/image";

export interface VisibilityProps {
  alt: string;
  src: StaticImageData;
}

export function VisibilityImage({ alt, src }: VisibilityProps) {
  return (
    <div className="relative w-[24] h-[24]">
      <Image fill alt={alt} src={src} sizes="24px" />
    </div>
  );
}
