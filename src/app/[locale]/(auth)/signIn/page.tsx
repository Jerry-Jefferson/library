import { SignInForm } from "@/src/app/[locale]/(auth)/signIn/components/signInForm";
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
    title: t("signInTitle"),
    description: t("signInDescription"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function SignIn() {
  return <SignInForm />;
}
