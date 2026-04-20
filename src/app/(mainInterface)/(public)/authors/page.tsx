import { Suspense } from "react";
import AuthorDirectory from "../components/authors/authorDirectory";
import AuthorsContent from "../components/authorsContent/authorsContent";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function Authors({ searchParams }: AuthorsProps) {
  return (
    <Suspense fallback={<div>Loading authors...</div>}>
      <AuthorsContent searchParams={searchParams}>
        {(data) => <AuthorDirectory {...data} />}
      </AuthorsContent>
    </Suspense>
  );
}
