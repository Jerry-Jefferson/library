"use client";

import { useFavorite } from "@/src/shared/hooks/useFavorite";
import { MdFavorite } from "react-icons/md";
import { Button } from "../button/button";

export type FavoriteProps = {
  bookId: string;
};

export function Favorite({ bookId }: FavoriteProps) {
  const { isFavorite, toggle } = useFavorite({ bookId });

  return (
    <Button
      onClick={toggle}
      variant="icon"
      className="min-w-[26px] min-h-[26px] md:min-w-[25px] md:min-h-[25px] lg:min-w-[24px] lg:min-h-[24px] flex-shrink-0 flex items-center justify-center"
    >
      <MdFavorite
        className={`transition-colors ${isFavorite ? "text-primary" : "text-secondary"} w-full h-full flex-shrink-0`}
      />
    </Button>
  );
}
