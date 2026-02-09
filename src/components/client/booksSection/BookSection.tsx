import { IBook } from "@/src/models/book";
import Image, { StaticImageData } from "next/image";
import { BookCard } from "../bookCard/BookCard";

export interface BookSectionProps {
  title: string;
  alt: string;
  src: StaticImageData;
  books: IBook[];
}

export function BookSection({ title, alt, src, books }: BookSectionProps) {
  return (
    <section className="box-border flex flex-col gap-4 p-4 w-full">
      <div className="flex gap-4 w-full">
        <div className="relative w-[24px] h-[24px]">
          <Image fill alt={alt} src={src} />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex flex-row flex-wrap gap-4 w-full">
        {books.map((book) => (
          <BookCard key={book._id.toString()} book={book} width={150} />
        ))}
      </div>
    </section>
  );
}
