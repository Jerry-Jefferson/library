import type { Metadata } from "next";
import "../../app/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import ToastifyProvider from "@/src/providers/toastifyProvider/toastifyProvider";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SessionProvider } from "next-auth/react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Your library",
  description: "Here you can see books and authors",
};

export type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NextIntlClientProvider>
            <ToastifyProvider />
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
