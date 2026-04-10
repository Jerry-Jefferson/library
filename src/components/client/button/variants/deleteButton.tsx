"use client";

import DeleteIcon from "@/public/delete.svg";
import Image from "next/image";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="relative w-8 h-8 rounded-md bg-fair cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)]
        transition-shadow"
      onClick={onClick}
    >
      <Image fill src={DeleteIcon} alt="Delete" className="brightness-0" />
    </button>
  );
}
