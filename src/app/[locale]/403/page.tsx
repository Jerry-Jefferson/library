import Forbidden from "@/public/forbidden.png";
import { routes } from "@/src/shared/constants/routes";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function ForbiddenPage() {
  const t = await getTranslations("Common");
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center text-4xl text-foreground w-screen">
      <Image alt="exclamation sign in an app window" loading="eager" src={Forbidden} />
      <p>{t("accessDenied")}</p>
      <Link className="font-bold hover:text-primary" href={routes.home}>
        {t("toHomePage")}
      </Link>
    </div>
  );
}
