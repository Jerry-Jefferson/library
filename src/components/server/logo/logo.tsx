import BookIcon from "@/public/book.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative w-[24px] h-[24px]">
      <Image fill alt="book icon" src={BookIcon} className="object-cover" sizes="24px" />
    </div>
  );
}
