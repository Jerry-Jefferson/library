import { Suspense } from "react";
import { FavoritesList } from "./components/favoritesList";

export default function Favourites() {
  return (
    <Suspense fallback={<p>Loading favorites...</p>}>
      <FavoritesList />
    </Suspense>
  );
}
