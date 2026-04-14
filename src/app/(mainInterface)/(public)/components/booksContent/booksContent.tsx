import { getAuthors } from "@/lib/modules/authors/authors";
import { getFilteredBooks } from "@/lib/modules/books/books";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";

export interface BooksRenderProps {
  books: IBookSerialized[];
  genres: IGenreSerialized[] | null;
  authors: IAuthorSerialized[] | null;
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
}

export interface BooksContentProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
  children: (data: BooksRenderProps) => React.ReactNode;
}

export default async function BooksContent({ searchParams, children }: BooksContentProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const genreIds = params.genres?.split(",") ?? [];

  const [genres, authors, booksData] = await Promise.all([
    getAllGenres(),
    getAuthors(),
    getFilteredBooks({ page, itemsPerPage: ITEMS_PER_PAGE.EIGHT, genres: genreIds }),
  ]);

  const totalPages = Math.ceil(booksData.totalPages / ITEMS_PER_PAGE.EIGHT);

  return (
    <>
      {children({
        books: booksData.items,
        genres,
        authors,
        currentPage: page,
        totalPages: totalPages,
        selectedGenres: genreIds,
      })}
    </>
  );
}
