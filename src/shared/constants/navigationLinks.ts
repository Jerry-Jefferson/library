import { routes } from "./routes";

export type SessionRoles = "USER" | "ADMIN" | "GUEST";

export const NAV_LINKS_ROLE = {
  ADMIN: {
    nav: [
      { href: `${routes.home}`, label: "Home" },
      { href: `${routes.books}`, label: "Books" },
      { href: `${routes.authors}`, label: "Authors" },
      { href: `${routes.favourites}`, label: "Favourites" },
      { href: `${routes.reviews}`, label: "Reviews" },
    ],
  },
  USER: {
    nav: [
      { href: `${routes.home}`, label: "Home" },
      { href: `${routes.books}`, label: "Books" },
      { href: `${routes.authors}`, label: "Authors" },
      { href: `${routes.favourites}`, label: "Favourites" },
      { href: `${routes.reviews}`, label: "Reviews" },
    ],
  },
  GUEST: {
    nav: [
      { href: `${routes.home}`, label: "Home" },
      { href: `${routes.books}`, label: "Books" },
      { href: `${routes.authors}`, label: "Authors" },
    ],
  },
} as const;

export const AUTH_BUTTONS = [
  { href: `${routes.signIn}`, label: "Sign in" },
  { href: `${routes.signUp}`, label: "Sign up" },
];
