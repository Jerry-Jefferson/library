import Image from "next/image";
import { DEFAULT_AVATAR } from "@/src/shared/constants/defaultAvatar";

export type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: string;
};

export function Avatar({ src, alt = "User avatar" }: AvatarProps) {
  return (
    <div className="relative inline-flex h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
      <Image src={src || DEFAULT_AVATAR} alt={alt} fill className="object-cover" />
    </div>
  );
}
