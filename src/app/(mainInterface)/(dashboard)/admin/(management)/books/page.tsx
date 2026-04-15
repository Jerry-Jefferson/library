import BooksContent from "@/src/app/(mainInterface)/(public)/components/booksContent/booksContent";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { ManagementList } from "../components/managementList/managementList";

export interface BooksProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function BooksManagement({ searchParams }: BooksProps) {
  return (
    <Suspense fallback={<div>Loading books...</div>}>
      <BooksContent searchParams={searchParams} itemsPerPage={ITEMS_PER_PAGE.TWELVE}>
        {(data) => <ManagementList {...data} />}
      </BooksContent>
    </Suspense>
  );
}
