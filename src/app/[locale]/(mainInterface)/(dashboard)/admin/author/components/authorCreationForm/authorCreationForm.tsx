"use client";

import { authorCreationSchema, AuthorCreationSchema } from "@/lib/modules/authors/author.schema";
import { createAuthor, updateAuthor } from "@/lib/modules/authors/authors.actions";
import { Button } from "@/src/components/client/button/button";
import { FormCheckbox } from "@/src/components/client/checkbox/variants/formCheckbox/formCheckbox";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { ImageUploader } from "../../../components/imageUploader/imageUploader";
import { useTranslations } from "next-intl";

const authorFields = {
  name: "name",
  birthYear: "birthYear",
  isAlive: "isAlive",
  deathYear: "deathYear",
  bio: "bio",
  image: "image",
} as const;

const defaultAuthorCreationValues = {
  [authorFields.name]: "",
  [authorFields.birthYear]: null,
  [authorFields.isAlive]: false,
  [authorFields.deathYear]: null,
  [authorFields.bio]: "",
  [authorFields.image]: null,
};

export interface EditionData extends Omit<AuthorCreationSchema, "image"> {
  _id: string;
  image: string | null;
}

export interface AuthorCreationFormProps {
  editionData?: EditionData;
  handleCancel?: () => void;
  cancelButton: string;
  acceptButton: string;
}

export function AuthorCreationForm({
  editionData,
  handleCancel,
  cancelButton,
  acceptButton,
}: AuthorCreationFormProps) {
  const isEditMode = Boolean(editionData?._id);
  const t = useTranslations("Authors");
  const tCommon = useTranslations("Common");
  const {
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<AuthorCreationSchema>({
    resolver: zodResolver(authorCreationSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: editionData || defaultAuthorCreationValues,
  });
  const isAlive = useWatch({ control, name: "isAlive" });

  useEffect(() => {
    if (isAlive) {
      setValue("deathYear", null, { shouldValidate: true });
    }
  }, [isAlive, setValue]);

  const onSubmit = async (data: AuthorCreationSchema) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("bio", data.bio);
      formData.append("birthYear", String(data.birthYear));
      const deathYearValue = data.isAlive ? "" : String(data.deathYear);
      formData.append("isAlive", String(data.isAlive));
      formData.append("deathYear", deathYearValue);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      let result;
      if (isEditMode && editionData?._id) {
        result = await updateAuthor(editionData._id, formData);
      } else {
        result = await createAuthor(formData);
      }

      if (!result.success) {
        toast.error(t(`userMessages.${result.message}`));
        return;
      }

      toast.success(t(`userMessages.${result.message}`));

      if (isEditMode) {
        handleCancel?.();
      } else {
        reset(defaultAuthorCreationValues);
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
      reset(defaultAuthorCreationValues);
    }
  };

  return (
    <form
      className="flex flex-col-reverse items-center gap-6 w-full md:flex-row md:items-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-card-back border border-secondary rounded-md w-full md:w-[70%] p-4 sm:p-8 flex flex-col gap-4">
        <FormInput
          name="name"
          type="text"
          register={register}
          label={t("formFields.name")}
          errorMessage={
            errors.name?.message ? t(`authorsValidation.${errors.name.message}`) : undefined
          }
        />
        <div className="flex justify-between gap-6">
          <FormInput
            name="birthYear"
            type="text"
            register={register}
            label={t("formFields.birthYear")}
            errorMessage={
              errors.birthYear?.message
                ? t(`authorsValidation.${errors.birthYear.message}`)
                : undefined
            }
          />
          <FormInput
            name="deathYear"
            type="text"
            register={register}
            label={t("formFields.deathYear")}
            disabled={isAlive}
            errorMessage={
              errors.deathYear?.message
                ? t(`authorsValidation.${errors.deathYear.message}`)
                : undefined
            }
          />
          <FormCheckbox
            control={control}
            name="isAlive"
            variant="primary"
            size="medium"
            label={t("formFields.isAlive")}
          />
        </div>
        <TextArea
          name="bio"
          label={t("formFields.biography")}
          register={register}
          errorMessage={
            errors.bio?.message ? t(`authorsValidation.${errors.bio.message}`) : undefined
          }
        />
        <div className="flex justify-between gap-6">
          <Tooltip fullWidth helpText={!isValid ? "Fill in all the fields" : ""}>
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
