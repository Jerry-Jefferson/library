import { ROUTE_ACCESS } from "../constants/routeAccess";
import { ROUTE_GROUPS, RouteGroup } from "../constants/routes";

export function getAccessType(route: string): RouteGroup {
  const match = ROUTE_GROUPS.find(
    ({ paths, prefixes }) => paths.has(route) || prefixes?.some((p) => route.startsWith(p))
  );

  return match?.type ?? ROUTE_ACCESS.PRIVATE;
}
