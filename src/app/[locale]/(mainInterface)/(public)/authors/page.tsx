import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import AuthorDirectory from "../components/authors/authorDirectory";
import AuthorsContent from "../components/authorsContent/authorsContent";
import { getAuthorById } from "@/lib/modules/authors/authors";
import { Metadata } from "next";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Authors",
  });

  const author = await getAuthorById(id);

  if (!author) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = author.bio?.slice(0, 160);

  return {
    title: `${author.name} | ${t("titleSuffix")}`,
    description,

    openGraph: {
      title: author.name,
      description,
      type: "profile",
      images: author.image
        ? [
            {
              url: author.image,
              width: 600,
              height: 600,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: author.name,
      description,
      images: author.image ? [author.image] : [],
    },

    alternates: {
      canonical: `/authors/${id}`,
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
