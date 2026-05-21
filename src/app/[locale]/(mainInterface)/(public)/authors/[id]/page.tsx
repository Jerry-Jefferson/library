import { getAuthorById, getAuthors } from "@/lib/modules/authors/authors";
import { getBooksByAuthorId } from "@/lib/modules/books/books";
import BookIcon from "@/public/book.png";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import { getTranslations } from "next-intl/server";
import { BookSection } from "../../components/booksSection/bookSection";
import { SectionHeader } from "../../components/booksSection/sectionHeader";
import AuthorPage from "./components/authorPage";
import { notFound } from "next/dist/client/components/not-found";

export async function generateStaticParams() {
  const authors = await getAuthors();
  if (!authors) return [];
  return authors?.map((author) => ({ id: author._id }));
}

export default async function Author({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Record<string, string | undefined>;
}) {
  const { id } = await params;
  const author = await getAuthorById(id);
  if (!author) return notFound();
  const books = await getBooksByAuthorId(author?.books);
  const searchParam = await searchParams;
  const from = searchParam.from ?? "1";
  const t = await getTranslations("Common");
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-4/5 gap-6 flex flex-col mt-10 mb-10">
        <AuthorPage author={author} from={from} />
        <ErrorBoundary
          title={t("sectionUnavailable")}
          message={t("userMessages.tryAgainLater")}
          retryLabel={t("retry")}
          failedLabel={t("contentFailed")}
        >
          {author && (
            <BookSection books={books}>
              <SectionHeader alt="" src={BookIcon} title="byAuthor" />
            </BookSection>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
