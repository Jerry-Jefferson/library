import { Suspense } from "react";
import BooksContent from "../components/booksContent/booksContent";

export interface BooksProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function Books({ searchParams }: BooksProps) {
  return (
    <Suspense fallback={<div>Loading books...</div>}>
      <BooksContent searchParams={searchParams} />
    </Suspense>
  );
}
