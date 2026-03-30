"use client";

import { DOTS_MARKER, getPaginationRange } from "@/src/shared/utils/getPaginationRange";
import { Button } from "@/src/components/client/button/button";
import Image from "next/image";
import LeftArrow from "@/public/left.png";
import RightArrow from "@/public/right.png";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setPage,
}: PaginationProps) {
  const pages = getPaginationRange(currentPage, totalPages, 1);
  return (
    <div className="flex justify-center gap-6 mt-8">
      <Button
        padding="small"
        disabled={currentPage === 1}
        onClick={prevPage}
        className={`max-h-10 max-w-10 rounded-xl border relative`}
      >
        <Image fill alt="" src={LeftArrow} sizes="50px" />
      </Button>

      <div className="flex justify-center flex-wrap gap-2 md:flex-nowrap">
        {pages.map((page, index) => {
          if (page === DOTS_MARKER) {
            return <span key={`dots-${index}`}>{DOTS_MARKER}</span>;
          }

          return (
            <Button
              key={`page-${page}-${index}`}
              onClick={() => setPage(page)}
              padding="small"
              className={`max-h-10 min-w-10 rounded-xl border
              ${currentPage === page ? "bg-primary text-white" : ""}`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        padding="small"
        disabled={currentPage === totalPages}
        onClick={nextPage}
        className={`max-h-10 max-w-10 rounded-xl border relative`}
      >
        <Image fill alt="" src={RightArrow} sizes="50px" />
      </Button>
    </div>
  );
}
