"use client";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";

export interface SectionProps {
  alt: string;
  src: StaticImageData | string;
  title: string;
}

export function SectionHeader({ alt, src, title }: SectionProps) {
  const t = useTranslations("Dashboard.main");
  return (
    <div className="flex gap-4 w-full">
      <div className="relative w-[24px] h-[24px]">
        <Image
          fill
          alt={alt}
          src={src}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2 className="text-xl font-semibold">{t(title)}</h2>
    </div>
  );
}
