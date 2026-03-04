"use client";

import Image, { StaticImageData } from "next/image";
import { useCarousel } from "./useCarousel";

export interface SwitcherProps {
  src: StaticImageData;
  direction: "backward" | "forward";
}

export function Switcher({ src, direction }: SwitcherProps) {
  const { scrollNext, scrollPrev } = useCarousel();
  const forward = direction === "forward";

  return (
    <button
      onClick={forward ? scrollNext : scrollPrev}
      className="relative p-2 bg-background border border-secondary hover:bg-primary rounded-2xl transition-colors min-w-[50px] aspect-square"
    >
      <Image fill alt={direction} src={src} />
    </button>
  );
}
