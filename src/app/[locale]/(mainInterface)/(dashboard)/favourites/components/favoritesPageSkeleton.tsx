import Skeleton from "@/src/components/client/skeleton/skeleton";
import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";

export function FavoritesPageSkeleton() {
  return (
    <div className="w-full flex justify-center bg-background opacity-0 animate-fade-in animation-delay-300">
      <Skeleton animation="pulse" color="grey">
        <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
          <Skeleton.Rect className="h-[60px]" width="450px" />
          <Skeleton.Rect className="h-[56px]" />
          <div className="w-full gap-4 flex flex-col">
            <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: ITEMS_PER_PAGE.EIGHT }).map((_, index) => (
                <Skeleton.Rect key={index} className="h-[580px]" />
              ))}
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
