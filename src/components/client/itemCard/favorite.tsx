"use client";

import { useOptimistic, startTransition } from "react";
import { MdFavorite } from "react-icons/md";
import { Button } from "../button/button";
import { toggleFavorite } from "@/lib/modules/users/user";

export type FavoriteProps = {
  bookId: string;
  initial: boolean;
  onRemoved?: () => void;
};

export function Favorite({ bookId, initial, onRemoved }: FavoriteProps) {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(initial, (state) => !state);

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticFavorite(null);

      const newState = await toggleFavorite(bookId);

      if (!newState && onRemoved) {
        onRemoved(); // ✅ теперь тип знает про это
      }
    });
  };

  return (
    <Button onClick={handleClick} variant="icon">
      <MdFavorite
        className={`transition-colors ${optimisticFavorite ? "text-primary" : "text-secondary"}`}
      />
    </Button>
  );
}
