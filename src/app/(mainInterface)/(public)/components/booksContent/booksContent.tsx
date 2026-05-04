import { getAuthors } from "@/lib/modules/authors/authors";
import { getFilteredBooks } from "@/lib/modules/books/books";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { auth } from "@/src/auth";
import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import User from "@/src/models/user";

export interface BooksRenderProps {
  books: IBookSerialized[];
  genres: IGenreSerialized[] | null;
  authors: IAuthorSerialized[] | null;
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
  favorites: string[];
}

export interface BooksContentProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
  itemsPerPage?: number;
  children: (data: BooksRenderProps) => React.ReactNode;
}

export default async function BooksContent({
  searchParams,
  itemsPerPage = ITEMS_PER_PAGE.EIGHT,
  children,
}: BooksContentProps) {
  const params = await searchParams;
  const session = await auth();
  const userId = session?.user.id;
  const user = await User.findById(userId);
  const page = Number(params.page ?? 1);
  const genreIds = params.genres?.split(",") ?? [];

  const favorites = user?.favorites?.map((id: string) => id.toString()) ?? [];
  const [genres, authors, booksData] = await Promise.all([
    getAllGenres(),
    getAuthors(),
    getFilteredBooks({ page, itemsPerPage, genres: genreIds }),
  ]);

  const totalPages = Math.ceil(booksData.totalPages / itemsPerPage);

  return (
    <>
      {children({
        books: booksData.items,
        genres,
        authors,
        currentPage: page,
        totalPages: totalPages,
        selectedGenres: genreIds,
        favorites,
      })}
    </>
  );
}
