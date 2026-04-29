"use client";

import UploadCloud from "@/public/cloudUpload.png";
import { TextError } from "@/src/components/client/input/textError";
import { DEFAULT_AVATAR } from "@/src/shared/constants/defaultAvatar";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface ImageUploaderProps<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errorMessage?: string;
}

export function ImageUploader<T extends FieldValues>({
  name,
  setValue,
  watch,
  errorMessage,
}: ImageUploaderProps<T>) {
  const fileValue = watch(name);

  const preview = useMemo(() => {
    if ((fileValue as unknown) instanceof File) {
      return URL.createObjectURL(fileValue);
    }
    if (typeof fileValue === "string" && fileValue.length > 0) {
      return fileValue;
    }
    return null;
  }, [fileValue]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, file as PathValue<T, Path<T>>, { shouldValidate: true });
    }
    event.target.value = "";
  };

  return (
    <div className="flex flex-col h-full w-full">
      <label
        className="h-full w-full rounded-md cursor-pointer 
      flex flex-col items-center justify-center gap-2 overflow-hidden 
      border border-secondary border-dashed hover:border-2 hover:border-primary"
      >
        <input type="file" className="hidden" onChange={handleChange} accept="image/*" />
        {fileValue ? (
          <div className="relative w-full h-full">
            <Image
              fill
              className="object-cover"
              alt="a cover"
              src={preview || DEFAULT_AVATAR}
              sizes="(min-width: 1024px) 100vw, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ) : (
          <>
            <div className="relative w-[24px] h-[24px]">
              <Image fill alt="upload a cover" src={UploadCloud} sizes="56px" />
            </div>
            <div className="text-center">
              <p className="text-sm text-foreground font-medium">Click to upload</p>
              <p className="text-xs text-secondary truncate max-w-[150px]">
                png, jpeg, webp up to 10MB
              </p>
            </div>
          </>
        )}
      </label>
      <TextError errorMessage={errorMessage} />
    </div>
  );
}
