"use client";

import { MdClose } from "react-icons/md";
import { Button } from "../button/button";

export default function SelectedItem<T extends { _id: string; title: string }>({
  item,
  onRemove,
}: {
  item: T;
  onRemove: (id: string) => void;
}) {
  return (
    <span className="flex items-center justify-center gap-1 bg-primary text-neutral-dark text-[11px] px-2 py-0.5 rounded shadow-sm">
      {item.title}
      <Button
        type="button"
        variant="icon"
        className="ml-1 hover:opacity-70 flex items-center justify-center"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(item._id);
        }}
      >
        <MdClose className="text-[11px]" />
      </Button>
    </span>
  );
}
