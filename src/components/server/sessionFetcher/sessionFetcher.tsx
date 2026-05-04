import { auth } from "@/src/auth";
import { Session } from "next-auth";

export interface SessionFetcherProps {
  session: Session | null;
}

export async function SessionFetcher({
  children,
}: {
  children: (data: SessionFetcherProps) => React.ReactNode;
}) {
  const session = await auth();
  return <>{children({ session })}</>;
}
