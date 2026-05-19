"use client";

import { NextIntlClientProvider, type Messages } from "next-intl";

import ToastifyProvider from "@/src/providers/toastifyProvider/toastifyProvider";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
};

export default function Providers({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <ToastifyProvider />
      {children}
    </NextIntlClientProvider>
  );
}
