import { getNewBooks, getPopularBooks } from "@/lib/modules/books/books";
import FireIcon from "@/public/fire32.png";
import NewIcon from "@/public/new32.png";
import { BookSection } from "./components/booksSection/bookSection";

export default async function Home() {
  const [newBooks, popularBooks] = await Promise.all([getNewBooks(20), getPopularBooks(20)]);

  return (
    <>
      <BookSection title="Popular Books" alt="arrow icon" src={FireIcon} books={popularBooks} />
      <BookSection title="New Arrivals" alt="check icon" src={NewIcon} books={newBooks} />
    </>
  );
}
