import { getNewBooks, getPopularBooks } from "@/lib/modules/books/books";
import FireIcon from "@/public/fire32.png";
import NewIcon from "@/public/new32.png";
import { BookSection } from "./components/booksSection/bookSection";
import { SectionHeader } from "./components/booksSection/sectionHeader";

export default async function Home() {
  const [newBooks, popularBooks] = await Promise.all([getNewBooks(20), getPopularBooks(20)]);

  return (
    <>
      <BookSection books={popularBooks}>
        <SectionHeader alt="arrow icon" src={FireIcon} title="Popular Books" />
      </BookSection>
      <BookSection books={newBooks}>
        <SectionHeader alt="check icon" src={NewIcon} title="New Arrivals" />
      </BookSection>
    </>
  );
}
