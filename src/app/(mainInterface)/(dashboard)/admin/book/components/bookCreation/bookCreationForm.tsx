"use client";

import { Button } from "@/src/components/client/button/button";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bookCreationSchema, BookCreationSchema } from "./bookCreation.schema";

const bookFields = {
  name: "name",
  description: "description",
  author: "author",
  genres: "genres",
  year: "year",
} as const;

const defaultBookCreationValues = {
  [bookFields.name]: "",
  [bookFields.description]: "",
  [bookFields.author]: "",
  [bookFields.genres]: [""],
  [bookFields.year]: undefined,
};

export interface BookCreationFormProps {
  id?: string | null;
  handleCancel?: () => void;
  cancelButton: string;
  acceptButton: string;
}

export function BookCreationForm({ cancelButton, acceptButton }: BookCreationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<BookCreationSchema>({
    resolver: zodResolver(bookCreationSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: defaultBookCreationValues,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(() => console.log(""))}>
      <div className="flex justify-between gap-6">
        <FormInput
          name="title"
          type="text"
          register={register}
          label="Title"
          errorMessage={errors.title?.message}
        />
        <FormInput
          name="year"
          type="text"
          register={register}
          label="Year"
          errorMessage={errors.year?.message}
        />
      </div>
      <div className="flex justify-between gap-6">
        <FormInput
          name="authorId"
          type="text"
          register={register}
          label="Author"
          errorMessage={errors.authorId?.message}
        />
        <FormInput
          name="genres"
          type="text"
          register={register}
          label="Genres"
          errorMessage={errors.genres?.message}
        />
      </div>
      <TextArea
        name="description"
        label="Synopsis"
        register={register}
        errorMessage={errors.description?.message}
      />
      <div className="flex justify-between gap-6">
        <Button padding="medium" disabled={!isValid}>
          {acceptButton}
        </Button>
        <Button padding="medium" colorVariant="secondary" type="reset" onClick={reset}>
          {cancelButton}
        </Button>
      </div>
    </form>
  );
}
