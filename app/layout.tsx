import "./globals.css";
import Providers from "@/providers/Providers";
import { DM_Sans, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "inspector";
import { auth } from "@/auth";

const manrope = Plus_Jakarta_Sans({ subsets: ["latin"] });
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={manrope.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
