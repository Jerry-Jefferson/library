import ArrowLeft from "@/public/left.png";
import ArrowRight from "@/public/right.png";
import { IBook } from "@/src/models/book";
import Image, { StaticImageData } from "next/image";
import { Carousel } from "../carousel";

export interface BookSectionProps {
  title: string;
  alt: string;
  src: StaticImageData;
  books: IBook[];
}

export function BookSection({ title, alt, src, books }: BookSectionProps) {
  return (
    <section className="box-border flex flex-col gap-4 p-4 w-full">
      <div className="flex gap-4 pl-20 w-full">
        <div className="relative w-[24px] h-[24px]">
          <Image
            fill
            alt={alt}
            src={src}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <Carousel>
        <Carousel.Switcher direction="backward" src={ArrowLeft} />
        <Carousel.Items items={books} />
        <Carousel.Switcher direction="forward" src={ArrowRight} />
      </Carousel>
    </section>
  );
}
