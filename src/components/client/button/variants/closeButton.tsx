"use client";

import CloseButtonIcon from "@/public/close.png";
import Image from "next/image";

export function CloseButton({ handleCancel }: { handleCancel: () => void }) {
  return (
    <button onClick={handleCancel} className="relative w-[16px] h-[16px] cursor-pointer">
      <Image fill alt="close" src={CloseButtonIcon} />
    </button>
  );
}
