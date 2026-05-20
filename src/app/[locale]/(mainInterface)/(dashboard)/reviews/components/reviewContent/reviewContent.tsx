import { getReviewsByUserId } from "@/lib/modules/reviews/reviews";
import { auth } from "@/src/auth";
import { ReviewManagement } from "../reviewManagement/reviewManagement";
import { getTranslations } from "next-intl/server";
import EmptyState from "@/src/components/client/emptyState/emptyState";
import { routes } from "@/src/shared/constants/routes";

export async function ReviewContent() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return null;
  const t = await getTranslations("Reviews");
  const userReviews = await getReviewsByUserId(userId);

  return userReviews ? (
    <ReviewManagement userReviews={userReviews} />
  ) : (
    <EmptyState
      title={t("noReviewsWritten")}
      description={t("shareYourThoughts")}
      path={routes.books}
      buttonLabel={t("booksButtonLabel")}
    />
  );
}
