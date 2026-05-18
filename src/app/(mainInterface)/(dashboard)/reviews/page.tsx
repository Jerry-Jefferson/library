import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";
import { ReviewContent } from "./components/reviewContent/reviewContent";

export default function Reviews() {
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Your Reviews</h2>
        <p className="text-xl text-secondary">
          Your literary legacy in one place: rediscover your past reviews and track how your
          perspective has evolved over time
        </p>
        <Suspense
          fallback={
            <ItemsSkeleton
              className="h-[255px]"
              gridClassName="grid-cols-2"
              itemsNumber={6}
              withSort={false}
            />
          }
        >
          <ReviewContent />
        </Suspense>
      </div>
    </div>
  );
}
