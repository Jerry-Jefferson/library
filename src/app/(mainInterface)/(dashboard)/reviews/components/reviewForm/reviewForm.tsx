"use client";

import { createReview } from "@/lib/modules/reviews/review.actions";
import { baseReviewSchema, BaseReviewSchema } from "@/lib/modules/reviews/review.schema";
import { Button } from "@/src/components/client/button/button";
import { FormRating } from "@/src/components/client/rating/variants/formRating/formRating";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlineWarning } from "react-icons/md";
import { toast } from "react-toastify";

export interface ReviewFormProps {
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

export function ReviewForm({ handleCancel, cancelButton, acceptButton, bookId }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<BaseReviewSchema>({
    resolver: zodResolver(baseReviewSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: defaultReviewValues,
  });

  async function onSubmit({ rating, comment }: BaseReviewSchema) {
    try {
      const data = { rating, comment, bookId };
      const result = await createReview(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset();
      handleCancel?.();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong");
    }
  }
  return (
    <form className="flex flex-col gap-4 w-full p-2" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-secondary">RATE THIS BOOK</h1>
      <FormRating control={control} name="rating" errorMessage={errors.rating?.message} />
      <TextArea
        label="YOUR THOUGHTS"
        register={register}
        name="comment"
        errorMessage={errors.comment?.message}
      />
      <div className="flex items-center justify-center gap-4 p-4 bg-background border border-secondary rounded-md">
        <MdOutlineWarning className="text-4xl md:text-4xl lg:text-4xl text-primary" />
        <p className="text-secondary">
          Your review will be public. Please follow our community guidelines: avoid spoilers and be
          respectful of other readers&apos; opinions.
        </p>
      </div>
      <div className="flex justify-between gap-6">
        <Button
          fullWidth
          size="medium"
          variant="primary"
          disabled={!isValid}
          isLoading={isSubmitting}
        >
          {acceptButton}
        </Button>
        <Button fullWidth size="medium" variant="secondary" type="button" onClick={handleCancel}>
          {cancelButton}
        </Button>
      </div>
    </form>
  );
}
