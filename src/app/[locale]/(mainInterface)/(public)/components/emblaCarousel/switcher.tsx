"use client";

import { Button } from "@/src/components/client/button/button";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useCarousel } from "./useCarousel";

export interface SwitcherProps {
  direction: "backward" | "forward";
}

export function Switcher({ direction }: SwitcherProps) {
  const { scrollNext, scrollPrev } = useCarousel();
  const forward = direction === "forward";

  return (
    <Button
      onClick={forward ? scrollNext : scrollPrev}
      variant="icon"
      size="medium"
      className="bg-background border border-secondary hover:bg-primary rounded-2xl transition-colors min-w-[26px] min-h-[26px] md:min-w-[25px] md:min-h-[25px] lg:min-w-[24px] lg:min-h-[24px] flex-shrink-0 flex items-center justify-center"
    >
      {forward ? (
        <MdArrowForwardIos className="w-full h-full flex-shrink-0" />
      ) : (
        <MdArrowBackIos className="w-full h-full flex-shrink-0" />
      )}
    </Button>
  );
}
