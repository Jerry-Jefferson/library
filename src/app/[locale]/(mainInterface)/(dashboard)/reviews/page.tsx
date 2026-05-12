import { Suspense } from "react";
import { ReviewContent } from "./components/reviewContent/reviewContent";

export default function Reviews() {
  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading reviews...</p>}>
        <ReviewContent />
      </Suspense>
    </div>
  );
}
