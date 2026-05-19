import SignUpPic from "@/public/greeneryBook.jpg";
import Image from "next/image";

export default function SignUpPicture() {
  return (
    <Image
      fill
      alt="sign up picture"
      src={SignUpPic}
      sizes="50vw"
      loading="eager"
      style={{ objectFit: "cover" }}
    />
  );
}
