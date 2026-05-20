import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../../../components/itemsSkeleton/itemsSkeleton";
import { AuthorManagementList } from "../components/authorManagementList/authorManagementList";
import AuthorsContent from "@/src/app/[locale]/(mainInterface)/(public)/components/authorsContent/authorsContent";
export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function AuthorsManagement({ searchParams }: AuthorsProps) {
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
      <AuthorsContent searchParams={searchParams} itemsPerPage={ITEMS_PER_PAGE.TWELVE}>
        {(data) => <AuthorManagementList {...data} />}
      </AuthorsContent>
    </Suspense>
  );
}
