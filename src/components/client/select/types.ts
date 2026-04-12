import { MultiSelectProps } from "./multiSelect";
import { SingleSelectProps } from "./singleSelect";

export type SelectItemType = {
  _id: string;
  title: string;
};

export type BaseProps<T extends SelectItemType> = {
  items: T[];
  name?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  variant?: VariantType;
  multiple?: boolean;
};

export type SelectProps<T extends SelectItemType> =
  | ({
      multiple: true;
      value: T[];
      onChange: (value: T[]) => void;
    } & BaseProps<T>)
  | ({
      multiple?: false;
      value: T | null;
      onChange: (value: T | null) => void;
    } & BaseProps<T>);

export type VariantType = "primary" | "secondary";
