import { getNewBooks, getPopularBooks } from "@/lib/modules/books/books";
import FireIcon from "@/public/fire32.png";
import NewIcon from "@/public/new32.png";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import { getTranslations } from "next-intl/server";
import { BookSection } from "./components/booksSection/bookSection";
import { SectionHeader } from "./components/booksSection/sectionHeader";

export default async function Home() {
  const [newBooks, popularBooks] = await Promise.all([getNewBooks(20), getPopularBooks(20)]);
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-6 p-6">
      <ErrorBoundary
        title={t("Common.sectionUnavailable")}
        message={t("Common.userMessages.tryAgainLater")}
        retryLabel={t("Common.retry")}
        failedLabel={t("Common.contentFailed")}
      >
        <BookSection books={popularBooks}>
          <SectionHeader alt="arrow icon" src={FireIcon} title="popular" />
        </BookSection>
      </ErrorBoundary>
      <ErrorBoundary
        title={t("Common.sectionUnavailable")}
        message={t("Common.userMessages.tryAgainLater")}
        retryLabel={t("Common.retry")}
        failedLabel={t("Common.contentFailed")}
      >
        <BookSection books={newBooks}>
          <SectionHeader alt="check icon" src={NewIcon} title="new" />
        </BookSection>
      </ErrorBoundary>
    </div>
  );
}
