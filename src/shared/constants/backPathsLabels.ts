import { routes } from "./routes";

export const BACK_PATHS_LABELS: Record<string, string> = {
  [routes.books]: "Book Directory",
  [routes.home]: "Home",
  [routes.authors]: "Author Directory",
  [routes.favourites]: "Favorites",
};

export const DEFAULT_LABEL = "previous";
