import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextError } from "../../../input/textError";
import { Rating } from "../../rating";

export interface FormRatingProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
}

export function FormRating<T extends FieldValues>({
  control,
  name,
  errorMessage,
}: FormRatingProps<T>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Rating rating={field.value} interactive onChange={(value) => field.onChange(value)} />
        )}
      />
      <TextError errorMessage={errorMessage} />
    </>
  );
}
