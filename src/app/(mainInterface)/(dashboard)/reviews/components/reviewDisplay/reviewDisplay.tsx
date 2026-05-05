"use client";

import { Button } from "@/src/components/client/button/button";
import { Collapse } from "@/src/components/client/collapse/collapse";
import { ModalType } from "@/src/components/client/modalWindow/useModalQuery";
import { Rating } from "@/src/components/client/rating/rating";
import { UserAvatar } from "@/src/components/client/userAvatar/userAvatar";
import { IReviewSerialized } from "@/src/models/review";

export interface ReviewDisplayProps {
  review: IReviewSerialized;
  rating: number;
  date: string;
  comment: string;
  userName?: string;
  bookName?: string;
  isDashboard?: boolean;
  handleOpen?: (review: IReviewSerialized, modal: ModalType) => void;
}

export function ReviewDisplay({
  review,
  rating,
  date,
  comment,
  userName,
  bookName,
  isDashboard = false,
  handleOpen,
}: ReviewDisplayProps) {
  return (
    <div className="bg-card-back border border-primary-hover w-full rounded-md flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-4">
          {userName ? <UserAvatar name={userName} /> : null}
          <div className="flex flex-col">
            <p>{userName ?? bookName}</p>
            <p className="text-secondary text-sm">{date}</p>
          </div>
        </div>
        <Rating rating={rating} />
      </div>
      {isDashboard ? (
        <div className="flex-grow">
          <p className="text-secondary whitespace-pre-wrap line-clamp-3">{comment}</p>
        </div>
      ) : (
        <Collapse<HTMLParagraphElement>>
          {({ className, toggle, isShownFull, isTruncated, textRef }) => (
            <>
              <p className={`text-secondary whitespace-pre-wrap ${className}`} ref={textRef}>
                {comment}
              </p>
              {isTruncated && (
                <Button
                  variant="custom"
                  onClick={toggle}
                  className="hover:text-primary-hover text-primary text-[clamp(10px,0.5rem+1vw,16px)]"
                >
                  {isShownFull ? "Collapse" : "Read more"}
                </Button>
              )}
            </>
          )}
        </Collapse>
      )}
      {bookName ? (
        <div className="flex justify-between items-center gap-4">
          <Button
            fullWidth
            variant="custom"
            size="medium"
            className="border border-primary hover:bg-primary-hover transition-colors"
            onClick={() => handleOpen?.(review, "edit")}
          >
            Edit review
          </Button>
          <Button
            fullWidth
            variant="custom"
            size="medium"
            className="border border-primary hover:bg-primary-hover transition-colors"
            onClick={() => handleOpen?.(review, "delete")}
          >
            Delete review
          </Button>
        </div>
      ) : null}
    </div>
  );
}
