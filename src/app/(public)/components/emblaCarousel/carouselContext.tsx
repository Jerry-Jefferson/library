"use client";

import { EmblaViewportRefType } from "embla-carousel-react";
import { createContext } from "react";

export const CarouselContext = createContext<{
  emblaRef: EmblaViewportRefType;
  scrollPrev: () => void;
  scrollNext: () => void;
} | null>(null);
