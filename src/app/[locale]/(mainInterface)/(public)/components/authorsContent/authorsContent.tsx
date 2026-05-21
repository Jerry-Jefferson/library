import { getFilteredAuthors } from "@/lib/modules/authors/authors";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ genres?: string; page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { genres, page } = await searchParams;

  const t = await getTranslations({
    locale,
    namespace: "Authors",
  });

  const genreText = genres ? ` - ${genres.replace(",", ", ")}` : "";
  const pageText = page && page !== "1" ? ` - page ${page}` : "";

  const title = `${t("title")}${genreText}${pageText}`;

  const description = genres ? t("descriptionFiltered") : t("description");

  return {
    title: {
      default: title,
      template: `%s | ${t("title")}`,
    },
    description,

    openGraph: {
      title,
      description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
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
