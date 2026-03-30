import { getAuthors } from "@/lib/modules/authors/authors";
import AuthorDirectory from "../components/authors/authorDirectory";
import { Suspense } from "react";

export default async function Authors() {
  const authors = await getAuthors();
  return (
    <Suspense fallback={<div>Loading authors...</div>}>
      <AuthorDirectory authors={authors} />;
    </Suspense>
  );
}
