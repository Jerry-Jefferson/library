import DeleteIcon from "@/public/deleteIcon.png";
import Image from "next/image";

export default function DeleteButton() {
  return (
    <button className="w-50 h-50 rounded-md bg-white cursor-pointer flex items-center justify-center">
      <Image src={DeleteIcon} alt="Delete" width={24} height={24} className="brightness-0" />
    </button>
  );
}
