import FireIcon from "@/public/fire32.png";
import NewIcon from "@/public/new32.png";
import { getBooks } from "@/src/lib/db/books.repository";
import { BookSection } from "../../components/client/booksSection/BookSection";

export default async function Home() {
  const [newBooks, popularBooks] = await Promise.all([
    getBooks({ category: "new", limit: 9 }),
    getBooks({ category: "popular", limit: 9 }),
  ]);

  // export default async function Books() {

  //   const result = await fetch("http://localhost:3000/api/books?sort=rating&order=desc&limit=20");
  //   const resulty = await fetch("http://localhost:3000/api/books?sort=createdAt&order=desc&limit=20");
  //   const popularBooks = await result.json();
  //   const newBooks = await resulty.json();

  // For fixed request
  //   // const result = await fetch("http://localhost:3000/api/books");
  //   // const { newBooks, popularBooks } = await result.json();

  // }

  return (
    <>
      <BookSection title="Popular Books" alt="arrow icon" src={FireIcon} books={popularBooks} />
      <BookSection title="New Arrivals" alt="check icon" src={NewIcon} books={newBooks} />
    </>
  );
}
