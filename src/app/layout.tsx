import type { Metadata } from "next";
import ToastifyProvider from "../providers/toastifyProvider/toastifyProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your library",
  description: "Here you can see books and authors",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastifyProvider />
        {children}
      </body>
    </html>
  );
}
