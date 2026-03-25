import { getAuthorById, getAuthors } from "@/lib/modules/authors/authors";
import { Suspense } from "react";
import AuthorPage from "./components/authorPage";
import { getBooksById } from "@/lib/modules/books/books";
import { BookSection } from "../../components/booksSection/bookSection";
import { SectionHeader } from "../../components/booksSection/sectionHeader";

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors?.map((author) => ({ id: author._id }));
}

export default async function Author({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = await getAuthorById(id);
  if (!author) return null;
  const books = await getBooksById(author?.books);

  return (
    <Suspense fallback={<p>Wait...</p>}>
      <div className="w-full min-h-dvh flex justify-center bg-background">
        <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
          <AuthorPage author={author} />
          <BookSection books={books}>
            <SectionHeader alt="check icon" src="/book.png" title="Books by Author" />
          </BookSection>
        </div>
      </div>
    </Suspense>
  );
}
