"use client";

import { authorCreationSchema, AuthorCreationSchema } from "@/lib/modules/authors/author.schema";
import { createAuthor, updateAuthor } from "@/lib/modules/authors/authors.actions";
import { Button } from "@/src/components/client/button/button";
import { FormCheckbox } from "@/src/components/client/checkbox/variants/formCheckbox/formCheckbox";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { TextArea } from "@/src/components/client/textArea/textArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { ImageUploader } from "../../../components/imageUploader/imageUploader";

const authorFields = {
  name: "name",
  birthYear: "birthYear",
  isAlive: "isAlive",
  deathYear: "deathYear",
  bio: "bio",
  imageUrl: "imageUrl",
} as const;

const defaultAuthorCreationValues = {
  [authorFields.name]: "",
  [authorFields.birthYear]: null,
  [authorFields.isAlive]: false,
  [authorFields.deathYear]: null,
  [authorFields.bio]: "",
  [authorFields.imageUrl]: "",
};

export interface EditionData extends AuthorCreationSchema {
  _id: string;
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

  const {
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
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
      let result;
      if (isEditMode && editionData?._id) {
        result = await updateAuthor(editionData._id, data);
      } else {
        result = await createAuthor(data);
      }

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      if (isEditMode) {
        handleCancel?.();
      } else {
        reset(defaultAuthorCreationValues);
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
      reset(defaultAuthorCreationValues);
    }
  };

  return (
    <form className="flex gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-card-back border border-secondary rounded-md w-[70%] p-8 flex flex-col gap-4">
        <FormInput
          name="name"
          type="text"
          register={register}
          label="Name"
          errorMessage={errors.name?.message}
        />
        <div className="flex justify-between gap-6">
          <FormInput
            name="birthYear"
            type="text"
            register={register}
            label="Birth Year"
            errorMessage={errors.birthYear?.message}
          />
          <FormInput
            name="deathYear"
            type="text"
            register={register}
            label="Death Year"
            disabled={isAlive}
            errorMessage={errors.deathYear?.message}
          />
          <FormCheckbox
            control={control}
            name="isAlive"
            variant="primary"
            size="medium"
            label="Alive"
          />
        </div>
        <TextArea
          name="bio"
          label="Biography"
          register={register}
          errorMessage={errors.bio?.message}
        />
        <div className="flex justify-between gap-6">
          <Button fullWidth size="medium" variant="primary" disabled={!isValid}>
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
