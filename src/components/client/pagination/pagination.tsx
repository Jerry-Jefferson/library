"use client";

import LeftArrow from "@/public/left.png";
import RightArrow from "@/public/right.png";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const nextPage = () => {
    if (currentPage < totalPages) changePage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) changePage(currentPage - 1);
  };

  const pages = getPaginationRange(currentPage, totalPages, 1);

  return (
    <div className="flex justify-center gap-6 mt-8">
      <Button
        size="small"
        disabled={currentPage === 1}
        onClick={prevPage}
        className="max-h-10 max-w-10 rounded-xl border relative"
      >
        <Image fill alt="" src={LeftArrow} sizes="50px" />
      </Button>

      <div className="flex justify-center flex-wrap gap-2 md:flex-nowrap">
        {pages.map((page, index) => {
          if (page === DOTS_MARKER) return <span key={`dots-${index}`}>{DOTS_MARKER}</span>;
          return (
            <Button
              key={`page-${page}-${index}`}
              onClick={() => changePage(page as number)}
              padding="small"
              className={`max-h-10 min-w-10 rounded-xl border ${currentPage === page ? "bg-primary text-white" : ""}`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        size="small"
        disabled={currentPage === totalPages}
        onClick={nextPage}
        className="max-h-10 max-w-10 rounded-xl border relative"
      >
        <Image fill alt="" src={RightArrow} sizes="50px" />
      </Button>
    </div>
  );
}
