import AuthorsContent from "@/src/app/(mainInterface)/(public)/components/authorsContent/authorsContent";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { AuthorManagementList } from "../components/authorManagementList/authorManagementList";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function AuthorsManagement({ searchParams }: AuthorsProps) {
  return (
    <Suspense fallback={<div>Loading authors...</div>}>
      <AuthorsContent searchParams={searchParams} itemsPerPage={ITEMS_PER_PAGE.TWELVE}>
        {(data) => <AuthorManagementList {...data} />}
      </AuthorsContent>
    </Suspense>
  );
}
