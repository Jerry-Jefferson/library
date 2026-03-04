"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ReactNode } from "react";
import { CarouselContext } from "./carouselContext";
import { Container } from "./container";
import { Slide } from "./slide";
import { Switcher } from "./switcher";

export interface EmblaCarouselProps {
  children: ReactNode;
}

export function EmblaCarousel({ children }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <CarouselContext value={{ emblaRef, scrollPrev, scrollNext }}>
      <div className="embla flex items-center gap-2 w-full">{children}</div>
    </CarouselContext>
  );
}

EmblaCarousel.Container = Container;
EmblaCarousel.Slide = Slide;
EmblaCarousel.Switcher = Switcher;
