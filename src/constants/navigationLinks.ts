import { routes } from "./routes";

export const NAV_LINKS_ROLE = {
  ADMIN: {
    nav: [
      { href: `${routes.home}`, label: "Home" },
      { href: `${routes.books}`, label: "Books" },
      { href: `${routes.authors}`, label: "Authors" },
    ],
    auth: [{ href: `${routes.home}`, label: "Quit" }],
  },
  USER: {
    nav: [
      { href: `${routes.home}`, label: "Home" },
      { href: `${routes.books}`, label: "Books" },
      { href: `${routes.authors}`, label: "Authors" },
      { href: `${routes.favourites}`, label: "Favourites" },
      { href: `${routes.reviews}`, label: "Reviews" },
    ],
    auth: [{ href: `${routes.home}`, label: "Quit" }],
  },
  GUEST: {
    nav: [
      { href: `${routes.home}`, label: "Home" },
      { href: `${routes.books}`, label: "Books" },
      { href: `${routes.authors}`, label: "Authors" },
    ],
    auth: [
      { href: `${routes.signIn}`, label: "Sign in" },
      { href: `${routes.signUp}`, label: "Sign up" },
    ],
  },
} as const;
