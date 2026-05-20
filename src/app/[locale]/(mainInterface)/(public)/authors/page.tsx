import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import AuthorDirectory from "../components/authors/authorDirectory";
import AuthorsContent from "../components/authorsContent/authorsContent";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
  params: Promise<{ locale: string }>;
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
