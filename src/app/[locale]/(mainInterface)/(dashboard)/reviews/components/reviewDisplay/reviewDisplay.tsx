"use client";

import { Button } from "@/src/components/client/button/button";
import { Collapse } from "@/src/components/client/collapse/collapse";
import { ModalType } from "@/src/components/client/modalWindow/useModalQuery";
import { Rating } from "@/src/components/client/rating/rating";
import { UserAvatar } from "@/src/components/client/userAvatar/userAvatar";
import { IReviewSerialized } from "@/src/models/review";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";

export interface ReviewDisplayProps {
  review: IReviewSerialized;
  rating: number;
  date: string;
  comment: string;
  userName?: string;
  bookName?: string;
  isDashboard?: boolean;
  handleOpen?: (review: IReviewSerialized, modal: ModalType) => void;
  userId?: string;
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
  userId,
}: ReviewDisplayProps) {
  const canEdit = userId === review.userId;
  const t = useTranslations("Common");
  return (
    <div className="group relative bg-card-back border border-primary-hover w-full h-full rounded-md flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-3 items-start lg:flex-row">
        <div className="flex grow flex-row items-center gap-4">
          {userName ? <UserAvatar name={userName} /> : null}
          <div className="flex flex-col">
            <p>{userName ?? bookName}</p>
            <p className="text-secondary text-sm">{date}</p>
          </div>
        </div>
        <Rating rating={rating} />
        {canEdit ? (
          <Button
            size="small"
            className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3
            transition-all hover:scale-110
            opacity-100 lg:opacity-0 md:group-hover:opacity-100
            absolute top-2 right-2"
            onClick={() => handleOpen?.(review, "edit")}
          >
            <MdEdit className="text-sm md:text-base text-black" />
          </Button>
        ) : null}
      </div>
      {isDashboard ? (
        <div className="grow">
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
        <div className="flex flex-col justify-between items-center gap-4 md:flex-row ">
          <Button
            fullWidth
            variant="custom"
            size="medium"
            className="border border-primary hover:bg-primary-hover transition-colors"
            onClick={() => handleOpen?.(review, "edit")}
          >
            {t("edit")}
          </Button>
          <Button
            fullWidth
            variant="custom"
            size="medium"
            className="border border-primary hover:bg-primary-hover transition-colors"
            onClick={() => handleOpen?.(review, "delete")}
          >
            {t("delete")}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
