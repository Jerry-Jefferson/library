import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import { FavoritesList } from "./components/favoritesList";

export default function Favourites() {
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-5xl sm:text-6xl font-bold">Saved Masterpieces</h2>
        <p className="text-lg sm:text-xl text-secondary">
          Every great reader has a story to tell. Revisit the titles that captured your heart and
          curate a gallery of your lifelong literary companions
        </p>
        <Suspense
          fallback={
            <ItemsSkeleton
              className="h-[580px]"
              gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              itemsNumber={8}
              withSort={false}
            />
          }
        >
          <FavoritesList />
        </Suspense>
      </div>
    </div>
  );
}
