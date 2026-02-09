import { IBook } from "@/src/models/book";
import { isAuthor } from "@/src/types/typeGuards";
import Image from "next/image";

export interface BookCardProps {
  book: IBook;
  width: number;
}

export function BookCard({ book, width }: BookCardProps) {
  return (
    <div className="flex flex-col" style={{ width: `${width}px` }}>
      <div
        className="relative border border-secondary hover:border-primary rounded-xl h-[210px] overflow-hidden"
        style={{ width: `${width}px` }}
      >
        <Image fill className="object-cover" alt="book cover" src="/gatsby.jpg" />
      </div>
      <p>{book.title}</p>
      <p className="text-sm text-secondary">
        {isAuthor(book.authorId) ? book.authorId.name : "Unknown author"}
      </p>
    </div>
  );
}
