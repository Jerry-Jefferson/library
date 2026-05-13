import { getNewBooks, getPopularBooks } from "@/lib/modules/books/books";
import FireIcon from "@/public/fire32.png";
import NewIcon from "@/public/new32.png";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import { BookSection } from "./components/booksSection/bookSection";
import { SectionHeader } from "./components/booksSection/sectionHeader";

export default async function Home() {
  const [newBooks, popularBooks] = await Promise.all([getNewBooks(20), getPopularBooks(20)]);
  return (
    <div className="flex flex-col gap-6 p-6">
      <ErrorBoundary title="Section is unavailable now" message="Try again later">
        <BookSection books={popularBooks}>
          <SectionHeader alt="arrow icon" src={FireIcon} title="Popular Books" />
        </BookSection>
      </ErrorBoundary>
      <ErrorBoundary title="Section is unavailable now" message="Try again later">
        <BookSection books={newBooks}>
          <SectionHeader alt="check icon" src={NewIcon} title="New Arrivals" />
        </BookSection>
      </ErrorBoundary>
    </div>
  );
}
