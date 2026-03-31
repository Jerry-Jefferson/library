"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const ITEMS_PER_PAGE = 8;

export function usePagination<T>(items: T[], itemsPerPage: number = ITEMS_PER_PAGE) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const nextPage = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    nextPage,
    prevPage,
    setPage,
  };
}
