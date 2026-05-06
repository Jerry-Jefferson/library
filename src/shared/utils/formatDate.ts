export function formatDate(date: string | Date | undefined, locale = "en-US") {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
