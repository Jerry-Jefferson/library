import { getReviewsByUserId } from "@/lib/modules/reviews/reviews";
import { auth } from "@/src/auth";
import { ReviewManagement } from "../reviewManagement/reviewManagement";
import { getTranslations } from "next-intl/server";
import EmptyState from "@/src/components/client/emptyState/emptyState";
import { routes } from "@/src/shared/constants/routes";

export interface ReviewContentProps {
  locale: string;
}

export async function ReviewContent({ locale }: ReviewContentProps) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return null;

  const t = await getTranslations({
    locale,
    namespace: "Reviews",
  });

  const userReviews = await getReviewsByUserId(userId);

  return userReviews ? (
    <ReviewManagement userReviews={userReviews} />
  ) : (
    <EmptyState
      title={t("noReviewsWritten")}
      description={t("shareYourThoughts")}
      path={`/${locale}${routes.books}`}
      buttonLabel={t("booksButtonLabel")}
    />
  );
}
