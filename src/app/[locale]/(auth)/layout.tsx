import { routes } from "@/src/shared/constants/routes";
import Link from "next/link";
import LocaleSwitcher from "@/src/components/client/localeSwitcher/localeSwitcher";
import { getTranslations } from "next-intl/server";

export default async function Layout({
  children,
  image,
}: {
  children: React.ReactNode;
  image: React.ReactNode;
}) {
  const t = await getTranslations("Dashboard");
  return (
    <div className="flex w-full h-screen">
      <div className="relative w-[30%] sm:w-[50%] h-full">{image}</div>
      <div className="relative flex flex-col justify-center items-center w-[70%] sm:w-[50%]">
        <div className="absolute top-3 right-3">
          <LocaleSwitcher />
        </div>

        {children}
      </div>
      <Link
        href={routes.home}
        className="absolute text-primary hover:text-primary-hover self-end p-6"
      >
        {t("navLinks.home")}
      </Link>
    </div>
  );
}
