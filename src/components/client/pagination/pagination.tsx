"use client";

import { Button } from "@/src/components/client/button/button";
import { DOTS_MARKER, getPaginationRange } from "@/src/shared/utils/getPaginationRange";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

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
    <div className="flex justify-center items-center gap-6 mt-8">
      <Button
        size="small"
        disabled={currentPage === 1}
        onClick={prevPage}
        variant="icon"
        className="bg-background border border-secondary hover:bg-primary rounded-2xl transition-colors min-w-[26px] min-h-[26px] md:min-w-[25px] md:min-h-[25px] lg:min-w-[24px] lg:min-h-[24px] flex-shrink-0 flex items-center justify-center"
      >
        <MdArrowBackIos className="w-full h-full flex-shrink-0" />
      </Button>

      <div className="flex justify-center flex-wrap gap-2 md:flex-nowrap">
        {pages.map((page, index) => {
          if (page === DOTS_MARKER) return <span key={`dots-${index}`}>{DOTS_MARKER}</span>;
          return (
            <Button
              key={`page-${page}-${index}`}
              onClick={() => changePage(page as number)}
              size="small"
              className={`max-h-10 min-w-10 rounded-xl border
              ${currentPage === page ? "bg-primary text-white" : ""}`}
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
        variant="icon"
        className="bg-background border border-secondary hover:bg-primary rounded-2xl transition-colors min-w-[26px] min-h-[26px] md:min-w-[25px] md:min-h-[25px] lg:min-w-[24px] lg:min-h-[24px] flex-shrink-0 flex items-center justify-center"
      >
        <MdArrowForwardIos className="w-full h-full flex-shrink-0" />
      </Button>
    </div>
  );
}
