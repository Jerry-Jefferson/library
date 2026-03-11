export const routes = {
  home: "/",
  books: "/books",
  book: "/books/[id]",
  authors: "/authors",
  author: "/authors/[id]",
  favourites: "/favourites",
  reviews: "/reviews",
  signIn: "/signIn",
  signUp: "/signUp",
  admin: "/admin",
  recovery: "/passwordRecovery",
  denied: "/403",
};

export type RouteType = "AUTH" | "ADMIN" | "PRIVATE" | "PUBLIC";

export type RouteConfig = {
  type: RouteType;
  paths: Set<string>;
};

export const ROUTE_TYPES: RouteConfig[] = [
  { type: "AUTH", paths: new Set([routes.signIn, routes.signUp, routes.recovery]) },
  { type: "ADMIN", paths: new Set([routes.admin]) },
  { type: "PRIVATE", paths: new Set([routes.favourites, routes.reviews]) },
  { type: "PUBLIC", paths: new Set([routes.home, routes.books, routes.authors, routes.denied]) },
];
