import { routes } from "./routes";

export type SessionRoles = "USER" | "ADMIN" | "GUEST";

export const NAV_LINKS_ROLE = {
  ADMIN: {
    nav: [
      { href: `${routes.home}`, label: "home" },
      { href: `${routes.books}`, label: "books" },
      { href: `${routes.authors}`, label: "authors" },
      { href: `${routes.favourites}`, label: "favourites" },
      { href: `${routes.reviews}`, label: "reviews" },
    ],
  },
  USER: {
    nav: [
      { href: `${routes.home}`, label: "home" },
      { href: `${routes.books}`, label: "books" },
      { href: `${routes.authors}`, label: "authors" },
      { href: `${routes.favourites}`, label: "favourites" },
      { href: `${routes.reviews}`, label: "reviews" },
    ],
  },
  GUEST: {
    nav: [
      { href: `${routes.home}`, label: "home" },
      { href: `${routes.books}`, label: "books" },
      { href: `${routes.authors}`, label: "authors" },
    ],
  },
} as const;

export const AUTH_BUTTONS = [
  { href: `${routes.signIn}`, label: "signIn" },
  { href: `${routes.signUp}`, label: "signUp" },
];
