"use client";

import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { IReviewSerialized } from "@/src/models/review";
import { useState } from "react";
import { Button } from "../button/button";

export interface DeleteMessageProps {
  handleCancel: () => void;
  cancelButton: string;
  acceptButton: string;
  handleDelete: () => Promise<void>;
  entity: IBookSerialized | IAuthorSerialized | IGenreSerialized | IReviewSerialized;
}

export function DeleteMessage({
  handleCancel,
  cancelButton,
  acceptButton,
  handleDelete,
  entity,
}: DeleteMessageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!entity) return null;

  const onDelete = async () => {
    setIsSubmitting(true);
    try {
      await handleDelete();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReview = "comment" in entity;
  let displayContent;
  if (isReview) {
    displayContent = "this review";
  } else {
    const name = "name" in entity ? entity.name : entity.title;
    displayContent = name;
  }

  const isBook = "rating" in entity && "description" in entity;
  let isWarning;
  if (isBook) {
    isWarning = entity.rating > 0;
  }

  return (
    <div className="flex flex-col justify-center gap-8 w-full">
      <div className="flex flex-col items-center">
        <p>
          Are you sure you want to delete{" "}
          {isReview ? <strong>this review</strong> : <strong>{displayContent}</strong>}?
        </p>
        <p className="text-secondary">
          {isWarning ? "The book has got reviews. They will be deleted with the book" : null}
        </p>
      </div>
      <div className="flex justify-between gap-6">
        <Button
          fullWidth
          size="medium"
          variant="primary"
          onClick={onDelete}
          disabled={isSubmitting}
        >
          {acceptButton}
        </Button>
        <Button fullWidth size="medium" variant="secondary" type="reset" onClick={handleCancel}>
          {cancelButton}
        </Button>
      </div>
    </div>
  );
}
