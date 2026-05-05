"use client";

import { MdFavorite } from "react-icons/md";
import { Button } from "../button/button";
import { useFavorite } from "@/src/shared/hooks/useFavorite";

export type FavoriteProps = {
  bookId: string;
};

export function Favorite({ bookId }: FavoriteProps) {
  const { isFavorite, toggle } = useFavorite({ bookId });

  return (
    <Button onClick={toggle} variant="icon">
      <MdFavorite
        className={`transition-colors ${isFavorite ? "text-primary" : "text-secondary"}`}
      />
    </Button>
  );
}
