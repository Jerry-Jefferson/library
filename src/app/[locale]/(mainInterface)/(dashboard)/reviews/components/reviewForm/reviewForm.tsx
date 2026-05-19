"use client";

import { createReview, updateReview } from "@/lib/modules/reviews/review.actions";
import {
  baseReviewSchema,
  BaseReviewSchema,
  ReviewUpdateSchema,
} from "@/lib/modules/reviews/review.schema";
import { Button } from "@/src/components/client/button/button";
import { FormRating } from "@/src/components/client/rating/variants/formRating/formRating";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { MdOutlineWarning } from "react-icons/md";
import { toast } from "react-toastify";

export interface ReviewFormProps {
  editionData?: ReviewUpdateSchema;
  handleCancel?: () => void;
  cancelButton: string;
  acceptButton: string;
  bookId: string;
}

const reviewFields = {
  rating: "rating",
  comment: "comment",
} as const;

const defaultReviewValues = {
  [reviewFields.rating]: 0,
  [reviewFields.comment]: "",
};

export function ReviewForm({
  editionData,
  handleCancel,
  cancelButton,
  acceptButton,
  bookId,
}: ReviewFormProps) {
  const isEditMode = Boolean(editionData?._id);
  const t = useTranslations("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<BaseReviewSchema>({
    resolver: zodResolver(baseReviewSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: editionData || defaultReviewValues,
  });

  async function onSubmit({ rating, comment }: BaseReviewSchema) {
    try {
      const data = { rating, comment, bookId };
      let result;
      if (isEditMode && editionData?._id) {
        result = await updateReview({ ...editionData, rating, comment });
      } else {
        result = await createReview(data);
      }

      if (!result.success) {
        toast.error(t(`Reviews.userMessages.${result.message}`));
        return;
      }

      toast.success(t(`Reviews.userMessages.${result.message}`));

      handleCancel?.();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t(`Common.userMessages.wentWrong`));
    }
  }

  return (
    <form className="flex flex-col gap-4 w-full p-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-secondary">{t("Reviews.rateBook")}</h2>
      <FormRating control={control} name="rating" errorMessage={errors.rating?.message} />
      <TextArea
        label={t("Reviews.yourThoughts")}
        register={register}
        name="comment"
        errorMessage={
          errors.comment?.message
            ? t(`Reviews.reviewValidation.${errors.comment.message}`)
            : undefined
        }
      />
      <div className="flex items-center justify-center gap-4 p-4 bg-background border border-secondary rounded-md">
        <MdOutlineWarning className="text-4xl md:text-4xl lg:text-4xl text-primary" />
        <p className="text-secondary">{t("Reviews.publicReview")}</p>
      </div>
      <div className="flex justify-between gap-6">
        <Tooltip fullWidth helpText={!isValid ? t(`Common.fillAllFields`) : ""}>
          <Button
            fullWidth
            size="medium"
            variant="primary"
            disabled={!isValid || isSubmitting || isSubmitSuccessful}
            isLoading={isSubmitting}
          >
            {acceptButton}
          </Button>
        </Tooltip>
        <Button fullWidth size="medium" variant="secondary" type="button" onClick={handleCancel}>
          {cancelButton}
        </Button>
      </div>
    </form>
  );
}
