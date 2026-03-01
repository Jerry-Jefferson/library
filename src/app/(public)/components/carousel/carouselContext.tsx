"use client";

import { createContext, RefObject } from "react";

export const CarouselContext = createContext<{
  scrollRef: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
} | null>(null);
