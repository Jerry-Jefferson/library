import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const validLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  return {
    locale: validLocale,
    timeZone: "UTC",

    messages: {
      ...(await import(`../../messages/${validLocale}/common.json`)).default,
      ...(await import(`../../messages/${validLocale}/auth.json`)).default,
      ...(await import(`../../messages/${validLocale}/dashboard.json`)).default,
      ...(await import(`../../messages/${validLocale}/books.json`)).default,
      ...(await import(`../../messages/${validLocale}/entities.json`)).default,
      ...(await import(`../../messages/${validLocale}/authors.json`)).default,
      ...(await import(`../../messages/${validLocale}/favorites.json`)).default,
      ...(await import(`../../messages/${validLocale}/reviews.json`)).default,
      ...(await import(`../../messages/${validLocale}/genres.json`)).default,
      ...(await import(`../../messages/${validLocale}/error.json`)).default,
      ...(await import(`../../messages/${validLocale}/metadata.json`)).default,
    },
  };
});
