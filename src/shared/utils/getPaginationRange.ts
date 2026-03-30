export const DOTS_MARKER = "...";

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getPaginationRange(currentPage: number, totalPages: number, siblingCount = 1) {
  const pages: (number | "...")[] = [];

  const prevPage = Math.max(currentPage - siblingCount, 1);
  const nextPage = Math.min(currentPage + siblingCount, totalPages);

  if (prevPage > 1) {
    pages.push(1);
    if (prevPage > 2) pages.push(DOTS_MARKER);
  }

  for (let i = prevPage; i <= nextPage; i++) {
    pages.push(i);
  }

  if (nextPage < totalPages) {
    if (nextPage < totalPages - 1) pages.push(DOTS_MARKER);
    pages.push(totalPages);
  }

  return pages;
}
