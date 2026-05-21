import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import AuthorDirectory from "../components/authors/authorDirectory";
import AuthorsContent from "../components/authorsContent/authorsContent";
import { Metadata } from "next";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    genres?: string;
    page?: string;
    sort?: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { genres, page } = await searchParams;

  const t = await getTranslations({
    locale,
    namespace: "Authors",
  });

  const title = genres ? `${t("title")} - ${genres}` : t("authorsDirectory");

  const description = genres
    ? t("descriptionFiltered")
    : page
      ? `${t("description")} (page ${page})`
      : t("description");

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

export default async function Authors({ searchParams, params }: AuthorsProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Authors",
  });
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">{t("authorsDirectory")}</h2>
        <p className="text-xl text-secondary">{t("description")}</p>
        <Suspense
          fallback={
            <ItemsSkeleton
              className="h-[520px]"
              gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4"
              itemsNumber={ITEMS_PER_PAGE.EIGHT}
            />
          }
        >
          <AuthorsContent searchParams={searchParams}>
            {(data) => <AuthorDirectory {...data} />}
          </AuthorsContent>
        </Suspense>
      </div>
    </div>
  );
}
