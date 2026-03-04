"use client";

import { ReactNode } from "react";
import { useCarousel } from "./useCarousel";

export interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { emblaRef } = useCarousel();

  return (
    <div className="embla__viewport overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex touch-pan-y pinch-zoom">{children}</div>
    </div>
  );
}
