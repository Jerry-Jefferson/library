import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../../../components/itemsSkeleton/itemsSkeleton";
import GenresContent from "../../genre/components/genresContent/genresContent";
import { GenreManagementList } from "../components/genreManagementList/genreManagementList";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Genres",
  });

  return {
    title: t("managementTitle"),
    description: t("managementDescription"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function GenresManagement() {
  return (
    <Suspense
      fallback={
        <ItemsSkeleton
          gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4"
          className="h-[70px]"
          itemsNumber={ITEMS_PER_PAGE.TWELVE}
          withSort={false}
        />
      }
    >
      <GenresContent>{(data) => <GenreManagementList {...data} />}</GenresContent>
    </Suspense>
  );
}
