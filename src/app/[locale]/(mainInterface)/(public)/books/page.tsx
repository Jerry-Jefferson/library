import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import { BookDirectory } from "../components/bookDirectory/bookDirectory";
import BooksContent from "../components/booksContent/booksContent";

export interface BooksProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default async function Books({ searchParams }: BooksProps) {
  const t = await getTranslations("Books");

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">{t("booksDirectory")}</h2>
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
          <BooksContent searchParams={searchParams}>
            {(data) => <BookDirectory {...data} />}
          </BooksContent>
        </Suspense>
      </div>
    </div>
  );
}
