import { routes } from "@/src/shared/constants/routes";
import Image from "next/image";
import Link from "next/link";
import NotFound from "../../../public/404.png";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("Common");
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center text-4xl text-foreground w-screen">
      <Image
        alt="a sad emoji face with a sign 404 in an app window"
        loading="eager"
        src={NotFound}
      />
      <p>{t("noPageFound")}</p>
      <Link className="font-bold hover:text-primary" href={routes.home}>
        {t("toHomePage")}
      </Link>
    </div>
  );
}
