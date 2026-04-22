"use client";

import UploadCloud from "@/public/cloudUpload.png";
import { TextError } from "@/src/components/client/input/textError";
import Image from "next/image";
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
  const fileName = watch(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const pathValue = `/${file.name}` as PathValue<T, Path<T>>;
      setValue(name, pathValue, { shouldValidate: true });
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
        <input type="file" className="hidden" onChange={handleChange} value="" />
        {fileName ? (
          <div className="relative w-full h-full">
            <Image
              fill
              className="object-cover"
              alt="a cover"
              src={fileName}
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
              <p className="text-xs text-secondary truncate max-w-[150px]">PNG, JPG up to 10MB</p>
            </div>
          </>
        )}
      </label>
      <TextError errorMessage={errorMessage} />
    </div>
  );
}
