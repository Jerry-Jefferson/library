"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FavoritesContextType = {
  isFavorite: (id: string) => boolean;
  toggleLocal: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({
  initialFavorites,
  children,
}: {
  initialFavorites: string[];
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(initialFavorites));

  const isFavorite = (id: string) => favorites.has(id);

  const toggleLocal = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <FavoritesContext.Provider value={{ isFavorite, toggleLocal }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesStore() {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error("useFavoritesStore must be used within FavoritesProvider");
  }

  return ctx;
}
