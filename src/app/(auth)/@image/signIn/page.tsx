import SignInPic from "@/public/tableBook.jpg";
import Image from "next/image";

export default function SignInPicture() {
  return (
    <Image
      fill
      alt="sign in picture"
      src={SignInPic}
      sizes="50vw"
      loading="eager"
      style={{ objectFit: "cover" }}
    />
  );
}
