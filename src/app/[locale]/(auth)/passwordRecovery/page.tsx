import { PasswordRecoveryForm } from "@/src/app/[locale]/(auth)/passwordRecovery/components/passwordRecoveryForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Auth",
  });

  return {
    title: t("forgotPasswordTitle"),
    description: t("forgotPasswordDescription"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function PasswordRecovery() {
  return <PasswordRecoveryForm />;
}
