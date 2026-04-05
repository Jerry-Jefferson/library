import { ROUTE_ACCESS } from "./routeAccess";

export const routes = {
  home: "/",
  books: "/books",
  book: (id: string) => `/books/${id}`,
  authors: "/authors",
  author: (id: string) => `/authors/${id}`,
  favourites: "/favourites",
  reviews: "/reviews",
  signIn: "/signIn",
  signUp: "/signUp",
  admin: "/admin",
  bookCreation: "/admin/book",
  authorCreation: "/admin/author",
  recovery: "/passwordRecovery",
  denied: "/403",
};

export type RouteGroup = "AUTH" | "ADMIN" | "PRIVATE" | "PUBLIC";

export type RouteConfig = {
  type: RouteGroup;
  paths: Set<string>;
  prefixes?: string[];
};

export const ROUTE_GROUPS: RouteConfig[] = [
  {
    type: ROUTE_ACCESS.AUTH,
    paths: new Set([routes.signIn, routes.signUp, routes.recovery]),
  },
  { type: ROUTE_ACCESS.ADMIN, paths: new Set([routes.admin]), prefixes: ["/admin"] },
  {
    type: ROUTE_ACCESS.PRIVATE,
    paths: new Set([routes.favourites, routes.reviews]),
    prefixes: ["/reviews"],
  },
  {
    type: ROUTE_ACCESS.PUBLIC,
    paths: new Set([routes.home, routes.books, routes.authors, routes.denied]),
    prefixes: ["/books", "/authors"],
  },
];
