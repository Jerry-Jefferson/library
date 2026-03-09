import { ReactNode } from "react";

export interface SlideProps {
  children: ReactNode;
}

export function Slide({ children }: SlideProps) {
  return (
    <div className="embla__slide flex-none pl-4 basis-full lg:basis-[12.5%] md:basis-1/4 sm:basis-1/2 max-sm:basis-full cursor-pointer">
      {children}
    </div>
  );
}
