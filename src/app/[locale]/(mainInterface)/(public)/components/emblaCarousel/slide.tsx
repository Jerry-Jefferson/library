import { ReactNode } from "react";

export interface SlideProps {
  children: ReactNode;
}

export function Slide({ children }: SlideProps) {
  return (
    <div className="embla__slide flex-none pl-4 basis-full max-sm:basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/8 cursor-pointer">
      {children}
    </div>
  );
}
