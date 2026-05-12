import { getReviewsByUserId } from "@/lib/modules/reviews/reviews";
import { auth } from "@/src/auth";
import { ReviewManagement } from "../reviewManagement/reviewManagement";

export async function ReviewContent() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return null;

  const userReviews = await getReviewsByUserId(userId);
  if (!userReviews) return <p>You have not left any reviews yet</p>;
  return <ReviewManagement userReviews={userReviews} />;
}
