import { ItemsSkeleton } from "@/src/app/[locale]/(mainInterface)/components/itemsSkeleton/itemsSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ReviewContent } from "./components/reviewContent/reviewContent";
import { Metadata } from "next";

interface ReviewsProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Reviews",
  });

  return {
    title: t("yourReviews"),
    description: t("myReviewsDescription"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Reviews({ params }: ReviewsProps) {
  const { locale } = await params;

  const tReviews = await getTranslations({
    locale,
    namespace: "Reviews",
  });

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
          <ReviewContent locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
