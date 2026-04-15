import { routes } from "@/src/shared/constants/routes";
import { redirect } from "next/navigation";

export default function Admin() {
  redirect(routes.authorsManagement);
  return null;
}
