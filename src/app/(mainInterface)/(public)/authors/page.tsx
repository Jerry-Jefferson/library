import { Suspense } from "react";
import AuthorsContent from "../components/authorsContent/authorsContent";

export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export default function Authors({ searchParams }: AuthorsProps) {
  return (
    <Suspense fallback={<div>Loading authors...</div>}>
      <AuthorsContent searchParams={searchParams} />
    </Suspense>
  );
}
