import BooksContent from "@/src/app/(mainInterface)/(public)/components/booksContent/booksContent";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../../../components/itemsSkeleton/itemsSkeleton";
import { ManagementList } from "../components/managementList/managementList";

export interface BooksProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function BooksManagement({ searchParams }: BooksProps) {
  return (
    <Suspense
      fallback={
        <ItemsSkeleton
          className="h-[250px]"
          gridClassName="grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-4"
          itemsNumber={ITEMS_PER_PAGE.TWELVE}
        />
      }
    >
      <BooksContent searchParams={searchParams} itemsPerPage={ITEMS_PER_PAGE.TWELVE}>
        {(data) => <ManagementList {...data} />}
      </BooksContent>
    </Suspense>
  );
}
