"use client";

export default function SelectedItem<T extends { _id: string; title: string }>({
  item,
  onRemove,
}: {
  item: T;
  onRemove: (id: string) => void;
}) {
  return (
    <span className="flex items-center gap-1 bg-primary text-neutral-dark text-[11px] px-2 py-0.5 rounded shadow-sm">
      {item.title}
      <button
        type="button"
        className="ml-1 hover:opacity-70"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(item._id);
        }}
      >
        ✕
      </button>
    </span>
  );
}
