"use client";

import { MdFavorite } from "react-icons/md";
import { Button } from "../button/button";
import { useFavorite } from "@/src/shared/hooks/useFavorite";

export type FavoriteProps = {
  bookId: string;
  initial: boolean;
  onRemoved?: () => void;
};

export function Favorite(props: FavoriteProps) {
  const { isFavorite, toggle } = useFavorite(props);

  return (
    <Button onClick={toggle} variant="icon">
      <MdFavorite
        className={`transition-colors ${isFavorite ? "text-primary" : "text-secondary"}`}
      />
    </Button>
  );
}
