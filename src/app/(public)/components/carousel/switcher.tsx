"use client";

import Image, { StaticImageData } from "next/image";
import { useCarousel } from "./useCarousel";

export interface SwitcherProps {
  src: StaticImageData;
  direction: "backward" | "forward";
}

export function Switcher({ src, direction }: SwitcherProps) {
  const { scrollRef, isVisible } = useCarousel();

  function handleScroll() {
    if (scrollRef?.current) {
      const container = scrollRef.current;
      const scrollAmount = 150;
      container.scrollBy({
        left: direction === "backward" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <button
      onClick={handleScroll}
      className="relative p-2 bg-background border border-secondary hover:bg-primary rounded-2xl transition-colors w-[70px] h-[70px]"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <Image fill alt={direction} src={src} className="p-2" />
    </button>
  );
}
