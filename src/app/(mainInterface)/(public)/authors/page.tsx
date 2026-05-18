import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import AuthorDirectory from "../components/authors/authorDirectory";
import AuthorsContent from "../components/authorsContent/authorsContent";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function Authors({ searchParams }: AuthorsProps) {
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Authors Directory</h2>
        <p className="text-xl text-secondary">
          Meet the brilliant minds behind our collection of over 50,000 titles.
        </p>
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
