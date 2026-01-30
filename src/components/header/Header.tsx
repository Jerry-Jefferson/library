import { routes } from "@/src/constants/routes"
import Link from "next/link"

export default function Header() {
  return (
    <div className="bg-primary flex justify-between p-6 text-base w-screen">
      <div className="flex gap-4">
        <Link href={routes.home}>Home</Link>
        <Link href={routes.books}>Books</Link>
        <Link href={routes.authors}>Authors</Link>
      </div>
      <div className="flex gap-4">
        <Link href={routes.signIn}>Sign in</Link>
        <Link href={routes.signUp}>Sign up</Link>
      </div>
    </div>
  )
}
