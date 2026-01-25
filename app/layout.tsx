import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Books and Authors",
  description: "Here you can see books and authors",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
