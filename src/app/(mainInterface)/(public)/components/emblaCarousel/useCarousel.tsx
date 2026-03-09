import { useContext } from "react";
import { CarouselContext } from "./carouselContext";

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) throw new Error("useCarousel must be used inside a provider");

  return context;
}
