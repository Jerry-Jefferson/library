import { getReviewsByUserId } from "@/lib/modules/reviews/reviews";
import { auth } from "@/src/auth";
import { ReviewManagement } from "../reviewManagement/reviewManagement";
import { getTranslations } from "next-intl/server";

export async function ReviewContent() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return null;
  const t = await getTranslations("Reviews");
  const userReviews = await getReviewsByUserId(userId);
  if (!userReviews) return <p>{t("noReviews")}</p>;
  return <ReviewManagement userReviews={userReviews} />;
}
