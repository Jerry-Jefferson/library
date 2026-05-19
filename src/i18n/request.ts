import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    timeZone: "UTC",

    messages: {
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/auth.json`)).default,
      ...(await import(`../../messages/${locale}/dashboard.json`)).default,
      ...(await import(`../../messages/${locale}/books.json`)).default,
      ...(await import(`../../messages/${locale}/entities.json`)).default,
      ...(await import(`../../messages/${locale}/authors.json`)).default,
      ...(await import(`../../messages/${locale}/favorites.json`)).default,
      ...(await import(`../../messages/${locale}/reviews.json`)).default,
      ...(await import(`../../messages/${locale}/genres.json`)).default,
    },
  };
});
