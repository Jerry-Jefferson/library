import { Suspense } from "react";
import { ReviewContent } from "./components/reviewContent/reviewContent";
import { getTranslations } from "next-intl/server";

export default async function Reviews() {
  const tCommon = await getTranslations("Common");
  const tEntity = await getTranslations("Entities");
  return (
    <div className="p-4">
      <Suspense
        fallback={
          <p>
            {tCommon("loading", {
              entity: tEntity("review.loading"),
            })}
          </p>
        }
      >
        <ReviewContent />
      </Suspense>
    </div>
  );
}
