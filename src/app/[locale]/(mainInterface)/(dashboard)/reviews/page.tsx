import { ItemsSkeleton } from "@/src/app/(mainInterface)/components/itemsSkeleton/itemsSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ReviewContent } from "./components/reviewContent/reviewContent";

export default async function Reviews() {
  const tReviews = await getTranslations("Reviews");

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">{tReviews("yourReviews")}</h2>
        <p className="text-xl text-secondary">{tReviews("description")}</p>
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
