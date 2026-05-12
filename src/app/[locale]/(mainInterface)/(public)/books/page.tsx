import { Suspense } from "react";
import { BookDirectory } from "../components/bookDirectory/bookDirectory";
import BooksContent from "../components/booksContent/booksContent";

export interface BooksProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function Books({ searchParams }: BooksProps) {
  return (
    <Suspense fallback={<div>Loading books...</div>}>
      <BooksContent searchParams={searchParams}>
        {(data) => <BookDirectory {...data} />}
      </BooksContent>
    </Suspense>
  );
}
