import { getFilteredAuthors } from "@/lib/modules/authors/authors";
import { getAllGenres } from "@/lib/modules/genres/genres";
import AuthorDirectory from "../authors/authorDirectory";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";

export interface AuthorsContentProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default async function AuthorsContent({ searchParams }: AuthorsContentProps) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const genreIds = params.genres?.split(",") ?? [];

  const [genres, authorsData] = await Promise.all([
    getAllGenres(),
    getFilteredAuthors({
      page,
      itemsPerPage: ITEMS_PER_PAGE.EIGHT,
      genres: genreIds,
    }),
  ]);

  return (
    <AuthorDirectory
      authors={authorsData.items}
      genres={genres}
      currentPage={page}
      totalPages={authorsData.totalPages}
      selectedGenres={genreIds}
    />
  );
}
