"use client";

import { bookCreationSchema, BookCreationSchema } from "@/lib/modules/books/book.schema";
import { createBook, updateBook } from "@/lib/modules/books/books.actions";
import { getBookQuote } from "@/src/actions/ai/getBookQuote";
import { Button } from "@/src/components/client/button/button";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { FormMultiselect } from "@/src/components/client/select/variants/formMultiselect/formMultiselect";
import { FormSingleSelect } from "@/src/components/client/select/variants/formSingleSelect/formSingleSelect";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { RiAiGenerate2 } from "react-icons/ri";
import { toast } from "react-toastify";
import { ImageUploader } from "../../../components/imageUploader/imageUploader";
import { useTranslations } from "next-intl";

const bookFields = {
  name: "title",
  description: "description",
  authorId: "authorId",
  genres: "genres",
  year: "year",
  image: "image",
  quote: "quote",
} as const;

const defaultBookCreationValues = {
  [bookFields.name]: "",
  [bookFields.description]: "",
  [bookFields.authorId]: "",
  [bookFields.genres]: [],
  [bookFields.year]: null,
  [bookFields.image]: null,
  [bookFields.quote]: "",
};

export interface EditionData extends Omit<BookCreationSchema, "image"> {
  _id: string;
  image: string | null;
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

  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Books");
  const tCommon = useTranslations("Common");
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
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("authorId", data.authorId);
      formData.append("year", String(data.year));
      data.genres.forEach((genreId) => formData.append("genres", genreId));
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      formData.append("quote", data.quote);

      let result;
      if (isEditMode && editionData?._id) {
        result = await updateBook(editionData._id, formData);
      } else {
        result = await createBook(formData);
      }

      if (!result.success) {
        toast.error(t(`userMessages.${result.message}`));
        return;
      }

      toast.success(t(`userMessages.${result.message}`));

      if (isEditMode) {
        handleCancel?.();
      } else {
        reset(defaultBookCreationValues);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(tCommon(`userMessages.wentWrong`));
    }
  };

  const handleCancelAction = () => {
    if (isEditMode) {
      handleCancel?.();
    } else {
      reset(defaultBookCreationValues);
    }
  };

  const watchedTitle = watch("title");
  const watchedAuthorId = watch("authorId");

  const isAiDisabled = !watchedTitle || !watchedAuthorId || isLoading || isSubmitting;

  async function handleAI() {
    try {
      setIsLoading(true);
      const result = await getBookQuote(watchedTitle, watchedAuthorId);
      if (result && result.success) {
        setValue("quote", result.quote, {
          shouldValidate: true,
        });
      } else {
        toast.error(t(`userMessages.${result?.message}`) || tCommon("apiError"));
      }
    } catch (error) {
      console.error(error);
      tCommon("wentWrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col-reverse items-center gap-6 w-full md:flex-row md:items-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-card-back border border-secondary rounded-md w-full md:w-[70%] p-4 sm:p-8 flex flex-col gap-4">
        <div className="flex justify-between gap-6">
          <FormInput
            name="title"
            type="text"
            register={register}
            label={t("formFields.title")}
            errorMessage={errors.title?.message}
          />
          <FormInput
            name="year"
            type="text"
            register={register}
            label={t("formFields.year")}
            errorMessage={errors.year?.message}
          />
        </div>
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <FormSingleSelect
            name="authorId"
            control={control}
            items={selectableAuthors}
            label={t("formFields.author")}
            variant="secondary"
          />
          <FormMultiselect
            name="genres"
            control={control}
            items={genres}
            label={t("formFields.genres")}
            variant="secondary"
          />
        </div>
        <div className="flex justify-between items-center gap-6">
          <FormInput
            name="quote"
            type="text"
            register={register}
            label="Quote"
            errorMessage={errors.quote?.message}
            disabled={isLoading}
          />
          <Button
            variant="icon"
            size="small"
            type="button"
            className="p-2 md:p-3 border border-secondary enabled:hover:border-primary-hover"
            disabled={isAiDisabled || (isEditMode && isSubmitSuccessful)}
            onClick={handleAI}
          >
            <RiAiGenerate2 className="text-base md:text-2xl text-primary" />
          </Button>
        </div>
        <TextArea
          name="description"
          label={t("synopsis")}
          register={register}
          errorMessage={errors.description?.message}
        />
        <div className="flex justify-between gap-6">
          <Tooltip fullWidth helpText={!isValid ? tCommon(`fillAllFields`) : ""}>
            <Button
              fullWidth
              size="medium"
              variant="primary"
              disabled={!isValid || isSubmitting || (isEditMode && isSubmitSuccessful)}
              isLoading={isSubmitting}
            >
              {acceptButton}
            </Button>
          </Tooltip>
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
      <div className="bg-card-back border border-secondary rounded-md w-full md:w-[30%] p-10">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <ImageUploader
            name="image"
            setValue={setValue}
            watch={watch}
            errorMessage={errors.image?.message}
          />
        </div>
      </div>
    </form>
  );
}
