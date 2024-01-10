"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { Providers } from "./Provider";
import { TOKEN } from "@/redux/auth/slice";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { selectAccessToken } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import Children from "./Children";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {/* <ClerkProvider> */}
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <Children>{children}</Children>
        </body>
      </html>
      {/* </ClerkProvider> */}
    </Providers>
  );
}
