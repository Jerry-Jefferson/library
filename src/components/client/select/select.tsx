"use client";

import MultiSelect from "./multiSelect";
import SingleSelect from "./singleSelect";
import { SelectProps, SelectItemType, VariantType } from "./types";

export default function Select<T extends SelectItemType>(
  props: SelectProps<T> & { variant?: VariantType }
) {
  if (props.multiple) {
    return <MultiSelect {...props} />;
  }

  return <SingleSelect {...props} />;
}
