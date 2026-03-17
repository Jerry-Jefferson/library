import { getAuthors } from "@/lib/modules/authors/authors";
import AuthorDirectory from "../components/authors/authorDirectory";

export default async function Authors() {
  const authors = await getAuthors();
  return <AuthorDirectory authors={authors} />;
}
