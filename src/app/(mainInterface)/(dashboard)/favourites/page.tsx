import { Suspense } from "react";
import { FavoritesList } from "./components/favoritesList";

export default function Favourites() {
  return (
    <Suspense fallback={<p>Loading favorites...</p>}>
      <div className="w-full flex justify-center bg-background">
        <div className="w-7/8 gap-4 flex flex-col mt-5 mb-5">
          <FavoritesList />
        </div>
      </div>
    </Suspense>
  );
}
