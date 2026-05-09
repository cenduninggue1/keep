import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

/**
 * Root page component.
 * Redirects authenticated users to the alerts dashboard,
 * and unauthenticated users to the sign-in page.
 */
export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/alerts");
  } else {
    redirect("/signin");
  }
}
