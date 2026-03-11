import { ROUTE_TYPES, RouteType } from "../constants/routes";

export function getAccessType(route: string): RouteType {
  const match = ROUTE_TYPES.find(({ paths }) => paths.has(route));

  return match?.type ?? "PRIVATE";
}
