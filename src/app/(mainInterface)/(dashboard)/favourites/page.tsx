import { Suspense } from "react";
import { FavoritesList } from "./components/favoritesList";

export default function Favourites() {
  return (
    <Suspense fallback={<p>Loading favorites...</p>}>
      <div className="w-full flex justify-center bg-background">
        <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
          <h2 className="text-6xl font-bold">Saved Masterpieces</h2>
          <p className="text-xl text-secondary">
            Every great reader has a story to tell. Revisit the titles that captured your heart and
            curate a gallery of your lifelong literary companions
          </p>
          <FavoritesList />
        </div>
      </div>
    </Suspense>
  );
}
