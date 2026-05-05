"use client";

import { useRef } from "react";
import { toggleFavorite } from "@/lib/modules/users/user";
import { useFavoritesStore } from "@/src/shared/context/useFavoritesStore";

export function useFavorite({ bookId }: { bookId: string }) {
  const { isFavorite, toggleLocal } = useFavoritesStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = () => {
    toggleLocal(bookId);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        await toggleFavorite(bookId);
      } catch {
        toggleLocal(bookId);
      }
    }, 300);
  };

  return {
    isFavorite: isFavorite(bookId),
    toggle: handleToggle,
  };
}
