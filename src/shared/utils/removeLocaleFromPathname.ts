const locales = ["ru", "en"];

export function removeLocaleFromPathname(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, "");
    }
  }

  return pathname;
}
