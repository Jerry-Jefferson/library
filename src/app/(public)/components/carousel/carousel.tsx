"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { CarouselContext } from "./carouselContext";
import { ItemsProps } from "./items";
import { SwitcherProps } from "./switcher";

interface CarouselProps {
  children: ReactNode;
}

interface ICarousel extends React.FC<CarouselProps> {
  Switcher: (props: SwitcherProps) => ReactNode;
  Items: (props: ItemsProps) => ReactNode;
}

export function CarouselBase({ children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <CarouselContext value={{ scrollRef, isVisible }}>
      <div
        className="relative group w-full flex items-center gap-4"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </div>
    </CarouselContext>
  );
}

export const Carousel = CarouselBase as ICarousel;
