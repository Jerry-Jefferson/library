import { getFilteredBooks } from "@/lib/modules/books/books";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { BookDirectory } from "../bookDirectory/bookDirectory";
import { MAX_ITEMS_PER_PAGE } from "@/src/shared/utils/getPaginationRange";

export interface BooksContentProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default async function BooksContent({ searchParams }: BooksContentProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const genreIds = params.genres?.split(",") ?? [];

  const [genres, booksData] = await Promise.all([
    getAllGenres(),
    getFilteredBooks({ page, itemsPerPage: MAX_ITEMS_PER_PAGE, genres: genreIds }),
  ]);

  const totalPages = Math.ceil(booksData.totalPages / MAX_ITEMS_PER_PAGE);

  return (
    <BookDirectory
      books={booksData.items}
      genres={genres}
      currentPage={page}
      totalPages={totalPages}
      selectedGenres={genreIds}
    />
  );
}
