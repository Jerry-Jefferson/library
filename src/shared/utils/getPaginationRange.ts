export const DOTS_MARKER = "...";
export const SIBLING_COUNT = 1;

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = SIBLING_COUNT
) {
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
