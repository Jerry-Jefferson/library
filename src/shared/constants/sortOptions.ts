import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";

export type SortOption<T> = {
  _id: string;
  title: string;
  comparator: (a: T, b: T) => number;
};

export const bookSortOptions: SortOption<IBookSerialized>[] = [
  {
    _id: "title-asc",
    title: "Title A → Z",
    comparator: (a, b) => a.title.localeCompare(b.title),
  },
  {
    _id: "title-desc",
    title: "Title Z → A",
    comparator: (a, b) => b.title.localeCompare(a.title),
  },
  {
    _id: "year-desc",
    title: "Newest first",
    comparator: (a, b) => b.year - a.year,
  },
  {
    _id: "year-asc",
    title: "Oldest first",
    comparator: (a, b) => a.year - b.year,
  },
  {
    _id: "rating-desc",
    title: "Highest rating",
    comparator: (a, b) => b.rating - a.rating,
  },
  {
    _id: "rating-asc",
    title: "Lowest rating",
    comparator: (a, b) => a.rating - b.rating,
  },
];

export const authorSortOptions: SortOption<IAuthorSerialized>[] = [
  {
    _id: "name-asc",
    title: "Name A → Z",
    comparator: (a, b) => a.name.localeCompare(b.name),
  },
  {
    _id: "name-desc",
    title: "Name Z → A",
    comparator: (a, b) => b.name.localeCompare(a.name),
  },
  {
    _id: "books-desc",
    title: "Most books",
    comparator: (a, b) => b.books.length - a.books.length,
  },
  {
    _id: "books-asc",
    title: "Fewest books",
    comparator: (a, b) => a.books.length - b.books.length,
  },
];
