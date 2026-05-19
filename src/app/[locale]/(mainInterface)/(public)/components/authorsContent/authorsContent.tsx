import { getFilteredAuthors } from "@/lib/modules/authors/authors";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";

export interface AuthorRenderProps {
  genres: IGenreSerialized[] | null;
  authors: IAuthorSerialized[];
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
}

export interface AuthorsContentProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
  itemsPerPage?: number;
  children: (data: AuthorRenderProps) => React.ReactNode;
}

export default async function AuthorsContent({
  searchParams,
  itemsPerPage = ITEMS_PER_PAGE.EIGHT,
  children,
}: AuthorsContentProps) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const genreIds = params.genres?.split(",") ?? [];

  const [genres, authorsData] = await Promise.all([
    getAllGenres(),
    getFilteredAuthors({
      page,
      itemsPerPage,
      genres: genreIds,
    }),
  ]);

  return (
    <>
      {children({
        genres,
        authors: authorsData.items,
        currentPage: page,
        totalPages: authorsData.totalPages,
        selectedGenres: genreIds,
      })}
    </>
  );
}
