"use client";

import { bookCreationSchema, BookCreationSchema } from "@/lib/modules/books/book.schema";
import { createBook, updateBook } from "@/lib/modules/books/books.actions";
import { Button } from "@/src/components/client/button/button";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { FormMultiselect } from "@/src/components/client/select/variants/formMultiselect/formMultiselect";
import { FormSingleSelect } from "@/src/components/client/select/variants/formSingleSelect/formSingleSelect";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ImageUploader } from "../../../components/imageUploader/imageUploader";

const bookFields = {
  name: "title",
  description: "description",
  authorId: "authorId",
  genres: "genres",
  year: "year",
  imageUrl: "imageUrl",
} as const;

const defaultBookCreationValues = {
  [bookFields.name]: "",
  [bookFields.description]: "",
  [bookFields.authorId]: "",
  [bookFields.genres]: [],
  [bookFields.year]: null,
  [bookFields.imageUrl]: "",
};

export interface EditionData extends BookCreationSchema {
  _id: string;
}

export interface BookCreationFormProps {
  editionData?: EditionData;
  genres: IGenreSerialized[];
  authors: IAuthorSerialized[];
  handleCancel?: () => void;
  cancelButton: string;
  acceptButton: string;
}

export function BookCreationForm({
  editionData,
  handleCancel,
  genres,
  authors,
  cancelButton,
  acceptButton,
}: BookCreationFormProps) {
  const isEditMode = Boolean(editionData?._id);

  const selectableAuthors = useMemo(
    () => authors.map((author) => ({ _id: author._id, title: author.name })),
    [authors]
  );

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<BookCreationSchema>({
    resolver: zodResolver(bookCreationSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: editionData || defaultBookCreationValues,
  });

  const onSubmit = async (data: BookCreationSchema) => {
    try {
      let result;
      if (isEditMode && editionData?._id) {
        result = await updateBook(editionData._id, data);
      } else {
        result = await createBook(data);
      }

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      if (isEditMode) {
        handleCancel?.();
      } else {
        reset(defaultBookCreationValues);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleCancelAction = () => {
    if (isEditMode) {
      handleCancel?.();
    } else {
      reset(defaultBookCreationValues);
    }
  };

  return (
    <form className="flex gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-card-back border border-secondary rounded-md w-[70%] p-8 flex flex-col gap-4">
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
          <FormSingleSelect
            name="authorId"
            control={control}
            items={selectableAuthors}
            label="Author"
            variant="secondary"
          />
          <FormMultiselect
            name="genres"
            control={control}
            items={genres}
            label="Genres"
            variant="secondary"
          />
        </div>
        <TextArea
          name="description"
          label="Synopsis"
          register={register}
          errorMessage={errors.description?.message}
        />
        <div className="flex justify-between gap-6">
          <Button
            fullWidth
            size="medium"
            variant="primary"
            disabled={!isValid || isSubmitSuccessful}
            isLoading={isSubmitting}
          >
            {acceptButton}
          </Button>
          <Button
            fullWidth
            size="medium"
            variant="secondary"
            type="button"
            onClick={handleCancelAction}
          >
            {cancelButton}
          </Button>
        </div>
      </div>
      <div className="bg-card-back border border-secondary rounded-md w-[30%] p-10">
        <div className="border border-secondary border-dashed rounded-md w-full h-full flex flex-col justify-center items-center">
          <ImageUploader
            name="imageUrl"
            setValue={setValue}
            watch={watch}
            errorMessage={errors.imageUrl?.message}
          />
        </div>
      </div>
    </form>
  );
}
