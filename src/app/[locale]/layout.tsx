import type { Metadata } from "next";
import "../../app/globals.css";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";
import Providers from "@/src/providers/providers";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Your library",
  description: "Here you can see books and authors",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers locale={locale} messages={messages}>
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
