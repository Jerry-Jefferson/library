"use client";

import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";
import { useState } from "react";
import { Button } from "../button/button";

export interface DeleteMessageProps {
  handleCancel: () => void;
  cancelButton: string;
  acceptButton: string;
  handleDelete: () => Promise<void>;
  entity: IBookSerialized | IAuthorSerialized;
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

  const isAuthor = "name" in entity;
  const displayName = isAuthor ? entity.name : entity.title;

  return (
    <div className="flex flex-col justify-center gap-8 w-full">
      <div className="self-center">
        <p>Are you sure you want to delete {displayName}</p>
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
