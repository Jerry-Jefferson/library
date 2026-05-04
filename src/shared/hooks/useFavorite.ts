"use client";

import { useOptimistic, startTransition } from "react";
import { toggleFavorite } from "@/lib/modules/users/user";
import { useRouter } from "next/navigation";

export type Params = {
  initial: boolean;
  bookId: string;
  onRemoved?: () => void;
};

export function useFavorite({ initial, bookId, onRemoved }: Params) {
  const [isFavorite, setOptimistic] = useOptimistic(initial, (state) => !state);
  const router = useRouter();
  const toggle = () => {
    startTransition(async () => {
      setOptimistic(null);

      const newState = await toggleFavorite(bookId);

      if (!newState && onRemoved) {
        onRemoved();
      }
    });
    router.refresh();
  };

  return {
    isFavorite,
    toggle,
  };
}
