import PassRecoveryPic from "@/public/Shelf.jpg";
import Image from "next/image";

export default function PasswordRecoveryPicture() {
  return (
    <Image
      fill
      alt="password recovery picture"
      src={PassRecoveryPic}
      sizes="50vw"
      loading="eager"
      style={{ objectFit: "cover" }}
    />
  );
}
