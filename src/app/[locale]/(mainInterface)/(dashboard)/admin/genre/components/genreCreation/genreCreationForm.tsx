"use client";

import {
  genresCreationSchema,
  GenresCreationSchema,
} from "@/lib/modules/genres/genreCreation.schema";
import { addGenre, updateGenre } from "@/lib/modules/genres/genres.actions";
import { Button } from "@/src/components/client/button/button";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const genreFields = {
  title: "title",
} as const;

const defaultGenreCreationValues = {
  [genreFields.title]: "",
};

export interface EditionData extends GenresCreationSchema {
  _id: string;
}

export interface GenreCreationFormProps {
  handleCancel?: () => void;
  cancelButton: string;
  acceptButton: string;
  editionData?: EditionData;
  border?: boolean;
}

export function GenreCreationForm({
  cancelButton,
  handleCancel,
  acceptButton,
  editionData,
  border = false,
}: GenreCreationFormProps) {
  const isEditMode = Boolean(editionData?._id);
  const t = useTranslations("Genres");
  const tCommon = useTranslations("Common");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<GenresCreationSchema>({
    resolver: zodResolver(genresCreationSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: editionData || defaultGenreCreationValues,
  });

  const onSubmit = async (data: GenresCreationSchema) => {
    try {
      let result;
      if (isEditMode && editionData?._id) {
        result = await updateGenre(editionData._id, data);
      } else {
        result = await addGenre(data);
      }

      if (!result.success) {
        toast.error(t(`userMessages.${result.message}`));
        return;
      }

      toast.success(t(`userMessages.${result.message}`));

      if (isEditMode) {
        handleCancel?.();
      } else {
        reset(defaultGenreCreationValues);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(tCommon(`userMessages.wentWrong`));
    }
  };
  return (
    <form className="flex gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`bg-card-back ${border ? "border border-secondary" : ""} rounded-md w-full p-8 flex flex-col gap-4`}
      >
        <div className="flex justify-between gap-6">
          <FormInput
            name="title"
            type="text"
            register={register}
            label={t("title")}
            errorMessage={errors.title?.message}
          />
        </div>
        <div className="flex justify-between gap-6">
          <Tooltip fullWidth helpText={!isValid ? t(`Common.fillAllFields`) : ""}>
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
            onClick={() => reset(defaultGenreCreationValues)}
          >
            {cancelButton}
          </Button>
        </div>
      </div>
    </form>
  );
}
