import { routes } from "@/src/shared/constants/routes";
import Link from "next/link";

export default function Layout({
  children,
  image,
}: {
  children: React.ReactNode;
  image: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="relative w-[50%] h-full">{image}</div>
      <div className="flex justify-center items-center w-[50%]">{children}</div>
      <Link
        href={routes.home}
        className="absolute text-primary hover:text-primary-hover self-end p-6"
      >
        Home
      </Link>
    </div>
  );
}
