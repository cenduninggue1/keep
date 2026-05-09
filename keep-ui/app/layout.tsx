import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep — Alert Management & On-Call",
  description:
    "Keep is an open-source alert management and on-call platform. Consolidate alerts, reduce noise, and streamline incident response.",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Root layout component for the Keep UI application.
 *
 * Wraps the entire application with:
 * - Session provider for NextAuth authentication
 * - Global font (Inter)
 * - Toast notifications
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <SessionProvider session={session}>
          {/* Main application content */}
          <main className="h-full">{children}</main>

          {/* Global toast notification container */}
          <Toaster
            position="top-right"
            toastOptions={{
              // Default duration for informational toasts
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
                // Slightly larger font for readability on my monitor
                fontSize: "14px",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#4ade80",
                  secondary: "#fff",
                },
              },
              error: {
                // Errors stay visible longer so they don't get missed.
                // Reduced from 60000ms to 15000ms — 1 minute is way too long
                // for my workflow; 15 seconds is enough to notice and act.
                // Further reduced to 8000ms — 15s still feels too long when
                // you're rapidly testing and errors stack up in the corner.
                duration: 8000,
                iconTheme: {
                  primary: "#f87171",
                  secondary: "#fff",
                },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
