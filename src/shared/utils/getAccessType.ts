import { ROUTE_ACCESS } from "../constants/routeAccess";
import { ROUTE_GROUPS, RouteGroup } from "../constants/routes";

import { removeLocaleFromPathname } from "./removeLocaleFromPathname";

export function getAccessType(route: string): RouteGroup {
  const normalizedRoute = removeLocaleFromPathname(route);

  const match = ROUTE_GROUPS.find(
    ({ paths, prefixes }) =>
      paths.has(normalizedRoute) || prefixes?.some((p) => normalizedRoute.startsWith(p))
  );

  return match?.type ?? ROUTE_ACCESS.PRIVATE;
}
